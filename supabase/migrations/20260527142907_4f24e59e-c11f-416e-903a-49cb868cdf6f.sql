
-- Recreate view without security_invoker so it bypasses profiles RLS,
-- exposing only safe columns (username, nome_completo) to authenticated users.
DROP VIEW IF EXISTS public.profiles_public;
CREATE VIEW public.profiles_public AS
SELECT user_id, username, nome_completo
FROM public.profiles;

GRANT SELECT ON public.profiles_public TO authenticated;
