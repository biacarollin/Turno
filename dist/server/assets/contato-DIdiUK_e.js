import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { N as Navbar, F as Footer } from "./Footer-_pBn2itB.js";
import { C as Card } from "./card-RGlIzTYo.js";
import { I as Input } from "./input-C0QjszdI.js";
import { T as Textarea } from "./textarea-DSyJ1nlY.js";
import { B as Button } from "./button-DA2gxxPy.js";
import { L as Label } from "./label-JU3yqRBo.js";
import { toast } from "sonner";
import "lucide-react";
import "./Logo-D1BtzRXO.js";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-label";
function Contato() {
  const [sent, setSent] = useState(false);
  function onSubmit(e) {
    e.preventDefault();
    setSent(true);
    toast.success("Mensagem enviada! Vamos responder em breve.");
    e.target.reset();
  }
  return /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen flex-col bg-primary", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("main", { className: "flex-1 px-4 pt-32 pb-20 md:px-6", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-2xl", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-semibold tracking-tight text-white", children: "Falar com a equipe" }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-white/70", children: "Conte sobre seu cenário. Vamos responder por email." }),
      /* @__PURE__ */ jsx(Card, { className: "mt-8 p-6", children: /* @__PURE__ */ jsxs("form", { onSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1.5", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "nome", children: "Nome" }),
          /* @__PURE__ */ jsx(Input, { id: "nome", name: "nome", required: true, maxLength: 100 })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1.5", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email" }),
          /* @__PURE__ */ jsx(Input, { id: "email", name: "email", type: "email", required: true, maxLength: 255 })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1.5", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "contato", children: "Contato (telefone/WhatsApp)" }),
          /* @__PURE__ */ jsx(Input, { id: "contato", name: "contato", required: true, maxLength: 30 })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1.5", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "assunto", children: "Assunto" }),
          /* @__PURE__ */ jsx(Input, { id: "assunto", name: "assunto", required: true, maxLength: 120 })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1.5", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "mensagem", children: "Mensagem" }),
          /* @__PURE__ */ jsx(Textarea, { id: "mensagem", name: "mensagem", required: true, rows: 5, maxLength: 2e3 })
        ] }),
        /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full bg-turno-600 hover:bg-turno-700", children: "Enviar mensagem" }),
        sent && /* @__PURE__ */ jsx("p", { className: "text-center text-sm text-turno-700", children: "Recebemos sua mensagem. Em breve entraremos em contato." })
      ] }) }),
      /* @__PURE__ */ jsx("p", { className: "mt-6 text-center text-xs text-white/60", children: /* @__PURE__ */ jsx(Link, { to: "/", className: "underline hover:text-white", children: "Voltar à página inicial" }) })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  Contato as component
};
