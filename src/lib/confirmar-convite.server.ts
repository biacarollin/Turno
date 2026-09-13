import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

// Vincula o usuário autenticado a uma equipe/filial via convite. Roda com
// privilégio de servidor de propósito: um colaborador recém-criado ainda não
// passa nas policies de RLS que dependem de já ser membro (equipes, e a própria
// membros_equipe pra "reivindicar" uma linha de convite com user_id nulo) —
// é o paradoxo do ovo e da galinha. A identidade vem do token (claims.email),
// não de um parâmetro do cliente, então ninguém consegue reivindicar o convite
// de outra pessoa só sabendo o e-mail dela.
export const confirmarConvite = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async (ctx: { data?: { equipe_id?: string }; context: { userId: string; claims: Record<string, unknown> } }) => {
    const equipe_id = ctx?.data?.equipe_id;
    const { userId, claims } = ctx.context;
    const email = typeof claims?.email === "string" ? claims.email : null;

    if (!equipe_id || typeof equipe_id !== "string") {
      throw new Error("Convite inválido.");
    }

    const { data: equipe, error: equipeErr } = await supabaseAdmin
      .from("equipes")
      .select("filial_id")
      .eq("id", equipe_id)
      .single();
    if (equipeErr || !equipe) throw new Error("Convite não encontrado ou expirado.");

    // Reivindica a linha de convite pendente (mesmo e-mail, ainda sem user_id).
    // Se houver mais de uma (convite gerado duas vezes), pega a mais recente.
    let vinculado = false;
    if (email) {
      const { data: pendentes } = await supabaseAdmin
        .from("membros_equipe")
        .select("id")
        .eq("equipe_id", equipe_id)
        .is("user_id", null)
        .ilike("convite_email", email)
        .order("created_at", { ascending: false })
        .limit(1);

      const pendente = pendentes?.[0];
      if (pendente) {
        const { error } = await supabaseAdmin
          .from("membros_equipe")
          .update({ user_id: userId, dispositivo: "verificado" })
          .eq("id", pendente.id);
        if (error) throw error;
        vinculado = true;
      }
    }

    // Sem convite casando por e-mail (ex.: confirmou com outra conta de propósito)
    // — garante que pelo menos existe algum vínculo dessa pessoa com a equipe.
    if (!vinculado) {
      const { data: existente } = await supabaseAdmin
        .from("membros_equipe")
        .select("id")
        .eq("equipe_id", equipe_id)
        .eq("user_id", userId)
        .maybeSingle();

      if (!existente) {
        const { error } = await supabaseAdmin.from("membros_equipe").insert({
          user_id: userId,
          equipe_id,
          dispositivo: "verificado",
        });
        if (error) throw error;
      }
    }

    // Nunca rebaixa quem já tem um papel nessa filial (ex.: a própria gestora
    // abrindo o convite por engano) — só cria vínculo novo como colaborador.
    const { data: papelExistente } = await supabaseAdmin
      .from("membros_filial")
      .select("papel")
      .eq("user_id", userId)
      .eq("filial_id", equipe.filial_id)
      .maybeSingle();

    if (!papelExistente) {
      const { error } = await supabaseAdmin.from("membros_filial").insert({
        user_id: userId,
        filial_id: equipe.filial_id,
        papel: "colaborador",
      });
      if (error) throw error;
    }

    const { error: profileErr } = await supabaseAdmin
      .from("profiles")
      .update({ filial_ativa_id: equipe.filial_id })
      .eq("user_id", userId);
    if (profileErr) throw profileErr;

    return { filialId: equipe.filial_id as string };
  });
