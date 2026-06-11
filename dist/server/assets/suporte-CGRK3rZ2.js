import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { N as Navbar, F as Footer } from "./Footer-_pBn2itB.js";
import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown, Mail, MessageSquare, LifeBuoy } from "lucide-react";
import { c as cn } from "./utils-H80jjgLf.js";
import { C as Card } from "./card-RGlIzTYo.js";
import "./Logo-D1BtzRXO.js";
import "clsx";
import "tailwind-merge";
const Accordion = AccordionPrimitive.Root;
const AccordionItem = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Item, { ref, className: cn("border-b", className), ...props }));
AccordionItem.displayName = "AccordionItem";
const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Header, { className: "flex", children: /* @__PURE__ */ jsxs(
  AccordionPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })
    ]
  }
) }));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;
const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(
  AccordionPrimitive.Content,
  {
    ref,
    className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...props,
    children: /* @__PURE__ */ jsx("div", { className: cn("pb-4 pt-0", className), children })
  }
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;
const faqs = [{
  q: "Como começo o teste gratuito?",
  a: "Clique em 'Começar 7 dias grátis' na página inicial e crie sua conta. Você não será cobrado durante o período de teste."
}, {
  q: "Posso cancelar a qualquer momento?",
  a: "Sim. Em Configurações > Plano você pode cancelar a assinatura quando quiser, sem multa."
}, {
  q: "Como convido a minha equipe?",
  a: "Dentro do painel, em Membros, clique em 'Convidar membro' para gerar um link e enviar para o profissional."
}, {
  q: "Os dados ficam seguros?",
  a: "Sim. Usamos criptografia em trânsito e em repouso, e seguimos a LGPD."
}];
function Suporte() {
  return /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen flex-col bg-primary", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("main", { className: "flex-1 px-4 pt-32 pb-20 md:px-6", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-semibold tracking-tight text-white", children: "Suporte" }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-white/70", children: "Encontre respostas rápidas ou fale com a gente." }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 grid gap-3 sm:grid-cols-3", children: [
        /* @__PURE__ */ jsxs(Card, { className: "p-4", children: [
          /* @__PURE__ */ jsx(Mail, { className: "h-5 w-5 text-turno-600" }),
          /* @__PURE__ */ jsx("div", { className: "mt-2 text-sm font-medium", children: "Email" }),
          /* @__PURE__ */ jsx("a", { href: "mailto:suporte@turno.app", className: "text-xs text-muted-foreground underline", children: "suporte@turno.app" })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "p-4", children: [
          /* @__PURE__ */ jsx(MessageSquare, { className: "h-5 w-5 text-turno-600" }),
          /* @__PURE__ */ jsx("div", { className: "mt-2 text-sm font-medium", children: "Falar com a equipe" }),
          /* @__PURE__ */ jsx(Link, { to: "/contato", className: "text-xs text-muted-foreground underline", children: "Abrir formulário" })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "p-4", children: [
          /* @__PURE__ */ jsx(LifeBuoy, { className: "h-5 w-5 text-turno-600" }),
          /* @__PURE__ */ jsx("div", { className: "mt-2 text-sm font-medium", children: "Horário" }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: "Seg–Sex · 9h–18h" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "mt-6 p-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium", children: "Perguntas frequentes" }),
        /* @__PURE__ */ jsx(Accordion, { type: "single", collapsible: true, className: "mt-3", children: faqs.map((f, i) => /* @__PURE__ */ jsxs(AccordionItem, { value: `q-${i}`, children: [
          /* @__PURE__ */ jsx(AccordionTrigger, { children: f.q }),
          /* @__PURE__ */ jsx(AccordionContent, { children: f.a })
        ] }, i)) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  Suporte as component
};
