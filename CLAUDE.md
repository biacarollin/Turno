# Turno — Contexto do projeto para Claude Code

## O que é o Turno

SaaS B2B de gestão de turnos e passagens de plantão. Voltado para gestores de operações com escala 24h: saúde, logística, hotelaria, segurança. O gestor cadastra a equipe, registra ocorrências, encerra turnos com passagem documentada e assina digitalmente. Há planos pagos com limites de membros e features exclusivas.

## Stack técnica

- **Framework:** TanStack Start (React + TypeScript, SSR)
- **Roteamento:** TanStack Router (file-based: `src/routes/`)
- **Backend/banco:** Supabase (auth, PostgreSQL, RLS, migrations)
- **Deploy:** Cloudflare Workers (`wrangler.jsonc`) — build gera `dist/server/server.js` + `dist/client/`
- **Pagamentos:** Stripe (checkout, portal de faturamento, webhooks)
- **UI:** shadcn/ui + Tailwind CSS — cor da marca: `turno-600`
- **Estado servidor:** TanStack Query (`useQuery` / `useMutation`)
- **Package manager:** Bun (`bunfig.toml`)
- **Notificações toast:** Sonner

## Estrutura de pastas

```
src/
  routes/          # Páginas (TanStack Router file-based)
  components/
    landing/       # Seções da landing page
    app/           # AppSidebar, AppHeader, PageHeader
    ui/            # shadcn/ui primitivos
  stores/          # Hooks de dados por domínio (React Query)
    ocorrencias.ts
    equipe.ts      # membros + turnos
    folgas.ts
    notas.ts
    passagens.ts
    segmento.ts
  hooks/
    use-session.ts
    use-mobile.tsx
  lib/
    plano.ts       # Definição dos planos e limites
    segmentos.ts   # Catálogo de segmentos/subcategorias com seeds
    checkout.ts
    stripe.ts
    stripe-portal.ts
    stripe-webhook.server.ts
    buscar-assinatura.ts
  integrations/supabase/
    client.ts      # cliente browser
    client.server.ts
    auth-middleware.ts
supabase/
  migrations/      # Migrations do banco
```

## Rotas existentes

| Rota | Status |
|------|--------|
| `/` | Landing page completa (Hero, Problem, Features, HowItWorks, Pricing, CTA, FAQ, Footer) |
| `/login` | Auth com Supabase |
| `/confirmar` | Confirmação de email |
| `/onboarding` | 4 steps: empresa → segmento topo → subcategoria → confirmar estrutura |
| `/pagamento` | **PLACEHOLDER** — UI fake, não processa cartão real |
| `/app` | Layout com sidebar + header (protegido por auth + onboarding) |
| `/app/` | Dashboard com stats e últimas ocorrências |
| `/app/ocorrencias` | CRUD de ocorrências com tipo e gravidade |
| `/app/historico` | Histórico de passagens de turno |
| `/app/turnos` | Gestão de turnos |
| `/app/folgas` | Gestão de folgas |
| `/app/membros` | CRUD de membros da equipe |
| `/app/cargos` | CRUD de cargos |
| `/app/notas` | Notas (com destinatário @username parcial) |
| `/app/configuracoes` | Configurações da conta |
| `/app/plano` | Planos e faturamento com Stripe real |
| `/contato`, `/suporte`, `/privacidade`, `/termos` | Páginas institucionais |

## Planos (src/lib/plano.ts)

| ID | Nome | Preço | Membros |
|----|------|-------|---------|
| `gratis` | Grátis | R$ 0/mês | Até 3 |
| `basico` | Básico | R$ 69/mês | Até 8 |
| `equipe` | Equipe | R$ 159/mês | Até 20 |
| `profissional` | Profissional | R$ 289/mês | Até 50 |
| `enterprise` | Enterprise | Sob consulta | 50+ |

**ATENÇÃO:** Os limites de plano estão definidos mas **não estão sendo aplicados no código**. Não há guards de rota, limite de membros no store, filtro de histórico por período, ou bloqueio de features premium. Isso precisa ser implementado.

