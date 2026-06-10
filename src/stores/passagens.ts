import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/hooks/use-session";

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

export function usePassagens(equipe_id?: string) {
  return useQuery({
    queryKey: ["passagens", equipe_id],
    enabled: !!equipe_id,
    queryFn: async (): Promise<Passagem[]> => {
      const { data, error } = await supabase
        .from("passagens_turno")
        .select("id, equipe_id, turno_id, data, resumo, assinado_por, hash_assinatura, ip_assinatura, device_assinatura, assinado_em, created_at")
        .eq("equipe_id", equipe_id!)
        .order("data", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Passagem[];
    },
  });
}

export function useEncerrarTurno() {
  const qc = useQueryClient();
  const { data: sessao } = useSession();
  return useMutation({
    mutationFn: async (input: {
      equipe_id: string;
      turno_id?: string;
      data: string;
      resumo: string;
      assinado_por: string;
    }) => {
      if (!sessao?.user_id) throw new Error("Sessão inválida");

      // Gera hash simples da passagem para rastreabilidade
      const conteudo = `${input.equipe_id}|${input.data}|${input.assinado_por}|${Date.now()}`;
      const encoder = new TextEncoder();
      const hashBuffer = await crypto.subtle.digest("SHA-256", encoder.encode(conteudo));
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hash = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

      const { error } = await supabase.from("passagens_turno").insert({
        user_id: sessao.user_id,
        equipe_id: input.equipe_id,
        turno_id: input.turno_id ?? null,
        data: input.data,
        resumo: input.resumo,
        assinado_por: input.assinado_por,
        hash_assinatura: hash,
        assinado_em: new Date().toISOString(),
      });
      if (error) throw error;
      return input.equipe_id;
    },
    onSuccess: (equipe_id) =>
      qc.invalidateQueries({ queryKey: ["passagens", equipe_id] }),
  });
}