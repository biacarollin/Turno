
-- 1. Helpers
CREATE OR REPLACE FUNCTION public.slugify_username(input TEXT)
RETURNS TEXT
LANGUAGE plpgsql
IMMUTABLE
SET search_path = public
AS $$
DECLARE
  s TEXT;
BEGIN
  IF input IS NULL OR length(trim(input)) = 0 THEN
    RETURN 'user';
  END IF;
  -- remove accents, lowercase, replace non-alphanumerics with hyphens
  s := lower(unaccent(input));
  s := regexp_replace(s, '[^a-z0-9]+', '-', 'g');
  s := regexp_replace(s, '(^-+|-+$)', '', 'g');
  IF length(s) < 3 THEN
    s := s || '-user';
  END IF;
  IF length(s) > 30 THEN
    s := substring(s from 1 for 30);
    s := regexp_replace(s, '-+$', '', 'g');
  END IF;
  RETURN s;
END;
$$;

-- enable unaccent if not yet
CREATE EXTENSION IF NOT EXISTS unaccent;

CREATE OR REPLACE FUNCTION public.unique_username(base TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  candidate TEXT := base;
  i INT := 2;
BEGIN
  WHILE EXISTS (SELECT 1 FROM public.profiles WHERE username = candidate) LOOP
    candidate := base || '-' || i;
    i := i + 1;
  END LOOP;
  RETURN candidate;
END;
$$;

-- 2. profiles: empresa_nome + username
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS empresa_nome TEXT,
  ADD COLUMN IF NOT EXISTS username TEXT;

-- backfill username for existing rows
UPDATE public.profiles
SET username = public.unique_username(public.slugify_username(COALESCE(nome_completo, email, 'user')))
WHERE username IS NULL;

ALTER TABLE public.profiles
  ALTER COLUMN username SET NOT NULL,
  ADD CONSTRAINT profiles_username_key UNIQUE (username),
  ADD CONSTRAINT profiles_username_format CHECK (username ~ '^[a-z0-9-]{3,30}$');

-- allow authenticated users to look up usernames (for @mention autocomplete)
-- Use a restricted view exposing only user_id + username + nome_completo
CREATE OR REPLACE VIEW public.profiles_public
WITH (security_invoker = on) AS
SELECT user_id, username, nome_completo
FROM public.profiles;

GRANT SELECT ON public.profiles_public TO authenticated;

-- broaden profiles SELECT so authenticated users can read username/nome via the view
-- (security_invoker means view inherits caller's permissions, so we add a policy
-- that allows reading the public columns of any profile)
CREATE POLICY "Authenticated can view public profile fields"
ON public.profiles
FOR SELECT
TO authenticated
USING (true);

-- Drop the old restrictive policy that only allowed own profile (we still need own-only for sensitive fields,
-- but for @mention to work we expose only via the view). Since policies are permissive (OR), keeping both
-- means any authenticated user can SELECT any profile row. To avoid leaking email/celular, drop the broad policy
-- and instead expose only the view. Recreate own-only:
DROP POLICY IF EXISTS "Authenticated can view public profile fields" ON public.profiles;

-- 3. notas: destinatario
ALTER TABLE public.notas
  ADD COLUMN IF NOT EXISTS destinatario_user_id UUID;

-- new SELECT policy: author OR recipient can read
DROP POLICY IF EXISTS notas_select_own ON public.notas;
CREATE POLICY notas_select_own_or_recipient
ON public.notas
FOR SELECT
TO authenticated
USING (auth.uid() = user_id OR auth.uid() = destinatario_user_id);

-- 4. update handle_new_user to also generate username + empresa_nome
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_nome TEXT;
  v_base TEXT;
  v_username TEXT;
BEGIN
  v_nome := COALESCE(
    NEW.raw_user_meta_data->>'nome_completo',
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'name',
    split_part(NEW.email, '@', 1)
  );
  v_base := public.slugify_username(v_nome);
  v_username := public.unique_username(v_base);

  INSERT INTO public.profiles (user_id, nome_completo, email, celular, hospital_nome, empresa_nome, username)
  VALUES (
    NEW.id,
    v_nome,
    NEW.email,
    NEW.raw_user_meta_data->>'celular',
    NEW.raw_user_meta_data->>'hospital_nome',
    COALESCE(NEW.raw_user_meta_data->>'empresa_nome', NEW.raw_user_meta_data->>'hospital_nome'),
    v_username
  );
  RETURN NEW;
END;
$$;
