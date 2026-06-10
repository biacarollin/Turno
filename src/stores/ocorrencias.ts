import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/hooks/use-session";

export type Ocorrencia = {
  id: string;
  equipe_id: string;
  criado_por: string | null;
  titulo: string;
  descricao: string | null;
  tipo: string | null;
  gravidade: "baixa" | "media" | "alta";
  status: "aberta" | "concluida";
  local: string | null;
  created_at: string;
};

export function useOcorrencias(equipe_id?: string) {
  return useQuery({
    queryKey: ["ocorrencias", equipe_id],
    enabled: !!equipe_id,
    queryFn: async (): Promise<Ocorrencia[]> => {
      const { data, error } = await supabase
        .from("ocorrencias")
        .select("id, equipe_id, criado_por, titulo, descricao, tipo, gravidade, status, local, created_at")
        .eq("equipe_id", equipe_id!)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Ocorrencia[];
    },
  });
}

export function useCriarOcorrencia() {
  const qc = useQueryClient();
  const { data: sessao } = useSession();
  return useMutation({
    mutationFn: async (input: {
      equipe_id: string;
      titulo: string;
      descricao?: string;
      tipo?: string;
      gravidade: "baixa" | "media" | "alta";
      local?: string;
    }) => {
      if (!sessao?.user_id) throw new Error("Não autenticado");
      const { error } = await supabase.from("ocorrencias").insert({
        equipe_id: input.equipe_id,
        criado_por: sessao.user_id,
        user_id: sessao.user_id,
        titulo: input.titulo,
        descricao: input.descricao || null,
        tipo: input.tipo || null,
        gravidade: input.gravidade,
        local: input.local || null,
      });
      if (error) throw error;
    },
    onSuccess: (_, vars) =>
      qc.invalidateQueries({ queryKey: ["ocorrencias", vars.equipe_id] }),
  });
}

export function useAtualizarStatusOcorrencia() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      status,
      equipe_id,
    }: {
      id: string;
      status: "aberta" | "concluida";
      equipe_id: string;
    }) => {
      const { error } = await supabase
        .from("ocorrencias")
        .update({ status })
        .eq("id", id);
      if (error) throw error;
      return equipe_id;
    },
    onSuccess: (equipe_id) =>
      qc.invalidateQueries({ queryKey: ["ocorrencias", equipe_id] }),
  });
}

export function useExcluirOcorrencia() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      equipe_id,
    }: {
      id: string;
      equipe_id: string;
    }) => {
      const { error } = await supabase
        .from("ocorrencias")
        .delete()
        .eq("id", id);
      if (error) throw error;
      return equipe_id;
    },
    onSuccess: (equipe_id) =>
      qc.invalidateQueries({ queryKey: ["ocorrencias", equipe_id] }),
  });
}