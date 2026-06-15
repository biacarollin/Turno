import { u as useQuery } from "./useQuery-CT2fcLBS.js";
import { o as useQueryClient } from "./router-BfE_NWn3-LgtRmdPD.js";
import { u as useMutation } from "./useMutation-DIK3tE9K.js";
import { s as supabase } from "./client-BDUtUdlc-BgkiGMRQ.js";
import { a as useSession } from "./use-session-S7Dx9RFc-D3XJIkxI.js";
const TURNOS_OPCOES = ["Manhã", "Tarde", "Noite", "—"];
function useCargos(filial_id) {
  return useQuery({
    queryKey: ["cargos", filial_id],
    enabled: !!filial_id,
    queryFn: async () => {
      const { data, error } = await supabase.from("cargos").select("id, nome, cor").eq("filial_id", filial_id).order("created_at", { ascending: true });
      if (error) throw error;
      return data ?? [];
    }
  });
}
function useAdicionarCargo() {
  const qc = useQueryClient();
  const { data: sessao } = useSession();
  return useMutation({
    mutationFn: async ({ nome, cor }) => {
      if (!sessao?.filial_ativa_id || !sessao?.user_id)
        throw new Error("Sessão inválida");
      const { error } = await supabase.from("cargos").insert({
        nome,
        cor,
        user_id: sessao.user_id,
        filial_id: sessao.filial_ativa_id
      });
      if (error) throw error;
    },
    onSuccess: (_, __, ___) => qc.invalidateQueries({ queryKey: ["cargos"] })
  });
}
function useRenomearCargo() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, nome, cor }) => {
      const { error } = await supabase.from("cargos").update({ nome, cor }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cargos"] })
  });
}
const mapMembro = (r) => ({
  id: r.id,
  user_id: r.user_id,
  nome: r.profiles?.nome_completo ?? "Sem nome",
  email: r.profiles?.email ?? "",
  whatsapp: "",
  cargoId: r.cargo_id,
  turnoNome: r.turno_nome ?? "—",
  dispositivo: r.dispositivo ?? "pendente"
});
function useMembros(equipe_id) {
  return useQuery({
    queryKey: ["membros_equipe", equipe_id],
    enabled: !!equipe_id,
    queryFn: async () => {
      const { data, error } = await supabase.from("membros_equipe").select("id, user_id, equipe_id, cargo_id, turno_nome, dispositivo, profiles(nome_completo, email)").eq("equipe_id", equipe_id).order("created_at", { ascending: true });
      if (error) throw error;
      return (data ?? []).map((r) => mapMembro(r));
    }
  });
}
function useAdicionarMembro() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (m) => {
      const { error } = await supabase.from("membros_equipe").insert({
        equipe_id: m.equipe_id,
        user_id: m.user_id,
        cargo_id: m.cargo_id ?? null,
        turno_nome: m.turno_nome ?? "—",
        dispositivo: m.dispositivo ?? "pendente"
      });
      if (error) throw error;
    },
    onSuccess: (_, vars) => qc.invalidateQueries({ queryKey: ["membros_equipe", vars.equipe_id] })
  });
}
function useAtualizarMembro() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      equipe_id,
      patch
    }) => {
      const { error } = await supabase.from("membros_equipe").update(patch).eq("id", id);
      if (error) throw error;
      return equipe_id;
    },
    onSuccess: (equipe_id) => qc.invalidateQueries({ queryKey: ["membros_equipe", equipe_id] })
  });
}
function useExcluirMembro() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, equipe_id }) => {
      const { error } = await supabase.from("membros_equipe").delete().eq("id", id);
      if (error) throw error;
      return equipe_id;
    },
    onSuccess: (equipe_id) => qc.invalidateQueries({ queryKey: ["membros_equipe", equipe_id] })
  });
}
const mapTurno = (r) => ({
  id: r.id,
  nome: r.nome,
  inicio: r.inicio,
  fim: r.fim,
  cargos: r.cargos ?? [],
  antecedencia: r.antecedencia,
  posLimite: r.pos_limite,
  ativo: r.ativo
});
function useTurnos(equipe_id) {
  return useQuery({
    queryKey: ["turnos", equipe_id],
    enabled: !!equipe_id,
    queryFn: async () => {
      const { data, error } = await supabase.from("turnos").select("id, nome, inicio, fim, cargos, antecedencia, pos_limite, ativo").eq("equipe_id", equipe_id).order("created_at", { ascending: true });
      if (error) throw error;
      return (data ?? []).map(mapTurno);
    }
  });
}
function useSalvarTurno() {
  const qc = useQueryClient();
  const { data: sessao } = useSession();
  return useMutation({
    mutationFn: async (t) => {
      if (!sessao?.user_id) throw new Error("Sessão inválida");
      const row = {
        nome: t.nome,
        inicio: t.inicio,
        fim: t.fim,
        cargos: t.cargos,
        antecedencia: t.antecedencia,
        pos_limite: t.posLimite,
        ativo: t.ativo
      };
      if (t.id) {
        const { error } = await supabase.from("turnos").update(row).eq("id", t.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("turnos").insert({
          ...row,
          user_id: sessao.user_id,
          equipe_id: t.equipe_id
        });
        if (error) throw error;
      }
      return t.equipe_id;
    },
    onSuccess: (equipe_id) => qc.invalidateQueries({ queryKey: ["turnos", equipe_id] })
  });
}
function useExcluirTurno() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, equipe_id }) => {
      const { error } = await supabase.from("turnos").delete().eq("id", id);
      if (error) throw error;
      return equipe_id;
    },
    onSuccess: (equipe_id) => qc.invalidateQueries({ queryKey: ["turnos", equipe_id] })
  });
}
export {
  TURNOS_OPCOES as T,
  useAdicionarMembro as a,
  useAtualizarMembro as b,
  useCargos as c,
  useExcluirMembro as d,
  useExcluirTurno as e,
  useMembros as f,
  useRenomearCargo as g,
  useSalvarTurno as h,
  useTurnos as i,
  useAdicionarCargo as u
};
