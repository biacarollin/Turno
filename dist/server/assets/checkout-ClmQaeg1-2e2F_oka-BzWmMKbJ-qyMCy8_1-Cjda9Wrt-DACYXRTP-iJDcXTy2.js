import { c as createServerRpc } from "./createServerRpc-BfEnjDPI-D3uz17c1-DMbXFv0W-CeaYZZ8j-DoQbUjzh-CtB6hR-R-C87GskAM.js";
import { l as createServerFn } from "./server-AHFj_Bgy-gsoihpy4-CbyuSDu4-Ble6ghI2-BbTWyedm-DMY4rmEE-B4C4KxOU.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const createCheckoutSession_createServerFn_handler = createServerRpc({
  id: "93a804ab06e45560dbb0c5e1f040dd61608b70d51751ea73b7cd35e81d73536d",
  name: "createCheckoutSession",
  filename: "src/lib/checkout.ts"
}, (opts) => createCheckoutSession.__executeServer(opts));
const createCheckoutSession = createServerFn({
  method: "POST"
}).handler(createCheckoutSession_createServerFn_handler, async (ctx) => {
  const priceKey = ctx?.data?.priceKey;
  if (!priceKey || typeof priceKey !== "string") {
    throw new Error("priceKey inválido");
  }
  const {
    default: Stripe
  } = await import("./stripe.esm.worker-BZ5uBE48-BZ5uBE48-BZ5uBE48-BZ5uBE48-BZ5uBE48-BZ5uBE48.js");
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY não definida");
  const stripe = new Stripe(key);
  const prices = await stripe.prices.list({
    lookup_keys: [priceKey]
  });
  if (!prices.data.length) {
    throw new Error("Plano não encontrado");
  }
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{
      price: prices.data[0].id,
      quantity: 1
    }],
    subscription_data: {
      trial_period_days: 7
    },
    success_url: `https://turnoai.com.br/app?checkout=success`,
    cancel_url: `https://turnoai.com.br/precos?checkout=cancelled`,
    locale: "pt-BR"
  });
  return {
    url: session.url
  };
});
export {
  createCheckoutSession_createServerFn_handler
};