## Segmentos suportados (src/lib/segmentos.ts)

- **Saúde:** Enfermagem, Farmácia hospitalar, Almoxarifado clínico, Higienização, Nutrição, Recepção, Laboratório, Home care, Administração, Outras
- **Logística:** Operador logístico, Armazenagem (WMS), Conferência, Distribuição, Last-mile, PCP, Outras
- **Hotelaria:** Recepção, Governança, A&B, Manutenção predial, Segurança/portaria, Eventos, Administração, Outras
- **Segurança:** Vigilância patrimonial, Portaria, Monitoramento (CFTV), Ronda motorizada, Segurança de eventos, Escolta, Outras
- **Outros:** Outras (estrutura em branco)

Cada subcategoria tem `cargosSugeridos`, `turnosSugeridos` e `tiposOcorrencia` pré-definidos, usados como seed no onboarding.

## Banco de dados (Supabase)

Tabelas principais inferidas do código:
- `profiles` — `user_id`, `filial_ativa_id`, `segmento`, `empresa_nome` (parcial), `username` (parcial)
- `equipes` — equipes por filial
- `membros_equipe` — membros com cargo e equipe
- `turnos` — turnos com horário início/fim, ativo
- `cargos` — cargos por equipe
- `ocorrencias` — título, tipo, gravidade (`baixa|media|alta`), status (`aberta|concluida`), equipe_id
- `passagens_turno` — resumo, assinado_por, hash_assinatura, ip, device, assinado_em
- `folgas` — por filial
- `notas` — com `destinatario_user_id` (parcial)

## O que está faltando / pendente

### Crítico (bloqueia produção real)
1. **Página `/pagamento` é fake** — o form não chama Stripe. Substituir por redirect para Stripe Checkout (igual ao que `app.plano.tsx` já faz com `createCheckoutSession`)
2. **Guards de plano não existem** — qualquer usuário grátis acessa features de planos pagos se souber a URL

### Importante (comprometido com usuário)
3. **Resumo com IA ao encerrar turno** (plano Básico+) — não implementado
4. **Assinatura digital visível** (plano Básico+) — o hash existe no banco mas não há UI para visualizar/validar
5. **Filtro de histórico por período do plano** — grátis vê 7 dias, básico 90 dias, etc.
6. **Exportação PDF** (plano Profissional+) — não implementado
7. **Multi-unidade** (plano Profissional+) — não implementado

### Melhorias de UX pendentes (ver .lovable/plan.md)
8. Header mostra empresa_nome + segmento (hoje pode mostrar hardcoded)
9. Tipo "Outros" livre em ocorrências
10. Edição de @username em configurações
11. Notas com destinatário @username completo

## Problemas de deploy (Cloudflare Workers)

O deploy vive falhando porque TanStack Start + Cloudflare Workers tem atrito. Causas comuns:
- Módulos Node.js não suportados no runtime de Workers
- Flag `nodejs_compat` está ativa mas não cobre tudo
- Build precisa rodar `bun run build` gerando `dist/server/server.js` e `dist/client/`

**Alternativa mais estável:** Vercel (zero-config para esse stack). Considerar migrar o deploy se os erros continuarem.

## Convenções de código

- Componentes de rota: `export const Route = createFileRoute(...)` + função componente nomeada
- Stores: hooks com `useQuery`/`useMutation` exportados de `src/stores/`
- Cor da marca: classes `turno-600`, `turno-700`, `turno-50`, `turno-100`, `turno-200`, `turno-900`
- Formulários: controlled com `useState`, validação inline, `toast.error()` para erros
- Sem Redux ou Zustand — React Query é o estado de servidor, useState é o estado local
- Sem comentários desnecessários no código

## App mobile (futuro)

Ainda não existe. Plano: React Native + Expo. Reutilizará lógica Supabase e tipos TypeScript do web. Assinatura deve ser feita pelo site (não dentro do app) para evitar taxa de 30% do Google Play Billing. Publicação na Play Store custa US$ 25 única vez.
