import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/hooks/use-session";
import { SEGMENTOS, type Subcategoria } from "@/lib/segmentos";

export type ConfigurarInput = {
  topoId: string;
  subId: string;
  empresaNome: string;
  subNomeCustom?: string;
  cargos: Subcategoria["cargosSugeridos"];
  tiposOcorrencia: Subcategoria["tiposOcorrencia"];
  turnos: Subcategoria["turnosSugeridos"];
};

export function useConfigurarSegmento() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: ConfigurarInput) => {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) throw new Error("Não autenticado");
      const user_id = auth.user.id;

      const topo = SEGMENTOS.find((t) => t.id === input.topoId);
      if (!topo) throw new Error("Segmento inválido");
      const sub = topo.subs.find((s) => s.id === input.subId);
      if (!sub) throw new Error("Subcategoria inválida");

      // Cria organização + filial + vincula como admin
      const { data: resultado, error: orgErr } = await (supabase as any).rpc(
  "criar_organizacao_filial",
  {
    p_empresa_nome: input.empresaNome.trim(),
    p_segmento: input.subId,
    p_segmento_topo: input.topoId,
    p_segmento_custom:
      input.subId === "outras" && input.subNomeCustom?.trim()
        ? input.subNomeCustom.trim()
        : null,
  }
);
if (orgErr) throw orgErr;
const filial_id = (resultado as { filial_id: string }).filial_id;

      // Cria equipe padrão dentro da filial
      const { data: equipe, error: eqErr } = await supabase
        .from("equipes")
        .insert({ filial_id, nome: "Equipe Principal" })
        .select("id")
        .single();
      if (eqErr) throw eqErr;
      const equipe_id = equipe.id;

      // Vincula admin como membro da equipe principal
      await supabase.from("membros_equipe").insert({
        user_id,
        equipe_id,
        dispositivo: "verificado",
      });

      // Insere cargos na filial
      if (input.cargos.length > 0) {
        const { error } = await supabase.from("cargos").insert(
          input.cargos.map((c) => ({
            user_id,
            filial_id,
            nome: c.nome,
            cor: c.cor,
          }))
        );
        if (error) throw error;
      }

      // Insere tipos de ocorrência na filial
      if (input.tiposOcorrencia.length > 0) {
        const { error } = await supabase.from("tipos_ocorrencia").insert(
          input.tiposOcorrencia.map((t) => ({
            user_id,
            filial_id,
            nome: t.nome,
            gravidade_default: t.gravidade_default,
          }))
        );
        if (error) throw error;
      }

      // Insere turnos na equipe principal
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
            ativo: true,
          }))
        );
        if (error) throw error;
      }

      return { filial_id, equipe_id };
    },
    onSuccess: () => qc.invalidateQueries(),
  });
}

export function useTiposOcorrencia(filial_id?: string) {
  return useQuery({
    queryKey: ["tipos_ocorrencia", filial_id],
    enabled: !!filial_id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tipos_ocorrencia")
        .select("id, nome, gravidade_default")
        .eq("filial_id", filial_id!)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useAtualizarUsername() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (username: string) => {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) throw new Error("Não autenticado");
      const clean = username.trim().toLowerCase().replace(/^@/, "");
      if (!/^[a-z0-9-]{3,30}$/.test(clean)) {
        throw new Error("Use 3 a 30 caracteres: letras minúsculas, números e hífens.");
      }
      const { error } = await supabase
        .from("profiles")
        .update({ username: clean })
        .eq("user_id", auth.user.id);
      if (error) {
        if (error.code === "23505") throw new Error("Esse @username já está em uso.");
        throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["sessao"] });
      qc.invalidateQueries({ queryKey: ["minhas_filiais"] });
    },
  });
}