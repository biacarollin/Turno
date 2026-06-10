import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/hooks/use-session";

export type Cargo = { id: string; nome: string; cor: string };

export type DispositivoStatus = "verificado" | "pendente" | "convite" | "inativo";

export type Membro = {
  id: string;
  user_id: string;
  nome: string;
  email: string;
  whatsapp: string;
  cargoId: string | null;
  turnoNome: string;
  dispositivo: DispositivoStatus;
};

export const TURNOS_OPCOES = ["Manhã", "Tarde", "Noite", "—"];

/* ---------- CARGOS ---------- */
export function useCargos(filial_id?: string) {
  return useQuery({
    queryKey: ["cargos", filial_id],
    enabled: !!filial_id,
    queryFn: async (): Promise<Cargo[]> => {
      const { data, error } = await supabase
        .from("cargos")
        .select("id, nome, cor")
        .eq("filial_id", filial_id!)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useAdicionarCargo() {
  const qc = useQueryClient();
  const { data: sessao } = useSession();
  return useMutation({
    mutationFn: async ({ nome, cor }: { nome: string; cor: string }) => {
      if (!sessao?.filial_ativa_id || !sessao?.user_id)
        throw new Error("Sessão inválida");
      const { error } = await supabase.from("cargos").insert({
        nome,
        cor,
        user_id: sessao.user_id,
        filial_id: sessao.filial_ativa_id,
      });
      if (error) throw error;
    },
    onSuccess: (_, __, ___, ) =>
      qc.invalidateQueries({ queryKey: ["cargos"] }),
  });
}

export function useRenomearCargo() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, nome, cor }: { id: string; nome: string; cor: string }) => {
      const { error } = await supabase
        .from("cargos")
        .update({ nome, cor })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cargos"] }),
  });
}

export function useExcluirCargo() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("cargos").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cargos"] });
      qc.invalidateQueries({ queryKey: ["membros_equipe"] });
    },
  });
}

/* ---------- MEMBROS DA EQUIPE ---------- */
type MembroRow = {
  id: string;
  user_id: string;
  equipe_id: string;
  cargo_id: string | null;
  turno_nome: string | null;
  dispositivo: string;
  profiles: {
    nome_completo: string | null;
    email: string | null;
  } | null;
};

const mapMembro = (r: MembroRow): Membro => ({
  id: r.id,
  user_id: r.user_id,
  nome: r.profiles?.nome_completo ?? "Sem nome",
  email: r.profiles?.email ?? "",
  whatsapp: "",
  cargoId: r.cargo_id,
  turnoNome: r.turno_nome ?? "—",
  dispositivo: (r.dispositivo as DispositivoStatus) ?? "pendente",
});

export function useMembros(equipe_id?: string) {
  return useQuery({
    queryKey: ["membros_equipe", equipe_id],
    enabled: !!equipe_id,
    queryFn: async (): Promise<Membro[]> => {
      const { data, error } = await supabase
        .from("membros_equipe")
        .select("id, user_id, equipe_id, cargo_id, turno_nome, dispositivo, profiles(nome_completo, email)")
        .eq("equipe_id", equipe_id!)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return (data ?? []).map((r: any) => mapMembro(r));
    },
  });
}

export function useAdicionarMembro() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (m: {
      equipe_id: string;
      user_id: string;
      cargo_id?: string;
      turno_nome?: string;
      dispositivo?: DispositivoStatus;
    }) => {
      const { error } = await supabase.from("membros_equipe").insert({
        equipe_id: m.equipe_id,
        user_id: m.user_id,
        cargo_id: m.cargo_id ?? null,
        turno_nome: m.turno_nome ?? "—",
        dispositivo: m.dispositivo ?? "pendente",
      });
      if (error) throw error;
    },
    onSuccess: (_, vars) =>
      qc.invalidateQueries({ queryKey: ["membros_equipe", vars.equipe_id] }),
  });
}

export function useAtualizarMembro() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      equipe_id,
      patch,
    }: {
      id: string;
      equipe_id: string;
      patch: Partial<{
        cargo_id: string | null;
        turno_nome: string;
        dispositivo: DispositivoStatus;
      }>;
    }) => {
      const { error } = await supabase
        .from("membros_equipe")
        .update(patch)
        .eq("id", id);
      if (error) throw error;
      return equipe_id;
    },
    onSuccess: (equipe_id) =>
      qc.invalidateQueries({ queryKey: ["membros_equipe", equipe_id] }),
  });
}

export function useExcluirMembro() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, equipe_id }: { id: string; equipe_id: string }) => {
      const { error } = await supabase
        .from("membros_equipe")
        .delete()
        .eq("id", id);
      if (error) throw error;
      return equipe_id;
    },
    onSuccess: (equipe_id) =>
      qc.invalidateQueries({ queryKey: ["membros_equipe", equipe_id] }),
  });
}

/* ---------- TURNOS ---------- */
export type TurnoRecord = {
  id: string;
  nome: string;
  inicio: string;
  fim: string;
  cargos: string[];
  antecedencia: number;
  posLimite: number;
  ativo: boolean;
};

type TurnoRow = {
  id: string;
  nome: string;
  inicio: string;
  fim: string;
  cargos: string[] | null;
  antecedencia: number;
  pos_limite: number;
  ativo: boolean;
};

const mapTurno = (r: TurnoRow): TurnoRecord => ({
  id: r.id,
  nome: r.nome,
  inicio: r.inicio,
  fim: r.fim,
  cargos: r.cargos ?? [],
  antecedencia: r.antecedencia,
  posLimite: r.pos_limite,
  ativo: r.ativo,
});

export function useTurnos(equipe_id?: string) {
  return useQuery({
    queryKey: ["turnos", equipe_id],
    enabled: !!equipe_id,
    queryFn: async (): Promise<TurnoRecord[]> => {
      const { data, error } = await supabase
        .from("turnos")
        .select("id, nome, inicio, fim, cargos, antecedencia, pos_limite, ativo")
        .eq("equipe_id", equipe_id!)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return (data ?? []).map(mapTurno);
    },
  });
}

export function useSalvarTurno() {
  const qc = useQueryClient();
  const { data: sessao } = useSession();
  return useMutation({
    mutationFn: async (t: Omit<TurnoRecord, "id"> & { id?: string; equipe_id: string }) => {
      if (!sessao?.user_id) throw new Error("Sessão inválida");
      const row = {
        nome: t.nome,
        inicio: t.inicio,
        fim: t.fim,
        cargos: t.cargos,
        antecedencia: t.antecedencia,
        pos_limite: t.posLimite,
        ativo: t.ativo,
      };
      if (t.id) {
        const { error } = await supabase.from("turnos").update(row).eq("id", t.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("turnos").insert({
          ...row,
          user_id: sessao.user_id,
          equipe_id: t.equipe_id,
        });
        if (error) throw error;
      }
      return t.equipe_id;
    },
    onSuccess: (equipe_id) =>
      qc.invalidateQueries({ queryKey: ["turnos", equipe_id] }),
  });
}

export function useExcluirTurno() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, equipe_id }: { id: string; equipe_id: string }) => {
      const { error } = await supabase.from("turnos").delete().eq("id", id);
      if (error) throw error;
      return equipe_id;
    },
    onSuccess: (equipe_id) =>
      qc.invalidateQueries({ queryKey: ["turnos", equipe_id] }),
  });
}