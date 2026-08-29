import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/app/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, CalendarDays, Check, X } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useFolgas, useCriarFolga, useAtualizarStatusFolga, useExcluirFolga } from "@/stores/folgas";
import { useMembros } from "@/stores/equipe";
import { useSession, useMinhasEquipes } from "@/hooks/use-session";

export const Route = createFileRoute("/app/folgas")({ component: Folgas });

function Folgas() {
  const { data: sessao } = useSession();
  const { data: equipes = [] } = useMinhasEquipes();
  const equipe_id = equipes[0]?.equipe_id;
  const filial_id = sessao?.filial_ativa_id ?? undefined;

  const { data: folgas = [], isLoading } = useFolgas(filial_id);
  const { data: membros = [] } = useMembros(equipe_id);
  const criar = useCriarFolga();
  const atualizarStatus = useAtualizarStatusFolga();
  const excluir = useExcluirFolga();

  const [open, setOpen] = useState(false);
  const [membroId, setMembroId] = useState<string>("");
  const [inicio, setInicio] = useState("");
  const [fim, setFim] = useState("");
  const [motivo, setMotivo] = useState("");

  const nomeMembro = (id: string | null) =>
    membros.find((m) => m.id === id)?.nome || "—";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inicio || !fim) return;
    try {
      await criar.mutateAsync({
        membro_id: membroId || null,
        data_inicio: inicio,
        data_fim: fim,
        motivo,
      });
      toast.success("Folga registrada");
      setOpen(false);
      setMembroId(""); setInicio(""); setFim(""); setMotivo("");
    } catch (e) { toast.error(e instanceof Error ? e.message : "Erro"); }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <PageHeader
        title="Folgas"
        subtitle="Registre e acompanhe folgas da equipe."
        actions={
          <Button className="bg-app-900 hover:bg-app-800" onClick={() => setOpen(true)}>
            <Plus className="h-4 w-4" /> Nova folga
          </Button>
        }
      />

      {isLoading ? (
        <Card className="p-8 text-center text-sm text-muted-foreground">Carregando...</Card>
      ) : folgas.length === 0 ? (
        <Card className="p-10 text-center">
          <CalendarDays className="mx-auto h-10 w-10 text-muted-foreground/40" />
          <h3 className="mt-3 text-base font-medium">Nenhuma folga registrada</h3>
          <p className="mt-1 text-sm text-muted-foreground">Quando alguém pedir folga, registre aqui.</p>
        </Card>
      ) : (
        <Card className="divide-y">
          {folgas.map((f) => (
            <div key={f.id} className="flex items-center justify-between px-4 py-3 text-sm">
              <div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={f.status === "aprovada" ? "default" : f.status === "recusada" ? "outline" : "secondary"}
                    className={f.status === "aprovada" ? "bg-app-500" : f.status === "recusada" ? "border-destructive text-destructive" : ""}
                  >
                    {f.status}
                  </Badge>
                  <span className="font-medium">{nomeMembro(f.membro_id)}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {new Date(f.data_inicio).toLocaleDateString("pt-BR")} – {new Date(f.data_fim).toLocaleDateString("pt-BR")}
                  {f.motivo && ` · ${f.motivo}`}
                </div>
              </div>
              <div className="flex gap-1">
                {f.status !== "aprovada" && (
                  <Button variant="ghost" size="icon"
                    onClick={() => atualizarStatus.mutate({ id: f.id, status: "aprovada", filial_id: f.filial_id })}>
                    <Check className="h-4 w-4 text-app-600" />
                  </Button>
                )}
                {f.status !== "recusada" && (
                  <Button variant="ghost" size="icon"
                    onClick={() => atualizarStatus.mutate({ id: f.id, status: "recusada", filial_id: f.filial_id })}>
                    <X className="h-4 w-4 text-amber-600" />
                  </Button>
                )}
                <Button variant="ghost" size="icon"
                  onClick={() => { if (confirm("Excluir?")) excluir.mutate({ id: f.id, filial_id: f.filial_id }); }}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
        </Card>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Nova folga</DialogTitle></DialogHeader>
          <form onSubmit={submit} className="space-y-4">
            {membros.length > 0 && (
              <div className="space-y-1.5">
                <Label>Membro</Label>
                <Select value={membroId} onValueChange={setMembroId}>
                  <SelectTrigger><SelectValue placeholder="Escolha um membro" /></SelectTrigger>
                  <SelectContent>
                    {membros.map((m) => (
                      <SelectItem key={m.id} value={m.id}>{m.nome}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="i">Início</Label>
                <Input id="i" type="date" value={inicio} onChange={(e) => setInicio(e.target.value)} required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="f">Fim</Label>
                <Input id="f" type="date" value={fim} onChange={(e) => setFim(e.target.value)} required />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="mo">Motivo</Label>
              <Input id="mo" value={motivo} onChange={(e) => setMotivo(e.target.value)} placeholder="Opcional" />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
              <Button type="submit" className="bg-app-900 hover:bg-app-800" disabled={criar.isPending}>Registrar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}