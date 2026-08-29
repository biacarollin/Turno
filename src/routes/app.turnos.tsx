import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Clock, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useTurnos, useSalvarTurno, useExcluirTurno, type TurnoRecord } from "@/stores/equipe";
import { useSession, useMinhasEquipes } from "@/hooks/use-session";

export const Route = createFileRoute("/app/turnos")({ component: Turnos });

type FormTurno = Omit<TurnoRecord, "id"> & { id?: string };

const turnoVazio: FormTurno = {
  nome: "", inicio: "08:00", fim: "16:00",
  cargos: [], antecedencia: 15, posLimite: 30, ativo: true,
};

function Turnos() {
  const { data: equipes = [] } = useMinhasEquipes();
  const equipe_id = equipes[0]?.equipe_id;

  const { data: turnos = [], isLoading } = useTurnos(equipe_id);
  const salvarTurno = useSalvarTurno();
  const excluirTurno = useExcluirTurno();

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormTurno>(turnoVazio);
  const [cargosTxt, setCargosTxt] = useState("");

  const abrirNovo = () => { setForm(turnoVazio); setCargosTxt(""); setOpen(true); };
  const abrirEditar = (t: TurnoRecord) => { setForm(t); setCargosTxt(t.cargos.join(", ")); setOpen(true); };

  const salvar = async () => {
    if (!form.nome.trim()) { toast.error("Informe o nome do turno"); return; }
    if (!equipe_id) { toast.error("Nenhuma equipe ativa"); return; }
    const cargos = cargosTxt.split(",").map((c) => c.trim()).filter(Boolean);
    try {
      await salvarTurno.mutateAsync({ ...form, cargos, equipe_id });
      toast.success(form.id ? "Turno atualizado" : "Turno criado");
      setOpen(false);
    } catch (e) { toast.error((e as Error).message); }
  };

  const remover = async () => {
    if (!form.id || !equipe_id) return;
    try {
      await excluirTurno.mutateAsync({ id: form.id, equipe_id });
      toast.success("Turno excluído");
      setOpen(false);
    } catch (e) { toast.error((e as Error).message); }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <PageHeader
        title="Turnos"
        subtitle="Defina janelas, notificações antecipadas e limite pós-encerramento."
        actions={
          <Button className="bg-app-900 hover:bg-app-800" onClick={abrirNovo}>
            Novo turno
          </Button>
        }
      />

      {isLoading && <div className="text-sm text-muted-foreground">Carregando...</div>}
      {!isLoading && turnos.length === 0 && (
        <Card className="p-6 text-center text-sm text-muted-foreground">
          Nenhum turno cadastrado. Clique em "Novo turno".
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {turnos.map((t) => (
          <Card key={t.id} className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-base font-medium">{t.nome}</div>
                <div className="mt-1 font-mono text-sm text-muted-foreground">{t.inicio} – {t.fim}</div>
              </div>
              <Badge className={t.ativo ? "bg-app-500" : "bg-muted text-muted-foreground"}>
                {t.ativo ? "Ativo" : "Inativo"}
              </Badge>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {t.cargos.map((c) => (
                <Badge key={c} variant="secondary" className="bg-app-100 text-app-700">{c}</Badge>
              ))}
            </div>
            <div className="mt-4 space-y-2 border-t pt-4 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Bell className="h-3.5 w-3.5" />
                Notificação antecipada: <strong className="text-foreground">{t.antecedencia} min</strong>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                Limite pós-encerramento: <strong className="text-foreground">{t.posLimite} min</strong>
              </div>
            </div>
            <Button variant="outline" className="mt-4 w-full" onClick={() => abrirEditar(t)}>
              Editar turno
            </Button>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{form.id ? "Editar turno" : "Novo turno"}</DialogTitle>
            <DialogDescription>Configure a janela, cargos e regras de notificação.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="nome">Nome</Label>
              <Input id="nome" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} placeholder="Ex.: Manhã" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="inicio">Início</Label>
                <Input id="inicio" type="time" value={form.inicio} onChange={(e) => setForm({ ...form, inicio: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="fim">Fim</Label>
                <Input id="fim" type="time" value={form.fim} onChange={(e) => setForm({ ...form, fim: e.target.value })} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="cargos">Cargos (separados por vírgula)</Label>
              <Input id="cargos" value={cargosTxt} onChange={(e) => setCargosTxt(e.target.value)} placeholder="Farmacêutico, Auxiliar" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="ant">Notificação antecipada (min)</Label>
                <Input id="ant" type="number" min={0} value={form.antecedencia} onChange={(e) => setForm({ ...form, antecedencia: Number(e.target.value) })} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="pos">Limite pós-encerramento (min)</Label>
                <Input id="pos" type="number" min={0} value={form.posLimite} onChange={(e) => setForm({ ...form, posLimite: Number(e.target.value) })} />
              </div>
            </div>
            <div className="flex items-center justify-between rounded-md border p-3">
              <div>
                <Label htmlFor="ativo">Turno ativo</Label>
                <p className="text-xs text-muted-foreground">Quando inativo, não gera passagens.</p>
              </div>
              <Switch id="ativo" checked={form.ativo} onCheckedChange={(v) => setForm({ ...form, ativo: v })} />
            </div>
          </div>
          <DialogFooter className={form.id ? "!justify-between" : ""}>
            {form.id && (
              <Button variant="destructive" onClick={remover}>
                <Trash2 className="mr-1 h-4 w-4" /> Excluir
              </Button>
            )}
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
              <Button className="bg-app-900 hover:bg-app-800" onClick={salvar}>Salvar</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}