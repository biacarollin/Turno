import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CalendarDays, Repeat, LogOut } from "lucide-react";
import { toast } from "sonner";
import { useMembros } from "@/stores/equipe";
import { useFolgas, useCriarFolga } from "@/stores/folgas";
import { useSession, useMinhasEquipes } from "@/hooks/use-session";
import { formatDataBR } from "@/lib/data";
import { supabase } from "@/integrations/supabase/client";

export function ColaboradorView() {
  const { data: sessao } = useSession();
  const { data: equipes = [] } = useMinhasEquipes();
  const equipe_id = equipes[0]?.equipe_id;
  const filial_id = sessao?.filial_ativa_id ?? undefined;

  const { data: membros = [] } = useMembros(equipe_id);
  const { data: folgas = [] } = useFolgas(filial_id);
  const criar = useCriarFolga();

  const eu = membros.find((m) => m.user_id === sessao?.user_id);
  const colegas = membros.filter((m) => m.id !== eu?.id);
  const minhasSolicitacoes = folgas.filter(
    (f) => f.membro_id === eu?.id || f.membro_troca_id === eu?.id
  );

  const [open, setOpen] = useState(false);
  const [tipo, setTipo] = useState<"folga" | "troca">("folga");
  const [colegaId, setColegaId] = useState("");
  const [inicio, setInicio] = useState("");
  const [fim, setFim] = useState("");
  const [motivo, setMotivo] = useState("");
  const [enviando, setEnviando] = useState(false);

  const abrir = (t: "folga" | "troca") => {
    setTipo(t); setColegaId(""); setInicio(""); setFim(""); setMotivo("");
    setOpen(true);
  };

  const enviar = async () => {
    if (!eu) return toast.error("Você ainda não está vinculado a uma equipe");
    if (!inicio || !fim) return toast.error("Preencha as datas");
    if (tipo === "troca" && !colegaId) return toast.error("Escolha com quem você quer trocar");

    setEnviando(true);
    try {
      await criar.mutateAsync({
        tipo,
        membro_id: eu.id,
        membro_troca_id: tipo === "troca" ? colegaId : null,
        data_inicio: inicio,
        data_fim: fim,
        motivo,
        status: "pendente",
      });
      toast.success("Solicitação enviada. O gestor vai aprovar ou recusar.");
      setOpen(false);
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Olá, {sessao?.nome_completo?.split(" ")[0] ?? "colaborador"}</h1>
          <p className="text-sm text-gray-500">
            {sessao?.filial_nome} {eu?.turnoNome && eu.turnoNome !== "—" ? `· Turno ${eu.turnoNome}` : ""}
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => supabase.auth.signOut()}>
          <LogOut className="mr-1.5 h-4 w-4" /> Sair
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="h-auto flex-col items-start gap-1 p-4" onClick={() => abrir("folga")}>
          <CalendarDays className="h-5 w-5 text-app-600" />
          <span className="font-semibold">Solicitar folga</span>
        </Button>
        <Button variant="outline" className="h-auto flex-col items-start gap-1 p-4" onClick={() => abrir("troca")}>
          <Repeat className="h-5 w-5 text-app-600" />
          <span className="font-semibold">Solicitar troca</span>
        </Button>
      </div>

      <Card className="divide-y">
        <div className="p-4">
          <h2 className="text-sm font-semibold text-gray-900">Minhas solicitações</h2>
        </div>
        {minhasSolicitacoes.length === 0 ? (
          <div className="p-6 text-center text-sm text-muted-foreground">Nenhuma solicitação ainda.</div>
        ) : (
          minhasSolicitacoes.map((f) => (
            <div key={f.id} className="flex items-center justify-between px-4 py-3 text-sm">
              <div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={f.status === "aprovada" ? "default" : f.status === "recusada" ? "outline" : "secondary"}
                    className={f.status === "aprovada" ? "bg-app-500" : f.status === "recusada" ? "border-destructive text-destructive" : ""}
                  >
                    {f.status}
                  </Badge>
                  <span className="font-medium">
                    {f.tipo === "troca" ? "Troca de turno" : "Folga"}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatDataBR(f.data_inicio)} – {formatDataBR(f.data_fim)}
                  {f.motivo && ` · ${f.motivo}`}
                </div>
              </div>
            </div>
          ))
        )}
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{tipo === "troca" ? "Solicitar troca de turno" : "Solicitar folga"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {tipo === "troca" && (
              <div className="space-y-1.5">
                <Label>Trocar com</Label>
                <Select value={colegaId} onValueChange={setColegaId}>
                  <SelectTrigger><SelectValue placeholder="Escolha um colega" /></SelectTrigger>
                  <SelectContent>
                    {colegas.map((c) => (
                      <SelectItem key={c.id} value={c.id}>{c.nome}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="i">Início</Label>
                <Input id="i" type="date" value={inicio} onChange={(e) => setInicio(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="f">Fim</Label>
                <Input id="f" type="date" value={fim} onChange={(e) => setFim(e.target.value)} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="mo">Motivo</Label>
              <Input id="mo" value={motivo} onChange={(e) => setMotivo(e.target.value)} placeholder="Opcional" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button className="bg-app-900 hover:bg-app-800" onClick={enviar} disabled={enviando}>
              {enviando ? "Enviando..." : "Enviar solicitação"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
