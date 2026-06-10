import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { PageHeader } from "@/components/app/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Lock, StickyNote } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useNotas, useCriarNota, useExcluirNota, searchUsernames, type UsernameResult } from "@/stores/notas";
import { useSession } from "@/hooks/use-session";

export const Route = createFileRoute("/app/notas")({ component: Notas });

function Notas() {
  const { data: sessao } = useSession();
  const filial_id = sessao?.filial_ativa_id ?? undefined;

  const { data: notas = [], isLoading } = useNotas(filial_id);
  const criar = useCriarNota();
  const excluir = useExcluirNota();

  const [open, setOpen] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [destinatario, setDestinatario] = useState("");
  const [sugestoes, setSugestoes] = useState<UsernameResult[]>([]);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const q = destinatario.trim().replace(/^@/, "");
    if (q.length < 1) { setSugestoes([]); return; }
    debounceRef.current = setTimeout(async () => {
      try { setSugestoes(await searchUsernames(q)); } catch { setSugestoes([]); }
    }, 200);
  }, [destinatario]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim()) return;
    try {
      await criar.mutateAsync({
        titulo: titulo.trim(),
        conteudo,
        destinatario_username: destinatario.trim() || undefined,
      });
      toast.success("Nota salva");
      setOpen(false);
      setTitulo(""); setConteudo(""); setDestinatario("");
    } catch (e) { toast.error(e instanceof Error ? e.message : "Erro"); }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <PageHeader
        title="Notas privadas"
        subtitle={
          <span className="inline-flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5" /> Visível para você (e para o destinatário, se houver)
          </span>
        }
        actions={
          <Button className="bg-turno-600 hover:bg-turno-700" onClick={() => setOpen(true)}>
            <Plus className="h-4 w-4" /> Nova nota
          </Button>
        }
      />

      {isLoading ? (
        <Card className="p-8 text-center text-sm text-muted-foreground">Carregando...</Card>
      ) : notas.length === 0 ? (
        <Card className="p-10 text-center">
          <StickyNote className="mx-auto h-10 w-10 text-muted-foreground/40" />
          <h3 className="mt-3 text-base font-medium">Nenhuma nota ainda</h3>
          <p className="mt-1 text-sm text-muted-foreground">Use este espaço para anotações privadas sobre a equipe ou operação.</p>
        </Card>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {notas.map((n) => (
            <Card key={n.id} className="p-4">
              <div className="flex items-start justify-between">
                <div className="font-medium">{n.titulo}</div>
                <Button variant="ghost" size="icon"
                  onClick={() => { if (confirm("Excluir?")) excluir.mutate({ id: n.id, filial_id: n.filial_id }); }}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
              {n.conteudo && (
                <p className="mt-1 text-sm text-muted-foreground whitespace-pre-wrap">{n.conteudo}</p>
              )}
              <div className="mt-2 text-xs text-muted-foreground">
                {new Date(n.created_at).toLocaleString("pt-BR")}
              </div>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Nova nota</DialogTitle></DialogHeader>
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="nt">Título</Label>
              <Input id="nt" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="nd">Destinatário (opcional)</Label>
              <Input
                id="nd"
                placeholder="@nome-sobrenome"
                value={destinatario}
                onChange={(e) => setDestinatario(e.target.value)}
                autoComplete="off"
              />
              {sugestoes.length > 0 && (
                <ul className="mt-1 max-h-40 overflow-y-auto rounded-md border bg-popover text-sm shadow">
                  {sugestoes.map((u) => (
                    <li key={u.user_id}>
                      <button
                        type="button"
                        className="flex w-full items-center justify-between gap-2 px-3 py-1.5 text-left hover:bg-muted"
                        onClick={() => { setDestinatario("@" + u.username); setSugestoes([]); }}
                      >
                        <span>@{u.username}</span>
                        {u.nome_completo && <span className="text-xs text-muted-foreground">{u.nome_completo}</span>}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <p className="text-xs text-muted-foreground">Se preenchido, a nota também aparece para essa pessoa.</p>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="nc">Conteúdo</Label>
              <Textarea id="nc" value={conteudo} onChange={(e) => setConteudo(e.target.value)} className="min-h-28" />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
              <Button type="submit" className="bg-turno-600 hover:bg-turno-700" disabled={criar.isPending}>Salvar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}