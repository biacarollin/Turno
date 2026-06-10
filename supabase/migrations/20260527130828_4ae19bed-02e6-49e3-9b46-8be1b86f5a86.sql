-- CARGOS
CREATE TABLE public.cargos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  cor TEXT NOT NULL DEFAULT '#2a917a',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.cargos TO authenticated;
GRANT ALL ON public.cargos TO service_role;
ALTER TABLE public.cargos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "cargos_select_own" ON public.cargos FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "cargos_insert_own" ON public.cargos FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "cargos_update_own" ON public.cargos FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "cargos_delete_own" ON public.cargos FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE TRIGGER trg_cargos_upd BEFORE UPDATE ON public.cargos FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX idx_cargos_user ON public.cargos(user_id);

-- MEMBROS
CREATE TABLE public.membros (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  email TEXT,
  cargo_id UUID REFERENCES public.cargos(id) ON DELETE SET NULL,
  turno TEXT DEFAULT '—',
  dispositivo TEXT NOT NULL DEFAULT 'pendente' CHECK (dispositivo IN ('verificado','pendente','convite')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.membros TO authenticated;
GRANT ALL ON public.membros TO service_role;
ALTER TABLE public.membros ENABLE ROW LEVEL SECURITY;
CREATE POLICY "membros_select_own" ON public.membros FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "membros_insert_own" ON public.membros FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "membros_update_own" ON public.membros FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "membros_delete_own" ON public.membros FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE TRIGGER trg_membros_upd BEFORE UPDATE ON public.membros FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX idx_membros_user ON public.membros(user_id);

-- TURNOS
CREATE TABLE public.turnos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  inicio TEXT NOT NULL,
  fim TEXT NOT NULL,
  cargos TEXT[] NOT NULL DEFAULT '{}',
  antecedencia INTEGER NOT NULL DEFAULT 15,
  pos_limite INTEGER NOT NULL DEFAULT 30,
  ativo BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.turnos TO authenticated;
GRANT ALL ON public.turnos TO service_role;
ALTER TABLE public.turnos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "turnos_select_own" ON public.turnos FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "turnos_insert_own" ON public.turnos FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "turnos_update_own" ON public.turnos FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "turnos_delete_own" ON public.turnos FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE TRIGGER trg_turnos_upd BEFORE UPDATE ON public.turnos FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX idx_turnos_user ON public.turnos(user_id);