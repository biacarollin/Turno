import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { s as supabase } from "./client-BDUtUdlc.js";
import { a as useSession } from "./use-session-S7Dx9RFc.js";
function useOcorrencias(equipe_id) {
  return useQuery({
    queryKey: ["ocorrencias", equipe_id],
    enabled: !!equipe_id,
    queryFn: async () => {
      const { data, error } = await supabase.from("ocorrencias").select("id, equipe_id, criado_por, titulo, descricao, tipo, gravidade, status, local, created_at").eq("equipe_id", equipe_id).order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    }
  });
}
function useCriarOcorrencia() {
  const qc = useQueryClient();
  const { data: sessao } = useSession();
  return useMutation({
    mutationFn: async (input) => {
      if (!sessao?.user_id) throw new Error("Não autenticado");
      const { error } = await supabase.from("ocorrencias").insert({
        equipe_id: input.equipe_id,
        criado_por: sessao.user_id,
        user_id: sessao.user_id,
        titulo: input.titulo,
        descricao: input.descricao || null,
        tipo: input.tipo || null,
        gravidade: input.gravidade,
        local: input.local || null
      });
      if (error) throw error;
    },
    onSuccess: (_, vars) => qc.invalidateQueries({ queryKey: ["ocorrencias", vars.equipe_id] })
  });
}
function useAtualizarStatusOcorrencia() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      status,
      equipe_id
    }) => {
      const { error } = await supabase.from("ocorrencias").update({ status }).eq("id", id);
      if (error) throw error;
      return equipe_id;
    },
    onSuccess: (equipe_id) => qc.invalidateQueries({ queryKey: ["ocorrencias", equipe_id] })
  });
}
function useExcluirOcorrencia() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      equipe_id
    }) => {
      const { error } = await supabase.from("ocorrencias").delete().eq("id", id);
      if (error) throw error;
      return equipe_id;
    },
    onSuccess: (equipe_id) => qc.invalidateQueries({ queryKey: ["ocorrencias", equipe_id] })
  });
}
export {
  useCriarOcorrencia as a,
  useExcluirOcorrencia as b,
  useOcorrencias as c,
  useAtualizarStatusOcorrencia as u
};
