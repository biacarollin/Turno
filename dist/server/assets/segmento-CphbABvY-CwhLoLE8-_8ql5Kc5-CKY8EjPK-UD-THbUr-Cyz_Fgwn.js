import { u as useQuery } from "./useQuery-CT2fcLBS-CQXjZXMx-CZ3zJieM-CTXinx3o-BtfJ4J1S.js";
import { o as useQueryClient } from "./router-BfE_NWn3-LgtRmdPD-C07lmE3T-BBvol4Fb-CaQxh4DF-DI3ZXuwt.js";
import { u as useMutation } from "./useMutation-DIK3tE9K-BLJeySS_-BDSpGrcn-BrYQeD-t-c_n52Lgo.js";
import { s as supabase } from "./client-BDUtUdlc-BgkiGMRQ-BFQ4tIWJ-OPLCuHla-DDf4-v7v-Dm7zLGxE.js";
import { S as SEGMENTOS } from "./segmentos-BeD3Suz1-BeD3Suz1-BeD3Suz1-BeD3Suz1-BeD3Suz1-BeD3Suz1.js";
function useConfigurarSegmento() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) throw new Error("Não autenticado");
      const user_id = auth.user.id;
      const topo = SEGMENTOS.find((t) => t.id === input.topoId);
      if (!topo) throw new Error("Segmento inválido");
      const sub = topo.subs.find((s) => s.id === input.subId);
      if (!sub) throw new Error("Subcategoria inválida");
      const { data: resultado, error: orgErr } = await supabase.rpc(
        "criar_organizacao_filial",
        {
          p_empresa_nome: input.empresaNome.trim(),
          p_segmento: input.subId,
          p_segmento_topo: input.topoId,
          p_segmento_custom: input.subId === "outras" && input.subNomeCustom?.trim() ? input.subNomeCustom.trim() : null
        }
      );
      if (orgErr) throw orgErr;
      const filial_id = resultado.filial_id;
      const { data: equipe, error: eqErr } = await supabase.from("equipes").insert({ filial_id, nome: "Equipe Principal" }).select("id").single();
      if (eqErr) throw eqErr;
      const equipe_id = equipe.id;
      await supabase.from("membros_equipe").insert({
        user_id,
        equipe_id,
        dispositivo: "verificado"
      });
      if (input.cargos.length > 0) {
        const { error } = await supabase.from("cargos").insert(
          input.cargos.map((c) => ({
            user_id,
            filial_id,
            nome: c.nome,
            cor: c.cor
          }))
        );
        if (error) throw error;
      }
      if (input.tiposOcorrencia.length > 0) {
        const { error } = await supabase.from("tipos_ocorrencia").insert(
          input.tiposOcorrencia.map((t) => ({
            user_id,
            filial_id,
            nome: t.nome,
            gravidade_default: t.gravidade_default
          }))
        );
        if (error) throw error;
      }
      if (input.turnos.length > 0) {
        const { error } = await supabase.from("turnos").insert(
          input.turnos.map((t) => ({
            user_id,
            equipe_id,
            nome: t.nome,
            inicio: t.inicio,
            fim: t.fim,
            cargos: [],
            antecedencia: 15,
            pos_limite: 30,
            ativo: true
          }))
        );
        if (error) throw error;
      }
      return { filial_id, equipe_id };
    },
    onSuccess: () => qc.invalidateQueries()
  });
}
function useTiposOcorrencia(filial_id) {
  return useQuery({
    queryKey: ["tipos_ocorrencia", filial_id],
    enabled: !!filial_id,
    queryFn: async () => {
      const { data, error } = await supabase.from("tipos_ocorrencia").select("id, nome, gravidade_default").eq("filial_id", filial_id).order("created_at", { ascending: true });
      if (error) throw error;
      return data ?? [];
    }
  });
}
export {
  useTiposOcorrencia as a,
  useConfigurarSegmento as u
};
