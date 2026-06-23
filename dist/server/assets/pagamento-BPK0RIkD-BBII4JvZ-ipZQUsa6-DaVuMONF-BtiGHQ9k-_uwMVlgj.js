import { Y as reactExports, P as jsxRuntimeExports } from "./server-AHFj_Bgy-gsoihpy4-CbyuSDu4-Ble6ghI2-BbTWyedm-DMY4rmEE.js";
import { u as useNavigate } from "./router-BfE_NWn3-LgtRmdPD-C07lmE3T-BBvol4Fb-CaQxh4DF-DI3ZXuwt.js";
import { C as Card } from "./card-RGlIzTYo-B34J4GZ4-DDQrq4Oi-Dj_b9Mln-RljLwUmW-B7Ze6dPL.js";
import { B as Button } from "./button-DA2gxxPy-CUtl2pTC-ErPINpYe-DKbncp_B-Tad0GHuE-BV1-pB3e.js";
import { I as Input } from "./input-C0QjszdI-D0Nowbjj-BlGc600N-CG6Wsqmc-CIMgTJSL-CX_fTxgv.js";
import { L as Label } from "./label-JU3yqRBo-Dlrqtcjr-PWN2ra3Y-CzL43b9s-Bb4cDb8s-CUa9VnmA.js";
import { L as Logo } from "./Logo-Cu4L5Ikj-BM_o3fNJ-BLDDCtNi-ox367wn0-BPutXCDV-h8EAksnZ.js";
import { t as toast } from "./index-v-vtUMd9-C3Q0HLzL-DoO4nzZW-Cw9fb2Zp-eT4KzRbZ.js";
import { S as ShieldCheck } from "./shield-check-CYxVQaLx-B98wjwdS-zm5Rxoi--Jg6h1v2M-BMmKI_ru.js";
import { C as Check } from "./check-kVh9eIoB-e_5-Q7gI-Bm1ScBst-CcbUTWMs-DbqhBIgJ.js";
import "./createLucideIcon-DtALbmVw-CBqAgreN-Bp4R2JQA-DhYh3WUG-C9iE_qXX.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./client-BDUtUdlc-BgkiGMRQ-BFQ4tIWJ-OPLCuHla-DDf4-v7v-Dm7zLGxE.js";
import "./index-BlRNeFf7-93iW_Z4T-93iW_Z4T-93iW_Z4T-93iW_Z4T.js";
import "./stripe.esm.worker-BZ5uBE48-BZ5uBE48-BZ5uBE48-BZ5uBE48-BZ5uBE48.js";
import "./utils-H80jjgLf-8RO4xBwZ-8RO4xBwZ-8RO4xBwZ-8RO4xBwZ-8RO4xBwZ.js";
import "./index-QcqZe4R0-BtpN0_mD-B-IZFptm-RV47Io5--BsvVBnmG.js";
function Pagamento() {
  const navigate = useNavigate();
  const [plano, setPlano] = reactExports.useState("trial");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-muted/40 px-4 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "w-full max-w-lg p-7", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-6 text-center text-xl font-medium", children: "Quase lá" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-center text-sm text-muted-foreground", children: "Escolha como começar. Você pode trocar de plano depois." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-3 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PlanoCard, { ativo: plano === "trial", onClick: () => setPlano("trial"), titulo: "7 dias grátis", descricao: "Todos os recursos. Cobrança automática após o período de teste.", badge: "Recomendado" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PlanoCard, { ativo: plano === "gratuito", onClick: () => setPlano("gratuito"), titulo: "Plano gratuito", descricao: "Limitado a 3 membros e funcionalidades básicas. Sem cartão." })
    ] }),
    plano === "trial" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "mt-6 space-y-4", onSubmit: (e) => {
      e.preventDefault();
      toast.success("Cadastro concluído!");
      navigate({
        to: "/app"
      });
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "num", children: "Número do cartão" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "num", inputMode: "numeric", placeholder: "0000 0000 0000 0000", required: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "val", children: "Validade" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "val", placeholder: "MM/AA", required: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cvv", children: "CVV" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "cvv", inputMode: "numeric", placeholder: "123", required: true })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "titular", children: "Nome no cartão" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "titular", required: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3.5 w-3.5 text-turno-600" }),
        "Não será cobrado durante o período de teste."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full bg-turno-600 hover:bg-turno-700", children: "Começar teste grátis" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 text-sm", children: ["Até 3 membros", "Passagens de turno", "App mobile"].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 text-turno-600" }),
        " ",
        f
      ] }, f)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full bg-turno-600 hover:bg-turno-700", onClick: () => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick, className: `relative rounded-lg border p-4 text-left transition-colors ${ativo ? "border-turno-600 bg-turno-50" : "border-border hover:bg-muted/40"}`, children: [
    badge && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-2 right-3 rounded-full bg-turno-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white", children: badge }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: titulo }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: descricao })
  ] });
}
export {
  Pagamento as component
};
