import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { X, Menu } from "lucide-react";
import { L as Logo } from "./Logo-D1BtzRXO.js";
import { Link } from "@tanstack/react-router";
const navLinks = [
  { label: "Funcionalidades", href: "#funcionalidades" },
  { label: "Segmentos", href: "#segmentos" },
  { label: "Preços", href: "#precos" }
];
function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return /* @__PURE__ */ jsxs("header", { className: "absolute top-0 left-0 right-0 z-50 w-full", children: [
    /* @__PURE__ */ jsxs("div", { className: "mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6", children: [
      /* @__PURE__ */ jsx("a", { href: "/", "aria-label": "Turno · página inicial", children: /* @__PURE__ */ jsx(Logo, {}) }),
      /* @__PURE__ */ jsx("nav", { className: "hidden md:flex items-center gap-8", children: navLinks.map((link) => /* @__PURE__ */ jsx(
        "a",
        {
          href: link.href,
          className: "text-sm font-medium text-white/70 transition-colors hover:text-white",
          children: link.label
        },
        link.href
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "hidden md:flex items-center gap-3", children: [
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "/login",
            className: "text-sm font-medium text-white/70 transition-colors hover:text-white",
            children: "Entrar"
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "/login",
            className: "inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-white/90",
            children: "Começar grátis"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md text-white hover:bg-white/10",
          onClick: () => setMobileOpen(!mobileOpen),
          "aria-label": mobileOpen ? "Fechar menu" : "Abrir menu",
          children: mobileOpen ? /* @__PURE__ */ jsx(X, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(Menu, { className: "h-5 w-5" })
        }
      )
    ] }),
    mobileOpen && /* @__PURE__ */ jsx("div", { className: "md:hidden border-t border-white/10 bg-primary px-4 py-4", children: /* @__PURE__ */ jsxs("nav", { className: "flex flex-col gap-3", children: [
      navLinks.map((link) => /* @__PURE__ */ jsx(
        "a",
        {
          href: link.href,
          className: "text-sm font-medium text-white/80 transition-colors hover:text-white",
          onClick: () => setMobileOpen(false),
          children: link.label
        },
        link.href
      )),
      /* @__PURE__ */ jsx("hr", { className: "border-white/10 my-1" }),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/login",
          className: "inline-flex items-center justify-center rounded-full bg-white px-4 py-2.5 text-sm font-medium text-primary",
          children: "Entrar"
        }
      )
    ] }) })
  ] });
}
function Footer() {
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  return /* @__PURE__ */ jsx("footer", { className: "w-full bg-turno-700 border-t border-white/10", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 md:flex-row md:px-6", children: [
    /* @__PURE__ */ jsx("span", { className: "text-base font-semibold text-turno-400", children: "Turno" }),
    /* @__PURE__ */ jsxs("nav", { className: "flex items-center gap-7 text-sm text-white/70", children: [
      /* @__PURE__ */ jsx(Link, { to: "/privacidade", className: "hover:text-white transition-colors", children: "Privacidade" }),
      /* @__PURE__ */ jsx(Link, { to: "/termos", className: "hover:text-white transition-colors", children: "Termos" }),
      /* @__PURE__ */ jsx(Link, { to: "/suporte", className: "hover:text-white transition-colors", children: "Suporte" })
    ] }),
    /* @__PURE__ */ jsxs("span", { className: "text-xs text-white/50", children: [
      "© ",
      year,
      " Turno"
    ] })
  ] }) });
}
export {
  Footer as F,
  Navbar as N
};
