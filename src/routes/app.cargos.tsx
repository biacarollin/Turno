import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GripVertical, AlertCircle, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCargos, useMembros, useAdicionarCargo, useRenomearCargo, useExcluirMembro, type Cargo, type Membro } from "@/stores/equipe";
import { useSession, useMinhasEquipes } from "@/hooks/use-session";

export const Route = createFileRoute("/app/cargos")({ component: Cargos });

const CORES = ["#2a917a", "#1f7563", "#7c3aed", "#f59e0b", "#0ea5e9", "#ef4444", "#ec4899", "#64748b"];

function Cargos() {
  const { data: sessao } = useSession();
  const { data: equipes = [] } = useMinhasEquipes();
  const equipe_id = equipes[0]?.equipe_id;
  const filial_id = sessao?.filial_ativa_id ?? undefined;

  const { data: cargos = [] } = useCargos(filial_id);
  const { data: membros = [] } = useMembros(equipe_id);
  const adicionarCargo = useAdicionarCargo();
  const renomearCargo = useRenomearCargo();
  const excluirMembro = useExcluirMembro();

  const [novoOpen, setNovoOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [cor, setCor] = useState(CORES[0]);
  const [editId, setEditId] = useState<string | null>(null);

  const editando = cargos.find((c: Cargo) => c.id === editId) ?? null;
  const membrosDoCargo = (id: string) => membros.filter((m: Membro) => m.cargoId === id);

  const salvarNovo = async () => {
    if (!nome.trim()) return toast.error("Informe o nome");
    try {
      await adicionarCargo.mutateAsync({ nome: nome.trim(), cor });
      toast.success("Cargo criado");
      setNome(""); setCor(CORES[0]); setNovoOpen(false);
    } catch (e) { toast.error((e as Error).message); }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <PageHeader
        title="Cargos"
        subtitle="Cada cargo tem uma cor associada que aparece em toda a operação."
        actions={
          <Button className="bg-app-900 hover:bg-app-800" onClick={() => setNovoOpen(true)}>
            Novo cargo
          </Button>
        }
      />

      <div className="flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
        <p>Excluir um membro pelo cargo o remove de toda a operação. Para apenas trocar de cargo, edite o membro.</p>
      </div>

      <Card className="divide-y">
        {cargos.length === 0 ? (
          <div className="p-6 text-center text-sm text-muted-foreground">
            Nenhum cargo cadastrado ainda.
          </div>
        ) : (
          cargos.map((c: Cargo) => {
            const qtd = membrosDoCargo(c.id).length;
            return (
              <div key={c.id} className="flex items-center gap-3 px-4 py-3">
                <GripVertical className="h-4 w-4 cursor-grab text-muted-foreground" />
                <span className="h-4 w-4 rounded" style={{ backgroundColor: c.cor }} />
                <div className="flex-1">
                  <div className="font-medium">{c.nome}</div>
                  <div className="text-xs text-muted-foreground">{qtd} {qtd === 1 ? "membro" : "membros"}</div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setEditId(c.id)}>Editar</Button>
              </div>
            );
          })
        )}
      </Card>

      {/* Dialog Novo cargo */}
      <Dialog open={novoOpen} onOpenChange={setNovoOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Novo cargo</DialogTitle>
            <DialogDescription>Defina o nome e a cor.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>Nome</Label>
              <Input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex.: Coordenador" />
            </div>
            <div className="space-y-1.5">
              <Label>Cor</Label>
              <div className="flex flex-wrap gap-2">
                {CORES.map((c) => (
                  <button key={c} type="button" onClick={() => setCor(c)}
                    className={`h-7 w-7 rounded-full ring-offset-2 ${cor === c ? "ring-2 ring-foreground" : ""}`}
                    style={{ backgroundColor: c }} aria-label={c} />
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNovoOpen(false)}>Cancelar</Button>
            <Button className="bg-app-900 hover:bg-app-800" onClick={salvarNovo}>Adicionar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Editar cargo */}
      <Dialog open={!!editando} onOpenChange={(o) => !o && setEditId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar cargo</DialogTitle>
            <DialogDescription>Renomeie, mude a cor ou gerencie membros.</DialogDescription>
          </DialogHeader>
          {editando && equipe_id && (
            <EditarCargoForm
              key={editando.id}
              cargo={editando}
              membros={membrosDoCargo(editando.id)}
              onSalvar={async (novoNome, novaCor) => {
                try {
                  await renomearCargo.mutateAsync({ id: editando.id, nome: novoNome, cor: novaCor });
                  toast.success("Cargo atualizado");
                  setEditId(null);
                } catch (e) { toast.error((e as Error).message); }
              }}
              onExcluirMembro={async (id) => {
                try {
                  await excluirMembro.mutateAsync({ id, equipe_id });
                  toast.success("Membro removido");
                } catch (e) { toast.error((e as Error).message); }
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function EditarCargoForm({ cargo, membros, onSalvar, onExcluirMembro }: {
  cargo: { id: string; nome: string; cor: string };
  membros: { id: string; nome: string }[];
  onSalvar: (nome: string, cor: string) => void;
  onExcluirMembro: (id: string) => void;
}) {
  const [nome, setNome] = useState(cargo.nome);
  const [cor, setCor] = useState(cargo.cor);

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label>Nome</Label>
        <Input value={nome} onChange={(e) => setNome(e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <Label>Cor</Label>
        <div className="flex flex-wrap gap-2">
          {CORES.map((c) => (
            <button key={c} type="button" onClick={() => setCor(c)}
              className={`h-7 w-7 rounded-full ring-offset-2 ${cor === c ? "ring-2 ring-foreground" : ""}`}
              style={{ backgroundColor: c }} aria-label={c} />
          ))}
        </div>
      </div>
      <div className="space-y-1.5">
        <Label>Membros neste cargo</Label>
        {membros.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nenhum membro.</p>
        ) : (
          <div className="divide-y rounded-md border">
            {membros.map((m) => (
              <div key={m.id} className="flex items-center justify-between px-3 py-2 text-sm">
                <span>{m.nome}</span>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-red-600 hover:text-red-700"
                  onClick={() => onExcluirMembro(m.id)} aria-label={`Excluir ${m.nome}`}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
      <DialogFooter>
        <Button className="bg-app-900 hover:bg-app-800" onClick={() => onSalvar(nome.trim(), cor)}>
          Salvar
        </Button>
      </DialogFooter>
    </div>
  );
}