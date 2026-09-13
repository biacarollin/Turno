import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/landing/Logo";
import { ShieldCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { buscarConvitePreview } from "@/lib/convite-preview.server";
import { confirmarConvite } from "@/lib/confirmar-convite.server";

export const Route = createFileRoute("/confirmar")({
  component: Confirmar,
  head: () => ({ meta: [{ title: "Confirmar acesso · Turno" }] }),
});

function Confirmar() {
  const navigate = useNavigate();
  const buscarPreviewFn = useServerFn(buscarConvitePreview);
  const confirmarConviteFn = useServerFn(confirmarConvite);
  const [loading, setLoading] = useState(true);
  const [confirmando, setConfirmando] = useState(false);
  const [equipeNome, setEquipeNome] = useState<string | null>(null);
  const [filialNome, setFilialNome] = useState<string | null>(null);
  const [equipeId, setEquipeId] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  const [emailConvite, setEmailConvite] = useState<string | null>(null);
  const [emailSessaoAtual, setEmailSessaoAtual] = useState<string | null>(null);
  const [continuarMesmoAssim, setContinuarMesmoAssim] = useState(false);
  const [saindo, setSaindo] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const invite = params.get("invite");
    setEmailConvite(params.get("email"));

    if (!invite) {
      setErro("Link de convite inválido.");
      setLoading(false);
      return;
    }

    // Se já existe uma sessão ativa nesse navegador, precisamos saber o e-mail
    // dela pra avisar caso não bata com o e-mail convidado (senão o convite
    // vincula silenciosamente a conta errada — inclusive rebaixando um admin).
    supabase.auth.getSession().then(({ data }) => {
      setEmailSessaoAtual(data.session?.user.email ?? null);
    });

    // Busca dados da equipe pelo invite — via server function com privilégio
    // de servidor, porque quem recebeu o convite pode ainda não ter sessão
    // nenhuma (um SELECT direto do navegador cairia na RLS e pareceria "convite
    // não encontrado" mesmo sendo válido).
    buscarPreviewFn({ data: { equipe_id: invite } as never })
      .then((info) => {
        setEquipeId(info.equipeId);
        setEquipeNome(info.equipeNome);
        setFilialNome(info.filialNome);
      })
      .catch((e: Error) => {
        setErro(e.message || "Convite não encontrado ou expirado.");
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contaDiferente =
    !!emailConvite &&
    !!emailSessaoAtual &&
    emailConvite.trim().toLowerCase() !== emailSessaoAtual.trim().toLowerCase();

  const trocarDeConta = async () => {
    setSaindo(true);
    await supabase.auth.signOut();
    window.location.reload();
  };

  const confirmar = async () => {
    if (!equipeId) return;
    setConfirmando(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        // Manda pro login/cadastro levando o convite na própria URL — assim
        // ele sobrevive mesmo se a pessoa confirmar o e-mail em outra aba
        // (sessionStorage não atravessa isso, já que é por aba).
        const q = new URLSearchParams({ invite: equipeId });
        if (emailConvite) q.set("email", emailConvite);
        window.location.href = `/login?${q.toString()}`;
        return;
      }

      // Toda a escrita (vincular à equipe, papel na filial, filial ativa) roda
      // no servidor com privilégio de admin — ver confirmar-convite.server.ts
      // pro motivo (RLS não deixa um colaborador recém-criado fazer isso sozinho).
      await confirmarConviteFn({ data: { equipe_id: equipeId } as never });

      toast.success("Acesso confirmado! Bem-vindo à equipe.");
      navigate({ to: "/app" });
    } catch (e) {
      toast.error((e as Error).message || "Erro ao confirmar acesso");
      setConfirmando(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-turno-600" />
      </div>
    );
  }

  if (erro) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
        <Card className="w-full max-w-md p-7 text-center">
          <div className="flex justify-center"><Logo /></div>
          <h1 className="mt-6 text-xl font-medium text-destructive">Convite inválido</h1>
          <p className="mt-1 text-sm text-muted-foreground">{erro}</p>
          <Button className="mt-6 w-full bg-turno-600 hover:bg-turno-700"
            onClick={() => navigate({ to: "/login" })}>
            Ir para o login
          </Button>
        </Card>
      </div>
    );
  }

  if (contaDiferente && !continuarMesmoAssim) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
        <Card className="w-full max-w-md p-7 text-center">
          <div className="flex justify-center"><Logo /></div>
          <h1 className="mt-6 text-xl font-medium text-amber-700">Conta diferente da convidada</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Este convite foi enviado para <strong>{emailConvite}</strong>, mas você está logado como{" "}
            <strong>{emailSessaoAtual}</strong> neste navegador.
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            Se continuar, o convite vai ser vinculado à conta atual — não à pessoa convidada.
          </p>
          <div className="mt-6 flex flex-col gap-2">
            <Button className="bg-turno-600 hover:bg-turno-700" onClick={trocarDeConta} disabled={saindo}>
              {saindo ? <><Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> Saindo...</> : "Sair e entrar com a conta certa"}
            </Button>
            <Button variant="outline" onClick={() => setContinuarMesmoAssim(true)}>
              Continuar mesmo assim
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <Card className="w-full max-w-md p-7 text-center">
        <div className="flex justify-center"><Logo /></div>

        <h1 className="mt-6 text-xl font-medium">Você foi convidado!</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Confirme para entrar na equipe abaixo.
        </p>

        <div className="mt-6 flex flex-col items-center gap-2 rounded-lg border bg-muted/30 p-5">
          <div className="text-base font-medium">{equipeNome}</div>
          {filialNome && (
            <div className="text-xs text-muted-foreground">{filialNome}</div>
          )}
        </div>

        <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-turno-700">
          <ShieldCheck className="h-3.5 w-3.5" /> Este dispositivo será vinculado à sua conta.
        </div>

        <div className="mt-6 flex gap-2">
          <Button variant="outline" className="flex-1"
            onClick={() => navigate({ to: "/login" })}>
            Cancelar
          </Button>
          <Button className="flex-1 bg-turno-600 hover:bg-turno-700"
            onClick={confirmar} disabled={confirmando}>
            {confirmando
              ? <><Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> Confirmando...</>
              : "Confirmar e entrar"}
          </Button>
        </div>
      </Card>
    </div>
  );
}