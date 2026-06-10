import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/hooks/use-session";

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

export function useNotas(filial_id?: string) {
  return useQuery({
    queryKey: ["notas", filial_id],
    enabled: !!filial_id,
    queryFn: async (): Promise<Nota[]> => {
      const { data, error } = await supabase
        .from("notas")
        .select("id, user_id, filial_id, titulo, conteudo, destinatario_user_id, created_at")
        .eq("filial_id", filial_id!)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Nota[];
    },
  });
}

export function useCriarNota() {
  const qc = useQueryClient();
  const { data: sessao } = useSession();
  return useMutation({
    mutationFn: async (input: {
      titulo: string;
      conteudo?: string;
      destinatario_username?: string;
    }) => {
      if (!sessao?.user_id || !sessao?.filial_ativa_id)
        throw new Error("Sessão inválida");

      let destinatario_user_id: string | null = null;
      if (input.destinatario_username?.trim()) {
        const uname = input.destinatario_username.trim().toLowerCase().replace(/^@/, "");
        const { data, error } = await supabase
          .from("profiles_public")
          .select("user_id")
          .eq("username", uname)
          .single();
        if (error) throw new Error(`@${uname} não encontrado`);
        destinatario_user_id = data?.user_id ?? null;
      }

      const { error } = await supabase.from("notas").insert({
        user_id: sessao.user_id,
        filial_id: sessao.filial_ativa_id,
        titulo: input.titulo,
        conteudo: input.conteudo || null,
        destinatario_user_id,
      });
      if (error) throw error;
    },
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["notas", sessao?.filial_ativa_id] }),
  });
}

export function useExcluirNota() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, filial_id }: { id: string; filial_id: string }) => {
      const { error } = await supabase.from("notas").delete().eq("id", id);
      if (error) throw error;
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

export async function searchUsernames(prefix: string): Promise<UsernameResult[]> {
  const clean = prefix.trim().toLowerCase().replace(/^@/, "");
  if (clean.length < 1) return [];
  const { data, error } = await supabase
    .from("profiles_public")
    .select("user_id, username, nome_completo")
    .ilike("username", `${clean}%`)
    .limit(8);
  if (error) throw error;
  return (data ?? []) as UsernameResult[];
}