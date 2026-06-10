# Plano de ajustes

## 1. Banco de dados (1 migration)

**`profiles`**
- `empresa_nome TEXT` (nome da empresa/operação — mostrado no header)
- `username TEXT UNIQUE` (gerado automático como `nome-sobrenome`, editável)

**`handle_new_user()`** atualizado para também:
- gerar `username` a partir de `nome_completo` (lowercase, sem acento, hifenizado), com sufixo numérico em caso de colisão

**`notas`**
- `destinatario_user_id UUID NULL` (referência ao destinatário; nota privada permanece com remetente = `user_id`)
- Atualizar RLS: o destinatário também pode ler suas notas recebidas

## 2. Catálogo de segmentos (`src/lib/segmentos.ts`)

Cada segmento topo ganha uma **descrição curta com exemplos** (mostrada no card, substitui a contagem). Cada segmento ganha pesquisa expandida de subcategorias + sempre uma `Outras` em branco no final.

- **Saúde** — "Hospitais, clínicas, equipes assistenciais, home care, laboratórios"
  - Enfermagem, Farmácia hospitalar, Almoxarifado clínico, Higienização hospitalar, Nutrição e cozinha, Recepção/atendimento, Laboratório, Home care, Administração, Outras
- **Logística** — "Armazéns, transportadoras, distribuição, last-mile"
  - Operador logístico, Armazenagem (WMS), Conferência/expedição, Distribuição/transporte, Last-mile, Planejamento (PCL), Outras
- **Hotelaria** — "Hotéis, pousadas, resorts, eventos"
  - Recepção, Governança/camareira, A&B (alimentos e bebidas), Cozinha, Manutenção predial, Segurança/portaria, Eventos, Administração, Outras
- **Segurança** (NOVO) — "Vigilância patrimonial, portaria, monitoramento, eventos"
  - Vigilância patrimonial, Portaria, Monitoramento (CFTV), Ronda motorizada, Segurança de eventos, Escolta, Outras
- **Outros** — "Qualquer operação com turnos e passagens de plantão"
  - Outras (única, em branco)

Quando o usuário escolhe **Outras**, o app pede um nome livre (sem templates seed).

## 3. Onboarding (`src/routes/onboarding.tsx`)

**Step 0 (novo, antes do topo):** campo "Nome da empresa/operação" (obrigatório). Salvo em `profiles.empresa_nome` ao confirmar.

**Step 1 (topo):** card mostra nome + descrição com exemplos. Remover "X subcategorias".

**Step 2 (subcategoria):** card mostra só o nome. Remover linha de contagens.
- Se escolher "Outras": modal/input para digitar nome do segmento.

**Step 3 (confirmação):** 3 botões no rodapé:
1. **Trocar de categoria** (volta ao step 1)
2. **Editar estrutura sugerida antes de iniciar** (abre painel para remover itens das 3 listas antes do seed)
3. **Confirmar e começar** (faz seed com a estrutura final)

A mutação `useConfigurarSegmento` aceita agora `{ topoId, subId, empresa, subNomeCustom?, cargos, turnos, tiposOcorrencia }` para permitir edição.

## 4. Header (`AppHeader.tsx`)

Substituir "Hospital São Lucas · Farmácia" hardcoded por:
- `{profile.empresa_nome} · {labelDoSegmento}` lido do profile + catálogo
- Fallback: só o segmento se a empresa estiver vazia

## 5. Ocorrências

Em `app.ocorrencias.tsx` (form Nova/Editar), adicionar opção fixa **"Outros"** ao select de tipo (além dos `tipos_ocorrencia` do segmento). Quando "Outros" é selecionado, mostrar input livre que salva em `ocorrencias.tipo` como texto.

## 6. Notas privadas

**Schema:** novo campo `destinatario_user_id` em `notas` + RLS de leitura para destinatário.

**Hook `useUsernames`:** busca usernames disponíveis (`profiles.username`) para autocomplete.

**Form "Nova nota" (`app.notas.tsx`):**
- Novo campo opcional "Destinatário (@username)" com autocomplete simples (lista filtrada).
- Header da nota mostra "Para @username" quando preenchida.

**Configurações:** novo campo "Seu @username" no `app.configuracoes.tsx` para editar.

## 7. Ordem de execução

1. Migration (profiles.empresa_nome + username, notas.destinatario_user_id, RLS, trigger).
2. Atualizar `segmentos.ts` (descrições, Segurança, "Outras", subcategorias).
3. Refatorar `onboarding.tsx` (step empresa, descrições, 3 botões, edição de estrutura, "Outras" custom).
4. Atualizar `AppHeader.tsx` para ler `empresa_nome` + label do segmento.
5. Atualizar `app.ocorrencias.tsx` (tipo "Outros" + input livre).
6. Atualizar `app.notas.tsx` (destinatário com @) + `stores/notas.ts`.
7. Adicionar edição de @username em `app.configuracoes.tsx`.

## Notas técnicas

- Username regex: `^[a-z0-9-]{3,30}$`. Geração: `slugify(nome_completo)` no trigger, com `-2`, `-3` em colisões.
- Autocomplete de @ pode ser simples (input + lista filtrada) — sem libs novas.
- "Editar estrutura": estado local com arrays editáveis no step 3 antes de submeter.
- Header: criar helper `getSegmentoLabel(topoId, subId, customNome?)` em `segmentos.ts`.

Confirma para eu seguir?
