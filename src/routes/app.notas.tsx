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
          <Button className="bg-app-900 hover:bg-app-800" onClick={() => setOpen(true)}>
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
        <div className="grid gap-4 md:grid-cols-2">
          {notas.map((n) => {
            const iniciais = n.titulo.split(/\s+/).map((s) => s[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
            return (
              <Card key={n.id} className="rounded-xl border-gray-200 p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-app-600 text-[10px] font-bold text-app-200">
                      {iniciais || "?"}
                    </span>
                    <div>
                      <div className="text-[12px] font-semibold text-gray-900">{n.titulo}</div>
                      <div className="text-[10px] text-gray-400">
                        {new Date(n.created_at).toLocaleDateString("pt-BR")}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-7 w-7"
                    onClick={() => { if (confirm("Excluir?")) excluir.mutate({ id: n.id, filial_id: n.filial_id }); }}>
                    <Trash2 className="h-3.5 w-3.5 text-destructive" />
                  </Button>
                </div>
                {n.conteudo && (
                  <p className="mt-3 border-t border-gray-100 pt-3 text-[12px] leading-relaxed text-gray-700 whitespace-pre-wrap">
                    {n.conteudo}
                  </p>
                )}
              </Card>
            );
          })}
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
              <Button type="submit" className="bg-app-900 hover:bg-app-800" disabled={criar.isPending}>Salvar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}