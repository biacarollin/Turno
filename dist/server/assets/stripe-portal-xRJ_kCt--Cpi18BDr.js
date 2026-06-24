import { c as createServerRpc } from "./createServerRpc-BGRY54fM-D9DBTl_V.js";
import { l as createServerFn } from "./server-DznBcuRC-Ca9cSwVK.js";
import { r as requireSupabaseAuth } from "./auth-middleware-BIy1DRMP-MAXw1sk7.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-B80FucMh.js";
const criarPortalStripe_createServerFn_handler = createServerRpc({
  id: "31c91f8a38c7ea71224838a0e541df70a111114c86307552a8c887a0e72e363a",
  name: "criarPortalStripe",
  filename: "src/lib/stripe-portal.ts"
}, (opts) => criarPortalStripe.__executeServer(opts));
const criarPortalStripe = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(criarPortalStripe_createServerFn_handler, async ({
  context
}) => {
  const {
    userId
  } = context;
  const {
    default: Stripe
  } = await import("./stripe.esm.worker-BZ5uBE48.js");
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY não definida");
  const stripe = new Stripe(key);
  const {
    createClient
  } = await import("./index-B80FucMh.js").then((n) => n.i);
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
  const {
    data
  } = await supabase.from("assinaturas").select("stripe_customer_id").eq("user_id", userId).single();
  if (!data?.stripe_customer_id) {
    throw new Error("Nenhuma assinatura encontrada para este usuário");
  }
  const session = await stripe.billingPortal.sessions.create({
    customer: data.stripe_customer_id,
    return_url: "https://turnoai.com.br/app/plano"
  });
  return {
    url: session.url
  };
});
export {
  criarPortalStripe_createServerFn_handler
};
