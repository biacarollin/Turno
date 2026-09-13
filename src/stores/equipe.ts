import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { demoNovoId, demoStore } from "@/lib/demo-store";

export type Cargo = { id: string; nome: string; cor: string };

export type DispositivoStatus = "verificado" | "pendente" | "convite" | "inativo";

export type Membro = {
  id: string;
  user_id: string | null;
  nome: string;
  email: string;
  whatsapp: string;
  cargoId: string | null;
  turnoNome: string;
  dispositivo: DispositivoStatus;
};

export const TURNOS_OPCOES = ["Manhã", "Tarde", "Noite", "—"];

// MODO DEMO (gravação de portfólio): lê/escreve em src/lib/demo-store.ts
// em vez de bater no Supabase (chave inválida no .env — 401 em tudo).
// Reverter pra chamar o Supabase de novo quando a chave for corrigida
// (procure "MODO DEMO" neste arquivo).

/* ---------- CARGOS ---------- */
export function useCargos(filial_id?: string) {
  return useQuery({
    queryKey: ["cargos", filial_id],
    enabled: !!filial_id,
    queryFn: async (): Promise<Cargo[]> =>
      demoStore.cargos.filter((c) => c.filial_id === filial_id),
  });
}

export function useAdicionarCargo() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ nome, cor }: { nome: string; cor: string }) => {
      demoStore.cargos.push({ id: demoNovoId("cargo"), nome, cor, filial_id: demoStore.cargos[0]?.filial_id ?? "" });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cargos"] }),
  });
}

export function useRenomearCargo() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, nome, cor }: { id: string; nome: string; cor: string }) => {
      const alvo = demoStore.cargos.find((c) => c.id === id);
      if (alvo) { alvo.nome = nome; alvo.cor = cor; }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cargos"] }),
  });
}

export function useExcluirCargo() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      demoStore.cargos = demoStore.cargos.filter((c) => c.id !== id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cargos"] });
      qc.invalidateQueries({ queryKey: ["membros_equipe"] });
    },
  });
}

/* ---------- MEMBROS DA EQUIPE ---------- */
const mapMembro = (r: (typeof demoStore.membros)[number]): Membro => ({
  id: r.id,
  user_id: r.user_id,
  nome: r.nome,
  email: r.email,
  whatsapp: "",
  cargoId: r.cargo_id,
  turnoNome: r.turno_nome,
  dispositivo: r.dispositivo,
});

export function useMembros(equipe_id?: string) {
  return useQuery({
    queryKey: ["membros_equipe", equipe_id],
    enabled: !!equipe_id,
    queryFn: async (): Promise<Membro[]> =>
      demoStore.membros.filter((m) => m.equipe_id === equipe_id).map(mapMembro),
  });
}

export function useAdicionarMembro() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (m: {
      equipe_id: string;
      convite_nome: string;
      convite_email?: string;
      cargo_id?: string;
      turno_nome?: string;
      dispositivo?: DispositivoStatus;
    }) => {
      demoStore.membros.push({
        id: demoNovoId("membro"),
        user_id: null,
        equipe_id: m.equipe_id,
        nome: m.convite_nome,
        email: m.convite_email || "",
        cargo_id: m.cargo_id ?? null,
        turno_nome: m.turno_nome ?? "—",
        dispositivo: m.dispositivo ?? "pendente",
      });
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
      const alvo = demoStore.membros.find((m) => m.id === id);
      if (alvo) Object.assign(alvo, patch);
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
      demoStore.membros = demoStore.membros.filter((m) => m.id !== id);
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

const mapTurno = (r: (typeof demoStore.turnos)[number]): TurnoRecord => ({
  id: r.id,
  nome: r.nome,
  inicio: r.inicio,
  fim: r.fim,
  cargos: r.cargos,
  antecedencia: r.antecedencia,
  posLimite: r.pos_limite,
  ativo: r.ativo,
});

export function useTurnos(equipe_id?: string) {
  return useQuery({
    queryKey: ["turnos", equipe_id],
    enabled: !!equipe_id,
    queryFn: async (): Promise<TurnoRecord[]> =>
      demoStore.turnos.filter((t) => t.equipe_id === equipe_id).map(mapTurno),
  });
}

export function useSalvarTurno() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (t: Omit<TurnoRecord, "id"> & { id?: string; equipe_id: string }) => {
      if (t.id) {
        const alvo = demoStore.turnos.find((x) => x.id === t.id);
        if (alvo) {
          alvo.nome = t.nome; alvo.inicio = t.inicio; alvo.fim = t.fim;
          alvo.cargos = t.cargos; alvo.antecedencia = t.antecedencia;
          alvo.pos_limite = t.posLimite; alvo.ativo = t.ativo;
        }
      } else {
        demoStore.turnos.push({
          id: demoNovoId("turno"), equipe_id: t.equipe_id, nome: t.nome,
          inicio: t.inicio, fim: t.fim, cargos: t.cargos,
          antecedencia: t.antecedencia, pos_limite: t.posLimite, ativo: t.ativo,
        });
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
      demoStore.turnos = demoStore.turnos.filter((t) => t.id !== id);
      return equipe_id;
    },
    onSuccess: (equipe_id) =>
      qc.invalidateQueries({ queryKey: ["turnos", equipe_id] }),
  });
}
