import { c as createServerRpc } from "./createServerRpc-BfEnjDPI-D3uz17c1.js";
import { l as createServerFn } from "./server-AHFj_Bgy-gsoihpy4.js";
import { r as requireSupabaseAuth } from "./auth-middleware-D6oXehNp-CQbOxQaB.js";
import { c as createClient } from "./index-BlRNeFf7.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function createSupabaseAdminClient() {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    const missing = [
      ...!SUPABASE_URL ? ["SUPABASE_URL"] : [],
      ...!SUPABASE_SERVICE_ROLE_KEY ? ["SUPABASE_SERVICE_ROLE_KEY"] : []
    ];
    const message = `Missing Supabase environment variable(s): ${missing.join(", ")}. Connect Supabase in Lovable Cloud.`;
    console.error(`[Supabase] ${message}`);
    throw new Error(message);
  }
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      storage: void 0,
      persistSession: false,
      autoRefreshToken: false
    }
  });
}
let _supabaseAdmin;
const supabaseAdmin = new Proxy({}, {
  get(_, prop, receiver) {
    if (!_supabaseAdmin) _supabaseAdmin = createSupabaseAdminClient();
    return Reflect.get(_supabaseAdmin, prop, receiver);
  }
});
const excluirOrganizacao_createServerFn_handler = createServerRpc({
  id: "25257d290f80a1a900f15a88549a5603b8717ded10882ffd3b0c64a41e187be5",
  name: "excluirOrganizacao",
  filename: "src/lib/organizacao.functions.ts"
}, (opts) => excluirOrganizacao.__executeServer(opts));
const excluirOrganizacao = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(excluirOrganizacao_createServerFn_handler, async ({
  context
}) => {
  const {
    userId
  } = context;
  const tabelas = ["passagens_turno", "ocorrencias", "tipos_ocorrencia", "folgas", "notas", "turnos", "membros", "cargos", "profiles"];
  for (const t of tabelas) {
    const {
      error
    } = await supabaseAdmin.from(t).delete().eq("user_id", userId);
    if (error) throw new Error(`Falha ao apagar ${t}: ${error.message}`);
  }
  const {
    error: authError
  } = await supabaseAdmin.auth.admin.deleteUser(userId);
  if (authError) throw new Error(authError.message);
  return {
    ok: true
  };
});
export {
  excluirOrganizacao_createServerFn_handler
};
