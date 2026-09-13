import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

// Rota pública (sem login) — quem recebeu o convite ainda não tem sessão,
// então precisa de uma leitura com privilégio de servidor (RLS bloquearia
// um visitante anônimo lendo a tabela `equipes` direto do navegador).
export const buscarConvitePreview = createServerFn({ method: "GET" })
  .handler(async (ctx: { data?: { equipe_id?: string } }) => {
    const equipe_id = ctx?.data?.equipe_id;
    if (!equipe_id || typeof equipe_id !== "string") {
      throw new Error("Convite inválido.");
    }

    const { data, error } = await supabaseAdmin
      .from("equipes")
      .select("id, nome, filial_id, filiais(nome)")
      .eq("id", equipe_id)
      .single();

    if (error || !data) {
      throw new Error("Convite não encontrado ou expirado.");
    }

    return {
      equipeId: data.id,
      equipeNome: data.nome,
      filialId: data.filial_id,
      filialNome: (data.filiais as { nome: string } | null)?.nome ?? null,
    };
  });
