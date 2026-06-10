import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Trash2, CheckCircle2, RotateCcw, AlertCircle } from "lucide-react";
import { PageHeader } from "@/components/app/PageHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useOcorrencias, useCriarOcorrencia, useAtualizarStatusOcorrencia, useExcluirOcorrencia } from "@/stores/ocorrencias";
import { useTiposOcorrencia } from "@/stores/segmento";
import { useSession, useMinhasEquipes } from "@/hooks/use-session";

export const Route = createFileRoute("/app/ocorrencias")({ component: Ocorrencias });

function Ocorrencias() {
  const { data: sessao } = useSession();
  const { data: equipes = [] } = useMinhasEquipes();
  const equipe_id = equipes[0]?.equipe_id;
  const filial_id = sessao?.filial_ativa_id ?? undefined;

  const { data: lista = [], isLoading } = useOcorrencias(equipe_id);
  const { data: tipos = [] } = useTiposOcorrencia(filial_id);
  const criar = useCriarOcorrencia();
  const atualizarStatus = useAtualizarStatusOcorrencia();
  const excluir = useExcluirOcorrencia();

  const [open, setOpen] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState<string>("");
  const [tipoCustom, setTipoCustom] = useState<string>("");
  const [gravidade, setGravidade] = useState<"baixa" | "media" | "alta">("media");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim() || !equipe_id) return;
    const tipoFinal = tipo === "__outros__" ? tipoCustom.trim() : tipo;
    try {
      await criar.mutateAsync({
        equipe_id,
        titulo: titulo.trim(),
        descricao,
        tipo: tipoFinal,
        gravidade,
      });
      toast.success("Ocorrência registrada");
      setOpen(false);
      setTitulo(""); setDescricao(""); setTipo(""); setTipoCustom(""); setGravidade("media");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erro");
    }
  };

  const gravBadge = (g: string) =>
    g === "alta" ? "border-red-500 bg-red-50 text-red-700"
    : g === "media" ? "border-amber-500 text-amber-700"
    : "border-emerald-500 text-emerald-700";

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <PageHeader
        title="Ocorrências"
        subtitle="Registre tudo o que acontece nos turnos."
        actions={
          <Button className="bg-turno-600 hover:bg-turno-700" onClick={() => setOpen(true)}>
            <Plus className="h-4 w-4" /> Nova ocorrência
          </Button>
        }
      />

      {isLoading ? (
        <Card className="p-8 text-center text-sm text-muted-foreground">Carregando...</Card>
      ) : lista.length === 0 ? (
        <Card className="p-10 text-center">
          <AlertCircle className="mx-auto h-10 w-10 text-muted-foreground/40" />
          <h3 className="mt-3 text-base font-medium">Nenhuma ocorrência ainda</h3>
          <p className="mt-1 text-sm text-muted-foreground">Quando algo acontecer no turno, registre aqui.</p>
          <Button className="mt-4 bg-turno-600 hover:bg-turno-700" onClick={() => setOpen(true)}>
            <Plus className="h-4 w-4" /> Registrar primeira ocorrência
          </Button>
        </Card>
      ) : (
        <div className="space-y-3">
          {lista.map((o) => (
            <Card key={o.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={gravBadge(o.gravidade)}>
                      {o.gravidade === "alta" ? "Alta" : o.gravidade === "media" ? "Média" : "Baixa"}
                    </Badge>
                    <Badge className={o.status === "aberta" ? "bg-amber-500" : "bg-turno-500"}>
                      {o.status === "aberta" ? "Aberta" : "Concluída"}
                    </Badge>
                    {o.tipo && <span className="text-xs text-muted-foreground">{o.tipo}</span>}
                  </div>
                  <div className="mt-1.5 font-medium">{o.titulo}</div>
                  {o.descricao && <p className="mt-1 text-sm text-muted-foreground">{o.descricao}</p>}
                  <div className="mt-1 text-xs text-muted-foreground">{new Date(o.created_at).toLocaleString("pt-BR")}</div>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost" size="icon" aria-label="Alternar status"
                    onClick={() => atualizarStatus.mutate({
                      id: o.id,
                      status: o.status === "aberta" ? "concluida" : "aberta",
                      equipe_id: equipe_id!,
                    })}
                  >
                    {o.status === "aberta"
                      ? <CheckCircle2 className="h-4 w-4 text-turno-600" />
                      : <RotateCcw className="h-4 w-4 text-amber-600" />}
                  </Button>
                  <Button
                    variant="ghost" size="icon" aria-label="Excluir"
                    onClick={() => {
                      if (confirm("Excluir ocorrência?"))
                        excluir.mutate({ id: o.id, equipe_id: equipe_id! });
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Nova ocorrência</DialogTitle></DialogHeader>
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="t">Título</Label>
              <Input id="t" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
            </div>
            <div className="space-y-1.5">
              <Label>Tipo</Label>
              <Select
                value={tipo}
                onValueChange={(v) => {
                  setTipo(v);
                  if (v !== "__outros__") {
                    setTipoCustom("");
                    const t = tipos.find((x) => x.nome === v);
                    if (t) setGravidade(t.gravidade_default as "baixa" | "media" | "alta");
                  }
                }}
              >
                <SelectTrigger><SelectValue placeholder="Escolha um tipo" /></SelectTrigger>
                <SelectContent>
                  {tipos.map((t) => <SelectItem key={t.id} value={t.nome}>{t.nome}</SelectItem>)}
                  <SelectItem value="__outros__">Outros</SelectItem>
                </SelectContent>
              </Select>
              {tipo === "__outros__" && (
                <Input
                  className="mt-2"
                  placeholder="Descreva o tipo"
                  value={tipoCustom}
                  onChange={(e) => setTipoCustom(e.target.value)}
                />
              )}
            </div>
            <div className="space-y-1.5">
              <Label>Gravidade</Label>
              <div className="grid grid-cols-3 gap-2">
                {(["baixa", "media", "alta"] as const).map((g) => {
                  const selected = gravidade === g;
                  const styles =
                    g === "baixa"
                      ? selected ? "border-emerald-500 bg-emerald-50 text-emerald-800" : "border-input text-muted-foreground hover:border-emerald-300 hover:text-emerald-700"
                      : g === "media"
                      ? selected ? "border-amber-500 bg-amber-50 text-amber-800" : "border-input text-muted-foreground hover:border-amber-300 hover:text-amber-700"
                      : selected ? "border-red-500 bg-red-50 text-red-800" : "border-input text-muted-foreground hover:border-red-300 hover:text-red-700";
                  return (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGravidade(g)}
                      className={`rounded-md border px-3 py-2 text-sm font-medium transition ${styles}`}
                    >
                      {g === "alta" ? "Alta" : g === "media" ? "Média" : "Baixa"}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="d">Descrição</Label>
              <Textarea id="d" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
              <Button type="submit" className="bg-turno-600 hover:bg-turno-700" disabled={criar.isPending}>Registrar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}