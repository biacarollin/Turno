import { jsxs, jsx } from "react/jsx-runtime";
function Logo({ className = "" }) {
  return /* @__PURE__ */ jsxs("span", { className: `inline-flex items-center gap-2 ${className}`, children: [
    /* @__PURE__ */ jsxs("span", { className: "grid grid-cols-2 gap-[2px]", "aria-hidden": "true", children: [
      /* @__PURE__ */ jsx("span", { className: "h-2 w-2 rounded-[2px] bg-turno-400" }),
      /* @__PURE__ */ jsx("span", { className: "h-2 w-2 rounded-[2px] border border-turno-400" }),
      /* @__PURE__ */ jsx("span", { className: "h-2 w-2 rounded-[2px] border border-turno-400" }),
      /* @__PURE__ */ jsx("span", { className: "h-2 w-2 rounded-[2px] bg-turno-400" })
    ] }),
    /* @__PURE__ */ jsx("span", { className: "text-lg font-semibold tracking-tight text-turno-400", children: "Turno" })
  ] });
}
export {
  Logo as L
};
