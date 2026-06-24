import { P as jsxRuntimeExports, l as createServerFn } from "./server-DznBcuRC-Ca9cSwVK.js";
import { u as useNavigate } from "./router-Bpeyu-Rv-V2oQ01bo.js";
import { u as useQuery } from "./useQuery-OXnHj9R2.js";
import { u as useMutation } from "./useMutation-miMrN0Tq.js";
import { P as PageHeader } from "./PageHeader-XNv6HAI7-DvbZ8VVl.js";
import { C as Card } from "./card-RGlIzTYo-CtW8vlBf.js";
import { B as Button } from "./button-DA2gxxPy-BWxuMPe6.js";
import { B as Badge } from "./badge-DyfXZgLs-Dm1__2dG.js";
import { t as toast } from "./index-BaU94aXf.js";
import { a as useSession } from "./use-session-S7Dx9RFc-Y3pQNEXx.js";
import { c as createSsrRpc } from "./createSsrRpc-CyxH55Qm-DpHvvOSc.js";
import { r as requireSupabaseAuth } from "./auth-middleware-BIy1DRMP-MAXw1sk7.js";
import { c as createCheckoutSession } from "./checkout-CKjigkNn-DDQiYJh5.js";
import { L as LoaderCircle } from "./loader-circle-Bb7fIPFZ.js";
import { L as Lock } from "./lock-BuRPGw2S.js";
import { c as createLucideIcon } from "./createLucideIcon-BTIl1RQt.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./client-BDUtUdlc-DgbAZHFC.js";
import "./index-B80FucMh.js";
import "./stripe.esm.worker-BZ5uBE48.js";
import "./utils-H80jjgLf-8RO4xBwZ.js";
import "./index-CfmbNbeB.js";
const __iconNode$1 = [
  ["path", { d: "M7 7h10v10", key: "1tivn9" }],
  ["path", { d: "M7 17 17 7", key: "1vkiza" }]
];
const ArrowUpRight = createLucideIcon("arrow-up-right", __iconNode$1);
const __iconNode = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
];
const ExternalLink = createLucideIcon("external-link", __iconNode);
const PLANOS = [
  {
    id: "gratis",
    nome: "Grátis",
    preco: "R$ 0/mês",
    precoNumero: 0,
    membros: "Até 3 membros",
    beneficios: [
      "Uso ilimitado no tempo",
      "Passagens de turno",
      "Histórico 7 dias",
      "App mobile + painel web simples"
    ]
  },
  {
    id: "basico",
    nome: "Básico",
    preco: "R$ 69/mês",
    precoNumero: 69,
    membros: "Até 8 membros",
    beneficios: [
      "Tudo do Grátis +",
      "Resumo com IA ao encerrar turno",
      "Assinatura digital nas passagens",
      "Histórico 90 dias",
      "Suporte por e-mail (até 72h úteis)"
    ]
  },
  {
    id: "equipe",
    nome: "Equipe",
    preco: "R$ 159/mês",
    precoNumero: 159,
    membros: "Até 20 membros",
    destaque: true,
    beneficios: [
      "Tudo do Básico +",
      "Análises por IA",
      "Histórico 1 ano",
      "Notas privadas do gestor"
    ]
  },
  {
    id: "profissional",
    nome: "Profissional",
    preco: "R$ 289/mês",
    precoNumero: 289,
    membros: "Até 50 membros",
    beneficios: [
      "Tudo do Equipe +",
      "Multi-unidade (até 5, diluindo os 50 membros)",
      "Exportação em PDF",
      "Relatórios avançados + Chat IA 24/7",
      "Histórico ilimitado",
      "Suporte 24/7"
    ]
  },
  {
    id: "enterprise",
    nome: "Enterprise",
    preco: "Sob consulta",
    precoNumero: 9999,
    membros: "Acima de 50 membros",
    beneficios: [
      "Tudo do Profissional +",
      "Multi-unidade ilimitada",
      "SSO (login corporativo)",
      "Onboarding dedicado",
      "SLA contratual + suporte direto"
    ],
    sobConsulta: true
  }
];
function planoPor(id) {
  return PLANOS.find((p) => p.id === id);
}
const buscarAssinatura = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("d15872a4196c7ae553c251f4edadd2df28a3050343507e270cc5d90fdfb07f81"));
const criarPortalStripe = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("31c91f8a38c7ea71224838a0e541df70a111114c86307552a8c887a0e72e363a"));
function Plano() {
  useNavigate();
  const {
    data: sessao
  } = useSession();
  const {
    data: assinatura,
    isLoading
  } = useQuery({
    queryKey: ["assinatura"],
    queryFn: () => buscarAssinatura({
      data: void 0
    })
  });
  const planoAtivoId = assinatura?.plano ?? "gratis";
  const planoAtivo = planoPor(planoAtivoId);
  const isPago = planoAtivo.precoNumero > 0;
  const emTrial = assinatura?.status === "trialing";
  const totalMembros = (() => {
    const m = planoAtivo.membros.match(/\d+/);
    return m ? Number(m[0]) : 0;
  })();
  const usados = Math.min(2, totalMembros);
  const pct = totalMembros ? usados / totalMembros * 100 : 0;
  const portalMutation = useMutation({
    mutationFn: () => criarPortalStripe({
      data: void 0
    }),
    onSuccess: (result) => {
      if (result?.url) window.location.href = result.url;
    },
    onError: () => toast.error("Não foi possível abrir o portal. Tente novamente.")
  });
  const checkoutMutation = useMutation({
    mutationFn: (priceKey) => createCheckoutSession({
      data: {
        priceKey
      }
    }),
    onSuccess: (result) => {
      if (result?.url) window.location.href = result.url;
    },
    onError: () => toast.error("Erro ao iniciar checkout. Tente novamente.")
  });
  const proximaCobranca = assinatura?.current_period_end ? new Date(assinatura.current_period_end).toLocaleDateString("pt-BR") : null;
  const trialEnd = assinatura?.trial_end ? new Date(assinatura.trial_end).toLocaleDateString("pt-BR") : null;
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-turno-600" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Plano e faturamento", subtitle: "Seu plano ativo, uso e gerenciamento de assinatura." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "overflow-hidden border-turno-200 bg-white text-turno-900", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-turno-100 text-turno-800", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "mr-1 h-3 w-3" }),
            " Plano ativo"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 text-2xl font-medium", children: planoAtivo.nome }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-turno-900/60", children: planoAtivo.membros })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-medium", children: planoAtivo.preco }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs text-turno-900/60", children: emTrial && trialEnd ? `Trial gratuito até ${trialEnd}` : proximaCobranca ? `Próxima cobrança · ${proximaCobranca}` : "Sem cobrança · uso ilimitado" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Membros" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono", children: [
            usados,
            " / ",
            totalMembros || "∞"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 h-2 overflow-hidden rounded-full bg-turno-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-turno-600", style: {
          width: `${pct}%`
        } }) })
      ] }),
      isPago && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 border-t border-turno-100 pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", className: "border-turno-300 text-turno-900", onClick: () => portalMutation.mutate(), disabled: portalMutation.isPending, children: [
        portalMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "mr-2 h-4 w-4" }),
        "Gerenciar assinatura, faturas e cartão"
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-medium text-turno-900", children: isPago ? "Trocar de plano" : "Escolher um plano" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4", children: [
        PLANOS.filter((p) => p.id !== "gratis" && !p.sobConsulta).map((p) => {
          const ativo = p.id === planoAtivoId;
          const priceKey = `${p.id}_mensal`;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: `p-4 ${ativo ? "border-turno-500 ring-2 ring-turno-200" : ""} ${p.destaque ? "bg-turno-50" : ""}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-base font-medium", children: p.nome }),
              ativo && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-turno-500", children: "Atual" }),
              p.destaque && !ativo && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: "Popular" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-2xl font-medium", children: p.preco }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: p.membros }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-3 space-y-1.5 text-sm text-turno-900/80", children: p.beneficios.slice(0, 3).map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 text-turno-600", children: "✓" }),
              " ",
              b
            ] }, b)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "mt-4 w-full bg-turno-600 hover:bg-turno-700", disabled: ativo || checkoutMutation.isPending, onClick: () => {
              if (ativo) return;
              if (isPago) {
                portalMutation.mutate();
              } else {
                checkoutMutation.mutate(priceKey);
              }
            }, children: checkoutMutation.isPending || portalMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }) : ativo ? "Plano atual" : isPago ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "mr-1 h-4 w-4" }),
              " Trocar plano"
            ] }) : "Assinar · 7 dias grátis" })
          ] }, p.id);
        }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-base font-medium", children: "Enterprise" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-2xl font-medium", children: "Sob consulta" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Acima de 50 membros" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-3 space-y-1.5 text-sm text-turno-900/80", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 text-turno-600", children: "✓" }),
              " Multi-unidade ilimitada"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 text-turno-600", children: "✓" }),
              " SSO corporativo"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 text-turno-600", children: "✓" }),
              " SLA contratual"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "mt-4 w-full border-turno-300", onClick: () => window.open("mailto:contato@turnoai.com.br?subject=Enterprise", "_blank"), children: "Falar com a equipe" })
        ] })
      ] })
    ] }),
    isPago && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 border-t pt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: () => portalMutation.mutate(), disabled: portalMutation.isPending, children: [
      portalMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "mr-2 h-4 w-4" }),
      "Portal de faturamento"
    ] }) })
  ] });
}
export {
  Plano as component
};
