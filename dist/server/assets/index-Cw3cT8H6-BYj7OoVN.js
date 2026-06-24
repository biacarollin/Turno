import { P as jsxRuntimeExports, Y as reactExports } from "./server-DznBcuRC-Ca9cSwVK.js";
import { N as Navbar, F as Footer } from "./Footer-DvTGOCKK-pI-W39Cj.js";
import { L as Link } from "./router-Bpeyu-Rv-V2oQ01bo.js";
import { D as Dialog, a as DialogContent, d as DialogHeader, e as DialogTitle } from "./dialog-BZpy7vbf-CF__RtWH.js";
import { c as createCheckoutSession } from "./checkout-CKjigkNn-DDQiYJh5.js";
import { c as createLucideIcon } from "./createLucideIcon-BTIl1RQt.js";
import { C as Clock } from "./clock-SmikHkMN.js";
import { C as Check } from "./check-Cc8lShwg.js";
import { B as Bell } from "./bell-DI88Rxgx.js";
import { U as User } from "./user-Bf9Vu5Bq.js";
import { L as LoaderCircle } from "./loader-circle-Bb7fIPFZ.js";
import { C as ChevronDown } from "./chevron-down-Zt5nJqa2.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./Logo-Cu4L5Ikj-BEMZPfON.js";
import "./x-DZTB6rYI.js";
import "./client-BDUtUdlc-DgbAZHFC.js";
import "./index-B80FucMh.js";
import "./stripe.esm.worker-BZ5uBE48.js";
import "./index--2tixE5c.js";
import "./index-CNOW3nDF.js";
import "./index-CfmbNbeB.js";
import "./index-BcVeuedm.js";
import "./utils-H80jjgLf-8RO4xBwZ.js";
import "./createSsrRpc-CyxH55Qm-DpHvvOSc.js";
import "./auth-middleware-BIy1DRMP-MAXw1sk7.js";
const __iconNode$3 = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }]
];
const ChartColumn = createLucideIcon("chart-column", __iconNode$3);
const __iconNode$2 = [
  [
    "path",
    {
      d: "M4 9a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4a1 1 0 0 1 1 1v4a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-4a1 1 0 0 1 1-1h4a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-4a1 1 0 0 1-1-1V4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4a1 1 0 0 1-1 1z",
      key: "1xbrqy"
    }
  ]
];
const Cross = createLucideIcon("cross", __iconNode$2);
const __iconNode$1 = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
];
const FileText = createLucideIcon("file-text", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
const Star = createLucideIcon("star", __iconNode);
function HeroSection() {
  const [demoOpen, setDemoOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative w-full overflow-hidden bg-primary text-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "aria-hidden": "true",
        className: "pointer-events-none absolute inset-x-0 top-0 -z-0 h-[640px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(74,173,152,0.18),transparent_70%)]"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mx-auto max-w-6xl px-4 pt-32 pb-24 md:px-6 md:pt-40 md:pb-32", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full border border-turno-400/30 bg-turno-400/10 px-3.5 py-1.5 text-xs font-medium text-turno-200", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-turno-400" }),
        "Gestão de turnos com IA"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-8 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl", children: [
        "Passagem de turno",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-turno-400", children: "sem WhatsApp" }),
        ",",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", { className: "hidden sm:block" }),
        " ",
        "sem papel, sem falha"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 max-w-2xl text-base text-white/70 leading-relaxed md:text-lg", children: "Sua equipe registra, assina digitalmente e assume turnos em segundos. O gestor tem visibilidade total em tempo real." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex flex-col sm:flex-row gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/login",
            className: "inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-primary transition-colors hover:bg-white/90",
            children: "Começar 7 dias grátis"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setDemoOpen(true),
            className: "inline-flex items-center justify-center rounded-full border border-white/20 bg-transparent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10",
            children: "Ver demonstração"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-white/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "inline-flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-turno-400" }),
        "Não será cobrado durante o período de teste"
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: demoOpen, onOpenChange: setDemoOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-3xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Demonstração do Turno" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-video w-full overflow-hidden rounded-lg bg-black", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "iframe",
        {
          className: "h-full w-full",
          src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          title: "Demonstração",
          allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
          allowFullScreen: true
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Vídeo de demonstração — substitua pelo seu vídeo final quando estiver pronto." })
    ] }) })
  ] });
}
const segments = [
  {
    icon: Cross,
    title: "Saúde",
    sub: "Hospitais, UPAs, clínicas e farmácias",
    items: ["Conferência de psicotrópicos", "Reação adversa à medicação", "Intercorrência clínica"]
  },
  {
    icon: ChartColumn,
    title: "Logística",
    sub: "CDs, transportadoras e armazéns",
    items: ["Avaria em carga", "Veículo parado na doca", "Atraso na expedição"]
  },
  {
    icon: FileText,
    title: "Hotelaria",
    sub: "Hotéis, resorts e pousadas",
    items: ["Quarto em manutenção", "Reclamação de hóspede", "Falta de enxoval"]
  },
  {
    icon: Star,
    title: "Segurança",
    sub: "Portarias, condomínios e vigilância",
    items: ["Acesso não autorizado", "Ronda concluída", "Equipamento com falha"]
  }
];
function ProblemSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "segmentos", className: "w-full bg-background py-20 md:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-4 md:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-[2.75rem]", children: "Para qualquer equipe que trabalha em turnos contínuos" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground", children: "O Turno adapta a linguagem e as sugestões de ocorrência ao seu segmento — sem precisar configurar nada manualmente." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4", children: segments.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-2xl border border-border bg-card p-6 transition-all hover:border-turno-400/40 hover:shadow-sm",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-lg bg-turno-50 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-5 text-lg font-semibold text-foreground", children: s.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground leading-relaxed", children: s.sub }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-5 flex flex-col gap-2", children: s.items.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2 text-sm text-foreground/80", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-turno-400" }),
            it
          ] }, it)) })
        ]
      },
      s.title
    )) })
  ] }) });
}
const features = [
  {
    icon: Clock,
    title: "Resumo inteligente por IA",
    description: "Ao encerrar o turno, a IA gera automaticamente um resumo das ocorrências em linguagem natural. O próximo profissional lê em segundos e já sabe o que precisa de atenção.",
    highlight: true
  },
  {
    icon: Check,
    title: "Assinatura digital rastreável",
    description: "Cada passagem é assinada com hash criptográfico, IP e dados do dispositivo. Rastreabilidade completa para auditorias e conformidade com a LGPD."
  },
  {
    icon: Bell,
    title: "Pendências que não se perdem",
    description: "Ocorrências não resolvidas migram automaticamente para o turno seguinte com histórico completo — nada fica esquecido na troca de equipe."
  },
  {
    icon: User,
    title: "Gestão de equipe e cargos",
    description: "Cadastre cargos, associe membros, gerencie turnos, folgas e trocas. Notas privadas para o gestor registrar feedbacks individuais com sigilo."
  }
];
function FeaturesSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "funcionalidades", className: "w-full bg-muted/40 py-20 md:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl px-4 md:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-[2.5rem]", children: "Tudo que sua equipe precisa" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "Do registro à assinatura — rastreável, seguro e acessível." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 grid grid-cols-1 gap-5 md:grid-cols-2", children: features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `rounded-2xl border p-7 transition-all ${f.highlight ? "border-turno-400/40 bg-turno-50" : "border-border bg-card"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `flex h-10 w-10 items-center justify-center rounded-lg ${f.highlight ? "bg-primary text-white" : "bg-turno-50 text-primary"}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(f.icon, { className: "h-5 w-5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-5 text-lg font-semibold text-foreground", children: f.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-foreground/70 leading-relaxed", children: f.description })
        ]
      },
      f.title
    )) })
  ] }) });
}
const stats = [
  { value: "94%", label: "passagens assinadas" },
  { value: "+3", label: "setores atendidos" },
  { value: "-72%", label: "tempo na passagem de turno" }
];
const googleReviews = [
  {
    name: "Camila Ferreira",
    initials: "CF",
    role: "Coordenadora de enfermagem",
    when: "há 2 semanas",
    text: "Mudou completamente a passagem de turno na nossa unidade. O resumo automático economiza pelo menos 20 minutos por plantão e ninguém mais perde informação crítica.",
    color: "bg-rose-500"
  },
  {
    name: "Lucas Andrade",
    initials: "LA",
    role: "Gerente operacional",
    when: "há 1 mês",
    text: "Implantamos em 3 setores e a adesão foi imediata. A equipe gostou da assinatura digital e os supervisores passaram a ter rastreabilidade real do que aconteceu em cada turno.",
    color: "bg-sky-500"
  },
  {
    name: "Patrícia Gomes",
    initials: "PG",
    role: "Farmacêutica",
    when: "há 3 dias",
    text: "Suporte rápido e interface muito simples. Em uma semana a gente já tinha esquecido o grupo do WhatsApp. Recomendo demais para qualquer equipe que trabalha em escala.",
    color: "bg-amber-500"
  }
];
function HowItWorksSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "w-full bg-primary text-white py-20 md:py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-4 md:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-center text-2xl font-semibold tracking-tight text-white sm:text-3xl", children: "Equipes que pararam de usar WhatsApp" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 grid grid-cols-3 gap-6 text-center", children: stats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-semibold text-turno-400 sm:text-4xl md:text-5xl", children: s.value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-xs text-white/60 sm:text-sm", children: s.label })
    ] }, s.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-14 grid grid-cols-1 gap-5 md:grid-cols-3", children: googleReviews.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "figure",
      {
        className: "flex flex-col rounded-2xl border border-white/10 bg-white p-6 text-foreground",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `flex h-10 w-10 items-center justify-center rounded-full ${r.color} text-sm font-semibold text-white`,
                children: r.initials
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-sm font-semibold text-foreground", children: r.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-xs text-foreground/60", children: r.role })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5", "aria-label": "5 de 5 estrelas", children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "svg",
              {
                viewBox: "0 0 20 20",
                className: "h-4 w-4 fill-turno-500",
                "aria-hidden": "true",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L10 14.77l-5.2 2.74.99-5.79L1.58 7.62l5.82-.85L10 1.5z" })
              },
              i
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-foreground/50", children: r.when })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("blockquote", { className: "mt-3 text-sm leading-relaxed text-foreground/80", children: r.text })
        ]
      },
      r.name
    )) })
  ] }) });
}
const plans = [
  {
    name: "Grátis",
    priceMonthly: "0",
    priceAnnual: "0",
    priceAnnualFull: "0",
    annualEquivalent: "0",
    seats: "Até 3 membros",
    features: [
      "Passagens de turno",
      "Histórico 7 dias",
      "App mobile + painel web"
    ],
    cta: "Começar grátis"
  },
  {
    name: "Básico",
    priceMonthly: "69",
    priceAnnual: "684",
    priceAnnualFull: "828",
    annualEquivalent: "57",
    seats: "Até 8 membros",
    features: [
      "Tudo do Grátis +",
      "Resumo IA ao encerrar turno",
      "Assinatura digital",
      "Histórico 90 dias"
    ],
    cta: "Testar 7 dias grátis",
    priceKeyMonthly: "basico_mensal",
    priceKeyAnnual: "basico_anual"
  },
  {
    name: "Equipe",
    badge: "Mais popular",
    priceMonthly: "159",
    priceAnnual: "1.584",
    priceAnnualFull: "1.908",
    annualEquivalent: "132",
    seats: "Até 20 membros",
    features: [
      "Tudo do Básico +",
      "Análises por IA",
      "Histórico 1 ano",
      "Notas privadas do gestor"
    ],
    cta: "Testar 7 dias grátis",
    popular: true,
    priceKeyMonthly: "equipe_mensal",
    priceKeyAnnual: "equipe_anual"
  },
  {
    name: "Profissional",
    priceMonthly: "289",
    priceAnnual: "2.880",
    priceAnnualFull: "3.468",
    annualEquivalent: "240",
    seats: "Até 50 membros",
    features: [
      "Tudo do Equipe +",
      "Multi-unidade (até 5)",
      "Exportação em PDF",
      "Relatórios avançados",
      "Histórico ilimitado"
    ],
    cta: "Testar 7 dias grátis",
    priceKeyMonthly: "profissional_mensal",
    priceKeyAnnual: "profissional_anual"
  },
  {
    name: "Enterprise",
    badge: "Enterprise",
    priceMonthly: "Sob",
    priceAnnual: "Sob",
    priceAnnualFull: "0",
    annualEquivalent: "0",
    seats: "Acima de 50 membros",
    features: [
      "Tudo do Profissional +",
      "Multi-unidade ilimitada",
      "SSO corporativo",
      "Onboarding dedicado",
      "SLA contratual"
    ],
    cta: "Falar com a equipe",
    enterprise: true
  }
];
function PricingSection() {
  const [annual, setAnnual] = reactExports.useState(false);
  const [loadingPlan, setLoadingPlan] = reactExports.useState(null);
  async function handleCheckout(plan) {
    const priceKey = annual ? plan.priceKeyAnnual : plan.priceKeyMonthly;
    if (!priceKey) return;
    setLoadingPlan(plan.name);
    try {
      const result = await createCheckoutSession({
        data: { priceKey }
      });
      if (result?.url) {
        window.location.href = result.url;
      }
    } catch (err) {
      console.error("Erro ao iniciar checkout:", err);
    } finally {
      setLoadingPlan(null);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "precos", className: "w-full bg-background py-20 md:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-4 md:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-[2.5rem]", children: "Preços simples, sem surpresa" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "Para equipes de qualquer tamanho. Cancele quando quiser." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 inline-flex items-center gap-2 rounded-full border border-turno-200 bg-turno-50 px-4 py-2 text-sm text-turno-600", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-turno-400" }),
        "Chat IA incluído em todos os planos"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 inline-flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-sm ${!annual ? "font-semibold text-foreground" : "text-muted-foreground"}`, children: "Mensal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            role: "switch",
            "aria-checked": annual,
            onClick: () => setAnnual((v) => !v),
            className: `relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors ${annual ? "bg-turno-500" : "bg-muted"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `inline-block h-6 w-6 transform rounded-full bg-white shadow transition-transform ${annual ? "translate-x-[1.375rem]" : "translate-x-0.5"}`
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `text-sm ${annual ? "font-semibold text-foreground" : "text-muted-foreground"}`, children: [
          "Anual",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 rounded-full bg-turno-100 px-2 py-0.5 text-xs text-turno-700", children: "17% OFF" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5", children: plans.map((plan) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `relative flex flex-col rounded-2xl border p-7 ${plan.popular ? "border-2 border-primary bg-card shadow-lg" : plan.enterprise ? "border-turno-200 bg-turno-50" : "border-border bg-card"}`,
        children: [
          plan.badge && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-3 left-6 inline-flex items-center rounded-full bg-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white", children: plan.badge }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-foreground", children: plan.name }),
          plan.enterprise ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-semibold text-foreground", children: "Sob consulta" }) }) : plan.priceMonthly === "0" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-baseline gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl font-semibold tracking-tight text-foreground", children: "R$0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "/mês" })
          ] }) : annual ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: "R$" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl font-semibold tracking-tight text-foreground", children: plan.priceAnnual }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "/ano" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-turno-600", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("s", { className: "text-muted-foreground opacity-60", children: [
                "R$",
                plan.priceAnnualFull
              ] }),
              " ",
              "17% OFF"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-1 inline-block rounded-md bg-turno-50 px-2 py-0.5 text-[11px] text-turno-700", children: [
              "R$",
              plan.annualEquivalent,
              "/mês equivalente"
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: "R$" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl font-semibold tracking-tight text-foreground", children: plan.priceMonthly }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "/mês" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Cancele quando quiser" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: plan.seats }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-6 flex flex-col gap-3", children: plan.features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2.5 text-sm text-foreground/80", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "mt-0.5 h-4 w-4 shrink-0 text-turno-500" }),
            f
          ] }, f)) }),
          plan.enterprise ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/contato",
              className: "mt-8 inline-flex w-full items-center justify-center rounded-full border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted",
              children: plan.cta
            }
          ) : plan.priceMonthly === "0" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/login",
              className: "mt-8 inline-flex w-full items-center justify-center rounded-full border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted",
              children: plan.cta
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => handleCheckout(plan),
              disabled: loadingPlan === plan.name,
              className: `mt-8 inline-flex w-full items-center justify-center rounded-full px-4 py-2.5 text-sm font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${plan.popular ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border border-border bg-background text-foreground hover:bg-muted"}`,
              children: loadingPlan === plan.name ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
                "Aguarde..."
              ] }) : plan.cta
            }
          )
        ]
      },
      plan.name
    )) })
  ] }) });
}
function CTASection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "w-full bg-turno-700 py-20 md:py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl px-4 text-center md:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-semibold tracking-tight text-white sm:text-4xl", children: "Pronto para acabar com o caos na troca de turno?" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-white/80", children: "Sua equipe começa em minutos. Sem treinamento, sem instalação no servidor." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-col sm:flex-row gap-3 justify-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/login",
          className: "inline-flex items-center justify-center rounded-full border border-white/20 bg-transparent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10",
          children: "Criar conta grátis"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/contato",
          className: "inline-flex items-center justify-center rounded-full border border-white/20 bg-transparent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10",
          children: "Falar com a equipe"
        }
      )
    ] })
  ] }) });
}
const faqs = [
  {
    question: "Precisa instalar algum programa?",
    answer: "Não. Turno funciona 100% na web para gestores e administradores. Os colaboradores usam um app leve que roda no navegador do celular — não precisa baixar nada da loja se não quiser."
  },
  {
    question: "E se a internet cair no meio do turno?",
    answer: "O app do colaborador guarda as informações localmente e sincroniza automaticamente quando a conexão volta. Nada se perde."
  },
  {
    question: "Dá para migrar dados de planilha ou outro sistema?",
    answer: "Sim. Oferecemos importação via CSV para colaboradores, cargos e histórico básico. Se o volume for grande, nosso time de onboarding ajuda na transição."
  },
  {
    question: "Quem vê as notas sobre um colaborador?",
    answer: "Apenas o gestor que escreveu a nota e os administradores do sistema. Colaboradores não têm acesso às notas privadas, a menos que você configure explicitamente para notificá-los de forma discreta."
  },
  {
    question: "Posso cancelar a qualquer momento?",
    answer: "Sim. Não temos contrato de fidelidade. Cancele quando quiser e continue com os dados até o fim do período pago."
  },
  {
    question: "Como funciona o trial de 7 dias?",
    answer: "Você tem 7 dias para testar todas as funcionalidades do plano escolhido. Pedimos o cartão para evitar fraude, mas só cobramos se você não cancelar antes do fim do trial."
  },
  {
    question: "O que é o Resumo com IA ao encerrar turno?",
    answer: "Ao fechar a passagem de turno, a IA gera automaticamente um resumo em linguagem natural com as ocorrências mais importantes. O próximo profissional lê em segundos e já sabe o que precisa de atenção. Disponível a partir do plano Básico."
  },
  {
    question: "Como funciona o histórico e a exclusão automática?",
    answer: "Cada plano tem um limite de dias de histórico (Grátis: 7 dias, Básico: 90 dias, Equipe: 1 ano, Profissional e Enterprise: ilimitado). Passado esse período, as passagens antigas são excluídas automaticamente da nuvem. Se quiser guardar mais tempo, faça upgrade ou exporte em PDF (Profissional)."
  },
  {
    question: "O que é multi-unidade?",
    answer: "Permite gerenciar várias equipes ou setores separados na mesma conta (ex: UTI + Centro Cirúrgico + Pronto-Socorro, ou Hotel Centro + Hotel Praia). Cada unidade tem suas escalas, membros e histórico próprios, mas você vê tudo no mesmo painel. No plano Profissional, você pode criar até 5 unidades diluindo o total de 50 membros entre elas — por exemplo: 1 unidade com 10 membros, outra com 15, outra com 25, desde que a soma não passe de 50. No Enterprise é ilimitado."
  },
  {
    question: "O que é SSO (login corporativo)?",
    answer: "Single Sign-On permite que sua equipe entre no Turno usando o login da empresa (Google Workspace, Microsoft 365, Okta). Quando alguém é desligado, o acesso cai automaticamente. Política de senha e autenticação em dois fatores ficam centralizadas no RH. Exclusivo do Enterprise."
  },
  {
    question: "Como mudo de plano?",
    answer: "Você pode fazer upgrade ou downgrade quando quiser direto no app, em Configurações > Plano. O upgrade é imediato e o downgrade vale a partir do próximo ciclo. Os recursos do novo plano ficam disponíveis na hora."
  }
];
function FAQSection() {
  const [openIndex, setOpenIndex] = reactExports.useState(0);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "faq", className: "w-full py-20 md:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl px-4 md:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-wider text-accent", children: "Dúvidas" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl", children: "Perguntas que a gente já ouviu" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-xl text-muted-foreground", children: "Se a sua não estiver aqui, é só mandar uma mensagem. Respondemos de verdade, não robô." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-14 flex flex-col gap-3", children: faqs.map((faq, index) => {
      const isOpen = openIndex === index;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `rounded-xl border transition-colors ${isOpen ? "border-accent/30 bg-accent/5" : "border-border bg-card"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                className: "flex w-full items-center justify-between gap-4 px-5 py-4 text-left",
                onClick: () => setOpenIndex(isOpen ? null : index),
                "aria-expanded": isOpen,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: faq.question }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ChevronDown,
                    {
                      className: `h-4 w-4 shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`
                    }
                  )
                ]
              }
            ),
            isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: faq.answer }) })
          ]
        },
        index
      );
    }) })
  ] }) });
}
function Index() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(HeroSection, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ProblemSection, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FeaturesSection, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(HowItWorksSection, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PricingSection, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CTASection, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FAQSection, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  Index as component
};
