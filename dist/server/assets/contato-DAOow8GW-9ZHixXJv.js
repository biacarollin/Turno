import { Y as reactExports, P as jsxRuntimeExports } from "./server-DznBcuRC-Ca9cSwVK.js";
import { L as Link } from "./router-Bpeyu-Rv-V2oQ01bo.js";
import { N as Navbar, F as Footer } from "./Footer-DvTGOCKK-pI-W39Cj.js";
import { C as Card } from "./card-RGlIzTYo-CtW8vlBf.js";
import { I as Input } from "./input-C0QjszdI-Br7DySBD.js";
import { T as Textarea } from "./textarea-DSyJ1nlY-C69d171M.js";
import { B as Button } from "./button-DA2gxxPy-BWxuMPe6.js";
import { L as Label } from "./label-JU3yqRBo-LAbxxb-d.js";
import { t as toast } from "./index-BaU94aXf.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./client-BDUtUdlc-DgbAZHFC.js";
import "./index-B80FucMh.js";
import "./stripe.esm.worker-BZ5uBE48.js";
import "./Logo-Cu4L5Ikj-BEMZPfON.js";
import "./x-DZTB6rYI.js";
import "./createLucideIcon-BTIl1RQt.js";
import "./utils-H80jjgLf-8RO4xBwZ.js";
import "./index-CfmbNbeB.js";
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
