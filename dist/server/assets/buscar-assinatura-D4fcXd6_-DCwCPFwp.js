import { c as createServerRpc } from "./createServerRpc-BGRY54fM-D9DBTl_V.js";
import { l as createServerFn } from "./server-DznBcuRC-Ca9cSwVK.js";
import { r as requireSupabaseAuth } from "./auth-middleware-BIy1DRMP-MAXw1sk7.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-B80FucMh.js";
const buscarAssinatura_createServerFn_handler = createServerRpc({
  id: "d15872a4196c7ae553c251f4edadd2df28a3050343507e270cc5d90fdfb07f81",
  name: "buscarAssinatura",
  filename: "src/lib/buscar-assinatura.ts"
}, (opts) => buscarAssinatura.__executeServer(opts));
const buscarAssinatura = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(buscarAssinatura_createServerFn_handler, async ({
  context
}) => {
  const {
    supabase
  } = context;
  const {
    data,
    error
  } = await supabase.from("assinaturas").select("plano, periodo, status, trial_end, current_period_end, stripe_customer_id").single();
  if (error || !data) return null;
  return data;
});
export {
  buscarAssinatura_createServerFn_handler
};
