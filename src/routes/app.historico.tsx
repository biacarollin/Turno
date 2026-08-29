import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/app/PageHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileSignature, ShieldCheck } from "lucide-react";
import { usePassagens } from "@/stores/passagens";
import { useTurnos } from "@/stores/equipe";
import { useSession, useMinhasEquipes } from "@/hooks/use-session";

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

  const [filtro, setFiltro] = useState<(typeof FILTROS)[number]["id"]>("todas");

  const turnoDe = (turno_id: string | null) => turnos.find((t) => t.id === turno_id);

  const filtradas = useMemo(() => {
    const hoje = new Date();
    const inicioSemana = new Date(hoje);
    inicioSemana.setDate(hoje.getDate() - hoje.getDay());
    inicioSemana.setHours(0, 0, 0, 0);

    return passagens.filter((p) => {
      const data = new Date(p.data);
      if (filtro === "hoje") return data.toDateString() === hoje.toDateString();
      if (filtro === "semana") return data >= inicioSemana;
      if (filtro === "pendentes") return !p.hash_assinatura;
      if (filtro === "assinadas") return !!p.hash_assinatura;
      return true;
    });
  }, [passagens, filtro]);

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        title="Passagens de turno"
        subtitle={`Histórico completo${sessao?.filial_nome ? ` · ${sessao.filial_nome}` : ""}`}
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
                  <TableRow key={p.id} className="border-gray-100">
                    <TableCell className="text-xs font-semibold text-gray-700">
                      {turno?.nome ?? "—"}
                    </TableCell>
                    <TableCell className="text-xs text-gray-600">{p.assinado_por || "—"}</TableCell>
                    <TableCell className="text-xs text-gray-700">
                      {new Date(p.data).toLocaleDateString("pt-BR")}
                    </TableCell>
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
    </div>
  );
}
