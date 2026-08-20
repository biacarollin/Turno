# App Colaborador (mobile) — referência de design

> Fonte: Figma "Turno — Landing Page", página **📱 App — Colaborador**
> (`fileKey 4FNnpYAqsBQdJzz1fg7ckr`). Screenshots e node-ids abaixo apontam
> para a iteração mais recente de cada tela (prefixo de node-id `96:*`).
>
> Este documento existe porque o app mobile **ainda não existe no código**
> (ver CLAUDE.md → "App mobile (futuro)": React Native + Expo, reutilizando
> lógica Supabase e tipos do web). Serve como spec visual para quando essa
> implementação começar — não há código React Native gerado a partir daqui.

## Fluxo de telas

1. **Login** (`96:202`) — email/senha + "Continuar com Google", fundo escuro (`app-900`)
2. **Turno Ativo / Início** (`96:233`) — home do colaborador durante o plantão
3. **Registrar Ocorrência** (`96:299`) — formulário de nova ocorrência
4. **Registrar Passagem / Assinar Turno** (`96:328`) — resumo + PIN de 4 dígitos para assinar e encerrar
5. **Histórico** (`96:365`) — passagens anteriores do colaborador
6. **Solicitar Folga** (`96:425`) — pedido de folga/troca
7. **Perfil** (`96:447`) — dados da conta, configurações, logout

Estados adicionais explorados no Figma (variações do card "Pendências" na
home, não são telas próprias): sem pendências, só rotinas, urgência média,
crítico, múltiplas pendências (`98:*` / `96:1xx` na mesma página).

## Estrutura por tela

### 1 · Login (fundo escuro `#0F1E15`)
- Logo "Turno" (grade de 9 pontos verdes) centralizada, título "Bem-vindo de volta"
- Botão "Continuar com Google" (outline, `app-800` bg, `app-600` border)
- Divisor "ou"
- Campos E-mail / Senha (bg `app-800`, border `app-600`, label verde-claro `app-300`)
- Link "Esqueci minha senha" (`app-400`)
- Botão primário "Entrar" cheio, `app-500` bg, texto escuro (`app-900`) — único botão com texto escuro sobre fundo claro na paleta
- Rodapé "Não tem conta? Cadastre-se"

### 2 · Turno Ativo (home, fundo `gray-50`)
- Header branco fixo: logo "turno" + ícone de notificação
- Saudação "Bom turno, {nome} 👋" + linha "Equipe · Filial · horário"
- Card "Passagem de plantão" (dark, `gray-900`/`#111827`): badge "✦ Passagem de plantão", quem passou o plantão, badge "✦ IA" com resumo gerado automaticamente
- Dentro do mesmo card, alerta em destaque gradiente vermelho→laranja para pendência crítica, com CTA "Ver passagem completa →" e horário de encerramento
- Seção "Seu turno": card branco com horário + badge "● Em andamento" (verde) + contagem de ocorrências + link "Registrar →"
- "Ações rápidas": 3 tiles (Ocorrência / Encerrar turno / Solicitar folga), cada um com cor de fundo pastel própria (âmbar / verde-menta / lilás)
- Tab bar inferior fixa: Início · Ocorrências · Histórico · Perfil (ativo = verde `app-500` + indicador de 3px no topo do ícone)

### 3 · Registrar Ocorrência
- Header com voltar (←) + título centralizado
- Formulário simples (tipo, gravidade, descrição) seguindo os mesmos padrões de cor de gravidade do dashboard (alta = âmbar, média = laranja, rotina/baixa = verde)

### 4 · Registrar Passagem / Assinar Turno
- Header "Registrar passagem" com contexto da equipe/turno em pill cinza
- Lista "Ocorrências do turno": cada item com barra lateral colorida por gravidade + badge (igual ao padrão do dashboard web)
- Card "Resumo gerado pela IA" (bg `app-50`, border `app-200`, badge "✦ IA" em `app-600`) — texto gerado automaticamente, não editável
- Card "Resumo da passagem (editável)" (border verde `app-500` 1.5px) — textarea que o colaborador pode ajustar antes de assinar
- "PIN de assinatura (4 dígitos)" — 4 círculos de input
- Botão primário cheio "Assinar e encerrar turno" (`app-500`)
- Aviso "Esta ação não pode ser desfeita."
- **Importante (CLAUDE.md):** a assinatura em si deve ocorrer pelo site, não dentro do app, para evitar a taxa de 30% do Google Play Billing — este fluxo de PIN é sobre *confirmar identidade*, o encerramento/registro formal da passagem segue as mesmas regras de `passagens_turno` já usadas no web (hash + IP + device).

### 5 · Histórico
- Lista de passagens do próprio colaborador, mesmo padrão visual do dashboard (data, status assinado/pendente)

### 6 · Solicitar Folga
- Formulário de solicitação (data, motivo, turno afetado) alimentando a tabela `folgas` já existente no backend

### 7 · Perfil
- Avatar circular com iniciais (bg `app-600`, texto `app-400`) + nome + cargo + filial + badge "● Ativo"
- Seção "CONTA": e-mail, celular, cargo, equipe (linhas com chevron `›`)
- Seção "CONFIGURAÇÕES": notificações, PIN de assinatura, filial ativa
- "Sair" no canto superior direito, em vermelho

## Paleta usada nestas telas

Mesma paleta do shell do app definida em `src/styles.css` (`--color-app-*`):

| Token | Hex | Uso no mobile |
|---|---|---|
| `app-900` | `#0F1E15` | fundo da tela de login |
| `app-800` / `app-600` | `#162B1E` / `#2A5C3C` | inputs e botão "Google" no login |
| `app-500` | `#399B59` | botões primários, badges "Em andamento" |
| `app-400` | `#5BC47A` | links, iniciais de avatar |
| `app-300` | `#8EDBA4` | labels sobre fundo escuro |
| `app-100` / `app-50` | `#E2F7E9` / `#F0FAF4` | badges de sucesso, cards de resumo IA |
| gray-900/600/400 (Tailwind default) | — | texto em telas com fundo claro |
| âmbar/laranja/vermelho (Tailwind default) | — | gravidade de ocorrências, alerta crítico |

## Quando a implementação mobile começar

- Reaproveitar os hooks de `src/stores/*` como referência de contrato de dados
  (mesmas tabelas Supabase: `ocorrencias`, `passagens_turno`, `folgas`, `membros_equipe`)
- Reaproveitar os tokens de cor `app-*` já adicionados em `src/styles.css`
  (portar para o tema do Expo/NativeWind quando o projeto mobile for criado)
- Tab bar inferior + header fixo tal como no Figma; sem sidebar (diferente do web)
- PIN de assinatura de 4 dígitos é um passo de confirmação local — a assinatura
  formal continua exigindo o fluxo já existente de `useEncerrarTurno` (hash SHA-256)
