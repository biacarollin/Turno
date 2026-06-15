import { c as createLucideIcon } from "./createLucideIcon-DtALbmVw-CBqAgreN.js";
import { u as useQuery } from "./useQuery-CT2fcLBS-CQXjZXMx.js";
import { o as useQueryClient } from "./router-BfE_NWn3-LgtRmdPD-C07lmE3T.js";
import { u as useMutation } from "./useMutation-DIK3tE9K-BLJeySS_.js";
import { s as supabase } from "./client-BDUtUdlc-BgkiGMRQ-BFQ4tIWJ.js";
import { a as useSession } from "./use-session-S7Dx9RFc-D3XJIkxI-DJOreupP.js";
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode);
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
  CircleCheck as C,
  useCriarOcorrencia as a,
  useExcluirOcorrencia as b,
  useOcorrencias as c,
  useAtualizarStatusOcorrencia as u
};
