import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { demoNovoId, demoStore } from "@/lib/demo-store";

export type Folga = {
  id: string;
  filial_id: string;
  membro_id: string | null;
  membro_troca_id: string | null;
  tipo: "folga" | "troca";
  data_inicio: string;
  data_fim: string;
  motivo: string | null;
  status: "aprovada" | "pendente" | "recusada";
  created_at: string;
};

// MODO DEMO (gravação de portfólio): lê/escreve em src/lib/demo-store.ts
// em vez de bater no Supabase (chave inválida no .env — 401 em tudo).
// Reverter pra chamar o Supabase de novo quando a chave for corrigida
// (procure "MODO DEMO" neste arquivo).

export function useFolgas(filial_id?: string) {
  return useQuery({
    queryKey: ["folgas", filial_id],
    enabled: !!filial_id,
    queryFn: async (): Promise<Folga[]> =>
      demoStore.folgas
        .filter((f) => f.filial_id === filial_id)
        .sort((a, b) => b.data_inicio.localeCompare(a.data_inicio)),
  });
}

export function useCriarFolga() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      membro_id: string | null;
      membro_troca_id?: string | null;
      tipo?: "folga" | "troca";
      data_inicio: string;
      data_fim: string;
      motivo?: string;
      status?: "aprovada" | "pendente" | "recusada";
    }) => {
      const filial_id = demoStore.folgas[0]?.filial_id ?? "";
      demoStore.folgas.unshift({
        id: demoNovoId("folga"),
        filial_id,
        membro_id: input.membro_id,
        membro_troca_id: input.membro_troca_id ?? null,
        tipo: input.tipo ?? "folga",
        data_inicio: input.data_inicio,
        data_fim: input.data_fim,
        motivo: input.motivo || null,
        status: input.status ?? "pendente",
        created_at: new Date().toISOString(),
      });
      return filial_id;
    },
    onSuccess: (filial_id) =>
      qc.invalidateQueries({ queryKey: ["folgas", filial_id] }),
  });
}

export function useAtualizarStatusFolga() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      status,
      filial_id,
    }: {
      id: string;
      status: "aprovada" | "pendente" | "recusada";
      filial_id: string;
    }) => {
      const alvo = demoStore.folgas.find((f) => f.id === id);
      if (alvo) alvo.status = status;
      return filial_id;
    },
    onSuccess: (filial_id) =>
      qc.invalidateQueries({ queryKey: ["folgas", filial_id] }),
  });
}

export function useExcluirFolga() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, filial_id }: { id: string; filial_id: string }) => {
      demoStore.folgas = demoStore.folgas.filter((f) => f.id !== id);
      return filial_id;
    },
    onSuccess: (filial_id) =>
      qc.invalidateQueries({ queryKey: ["folgas", filial_id] }),
  });
}
