import { u as useQuery } from "./useQuery-CT2fcLBS.js";
import { o as useQueryClient } from "./router-BfE_NWn3-LgtRmdPD.js";
import { u as useMutation } from "./useMutation-DIK3tE9K.js";
import { s as supabase } from "./client-BDUtUdlc-BgkiGMRQ.js";
import { a as useSession } from "./use-session-S7Dx9RFc-D3XJIkxI.js";
function useFolgas(filial_id) {
  return useQuery({
    queryKey: ["folgas", filial_id],
    enabled: !!filial_id,
    queryFn: async () => {
      const { data, error } = await supabase.from("folgas").select("id, filial_id, membro_id, data_inicio, data_fim, motivo, status, created_at").eq("filial_id", filial_id).order("data_inicio", { ascending: false });
      if (error) throw error;
      return data ?? [];
    }
  });
}
function useCriarFolga() {
  const qc = useQueryClient();
  const { data: sessao } = useSession();
  return useMutation({
    mutationFn: async (input) => {
      if (!sessao?.filial_ativa_id || !sessao?.user_id)
        throw new Error("Sessão inválida");
      const { error } = await supabase.from("folgas").insert({
        user_id: sessao.user_id,
        filial_id: sessao.filial_ativa_id,
        membro_id: input.membro_id,
        data_inicio: input.data_inicio,
        data_fim: input.data_fim,
        motivo: input.motivo || null,
        status: "pendente"
      });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["folgas", sessao?.filial_ativa_id] })
  });
}
function useAtualizarStatusFolga() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      status,
      filial_id
    }) => {
      const { error } = await supabase.from("folgas").update({ status }).eq("id", id);
      if (error) throw error;
      return filial_id;
    },
    onSuccess: (filial_id) => qc.invalidateQueries({ queryKey: ["folgas", filial_id] })
  });
}
function useExcluirFolga() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, filial_id }) => {
      const { error } = await supabase.from("folgas").delete().eq("id", id);
      if (error) throw error;
      return filial_id;
    },
    onSuccess: (filial_id) => qc.invalidateQueries({ queryKey: ["folgas", filial_id] })
  });
}
export {
  useCriarFolga as a,
  useExcluirFolga as b,
  useFolgas as c,
  useAtualizarStatusFolga as u
};
