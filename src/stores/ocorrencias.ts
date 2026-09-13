import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { demoNovoId, demoStore } from "@/lib/demo-store";

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

// MODO DEMO (gravação de portfólio): lê/escreve em src/lib/demo-store.ts
// em vez de bater no Supabase (chave inválida no .env — 401 em tudo).
// Reverter pra chamar o Supabase de novo quando a chave for corrigida
// (procure "MODO DEMO" neste arquivo).

export function useOcorrencias(equipe_id?: string) {
  return useQuery({
    queryKey: ["ocorrencias", equipe_id],
    enabled: !!equipe_id,
    queryFn: async (): Promise<Ocorrencia[]> => {
      return demoStore.ocorrencias
        .filter((o) => o.equipe_id === equipe_id)
        .sort((a, b) => b.created_at.localeCompare(a.created_at));
    },
  });
}

export function useCriarOcorrencia() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      equipe_id: string;
      titulo: string;
      descricao?: string;
      tipo?: string;
      gravidade: "baixa" | "media" | "alta";
      local?: string;
    }) => {
      demoStore.ocorrencias.unshift({
        id: demoNovoId("ocorrencia"),
        equipe_id: input.equipe_id,
        criado_por: null,
        titulo: input.titulo,
        descricao: input.descricao || null,
        tipo: input.tipo || null,
        gravidade: input.gravidade,
        status: "aberta",
        local: input.local || null,
        created_at: new Date().toISOString(),
      });
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
      const alvo = demoStore.ocorrencias.find((o) => o.id === id);
      if (alvo) alvo.status = status;
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
      demoStore.ocorrencias = demoStore.ocorrencias.filter((o) => o.id !== id);
      return equipe_id;
    },
    onSuccess: (equipe_id) =>
      qc.invalidateQueries({ queryKey: ["ocorrencias", equipe_id] }),
  });
}
