import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { demoNovoId, demoStore, DEMO_EQUIPE_ID } from "@/lib/demo-store";
import { hojeISO } from "@/lib/data";

export type Passagem = {
  id: string;
  equipe_id: string;
  turno_id: string | null;
  data: string;
  resumo: string | null;
  assinado_por: string | null;
  hash_assinatura: string | null;
  ip_assinatura: string | null;
  device_assinatura: string | null;
  assinado_em: string | null;
  created_at: string;
};

// MODO DEMO (gravação de portfólio): lê/escreve em src/lib/demo-store.ts
// em vez de bater no Supabase (chave inválida no .env — 401 em tudo).
// Reverter pra chamar o Supabase de novo quando a chave for corrigida
// (procure "MODO DEMO" neste arquivo).

const NOME_EQUIPE_DEMO = "Equipe Enfermagem";

export function usePassagens(equipe_id?: string) {
  return useQuery({
    queryKey: ["passagens", equipe_id],
    enabled: !!equipe_id,
    queryFn: async (): Promise<Passagem[]> =>
      demoStore.passagens
        .filter((p) => p.equipe_id === equipe_id)
        .sort((a, b) => b.data.localeCompare(a.data)),
  });
}

/* ---------- RESUMOS DE HOJE (dashboard) ---------- */
export type PassagemHoje = {
  id: string;
  resumo: string;
  assinado_por: string | null;
  assinado_em: string | null;
  hash_assinatura: string | null;
  data: string;
  equipe_id: string;
  equipe_nome: string;
  turno_nome: string | null;
  turno_inicio: string | null;
  turno_fim: string | null;
  criticas: number;
  medias: number;
  rotinas: number;
};

export function usePassagensHoje(equipeIds: string[]) {
  const key = equipeIds.slice().sort().join(",");
  return useQuery({
    queryKey: ["passagens_hoje", key],
    enabled: equipeIds.length > 0,
    queryFn: async (): Promise<PassagemHoje[]> => {
      const hoje = hojeISO();

      const linhas = demoStore.passagens.filter(
        (p) => equipeIds.includes(p.equipe_id) && p.data === hoje && p.resumo,
      );
      if (linhas.length === 0) return [];

      const contagem = new Map<string, { alta: number; media: number; baixa: number }>();
      for (const o of demoStore.ocorrencias) {
        if (!equipeIds.includes(o.equipe_id)) continue;
        if (!o.created_at.startsWith(hoje)) continue;
        const c = contagem.get(o.equipe_id) ?? { alta: 0, media: 0, baixa: 0 };
        if (o.gravidade === "alta") c.alta++;
        else if (o.gravidade === "media") c.media++;
        else c.baixa++;
        contagem.set(o.equipe_id, c);
      }

      return linhas.map((l): PassagemHoje => {
        const c = contagem.get(l.equipe_id) ?? { alta: 0, media: 0, baixa: 0 };
        const turno = l.turno_id ? demoStore.turnos.find((t) => t.id === l.turno_id) : undefined;
        return {
          id: l.id,
          resumo: l.resumo!,
          assinado_por: l.assinado_por,
          assinado_em: l.assinado_em,
          hash_assinatura: l.hash_assinatura,
          data: l.data,
          equipe_id: l.equipe_id,
          equipe_nome: l.equipe_id === DEMO_EQUIPE_ID ? NOME_EQUIPE_DEMO : "Equipe",
          turno_nome: turno?.nome ?? null,
          turno_inicio: turno?.inicio ?? null,
          turno_fim: turno?.fim ?? null,
          criticas: c.alta,
          medias: c.media,
          rotinas: c.baixa,
        };
      });
    },
  });
}

export function useEncerrarTurno() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      equipe_id: string;
      turno_id?: string;
      data: string;
      resumo: string;
      assinado_por: string;
    }) => {
      // Gera hash simples da passagem para rastreabilidade
      const conteudo = `${input.equipe_id}|${input.data}|${input.assinado_por}|${Date.now()}`;
      const encoder = new TextEncoder();
      const hashBuffer = await crypto.subtle.digest("SHA-256", encoder.encode(conteudo));
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hash = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

      demoStore.passagens.unshift({
        id: demoNovoId("passagem"),
        equipe_id: input.equipe_id,
        turno_id: input.turno_id ?? null,
        data: input.data,
        resumo: input.resumo,
        assinado_por: input.assinado_por,
        hash_assinatura: hash,
        ip_assinatura: "127.0.0.1",
        device_assinatura: "Navegador local",
        assinado_em: new Date().toISOString(),
        created_at: new Date().toISOString(),
      });
      return input.equipe_id;
    },
    onSuccess: (equipe_id) =>
      qc.invalidateQueries({ queryKey: ["passagens", equipe_id] }),
  });
}
