-- Guards de plano — aplicados no banco, não dependem do front-end.
-- Um usuário grátis não consegue burlar isso forçando requests direto pra API,
-- porque a checagem roda dentro do Postgres (trigger / RLS), não no cliente.
--
-- Fonte da verdade do plano: tabela public.assinaturas (populada pelo webhook do Stripe).
-- Se não houver assinatura ativa/trial para o admin da filial, o plano é 'gratis'.
--
-- Limites hoje (mantenha isto em sincronia com src/lib/plano.ts e PricingSection.tsx):
--   equipes:  gratis=1   basico=3   equipe=ilimitado
--   membros:  gratis=5   basico=20  equipe=80
--   histórico: gratis=7 dias  basico=30 dias  equipe=ilimitado

-- 1) Plano ativo de uma filial = plano do admin dela (quem assinou).
create or replace function public.plano_ativo_da_filial(p_filial_id uuid)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_admin_id uuid;
  v_plano text;
begin
  select user_id into v_admin_id
  from public.membros_filial
  where filial_id = p_filial_id and papel = 'admin'
  order by created_at asc
  limit 1;

  if v_admin_id is null then
    return 'gratis';
  end if;

  select plano into v_plano
  from public.assinaturas
  where user_id = v_admin_id
    and status in ('active', 'trialing')
    and (current_period_end is null or current_period_end > now())
  order by created_at desc
  limit 1;

  return coalesce(v_plano, 'gratis');
end;
$$;

-- 2) Limites numéricos centralizados por plano.
create or replace function public.limite_equipes_plano(p_plano text)
returns int language sql immutable as $$
  select case p_plano
    when 'basico' then 3
    when 'equipe' then null
    else 1
  end;
$$;

create or replace function public.limite_membros_plano(p_plano text)
returns int language sql immutable as $$
  select case p_plano
    when 'basico' then 20
    when 'equipe' then 80
    else 5
  end;
$$;

create or replace function public.dias_historico_plano(p_plano text)
returns int language sql immutable as $$
  select case p_plano
    when 'basico' then 30
    when 'equipe' then null
    else 7
  end;
$$;

-- Pronta pra quando o "resumo por turno com IA" for implementado (checkpoint 4):
-- basta chamar essa função na server function que gera o resumo.
create or replace function public.plano_permite_resumo_ia(p_filial_id uuid)
returns boolean language sql stable as $$
  select public.plano_ativo_da_filial(p_filial_id) in ('basico', 'equipe');
$$;

-- 3) Guard: criar equipe além do limite do plano.
create or replace function public.check_limite_equipe()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  v_plano text;
  v_limite int;
  v_total int;
begin
  v_plano := public.plano_ativo_da_filial(new.filial_id);
  v_limite := public.limite_equipes_plano(v_plano);

  if v_limite is not null then
    select count(*) into v_total from public.equipes where filial_id = new.filial_id;
    if v_total >= v_limite then
      raise exception 'Limite de % equipe(s) do plano % atingido. Faça upgrade para adicionar mais equipes.', v_limite, v_plano;
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists trg_check_limite_equipe on public.equipes;
create trigger trg_check_limite_equipe
before insert on public.equipes
for each row execute function public.check_limite_equipe();

-- 4) Guard: convidar membro além do limite do plano.
create or replace function public.check_limite_membro()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  v_filial_id uuid;
  v_plano text;
  v_limite int;
  v_total int;
begin
  v_filial_id := public.filial_da_equipe(new.equipe_id);
  v_plano := public.plano_ativo_da_filial(v_filial_id);
  v_limite := public.limite_membros_plano(v_plano);

  if v_limite is not null then
    select count(*) into v_total
    from public.membros_equipe me
    join public.equipes e on e.id = me.equipe_id
    where e.filial_id = v_filial_id;

    if v_total >= v_limite then
      raise exception 'Limite de % membro(s) do plano % atingido. Faça upgrade para adicionar mais membros.', v_limite, v_plano;
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists trg_check_limite_membro on public.membros_equipe;
create trigger trg_check_limite_membro
before insert on public.membros_equipe
for each row execute function public.check_limite_membro();

-- 5) Guard: nota direcionada a um colaborador ("nota privada") é exclusiva do plano Equipe.
-- Visibilidade (só autor + destinatário) já é garantida pela policy notas_select_own_or_recipient;
-- este guard só decide QUEM pode criar uma nota com destinatário.
create or replace function public.check_nota_privada_plano()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  v_plano text;
begin
  if new.destinatario_user_id is not null and new.filial_id is not null then
    v_plano := public.plano_ativo_da_filial(new.filial_id);
    if v_plano <> 'equipe' then
      raise exception 'Notas direcionadas a um colaborador (notas privadas) são exclusivas do plano Equipe.';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_check_nota_privada_plano on public.notas;
create trigger trg_check_nota_privada_plano
before insert or update on public.notas
for each row execute function public.check_nota_privada_plano();

-- 6) Guard: histórico de passagens de turno além do período do plano.
-- Policy RESTRICTIVE: só estreita o que as policies permissivas existentes já liberam,
-- nunca abre acesso novo — seguro de aplicar sem saber os detalhes de outras policies.
alter table public.passagens_turno enable row level security;

drop policy if exists pt_historico_periodo_plano on public.passagens_turno;
create policy pt_historico_periodo_plano
on public.passagens_turno
as restrictive
for select
to authenticated
using (
  equipe_id is null
  or public.dias_historico_plano(public.plano_ativo_da_filial(public.filial_da_equipe(equipe_id))) is null
  or data >= (current_date - (public.dias_historico_plano(public.plano_ativo_da_filial(public.filial_da_equipe(equipe_id))) || ' days')::interval)
);
