
DROP VIEW IF EXISTS public.profiles_public;

CREATE OR REPLACE FUNCTION public.search_usernames(prefix TEXT, max_results INT DEFAULT 10)
RETURNS TABLE(user_id UUID, username TEXT, nome_completo TEXT)
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'not authenticated';
  END IF;
  RETURN QUERY
  SELECT p.user_id, p.username, p.nome_completo
  FROM public.profiles p
  WHERE p.username ILIKE prefix || '%'
  ORDER BY p.username
  LIMIT LEAST(GREATEST(max_results, 1), 25);
END;
$$;

REVOKE ALL ON FUNCTION public.search_usernames(TEXT, INT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.search_usernames(TEXT, INT) TO authenticated;

-- Also a function to resolve a single username -> user_id (for saving destinatário)
CREATE OR REPLACE FUNCTION public.username_to_user_id(uname TEXT)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
DECLARE
  uid UUID;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'not authenticated';
  END IF;
  SELECT user_id INTO uid FROM public.profiles WHERE username = lower(uname);
  RETURN uid;
END;
$$;

REVOKE ALL ON FUNCTION public.username_to_user_id(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.username_to_user_id(TEXT) TO authenticated;
