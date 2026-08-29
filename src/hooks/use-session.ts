import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Papel = "admin" | "gestor" | "colaborador";

export type Sessao = {
  user_id: string;
  nome_completo: string | null;
  email: string | null;
  username: string | null;
  filial_ativa_id: string | null;
  filial_nome: string | null;
  filial_codigo: string | null;
  segmento: string | null;
  segmento_topo: string | null;
  meu_papel: Papel | null;
  org_nome: string | null;
  org_id: string | null;
};

export type MinhaFilial = {
  id: string;
  nome: string;
  codigo: string;
  segmento_topo: string | null;
  papel: Papel;
  org_nome: string;
};

export type MinhaEquipe = {
  equipe_id: string;
  equipe_nome: string;
};

export function useSession() {
  return useQuery({
    queryKey: ["sessao"],
    queryFn: async (): Promise<Sessao | null> => {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) return null;

      const { data, error } = await supabase
        .from("minha_sessao")
        .select("*")
        .single();

      if (error) throw error;
      return data as Sessao;
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useMinhasFiliais() {
  return useQuery({
    queryKey: ["minhas_filiais"],
    queryFn: async (): Promise<MinhaFilial[]> => {
      const { data, error } = await supabase
        .from("minhas_filiais")
        .select("*");
      if (error) throw error;
      return (data ?? []) as MinhaFilial[];
    },
  });
}

export function useMinhasEquipes() {
  return useQuery({
    queryKey: ["minhas_equipes"],
    queryFn: async (): Promise<MinhaEquipe[]> => {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) return [];

      const { data, error } = await supabase
        .from("membros_equipe")
        .select("equipe_id, equipes(nome)")
        .eq("user_id", auth.user.id);

      if (error) throw error;

      return (data ?? []).map((item) => ({
        equipe_id: item.equipe_id,
        equipe_nome: (item.equipes as { nome: string } | null)?.nome ?? "Equipe",
      }));
    },
  });
}

export async function trocarFilial(filial_id: string): Promise<void> {
  const { error } = await supabase.rpc("trocar_filial", {
    p_filial_id: filial_id,
  });
  if (error) throw error;
}

export function useIsAdmin() {
  const { data: sessao } = useSession();
  return sessao?.meu_papel === "admin";
}

export function useIsGestorOuAdmin() {
  const { data: sessao } = useSession();
  return (
    sessao?.meu_papel === "admin" || sessao?.meu_papel === "gestor"
  );
}