import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/app/PageHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileSignature, ShieldCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { usePassagens, useEncerrarTurno, type Passagem } from "@/stores/passagens";
import { useTurnos } from "@/stores/equipe";
import { useSession, useMinhasEquipes } from "@/hooks/use-session";
import { dataLocal, formatDataBR, hojeISO } from "@/lib/data";

export const Route = createFileRoute("/app/historico")({ component: Historico });

const FILTROS = [
  { id: "todas", label: "Todas" },
  { id: "hoje", label: "Hoje" },
  { id: "semana", label: "Esta semana" },
  { id: "pendentes", label: "Pendentes" },
  { id: "assinadas", label: "Assinadas" },
] as const;

function Historico() {
  const { data: sessao } = useSession();
  const { data: equipes = [] } = useMinhasEquipes();
  const equipe_id = equipes[0]?.equipe_id;

  const { data: passagens = [], isLoading } = usePassagens(equipe_id);
  const { data: turnos = [] } = useTurnos(equipe_id);
  const encerrarTurno = useEncerrarTurno();

  const [filtro, setFiltro] = useState<(typeof FILTROS)[number]["id"]>("todas");

  const [open, setOpen] = useState(false);
  const [turnoId, setTurnoId] = useState<string>("");
  const [resumo, setResumo] = useState("");
  const [assinadoPor, setAssinadoPor] = useState("");
  const [salvando, setSalvando] = useState(false);

  const [detalhe, setDetalhe] = useState<Passagem | null>(null);

  const turnoDe = (turno_id: string | null) => turnos.find((t) => t.id === turno_id);

  const filtradas = useMemo(() => {
    const hoje = hojeISO();
    const inicioSemana = new Date();
    inicioSemana.setDate(inicioSemana.getDate() - inicioSemana.getDay());
    inicioSemana.setHours(0, 0, 0, 0);

    return passagens.filter((p) => {
      if (filtro === "hoje") return p.data.slice(0, 10) === hoje;
      if (filtro === "semana") return dataLocal(p.data) >= inicioSemana;
      if (filtro === "pendentes") return !p.hash_assinatura;
      if (filtro === "assinadas") return !!p.hash_assinatura;
      return true;
    });
  }, [passagens, filtro]);

  const abrirEncerrar = () => {
    setTurnoId(turnos.find((t) => t.ativo)?.id ?? turnos[0]?.id ?? "");
    setResumo("");
    setAssinadoPor(sessao?.nome_completo ?? "");
    setOpen(true);
  };

  const salvar = async () => {
    if (!equipe_id) return toast.error("Nenhuma equipe ativa");
    if (!resumo.trim()) return toast.error("Escreva um resumo do turno");
    if (!assinadoPor.trim()) return toast.error("Informe quem está assinando");

    setSalvando(true);
    try {
      await encerrarTurno.mutateAsync({
        equipe_id,
        turno_id: turnoId || undefined,
        data: hojeISO(),
        resumo: resumo.trim(),
        assinado_por: assinadoPor.trim(),
      });
      toast.success("Passagem de turno registrada e assinada");
      setOpen(false);
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        title="Passagens de turno"
        subtitle={`Histórico completo${sessao?.filial_nome ? ` · ${sessao.filial_nome}` : ""}`}
        actions={
          <Button className="bg-app-900 hover:bg-app-800" onClick={abrirEncerrar}>
            Encerrar turno
          </Button>
        }
      />

      <div className="flex flex-wrap gap-2">
        {FILTROS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFiltro(f.id)}
            className={`rounded-[7px] px-3.5 py-1.5 text-xs font-semibold transition ${
              filtro === f.id
                ? "bg-app-900 text-white"
                : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <Card className="overflow-hidden rounded-xl border-gray-200 p-0">
        {isLoading ? (
          <div className="p-8 text-center text-sm text-muted-foreground">Carregando...</div>
        ) : filtradas.length === 0 ? (
          <div className="p-10 text-center">
            <FileSignature className="mx-auto h-10 w-10 text-muted-foreground/40" />
            <h3 className="mt-3 text-base font-medium">Nenhuma passagem encontrada</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Quando a equipe começar a registrar passagens de turno, elas aparecerão aqui automaticamente.
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100/70 hover:bg-gray-100/70">
                <TableHead className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">Turno</TableHead>
                <TableHead className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">Colaborador</TableHead>
                <TableHead className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">Data</TableHead>
                <TableHead className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtradas.map((p) => {
                const turno = turnoDe(p.turno_id);
                return (
                  <TableRow
                    key={p.id}
                    className="cursor-pointer border-gray-100 hover:bg-gray-50"
                    onClick={() => setDetalhe(p)}
                  >
                    <TableCell className="text-xs font-semibold text-gray-700">
                      {turno?.nome ?? "—"}
                    </TableCell>
                    <TableCell className="text-xs text-gray-600">{p.assinado_por || "—"}</TableCell>
                    <TableCell className="text-xs text-gray-700">{formatDataBR(p.data)}</TableCell>
                    <TableCell>
                      {p.hash_assinatura ? (
                        <Badge className="rounded-md bg-app-100 px-2.5 py-1 text-[10px] font-semibold text-app-700 hover:bg-app-100">
                          <ShieldCheck className="mr-1 h-3 w-3" /> Assinado
                        </Badge>
                      ) : (
                        <Badge className="rounded-md bg-amber-100 px-2.5 py-1 text-[10px] font-semibold text-amber-700 hover:bg-amber-100">
                          Em andamento
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </Card>

      {/* Diálogo: encerrar turno */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Encerrar turno</DialogTitle>
            <DialogDescription>
              Registre a passagem de plantão. Ela fica assinada e disponível no histórico.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>Turno</Label>
              <Select value={turnoId} onValueChange={setTurnoId}>
                <SelectTrigger><SelectValue placeholder="Selecione o turno" /></SelectTrigger>
                <SelectContent>
                  {turnos.map((t) => (
                    <SelectItem key={t.id} value={t.id}>{t.nome}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="resumo">Resumo da passagem</Label>
              <Textarea
                id="resumo"
                rows={6}
                value={resumo}
                onChange={(e) => setResumo(e.target.value)}
                placeholder="O que aconteceu neste turno, ocorrências em aberto, o que o próximo turno precisa saber..."
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="assinadoPor">Assinado por</Label>
              <Input
                id="assinadoPor"
                value={assinadoPor}
                onChange={(e) => setAssinadoPor(e.target.value)}
                placeholder="Nome de quem está encerrando o turno"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)} disabled={salvando}>Cancelar</Button>
            <Button className="bg-app-900 hover:bg-app-800" onClick={salvar} disabled={salvando}>
              {salvando ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Assinar e encerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo: ver detalhes de uma passagem */}
      <Dialog open={!!detalhe} onOpenChange={(v) => !v && setDetalhe(null)}>
        <DialogContent className="max-w-lg">
          {detalhe && (
            <>
              <DialogHeader>
                <DialogTitle>{turnoDe(detalhe.turno_id)?.nome ?? "Passagem de turno"}</DialogTitle>
                <DialogDescription>{formatDataBR(detalhe.data)}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 text-sm">
                <div className="rounded-md border bg-muted/30 p-3 text-gray-700 whitespace-pre-wrap">
                  {detalhe.resumo || "Sem resumo registrado."}
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <div className="text-muted-foreground">Assinado por</div>
                    <div className="font-medium text-gray-900">{detalhe.assinado_por || "—"}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Assinado em</div>
                    <div className="font-medium text-gray-900">
                      {detalhe.assinado_em
                        ? new Date(detalhe.assinado_em).toLocaleString("pt-BR")
                        : "—"}
                    </div>
                  </div>
                </div>
                {detalhe.hash_assinatura ? (
                  <div>
                    <div className="text-xs text-muted-foreground">Hash da assinatura digital</div>
                    <div className="mt-1 flex items-center gap-1.5 break-all rounded-md bg-app-50 p-2 font-mono text-[10px] text-app-800">
                      <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-app-600" />
                      {detalhe.hash_assinatura}
                    </div>
                  </div>
                ) : (
                  <Badge variant="outline" className="text-amber-700">Ainda não assinada</Badge>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDetalhe(null)}>Fechar</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
