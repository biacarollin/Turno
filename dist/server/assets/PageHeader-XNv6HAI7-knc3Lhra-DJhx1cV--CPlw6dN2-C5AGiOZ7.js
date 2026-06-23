import { P as jsxRuntimeExports } from "./server-AHFj_Bgy-gsoihpy4-CbyuSDu4-Ble6ghI2-BbTWyedm.js";
function PageHeader({
  title,
  subtitle,
  actions
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-4 border-b pb-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-medium tracking-tight text-foreground", children: title }),
      subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: subtitle })
    ] }),
    actions && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: actions })
  ] });
}
export {
  PageHeader as P
};
