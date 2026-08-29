# Turno

Plataforma de gestão de passagem de turno para equipes que trabalham em regime de rodízio. Substitui WhatsApp e papel por registros digitais com assinatura, IA e histórico rastreável.

Projeto de portfólio desenvolvido de forma independente com auxílio de IA.

**Stack:** TanStack Start v1 · React 19 · TypeScript · Tailwind v4 · Supabase · Stripe · Claude API

## O problema

Equipes em rodízio perdem informação na troca de turno. Uma ocorrência não comunicada vira retrabalho ou acidente. WhatsApp não tem rastreabilidade, papel não tem busca, planilha não tem assinatura.

## O que foi implementado

**Passagem de turno**
- Encerramento com formulário de passagem e resumo gerado por IA
- Assinatura digital via PIN de 4 dígitos + hash SHA-256 do conteúdo
- Histórico com filtro por período, limitado conforme o plano

**Ocorrências**
- Registro com tipo, gravidade e local
- Ocorrências críticas destacadas automaticamente no dashboard

**Dashboard do gestor**
- Resumos das passagens do dia (Claude API) como primeiro elemento da tela
- Aprovação de folgas e trocas direto no painel
- KPIs de turnos, ocorrências e assinaturas

**Equipes e membros**
- Convite por link, cargos configuráveis, gestão de folgas
- Fluxo de convite completo testado de ponta a ponta

**Planos e cobrança**
- 3 planos: Grátis / Básico R$69 / Equipe R$159
- Stripe com checkout real, Customer Portal e webhook
- Guards de plano aplicados no banco via migration

**Colaborador**
- Tela separada com visão simplificada
- Solicitação de folga e troca com aprovação do gestor

## Stack

```
Frontend    TanStack Start v1, React 19, TypeScript, Tailwind v4, shadcn/ui
Backend     Supabase (PostgreSQL + RLS + Auth)
Pagamento   Stripe (Checkout, Customer Portal, Webhooks)
IA          Claude API, resumo automático de passagem de turno
Design      Figma, design system, landing page, dashboard, app mobile
```

## Arquitetura

```
Organização
  └── Filial
        ├── Gestor, acesso total à filial
        └── Colaborador, acesso simplificado
```

Row Level Security no Supabase garante isolamento entre organizações.

## Decisões de produto

**Resumo por IA em vez de chat livre**
Chat aberto em todos os planos gera custo por token sem controle. O resumo ao encerrar turno é um caso fechado: uma chamada de API com contexto definido pelas ocorrências do turno.

**Assinatura digital sem plataforma externa**
PIN + hash SHA-256 + metadata de auditoria. Sem custo adicional, sem dependência de terceiro, sem necessidade de CNPJ.

**Guards no banco, não no frontend**
Limites de equipes, membros e histórico aplicados via migration. Não tem como burlar por URL.

## O que ficou para depois

| Feature | Situação |
|---|---|
| Multi-filial | Não implementado |
| App mobile nativo | Não implementado |
| Exportação PDF | Não implementado |
| Testes E2E com Cypress | Em andamento |

## Segmentos

Saúde, logística, hotelaria e segurança. Qualquer operação com equipes em rodízio.
