import { jsxs, jsx } from "react/jsx-runtime";
function PageHeader({
  title,
  subtitle,
  actions
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-start justify-between gap-4 border-b pb-6", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-medium tracking-tight text-foreground", children: title }),
      subtitle && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: subtitle })
    ] }),
    actions && /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: actions })
  ] });
}
export {
  PageHeader as P
};
