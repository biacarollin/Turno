import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Trash2, AlertCircle } from "lucide-react";
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

  const gravInfo: Record<string, { bar: string; badge: string; label: string }> = {
    alta: { bar: "bg-amber-500", badge: "bg-amber-100 text-amber-700", label: "Alta" },
    media: { bar: "bg-orange-500", badge: "bg-orange-50 text-orange-700", label: "Média" },
    baixa: { bar: "bg-app-500", badge: "bg-app-100 text-app-700", label: "Baixa" },
  };

  const [filtroGrav, setFiltroGrav] = useState<"todas" | "alta" | "media" | "baixa" | "resolvidas">("todas");
  const listaFiltrada = lista.filter((o) => {
    if (filtroGrav === "todas") return true;
    if (filtroGrav === "resolvidas") return o.status === "concluida";
    return o.gravidade === filtroGrav && o.status === "aberta";
  });

  const filtros: { id: typeof filtroGrav; label: string }[] = [
    { id: "todas", label: "Todas" },
    { id: "alta", label: "Alta" },
    { id: "media", label: "Média" },
    { id: "baixa", label: "Baixa" },
    { id: "resolvidas", label: "Resolvidas" },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        title="Ocorrências"
        subtitle="Registre tudo o que acontece nos turnos."
        actions={
          <Button className="bg-app-900 hover:bg-app-800" onClick={() => setOpen(true)}>
            <Plus className="h-4 w-4" /> Nova ocorrência
          </Button>
        }
      />

      {lista.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {filtros.map((f) => (
            <button
              key={f.id}
              onClick={() => setFiltroGrav(f.id)}
              className={`rounded-[7px] px-3.5 py-1.5 text-xs font-semibold transition ${
                filtroGrav === f.id
                  ? "bg-app-900 text-white"
                  : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      {isLoading ? (
        <Card className="p-8 text-center text-sm text-muted-foreground">Carregando...</Card>
      ) : lista.length === 0 ? (
        <Card className="p-10 text-center">
          <AlertCircle className="mx-auto h-10 w-10 text-muted-foreground/40" />
          <h3 className="mt-3 text-base font-medium">Nenhuma ocorrência ainda</h3>
          <p className="mt-1 text-sm text-muted-foreground">Quando algo acontecer no turno, registre aqui.</p>
          <Button className="mt-4 bg-app-900 hover:bg-app-800" onClick={() => setOpen(true)}>
            <Plus className="h-4 w-4" /> Registrar primeira ocorrência
          </Button>
        </Card>
      ) : listaFiltrada.length === 0 ? (
        <Card className="p-8 text-center text-sm text-muted-foreground">Nenhuma ocorrência neste filtro.</Card>
      ) : (
        <div className="space-y-2">
          {listaFiltrada.map((o) => {
            const info = gravInfo[o.gravidade];
            const resolvida = o.status === "concluida";
            return (
              <Card
                key={o.id}
                className={`flex items-stretch gap-3 rounded-[10px] border-gray-200 p-0 pr-3 ${resolvida ? "bg-gray-50/60" : ""}`}
              >
                <span className={`w-1 shrink-0 rounded-l-[10px] ${info.bar}`} />
                <div className="flex flex-1 items-center justify-between gap-3 py-3.5 min-w-0">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`truncate text-[13px] font-semibold ${resolvida ? "text-gray-400" : "text-gray-900"}`}>
                        {o.titulo}
                      </span>
                      {o.tipo && <span className="shrink-0 text-xs text-muted-foreground">{o.tipo}</span>}
                    </div>
                    <div className="mt-0.5 text-[11px] text-gray-400">
                      {new Date(o.created_at).toLocaleString("pt-BR")}
                    </div>
                    {o.descricao && <p className="mt-1 text-xs text-muted-foreground">{o.descricao}</p>}
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <Badge className={`rounded-md px-2 py-0.5 text-[10px] font-semibold hover:bg-inherit ${info.badge}`}>
                      {info.label}
                    </Badge>
                    <button
                      onClick={() => atualizarStatus.mutate({
                        id: o.id,
                        status: resolvida ? "aberta" : "concluida",
                        equipe_id: equipe_id!,
                      })}
                      className="text-[11px] font-semibold text-app-600 hover:underline"
                    >
                      {resolvida ? "✓ Resolvido" : "Resolver →"}
                    </button>
                    <Button
                      variant="ghost" size="icon" className="h-7 w-7" aria-label="Excluir"
                      onClick={() => {
                        if (confirm("Excluir ocorrência?"))
                          excluir.mutate({ id: o.id, equipe_id: equipe_id! });
                      }}
                    >
                      <Trash2 className="h-3.5 w-3.5 text-destructive" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
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
              <Button type="submit" className="bg-app-900 hover:bg-app-800" disabled={criar.isPending}>Registrar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}