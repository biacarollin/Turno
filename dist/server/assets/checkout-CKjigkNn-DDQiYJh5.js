import { c as createSsrRpc } from "./createSsrRpc-CyxH55Qm-DpHvvOSc.js";
import { l as createServerFn } from "./server-DznBcuRC-Ca9cSwVK.js";
import { r as requireSupabaseAuth } from "./auth-middleware-BIy1DRMP-MAXw1sk7.js";
const createCheckoutSession = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("93a804ab06e45560dbb0c5e1f040dd61608b70d51751ea73b7cd35e81d73536d"));
export {
  createCheckoutSession as c
};
