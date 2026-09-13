-- Suporte a "troca de turno" nas folgas: um pedido pode ser uma folga simples
-- (tipo='folga', só membro_id) ou uma troca entre dois membros (tipo='troca',
-- membro_id = quem pediu, membro_troca_id = com quem está trocando).
alter table public.folgas
  add column if not exists tipo text not null default 'folga',
  add column if not exists membro_troca_id uuid;

comment on column public.folgas.tipo is 'folga | troca';
comment on column public.folgas.membro_troca_id is 'Quando tipo=troca: o outro membro envolvido na troca (membros_equipe.id).';
