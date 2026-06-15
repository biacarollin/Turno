import { Y as reactExports, P as jsxRuntimeExports } from "./server-AHFj_Bgy-gsoihpy4-CbyuSDu4.js";
import { L as Link } from "./router-BfE_NWn3-LgtRmdPD-C07lmE3T.js";
import { N as Navbar, F as Footer } from "./Footer-DvTGOCKK-BfyD5I_M-C1KK13Bt.js";
import { C as Card } from "./card-RGlIzTYo-B34J4GZ4-DDQrq4Oi.js";
import { I as Input } from "./input-C0QjszdI-D0Nowbjj-BlGc600N.js";
import { T as Textarea } from "./textarea-DSyJ1nlY-BJEJR38S-DiJ4m1Uc.js";
import { B as Button } from "./button-DA2gxxPy-CUtl2pTC-ErPINpYe.js";
import { L as Label } from "./label-JU3yqRBo-Dlrqtcjr-PWN2ra3Y.js";
import { t as toast } from "./index-v-vtUMd9-C3Q0HLzL.js";
import "./createLucideIcon-DtALbmVw-CBqAgreN.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./client-BDUtUdlc-BgkiGMRQ-BFQ4tIWJ.js";
import "./index-BlRNeFf7-93iW_Z4T.js";
import "./stripe.esm.worker-BZ5uBE48-BZ5uBE48.js";
import "./Logo-Cu4L5Ikj-BM_o3fNJ-BLDDCtNi.js";
import "./x-g8BMWhwB-DMM2ctZM.js";
import "./utils-H80jjgLf-8RO4xBwZ-8RO4xBwZ.js";
import "./index-QcqZe4R0-BtpN0_mD.js";
function Contato() {
  const [sent, setSent] = reactExports.useState(false);
  function onSubmit(e) {
    e.preventDefault();
    setSent(true);
    toast.success("Mensagem enviada! Vamos responder em breve.");
    e.target.reset();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen flex-col bg-primary", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 px-4 pt-32 pb-20 md:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-semibold tracking-tight text-white", children: "Falar com a equipe" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-white/70", children: "Conte sobre seu cenário. Vamos responder por email." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "mt-8 p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "nome", children: "Nome" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "nome", name: "nome", required: true, maxLength: 100 })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "email", name: "email", type: "email", required: true, maxLength: 255 })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "contato", children: "Contato (telefone/WhatsApp)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "contato", name: "contato", required: true, maxLength: 30 })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "assunto", children: "Assunto" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "assunto", name: "assunto", required: true, maxLength: 120 })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "mensagem", children: "Mensagem" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { id: "mensagem", name: "mensagem", required: true, rows: 5, maxLength: 2e3 })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full bg-turno-600 hover:bg-turno-700", children: "Enviar mensagem" }),
        sent && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-sm text-turno-700", children: "Recebemos sua mensagem. Em breve entraremos em contato." })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-center text-xs text-white/60", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "underline hover:text-white", children: "Voltar à página inicial" }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  Contato as component
};
