import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type AssinaturaAtiva = {
  plano: string;
  periodo: string;
  status: string;
  trial_end: string | null;
  current_period_end: string | null;
  stripe_customer_id: string | null;
};

export const buscarAssinatura = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<AssinaturaAtiva | null> => {
    const { supabase } = context;

    const { data, error } = await (supabase as any)
      .from("assinaturas")
      .select("plano, periodo, status, trial_end, current_period_end, stripe_customer_id")
      .single();

    if (error || !data) return null;
    return data as AssinaturaAtiva;
  });