
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS segmento_custom_nome TEXT;
