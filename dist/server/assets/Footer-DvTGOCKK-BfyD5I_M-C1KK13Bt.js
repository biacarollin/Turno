import { Y as reactExports, P as jsxRuntimeExports } from "./server-AHFj_Bgy-gsoihpy4-CbyuSDu4.js";
import { L as Logo } from "./Logo-Cu4L5Ikj-BM_o3fNJ-BLDDCtNi.js";
import { L as Link } from "./router-BfE_NWn3-LgtRmdPD-C07lmE3T.js";
import { X } from "./x-g8BMWhwB-DMM2ctZM.js";
import { c as createLucideIcon } from "./createLucideIcon-DtALbmVw-CBqAgreN.js";
const __iconNode = [
  ["path", { d: "M4 5h16", key: "1tepv9" }],
  ["path", { d: "M4 12h16", key: "1lakjw" }],
  ["path", { d: "M4 19h16", key: "1djgab" }]
];
const Menu = createLucideIcon("menu", __iconNode);
const navLinks = [
  { label: "Funcionalidades", href: "#funcionalidades" },
  { label: "Segmentos", href: "#segmentos" },
  { label: "Preços", href: "#precos" }
];
function Navbar() {
  const [mobileOpen, setMobileOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "absolute top-0 left-0 right-0 z-50 w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", "aria-label": "Turno · página inicial", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden md:flex items-center gap-8", children: navLinks.map((link) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: link.href,
          className: "text-sm font-medium text-white/70 transition-colors hover:text-white",
          children: link.label
        },
        link.href
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "/login",
            className: "text-sm font-medium text-white/70 transition-colors hover:text-white",
            children: "Entrar"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "/login",
            className: "inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-white/90",
            children: "Começar grátis"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md text-white hover:bg-white/10",
          onClick: () => setMobileOpen(!mobileOpen),
          "aria-label": mobileOpen ? "Fechar menu" : "Abrir menu",
          children: mobileOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" })
        }
      )
    ] }),
    mobileOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:hidden border-t border-white/10 bg-primary px-4 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex flex-col gap-3", children: [
      navLinks.map((link) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: link.href,
          className: "text-sm font-medium text-white/80 transition-colors hover:text-white",
          onClick: () => setMobileOpen(false),
          children: link.label
        },
        link.href
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsx("hr", { className: "border-white/10 my-1" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "w-full bg-turno-700 border-t border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 md:flex-row md:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-semibold text-turno-400", children: "Turno" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex items-center gap-7 text-sm text-white/70", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/privacidade", className: "hover:text-white transition-colors", children: "Privacidade" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/termos", className: "hover:text-white transition-colors", children: "Termos" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/suporte", className: "hover:text-white transition-colors", children: "Suporte" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-white/50", children: [
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
