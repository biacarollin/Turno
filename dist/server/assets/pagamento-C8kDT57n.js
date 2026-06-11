import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { C as Card } from "./card-RGlIzTYo.js";
import { B as Button } from "./button-DA2gxxPy.js";
import { I as Input } from "./input-C0QjszdI.js";
import { L as Label } from "./label-JU3yqRBo.js";
import { L as Logo } from "./Logo-D1BtzRXO.js";
import { ShieldCheck, Check } from "lucide-react";
import { toast } from "sonner";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-label";
function Pagamento() {
  const navigate = useNavigate();
  const [plano, setPlano] = useState("trial");
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-muted/40 px-4 py-10", children: /* @__PURE__ */ jsxs(Card, { className: "w-full max-w-lg p-7", children: [
    /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(Logo, {}) }),
    /* @__PURE__ */ jsx("h1", { className: "mt-6 text-center text-xl font-medium", children: "Quase lá" }),
    /* @__PURE__ */ jsx("p", { className: "mt-1 text-center text-sm text-muted-foreground", children: "Escolha como começar. Você pode trocar de plano depois." }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 grid gap-3 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsx(PlanoCard, { ativo: plano === "trial", onClick: () => setPlano("trial"), titulo: "7 dias grátis", descricao: "Todos os recursos. Cobrança automática após o período de teste.", badge: "Recomendado" }),
      /* @__PURE__ */ jsx(PlanoCard, { ativo: plano === "gratuito", onClick: () => setPlano("gratuito"), titulo: "Plano gratuito", descricao: "Limitado a 3 membros e funcionalidades básicas. Sem cartão." })
    ] }),
    plano === "trial" ? /* @__PURE__ */ jsxs("form", { className: "mt-6 space-y-4", onSubmit: (e) => {
      e.preventDefault();
      toast.success("Cadastro concluído!");
      navigate({
        to: "/app"
      });
    }, children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "num", children: "Número do cartão" }),
        /* @__PURE__ */ jsx(Input, { id: "num", inputMode: "numeric", placeholder: "0000 0000 0000 0000", required: true })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "val", children: "Validade" }),
          /* @__PURE__ */ jsx(Input, { id: "val", placeholder: "MM/AA", required: true })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "cvv", children: "CVV" }),
          /* @__PURE__ */ jsx(Input, { id: "cvv", inputMode: "numeric", placeholder: "123", required: true })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "titular", children: "Nome no cartão" }),
        /* @__PURE__ */ jsx(Input, { id: "titular", required: true })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-1.5 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsx(ShieldCheck, { className: "h-3.5 w-3.5 text-turno-600" }),
        "Não será cobrado durante o período de teste."
      ] }),
      /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full bg-turno-600 hover:bg-turno-700", children: "Começar teste grátis" })
    ] }) : /* @__PURE__ */ jsxs("div", { className: "mt-6 space-y-4", children: [
      /* @__PURE__ */ jsx("ul", { className: "space-y-2 text-sm", children: ["Até 3 membros", "Passagens de turno", "App mobile"].map((f) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Check, { className: "h-4 w-4 text-turno-600" }),
        " ",
        f
      ] }, f)) }),
      /* @__PURE__ */ jsx(Button, { className: "w-full bg-turno-600 hover:bg-turno-700", onClick: () => {
        toast.success("Conta criada no plano gratuito!");
        navigate({
          to: "/app"
        });
      }, children: "Continuar no plano gratuito" })
    ] })
  ] }) });
}
function PlanoCard({
  ativo,
  onClick,
  titulo,
  descricao,
  badge
}) {
  return /* @__PURE__ */ jsxs("button", { type: "button", onClick, className: `relative rounded-lg border p-4 text-left transition-colors ${ativo ? "border-turno-600 bg-turno-50" : "border-border hover:bg-muted/40"}`, children: [
    badge && /* @__PURE__ */ jsx("span", { className: "absolute -top-2 right-3 rounded-full bg-turno-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white", children: badge }),
    /* @__PURE__ */ jsx("div", { className: "text-sm font-medium", children: titulo }),
    /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: descricao })
  ] });
}
export {
  Pagamento as component
};
