import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

/**
 * Apaga toda a organização do usuário logado:
 * - remove linhas das tabelas dependentes (RLS-scoped)
 * - apaga o profile
 * - apaga o usuário em auth.users (impede login futuro com a mesma conta)
 */
export const excluirOrganizacao = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { userId } = context;

    const tabelas = [
      "passagens_turno",
      "ocorrencias",
      "tipos_ocorrencia",
      "folgas",
      "notas",
      "turnos",
      "membros_equipe",
      "cargos",
      "profiles",
    ] as const;

    for (const t of tabelas) {
      const { error } = await supabaseAdmin.from(t).delete().eq("user_id", userId);
      if (error) throw new Error(`Falha ao apagar ${t}: ${error.message}`);
    }

    const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(userId);
    if (authError) throw new Error(authError.message);

    return { ok: true };
  });