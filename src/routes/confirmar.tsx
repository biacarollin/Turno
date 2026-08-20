import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/landing/Logo";
import { ShieldCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/confirmar")({
  component: Confirmar,
  head: () => ({ meta: [{ title: "Confirmar acesso · Turno" }] }),
});

function Confirmar() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [confirmando, setConfirmando] = useState(false);
  const [equipeNome, setEquipeNome] = useState<string | null>(null);
  const [filialNome, setFilialNome] = useState<string | null>(null);
  const [equipeId, setEquipeId] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const invite = params.get("invite");

    if (!invite) {
      setErro("Link de convite inválido.");
      setLoading(false);
      return;
    }

    // Busca dados da equipe pelo invite (equipe_id)
    supabase
      .from("equipes")
      .select("id, nome, filiais(nome)")
      .eq("id", invite)
      .single()
      .then(({ data, error }) => {
        if (error || !data) {
          setErro("Convite não encontrado ou expirado.");
        } else {
          setEquipeId(data.id);
          setEquipeNome(data.nome);
          setFilialNome((data.filiais as { nome: string } | null)?.nome ?? null);
        }
        setLoading(false);
      });
  }, []);

  const confirmar = async () => {
    if (!equipeId) return;
    setConfirmando(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        // Salva o convite e redireciona para login
        sessionStorage.setItem("convite_equipe_id", equipeId);
        navigate({ to: "/login" });
        return;
      }

      const user_id = session.user.id;

      // Vincula usuário à equipe
      const { error } = await supabase.from("membros_equipe").upsert({
        user_id,
        equipe_id: equipeId,
        dispositivo: "verificado",
      }, { onConflict: "user_id,equipe_id" });

      if (error) throw error;

      // Busca filial da equipe e atualiza filial ativa
      const { data: equipe } = await supabase
        .from("equipes")
        .select("filial_id")
        .eq("id", equipeId)
        .single();

      if (equipe?.filial_id) {
        // Vincula como membro da filial se ainda não for
        await supabase.from("membros_filial").upsert({
          user_id,
          filial_id: equipe.filial_id,
          papel: "colaborador",
        }, { onConflict: "user_id,filial_id" });

        // Atualiza filial ativa
        await supabase.from("profiles")
          .update({ filial_ativa_id: equipe.filial_id })
          .eq("user_id", user_id);
      }

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