import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { demoNovoId, demoStore } from "@/lib/demo-store";

export type Nota = {
  id: string;
  user_id: string;
  filial_id: string;
  titulo: string;
  conteudo: string | null;
  destinatario_user_id: string | null;
  destinatario_username?: string | null;
  destinatario_nome?: string | null;
  created_at: string;
};

// MODO DEMO (gravação de portfólio): lê/escreve em src/lib/demo-store.ts
// em vez de bater no Supabase (chave inválida no .env — 401 em tudo).
// Reverter pra chamar o Supabase de novo quando a chave for corrigida
// (procure "MODO DEMO" neste arquivo).

export function useNotas(filial_id?: string) {
  return useQuery({
    queryKey: ["notas", filial_id],
    enabled: !!filial_id,
    queryFn: async (): Promise<Nota[]> =>
      demoStore.notas
        .filter((n) => n.filial_id === filial_id)
        .sort((a, b) => b.created_at.localeCompare(a.created_at)),
  });
}

export function useCriarNota() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      titulo: string;
      conteudo?: string;
      destinatario_username?: string;
    }) => {
      const filial_id = demoStore.notas[0]?.filial_id ?? "";
      demoStore.notas.unshift({
        id: demoNovoId("nota"),
        user_id: "",
        filial_id,
        titulo: input.titulo,
        conteudo: input.conteudo || null,
        destinatario_user_id: null,
        created_at: new Date().toISOString(),
      });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notas"] }),
  });
}

export function useExcluirNota() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, filial_id }: { id: string; filial_id: string }) => {
      demoStore.notas = demoStore.notas.filter((n) => n.id !== id);
      return filial_id;
    },
    onSuccess: (filial_id) =>
      qc.invalidateQueries({ queryKey: ["notas", filial_id] }),
  });
}

export type UsernameResult = {
  user_id: string;
  username: string;
  nome_completo: string | null;
};

export async function searchUsernames(_prefix: string): Promise<UsernameResult[]> {
  // MODO DEMO: não há outros usuários reais pra buscar.
  return [];
}
