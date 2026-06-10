ALTER TABLE public.membros
DROP CONSTRAINT IF EXISTS membros_dispositivo_check;

ALTER TABLE public.membros
ADD CONSTRAINT membros_dispositivo_check
CHECK (dispositivo IN ('verificado', 'pendente', 'convite', 'ativo', 'inativo'));
