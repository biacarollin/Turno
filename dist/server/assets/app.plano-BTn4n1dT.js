import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { P as PageHeader } from "./PageHeader-XNv6HAI7.js";
import { C as Card } from "./card-RGlIzTYo.js";
import { B as Button } from "./button-DA2gxxPy.js";
import { B as Badge } from "./badge-DyfXZgLs.js";
import { Lock, CreditCard, Download, ArrowUpRight, Check, QrCode, Pin } from "lucide-react";
import { D as Dialog, a as DialogContent, d as DialogHeader, e as DialogTitle, b as DialogDescription, c as DialogFooter } from "./dialog-BZpy7vbf.js";
import { I as Input } from "./input-C0QjszdI.js";
import { L as Label } from "./label-JU3yqRBo.js";
import { T as Textarea } from "./textarea-DSyJ1nlY.js";
import { S as Select, c as SelectTrigger, d as SelectValue, a as SelectContent, b as SelectItem } from "./select-NX1S2Qd-.js";
import { toast } from "sonner";
import { jsPDF } from "jspdf";
import { a as useSession } from "./use-session-S7Dx9RFc.js";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-dialog";
import "@radix-ui/react-label";
import "@radix-ui/react-select";
import "@tanstack/react-query";
import "./client-BDUtUdlc.js";
import "@supabase/supabase-js";
const KEY = "turno-plano-ativo";
const DEFAULT = "gratis";
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
    preco: "R$ 99/mês",
    precoNumero: 99,
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
    preco: "R$ 220/mês",
    precoNumero: 220,
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
    preco: "R$ 349/mês",
    precoNumero: 349,
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
function getPlanoAtivo() {
  if (typeof window === "undefined") return DEFAULT;
  const v = window.localStorage.getItem(KEY);
  if (v === "gratis" || v === "basico" || v === "equipe" || v === "profissional" || v === "enterprise") return v;
  return DEFAULT;
}
function setPlanoAtivo(id) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, id);
  window.dispatchEvent(new Event("plano-changed"));
}
function usePlanoAtivo() {
  const [plano, setPlano] = useState(DEFAULT);
  useEffect(() => {
    setPlano(getPlanoAtivo());
    const onChange = () => setPlano(getPlanoAtivo());
    window.addEventListener("plano-changed", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("plano-changed", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);
  return plano;
}
function planoIndex(id) {
  return PLANOS.findIndex((p) => p.id === id);
}
function planoPor(id) {
  return PLANOS.find((p) => p.id === id);
}
const faturas = [{
  mes: "Maio · 2026",
  valor: "R$ 199,00",
  status: "Paga"
}, {
  mes: "Abril · 2026",
  valor: "R$ 199,00",
  status: "Paga"
}, {
  mes: "Março · 2026",
  valor: "R$ 199,00",
  status: "Paga"
}];
const MOTIVOS_CANCEL = ["Encerrei a operação", "Mudei para outra ferramenta", "Caro demais", "Faltou um recurso essencial", "Pausa temporária", "Outro"];
function Plano() {
  const {
    data: sessao
  } = useSession();
  const empresaNome = sessao?.filial_nome || "Sua organização";
  const planoAtivoId = usePlanoAtivo();
  const planoAtivo = planoPor(planoAtivoId);
  const idxAtivo = planoIndex(planoAtivoId);
  const totalMembros = (() => {
    const m = planoAtivo.membros.match(/\d+/);
    return m ? Number(m[0]) : 0;
  })();
  const usados = Math.min(2, totalMembros);
  const pct = totalMembros ? usados / totalMembros * 100 : 0;
  const [comparativoOpen, setComparativoOpen] = useState(false);
  const [upgradeAlvo, setUpgradeAlvo] = useState(null);
  const [pagamentoOpen, setPagamentoOpen] = useState(false);
  const [cancelarOpen, setCancelarOpen] = useState(false);
  const [contatoOpen, setContatoOpen] = useState(false);
  const [contatoSent, setContatoSent] = useState(false);
  const [metodo, setMetodo] = useState("cartao");
  const [numero, setNumero] = useState("");
  const [validade, setValidade] = useState("");
  const [cvv, setCvv] = useState("");
  const [nomeCartao, setNomeCartao] = useState("");
  const [fixarCartao, setFixarCartao] = useState(false);
  const [metodoUpgrade, setMetodoUpgrade] = useState("cartao");
  const [motivo, setMotivo] = useState(MOTIVOS_CANCEL[0]);
  const [detalhe, setDetalhe] = useState("");
  const [senha, setSenha] = useState("");
  const tentarAlterarPlano = (id) => {
    if (id === planoAtivoId) return;
    const alvo = planoPor(id);
    if (alvo.sobConsulta) {
      setContatoOpen(true);
      return;
    }
    if (alvo.precoNumero <= planoAtivo.precoNumero) {
      toast.error(`Downgrade indisponível pelo app. Entre em contato com o suporte.`);
      return;
    }
    setUpgradeAlvo(id);
    setComparativoOpen(false);
  };
  const confirmarUpgrade = () => {
    if (!upgradeAlvo) return;
    setPlanoAtivo(upgradeAlvo);
    toast.success(`Upgrade para ${planoPor(upgradeAlvo).nome} confirmado`);
    setUpgradeAlvo(null);
  };
  const salvarPagamento = () => {
    if (metodo === "cartao" && (!numero || !validade || !cvv)) return toast.error("Preencha os dados do cartão");
    toast.success(metodo === "pix" ? "Pix gerado" : fixarCartao ? "Cartão fixado" : "Cartão atualizado");
    setPagamentoOpen(false);
    setNumero("");
    setValidade("");
    setCvv("");
    setFixarCartao(false);
  };
  const confirmarCancelar = () => {
    if (!senha) return toast.error("Confirme com sua senha");
    setPlanoAtivo("gratis");
    toast.success("Assinatura cancelada — você voltou ao plano Grátis");
    setCancelarOpen(false);
    setSenha("");
    setDetalhe("");
  };
  const baixarFatura = (mes, valor) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Nota Fiscal — Turno", 14, 18);
    doc.setFontSize(10);
    doc.text(`Competência: ${mes}`, 14, 30);
    doc.text(`Valor: ${valor}`, 14, 36);
    doc.text(`${empresaNome}`, 14, 46);
    doc.text(`Plano ${planoAtivo.nome} · ${planoAtivo.membros}`, 14, 52);
    doc.text(`Status: Paga`, 14, 58);
    doc.save(`fatura-${mes.replace(/\s|·/g, "-")}.pdf`);
    toast.success("NF baixada");
  };
  const isPago = planoAtivo.precoNumero > 0;
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl space-y-6", children: [
    /* @__PURE__ */ jsx(PageHeader, { title: "Plano e faturamento", subtitle: "Seu plano ativo, uso e histórico de cobrança." }),
    /* @__PURE__ */ jsx(Card, { className: "overflow-hidden border-turno-200 bg-white text-turno-900", children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs(Badge, { className: "bg-turno-100 text-turno-800", children: [
            /* @__PURE__ */ jsx(Lock, { className: "mr-1 h-3 w-3" }),
            " Plano ativo"
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "mt-2 text-2xl font-medium", children: planoAtivo.nome }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-turno-900/60", children: planoAtivo.membros })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsx("div", { className: "text-3xl font-medium", children: planoAtivo.preco }),
          /* @__PURE__ */ jsx("div", { className: "mt-1 text-xs text-turno-900/60", children: isPago ? "Próxima cobrança · 15/06/2026" : "Sem cobrança · uso ilimitado" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-sm", children: [
          /* @__PURE__ */ jsx("span", { children: "Membros" }),
          /* @__PURE__ */ jsxs("span", { className: "font-mono", children: [
            usados,
            " / ",
            totalMembros
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-2 h-2 overflow-hidden rounded-full bg-turno-100", children: /* @__PURE__ */ jsx("div", { className: "h-full bg-turno-600", style: {
          width: `${pct}%`
        } }) })
      ] }),
      isPago && /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-center gap-2 border-t border-turno-100 pt-4 text-sm text-turno-900/70", children: [
        /* @__PURE__ */ jsx(CreditCard, { className: "h-4 w-4" }),
        " Visa terminado em •••• 4242"
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Card, { className: "border-turno-200 bg-turno-50/50 p-5", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-turno-900", children: "Fazer upgrade" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-turno-900/70", children: "Compare planos lado a lado." })
      ] }),
      /* @__PURE__ */ jsx(Button, { variant: "outline", className: "border-turno-300 text-turno-900", onClick: () => setComparativoOpen(true), children: "Ver comparativo" })
    ] }) }),
    isPago && /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsx("div", { className: "border-b px-5 py-3 text-sm font-medium", children: "Histórico de faturas" }),
      /* @__PURE__ */ jsx("table", { className: "w-full text-sm", children: /* @__PURE__ */ jsx("tbody", { children: faturas.map((f) => /* @__PURE__ */ jsxs("tr", { className: "border-t", children: [
        /* @__PURE__ */ jsx("td", { className: "px-5 py-3", children: f.mes }),
        /* @__PURE__ */ jsx("td", { className: "px-5 py-3 font-mono", children: f.valor }),
        /* @__PURE__ */ jsx("td", { className: "px-5 py-3", children: /* @__PURE__ */ jsx(Badge, { className: "bg-turno-500", children: f.status }) }),
        /* @__PURE__ */ jsx("td", { className: "px-5 py-3 text-right", children: /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "sm", onClick: () => baixarFatura(f.mes, f.valor), children: [
          /* @__PURE__ */ jsx(Download, { className: "mr-1 h-3.5 w-3.5" }),
          " Baixar PDF"
        ] }) })
      ] }, f.mes)) }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 border-t pt-5", children: [
      /* @__PURE__ */ jsxs(Button, { variant: "outline", onClick: () => setComparativoOpen(true), children: [
        /* @__PURE__ */ jsx(ArrowUpRight, { className: "mr-1 h-4 w-4" }),
        " Fazer upgrade"
      ] }),
      isPago && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => setPagamentoOpen(true), children: "Atualizar pagamento" }),
        /* @__PURE__ */ jsx(Button, { variant: "ghost", className: "text-destructive hover:text-destructive", onClick: () => setCancelarOpen(true), children: "Cancelar assinatura" })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Dialog, { open: comparativoOpen, onOpenChange: setComparativoOpen, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-4xl", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: "Comparar planos" }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "Você só pode trocar para um plano superior. Downgrade só pelo suporte." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-5", children: PLANOS.map((p) => {
        const ativo = p.id === planoAtivoId;
        const idx = planoIndex(p.id);
        const isUpgrade = idx > idxAtivo;
        const isDowngrade = idx < idxAtivo;
        return /* @__PURE__ */ jsxs(Card, { className: `p-4 ${ativo ? "border-turno-500 ring-2 ring-turno-200" : ""}`, children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("div", { className: "text-base font-medium", children: p.nome }),
            ativo && /* @__PURE__ */ jsx(Badge, { className: "bg-turno-500", children: "Atual" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-1 text-2xl font-medium", children: p.sobConsulta ? "Sob consulta" : p.preco }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: p.membros }),
          /* @__PURE__ */ jsx("ul", { className: "mt-3 space-y-1.5 text-sm", children: p.beneficios.map((b) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsx(Check, { className: "mt-0.5 h-4 w-4 shrink-0 text-turno-600" }),
            " ",
            b
          ] }, b)) }),
          /* @__PURE__ */ jsx(Button, { className: "mt-4 w-full bg-turno-600 hover:bg-turno-700", disabled: ativo || isDowngrade, onClick: () => tentarAlterarPlano(p.id), children: ativo ? "Plano atual" : p.sobConsulta ? "Falar com a equipe" : isUpgrade ? "Fazer upgrade" : "Indisponível" })
        ] }, p.id);
      }) })
    ] }) }),
    /* @__PURE__ */ jsx(Dialog, { open: !!upgradeAlvo, onOpenChange: (o) => !o && setUpgradeAlvo(null), children: /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: "Confirmar upgrade" }),
        /* @__PURE__ */ jsx(DialogDescription, { children: upgradeAlvo && /* @__PURE__ */ jsxs(Fragment, { children: [
          "Mudando de ",
          /* @__PURE__ */ jsx("strong", { children: planoAtivo.nome }),
          " para ",
          /* @__PURE__ */ jsx("strong", { children: planoPor(upgradeAlvo).nome }),
          " · ",
          planoPor(upgradeAlvo).preco,
          "."
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mb-2 inline-flex gap-1 rounded-md border p-1", children: ["cartao", "pix"].map((m) => /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setMetodoUpgrade(m), className: `inline-flex items-center gap-1.5 rounded px-3 py-1.5 text-sm ${metodoUpgrade === m ? "bg-turno-600 text-white" : "text-muted-foreground"}`, children: m === "cartao" ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(CreditCard, { className: "h-4 w-4" }),
        " Cartão"
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(QrCode, { className: "h-4 w-4" }),
        " Pix"
      ] }) }, m)) }),
      metodoUpgrade === "cartao" ? /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { children: "Nome no cartão" }),
          /* @__PURE__ */ jsx(Input, { value: nomeCartao, onChange: (e) => setNomeCartao(e.target.value.toUpperCase()) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { children: "Número" }),
          /* @__PURE__ */ jsx(Input, { value: numero, onChange: (e) => setNumero(e.target.value), placeholder: "0000 0000 0000 0000" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { children: "Validade" }),
            /* @__PURE__ */ jsx(Input, { value: validade, onChange: (e) => setValidade(e.target.value), placeholder: "MM/AA" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { children: "CVV" }),
            /* @__PURE__ */ jsx(Input, { value: cvv, onChange: (e) => setCvv(e.target.value), placeholder: "000" })
          ] })
        ] })
      ] }) : /* @__PURE__ */ jsx("div", { className: "rounded-md border bg-muted/30 p-6 text-center text-sm text-muted-foreground", children: "QR Code Pix gerado na confirmação. Vencimento em 30 minutos." }),
      /* @__PURE__ */ jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => setUpgradeAlvo(null), children: "Cancelar" }),
        /* @__PURE__ */ jsx(Button, { className: "bg-turno-600 hover:bg-turno-700", onClick: () => {
          if (metodoUpgrade === "cartao" && (!nomeCartao.trim() || !numero || !validade || !cvv)) return toast.error("Preencha todos os dados do cartão");
          confirmarUpgrade();
          setNumero("");
          setValidade("");
          setCvv("");
          setNomeCartao("");
        }, children: metodoUpgrade === "pix" ? "Já paguei o Pix" : "Pagar e fazer upgrade" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Dialog, { open: pagamentoOpen, onOpenChange: setPagamentoOpen, children: /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: "Atualizar pagamento" }) }),
      /* @__PURE__ */ jsx("div", { className: "mb-2 inline-flex gap-1 rounded-md border p-1", children: ["cartao", "pix"].map((m) => /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setMetodo(m), className: `inline-flex items-center gap-1.5 rounded px-3 py-1.5 text-sm ${metodo === m ? "bg-turno-600 text-white" : "text-muted-foreground"}`, children: m === "cartao" ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(CreditCard, { className: "h-4 w-4" }),
        " Cartão"
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(QrCode, { className: "h-4 w-4" }),
        " Pix"
      ] }) }, m)) }),
      metodo === "cartao" ? /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { children: "Número" }),
          /* @__PURE__ */ jsx(Input, { value: numero, onChange: (e) => setNumero(e.target.value), placeholder: "0000 0000 0000 0000" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { children: "Validade" }),
            /* @__PURE__ */ jsx(Input, { value: validade, onChange: (e) => setValidade(e.target.value), placeholder: "MM/AA" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { children: "CVV" }),
            /* @__PURE__ */ jsx(Input, { value: cvv, onChange: (e) => setCvv(e.target.value), placeholder: "000" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsx("input", { type: "checkbox", checked: fixarCartao, onChange: (e) => setFixarCartao(e.target.checked), className: "h-4 w-4" }),
          /* @__PURE__ */ jsx(Pin, { className: "h-3.5 w-3.5" }),
          " Fixar como cartão padrão"
        ] })
      ] }) : /* @__PURE__ */ jsxs("div", { className: "rounded-md border bg-muted/30 p-6 text-center text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsx(QrCode, { className: "mx-auto mb-2 h-16 w-16" }),
        " QR Code gerado na confirmação."
      ] }),
      /* @__PURE__ */ jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => setPagamentoOpen(false), children: "Cancelar" }),
        /* @__PURE__ */ jsx(Button, { className: "bg-turno-600 hover:bg-turno-700", onClick: salvarPagamento, children: metodo === "pix" ? "Gerar Pix" : "Salvar cartão" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Dialog, { open: cancelarOpen, onOpenChange: setCancelarOpen, children: /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { className: "text-destructive", children: "Cancelar assinatura" }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "Sua assinatura segue ativa até o fim do período pago." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { children: "Por que está cancelando?" }),
          /* @__PURE__ */ jsxs(Select, { value: motivo, onValueChange: setMotivo, children: [
            /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsx(SelectContent, { children: MOTIVOS_CANCEL.map((m) => /* @__PURE__ */ jsx(SelectItem, { value: m, children: m }, m)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { children: "Detalhes (opcional)" }),
          /* @__PURE__ */ jsx(Textarea, { value: detalhe, onChange: (e) => setDetalhe(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { children: "Confirme com sua senha" }),
          /* @__PURE__ */ jsx(Input, { type: "password", value: senha, onChange: (e) => setSenha(e.target.value), placeholder: "••••••••" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => setCancelarOpen(false), children: "Voltar" }),
        /* @__PURE__ */ jsx(Button, { variant: "destructive", onClick: confirmarCancelar, children: "Cancelar assinatura" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Dialog, { open: contatoOpen, onOpenChange: (o) => {
      setContatoOpen(o);
      if (!o) setContatoSent(false);
    }, children: /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: "Falar com a equipe" }) }),
      /* @__PURE__ */ jsxs("form", { onSubmit: (e) => {
        e.preventDefault();
        setContatoSent(true);
        toast.success("Mensagem enviada!");
      }, className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1.5", children: [
          /* @__PURE__ */ jsx(Label, { children: "Nome" }),
          /* @__PURE__ */ jsx(Input, { name: "nome", required: true, maxLength: 100 })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1.5", children: [
          /* @__PURE__ */ jsx(Label, { children: "Email" }),
          /* @__PURE__ */ jsx(Input, { name: "email", type: "email", required: true })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1.5", children: [
          /* @__PURE__ */ jsx(Label, { children: "Contato" }),
          /* @__PURE__ */ jsx(Input, { name: "contato", required: true, maxLength: 30 })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1.5", children: [
          /* @__PURE__ */ jsx(Label, { children: "Mensagem" }),
          /* @__PURE__ */ jsx(Textarea, { name: "mensagem", required: true, rows: 4, maxLength: 2e3 })
        ] }),
        /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full bg-turno-600 hover:bg-turno-700", children: "Enviar mensagem" }),
        contatoSent && /* @__PURE__ */ jsx("p", { className: "text-center text-sm text-turno-700", children: "Recebemos! Em breve entraremos em contato." })
      ] })
    ] }) })
  ] });
}
export {
  Plano as component
};
