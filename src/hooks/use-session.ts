import { useQuery } from "@tanstack/react-query";
import { DEMO_EQUIPE_ID, DEMO_FILIAL_ID, DEMO_ORG_ID, DEMO_USER_ID } from "@/lib/demo-store";

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

// MODO DEMO (gravação de portfólio): chave do Supabase inválida (401) faz
// getUser()/minha_sessao falhar sempre. Enquanto isso não é corrigido no
// .env, useSession/useMinhasFiliais/useMinhasEquipes/trocarFilial retornam
// dados fixos de src/lib/demo-store.ts em vez de bater no Supabase — assim
// o app inteiro navega e funciona offline. Reverter pra chamar o Supabase
// de novo quando a chave for corrigida (procure "MODO DEMO" neste arquivo).
const SESSAO_DEMO: Sessao = {
  user_id: DEMO_USER_ID,
  nome_completo: "Ana Beatriz Souza",
  email: "ana.souza@exemplo.com",
  username: "anasouza",
  filial_ativa_id: DEMO_FILIAL_ID,
  filial_nome: "Hospital São Lucas",
  filial_codigo: "HSL",
  segmento: "enfermagem",
  segmento_topo: "saude",
  meu_papel: "gestor",
  org_nome: "Hospital São Lucas",
  org_id: DEMO_ORG_ID,
};

export function useSession() {
  return useQuery({
    queryKey: ["sessao"],
    queryFn: async (): Promise<Sessao | null> => SESSAO_DEMO,
    staleTime: 1000 * 60 * 5,
  });
}

export function useMinhasFiliais() {
  return useQuery({
    queryKey: ["minhas_filiais"],
    queryFn: async (): Promise<MinhaFilial[]> => [
      {
        id: DEMO_FILIAL_ID,
        nome: SESSAO_DEMO.filial_nome!,
        codigo: SESSAO_DEMO.filial_codigo!,
        segmento_topo: SESSAO_DEMO.segmento_topo,
        papel: "gestor",
        org_nome: SESSAO_DEMO.org_nome!,
      },
    ],
  });
}

export function useMinhasEquipes() {
  return useQuery({
    queryKey: ["minhas_equipes"],
    queryFn: async (): Promise<MinhaEquipe[]> => [
      { equipe_id: DEMO_EQUIPE_ID, equipe_nome: "Equipe Enfermagem" },
    ],
  });
}

export async function trocarFilial(_filial_id: string): Promise<void> {
  // MODO DEMO: só existe uma filial fake, não há o que trocar.
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