import { u as useQuery } from "./useQuery-CT2fcLBS-CQXjZXMx-CZ3zJieM-CTXinx3o-BtfJ4J1S.js";
import { s as supabase } from "./client-BDUtUdlc-BgkiGMRQ-BFQ4tIWJ-OPLCuHla-DDf4-v7v-Dm7zLGxE.js";
function useSession() {
  return useQuery({
    queryKey: ["sessao"],
    queryFn: async () => {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) return null;
      const { data, error } = await supabase.from("minha_sessao").select("*").single();
      if (error) throw error;
      return data;
    },
    staleTime: 1e3 * 60 * 5
  });
}
function useMinhasEquipes() {
  return useQuery({
    queryKey: ["minhas_equipes"],
    queryFn: async () => {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) return [];
      const { data, error } = await supabase.from("membros_equipe").select("equipe_id, equipes(nome)").eq("user_id", auth.user.id);
      if (error) throw error;
      return (data ?? []).map((item) => ({
        equipe_id: item.equipe_id,
        equipe_nome: item.equipes?.nome ?? "Equipe"
      }));
    }
  });
}
export {
  useSession as a,
  useMinhasEquipes as u
};
