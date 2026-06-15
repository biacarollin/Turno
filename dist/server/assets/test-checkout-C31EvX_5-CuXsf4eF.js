import { Y as reactExports, P as jsxRuntimeExports, l as createServerFn } from "./server-AHFj_Bgy-gsoihpy4.js";
import { c as createSsrRpc } from "./createSsrRpc-D16C2ze1-CJrHoas8.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const createCheckoutSession = createServerFn({
  method: "POST"
}).handler(createSsrRpc("93a804ab06e45560dbb0c5e1f040dd61608b70d51751ea73b7cd35e81d73536d"));
const PRICE_KEYS = ["basico_mensal", "basico_anual", "equipe_mensal", "equipe_anual", "profissional_mensal", "profissional_anual"];
function TestCheckout() {
  const [loading, setLoading] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  async function handleClick(priceKey) {
    setLoading(priceKey);
    setError(null);
    try {
      const result = await createCheckoutSession({
        data: {
          priceKey
        }
      });
      if (result?.url) {
        window.location.href = result.url;
      } else {
        setError("Sem URL retornada");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(null);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
    padding: 40,
    fontFamily: "sans-serif"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Teste de Checkout Stripe" }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: {
      color: "red"
    }, children: [
      "Erro: ",
      error
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
      display: "flex",
      flexDirection: "column",
      gap: 12,
      maxWidth: 300
    }, children: PRICE_KEYS.map((key) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleClick(key), disabled: loading === key, style: {
      padding: 12,
      cursor: "pointer"
    }, children: loading === key ? "Aguarde..." : key }, key)) })
  ] });
}
export {
  TestCheckout as component
};
