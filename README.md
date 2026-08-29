# Turno — Gestão de Passagem de Turno Digital

> Projeto de portfólio desenvolvido de forma independente com auxílio de IA.  
> Stack: TanStack Start · React 19 · TypeScript · Supabase · Stripe · Tailwind v4

---

## O que é

O Turno substitui WhatsApp e papel na comunicação entre equipes que trabalham em turnos — saúde, logística, hotelaria e segurança. O colaborador que encerra o turno registra ocorrências, gera um resumo e assina digitalmente. O próximo turno entra sabendo exatamente o que aconteceu e o que está pendente.

**Problema real:** equipes que trabalham em rodízio perdem informação crítica na troca de turno. Uma ocorrência não comunicada pode causar desde retrabalho até acidentes. WhatsApp não tem rastreabilidade, papel não tem busca, planilha não tem assinatura.

---

## Funcionalidades implementadas

### Gestão de turnos
- Criação e configuração de turnos com horários, cargos associados e limites de notificação
- Encerramento de turno com formulário de passagem
- Assinatura digital com PIN de 4 dígitos + hash SHA-256 do conteúdo — trilha de auditoria completa
- Histórico de passagens com filtro por período (limitado por plano)

### Ocorrências
- Registro com tipo, gravidade (baixa / média / alta) e local
- Destaque automático de ocorrências críticas no dashboard
- Associação de ocorrências à passagem de turno

### Dashboard do gestor
- Resumos das passagens do dia gerados por IA — primeiro elemento visível ao entrar
- Cards com status automático por gravidade máxima das ocorrências
- KPIs: turnos ativos, ocorrências abertas, passagens assinadas
- Aprovação de folgas e trocas de turno direto no dashboard

### Membros e equipes
- CRUD completo de membros com convite por link
- Fluxo de convite → conta real → entrada na equipe correta (4 bugs corrigidos em cadeia)
- Cargos com cores configuráveis
- Gestão de folgas e trocas com aprovação do gestor

### Planos e cobrança
- 3 planos: Grátis / Básico R$69 / Equipe R$159
- Checkout real via Stripe com trial de 7 dias
- Customer Portal para gestão de assinatura
- Webhook processando `checkout.session.completed` e updates
- Guards de plano no banco via migration — não dá pra burlar por URL

### Colaborador
- Tela separada e simplificada (não vê o painel do gestor)
- Solicitação de folga e troca de turno com aprovação do gestor
- Visualização da passagem recebida com resumo da IA

---

## Decisões de produto documentadas

### Por que 3 planos e não 5
O modelo inicial tinha Profissional e Enterprise. Cortados antes do lançamento porque nenhuma das features prometidas (multi-filial, hierarquia de papéis, exportação PDF) estava implementada. Vender o que não existe é pior do que ter um catálogo menor e honesto.

### Por que "Resumo por IA" e não "Chat com IA"
Chat livre com IA em plano Grátis = custo recorrente ilimitado sem receita. O resumo automático ao encerrar turno é um caso de uso fechado: 1 chamada de LLM, contexto definido (ocorrências do turno), resultado útil e previsível. Esse é o diferencial real do produto.

### Por que cortar hierarquia de papéis (diretor / gerente / gestor)
RBAC multi-nível cruzado com multi-unidade é essencialmente um segundo produto. Não existia nada no schema. Mantido só 2 papéis: gestor (acesso total à unidade) e colaborador (acesso simplificado). Diretor multi-unidade fica para quando houver cliente real pedindo.

### Por que não subir em produção
O deploy no Cloudflare Workers tem incompatibilidade estrutural com o plugin do Vite — o CSS não renderiza em produção. A solução é migrar para Vercel, que suporta TanStack Start nativamente. Decisão: pausar o projeto antes de investir mais tempo em infraestrutura sem tração de clientes.

### Por que não construir o app mobile nativo
React Native / Expo = projeto separado, build, publicação nas lojas, custo de US$25 na Play Store e revisão da Apple. Para o MVP, uma página web responsiva com login leve resolve 90% do valor por 10% do esforço. App nativo só depois de tração.

---

## O que ficou para depois (e por quê)

| Feature | Motivo do corte |
|---|---|
| Multi-filial | Schema não implementado, complexidade alta, nenhum cliente pediu ainda |
| Hierarquia de papéis completa | RBAC multi-nível = segundo produto |
| Exportação PDF | Baixo impacto no early adoption, era feature do plano Profissional que foi cortado |
| App mobile nativo | Custo e complexidade desproporcionais para o estágio atual |
| Alertas de IA | Vago demais, custo imprevisível, não implementado |
| Envio automático de convite por e-mail | Mantido como link manual para simplificar o fluxo inicial |

---

## Stack técnica

```
Frontend:    TanStack Start v1, React 19, TypeScript, Tailwind v4, shadcn/ui
Backend:     Supabase (PostgreSQL + RLS + Auth + Storage)
Pagamento:   Stripe (Checkout, Customer Portal, Webhooks)
IA:          Claude API (Anthropic) — resumo de passagem de turno
Deploy:      Cloudflare Workers (bug de CSS — migração para Vercel pendente)
Design:      Figma (design system, landing page, dashboard, app mobile)
```

---

## Arquitetura multi-tenant

```
Organização (empresa)
  └── Filial (unidade — ex: UPA-001, UPA-002)
        ├── Gestor → acesso total à filial
        │     ├── Equipes
        │     ├── Membros
        │     ├── Passagens
        │     └── Ocorrências
        └── Colaborador → acesso simplificado
              ├── Ver passagem recebida
              ├── Registrar ocorrência
              └── Solicitar folga / troca
```

Row Level Security (RLS) no Supabase garante isolamento total entre organizações — nenhuma query retorna dados de outra empresa.

---

## Design

O projeto tem um design system completo desenvolvido no Figma:
- Paleta de cores com tokens (`green/500: #399B59`, `green/900: #0F1E15`)
- Landing page com hero, segmentos, features, depoimentos e pricing
- Dashboard do gestor com 6 telas (Dashboard, Passagens, Ocorrências, Membros, Notas, Plano)
- App mobile do colaborador com 7 telas + 5 estados do card de passagem de plantão
- Tela de login web em duas colunas

---

## Como rodar localmente

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Preencher com suas chaves do Supabase, Stripe e Anthropic

# Rodar em desenvolvimento
npm run dev
```

> **Nota:** o projeto usa Supabase como banco. Você vai precisar de um projeto próprio no supabase.com e rodar as migrations em `supabase/migrations/`.

---

## Contexto do projeto

Desenvolvido de forma independente ao longo de vários meses como produto SaaS real, desde a concepção até implementação. Todo o processo — decisões de produto, design, desenvolvimento frontend e backend, integração de pagamentos — foi feito por uma pessoa só com auxílio de ferramentas de IA.

O projeto está pausado e foi convertido em portfólio. Os próximos passos planejados são implementação de testes com Cypress e documentação técnica aprofundada.

---

## Segmentos-alvo

- **Saúde:** UTI, enfermagem, farmácia hospitalar — rastreabilidade clínica
- **Logística:** almoxarifado, transporte, centro de distribuição — controle por turno
- **Hotelaria:** recepção, governança, manutenção — pendências sem depender de WhatsApp
- **Segurança:** portaria, rondas — registro com timestamp e assinatura