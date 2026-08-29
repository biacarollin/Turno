
-- Add segmento to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS segmento TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS segmento_topo TEXT;

-- tipos_ocorrencia
CREATE TABLE public.tipos_ocorrencia (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  nome TEXT NOT NULL,
  gravidade_default TEXT NOT NULL DEFAULT 'media',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.tipos_ocorrencia TO authenticated;
GRANT ALL ON public.tipos_ocorrencia TO service_role;
ALTER TABLE public.tipos_ocorrencia ENABLE ROW LEVEL SECURITY;
CREATE POLICY "tipos_oc_select_own" ON public.tipos_ocorrencia FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "tipos_oc_insert_own" ON public.tipos_ocorrencia FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "tipos_oc_update_own" ON public.tipos_ocorrencia FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "tipos_oc_delete_own" ON public.tipos_ocorrencia FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- ocorrencias
CREATE TABLE public.ocorrencias (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  titulo TEXT NOT NULL,
  descricao TEXT,
  tipo TEXT,
  gravidade TEXT NOT NULL DEFAULT 'media',
  status TEXT NOT NULL DEFAULT 'aberta',
  local TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.ocorrencias TO authenticated;
GRANT ALL ON public.ocorrencias TO service_role;
ALTER TABLE public.ocorrencias ENABLE ROW LEVEL SECURITY;
CREATE POLICY "oc_select_own" ON public.ocorrencias FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "oc_insert_own" ON public.ocorrencias FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "oc_update_own" ON public.ocorrencias FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "oc_delete_own" ON public.ocorrencias FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE TRIGGER trg_oc_updated BEFORE UPDATE ON public.ocorrencias FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- notas
CREATE TABLE public.notas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  titulo TEXT NOT NULL,
  conteudo TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.notas TO authenticated;
GRANT ALL ON public.notas TO service_role;
ALTER TABLE public.notas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "notas_select_own" ON public.notas FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "notas_insert_own" ON public.notas FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "notas_update_own" ON public.notas FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "notas_delete_own" ON public.notas FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE TRIGGER trg_notas_updated BEFORE UPDATE ON public.notas FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- folgas
CREATE TABLE public.folgas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  membro_id UUID,
  data_inicio DATE NOT NULL,
  data_fim DATE NOT NULL,
  motivo TEXT,
  status TEXT NOT NULL DEFAULT 'aprovada',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.folgas TO authenticated;
GRANT ALL ON public.folgas TO service_role;
ALTER TABLE public.folgas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "folgas_select_own" ON public.folgas FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "folgas_insert_own" ON public.folgas FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "folgas_update_own" ON public.folgas FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "folgas_delete_own" ON public.folgas FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- passagens_turno
CREATE TABLE public.passagens_turno (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  turno_id UUID,
  data DATE NOT NULL,
  resumo TEXT,
  assinado_por TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.passagens_turno TO authenticated;
GRANT ALL ON public.passagens_turno TO service_role;
ALTER TABLE public.passagens_turno ENABLE ROW LEVEL SECURITY;
CREATE POLICY "pt_select_own" ON public.passagens_turno FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "pt_insert_own" ON public.passagens_turno FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "pt_update_own" ON public.passagens_turno FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "pt_delete_own" ON public.passagens_turno FOR DELETE TO authenticated USING (auth.uid() = user_id);
