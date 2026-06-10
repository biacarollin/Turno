import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertCircle, CheckCircle2, Clock, Users, Plus } from "lucide-react";
import { PageHeader } from "@/components/app/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useOcorrencias, useAtualizarStatusOcorrencia } from "@/stores/ocorrencias";
import { useMembros, useTurnos } from "@/stores/equipe";
import { useFolgas } from "@/stores/folgas";
import { useSession, useMinhasEquipes } from "@/hooks/use-session";
import { findSegmento } from "@/lib/segmentos";

export const Route = createFileRoute("/app/")({
  component: Dashboard,
});

function Dashboard() {
  const { data: sessao } = useSession();
  const { data: equipes = [] } = useMinhasEquipes();

  const equipe_id = equipes[0]?.equipe_id;
  const filial_id = sessao?.filial_ativa_id ?? undefined;

  const { data: ocorrencias = [] } = useOcorrencias(equipe_id);
  const atualizarStatus = useAtualizarStatusOcorrencia();
  const { data: membros = [] } = useMembros(equipe_id);
  const { data: turnos = [] } = useTurnos(equipe_id);
  const { data: folgas = [] } = useFolgas(filial_id);

  const seg = findSegmento(sessao?.segmento ?? null);

  const abertas = ocorrencias.filter((o) => o.status === "aberta").length;
  const concluidas = ocorrencias.filter((o) => o.status === "concluida").length;
  const turnosAtivos = turnos.filter((t) => t.ativo).length;

  const urgentes = ocorrencias.filter(
    (o) => o.status === "aberta" && o.gravidade === "alta",
  );

  const stats = [
    { label: "Turnos ativos", value: turnosAtivos, icon: Clock },
    { label: "Ocorrências abertas", value: abertas, icon: AlertCircle },
    { label: "Concluídas", value: concluidas, icon: CheckCircle2 },
    { label: "Membros", value: membros.length, icon: Users },
  ];

  const totalRegistros = ocorrencias.length + membros.length + folgas.length;

  if (!sessao) {
    return (
      <div className="flex h-40 items-center justify-center text-muted-foreground">
        Carregando...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        title="Dashboard"
        subtitle={
          seg
            ? `Segmento: ${seg.topo.nome} · ${seg.sub.nome}`
            : "Visão geral da sua operação"
        }
      />

      {urgentes.length > 0 && (
        <Card className="border-red-300 bg-red-50/60 p-5">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-60"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-600"></span>
              </span>
              <h2 className="text-base font-semibold text-red-800">
                Urgente · {urgentes.length} ocorrência{urgentes.length > 1 ? "s" : ""} de alta gravidade
              </h2>
            </div>
            <Link to="/app/ocorrencias">
              <Button variant="ghost" size="sm" className="text-red-700 hover:text-red-800">Ver todas</Button>
            </Link>
          </div>
          <ul className="space-y-2">
            {urgentes.slice(0, 5).map((o) => (
              <li
                key={o.id}
                className="flex items-center justify-between gap-3 rounded-md border border-red-200 bg-background p-3"
              >
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{o.titulo}</div>
                  <div className="text-xs text-muted-foreground">
                    {o.tipo || "Sem tipo"} · {new Date(o.created_at).toLocaleString("pt-BR")}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-red-300 text-red-700 hover:bg-red-100"
                  onClick={() =>
                    atualizarStatus.mutate({
                      id: o.id,
                      status: "concluida",
                      equipe_id: equipe_id!,
                    })
                  }
                >
                  <CheckCircle2 className="mr-1 h-3.5 w-3.5" /> Concluir
                </Button>
              </li>
            ))}
          </ul>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{s.label}</span>
              <s.icon className="h-4 w-4 text-turno-500" />
            </div>
            <div className="mt-2 text-3xl font-medium text-foreground">{s.value}</div>
          </Card>
        ))}
      </div>

      {totalRegistros === 0 ? (
        <Card className="p-10 text-center">
          <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-turno-100 text-turno-700">
            <Plus className="h-6 w-6" />
          </div>
          <h2 className="text-lg font-medium">Comece a usar o Turno</h2>
          <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
            Você ainda não registrou nada. Cadastre os primeiros membros da equipe e comece a registrar ocorrências do dia.
          </p>
          <div className="mt-4 flex justify-center gap-2">
            <Link to="/app/membros">
              <Button className="bg-turno-600 hover:bg-turno-700">Adicionar membros</Button>
            </Link>
            <Link to="/app/ocorrencias">
              <Button variant="outline">Nova ocorrência</Button>
            </Link>
          </div>
        </Card>
      ) : (
        <Card className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-medium">Últimas ocorrências</h2>
            <Link to="/app/ocorrencias">
              <Button variant="ghost" size="sm">Ver todas</Button>
            </Link>
          </div>
          {ocorrencias.length === 0 ? (
            <div className="py-6 text-center text-sm text-muted-foreground">
              Nenhuma ocorrência registrada ainda.
            </div>
          ) : (
            <ul className="divide-y">
              {ocorrencias.slice(0, 5).map((o) => (
                <li key={o.id} className="flex items-center justify-between py-3">
                  <div>
                    <div className="text-sm font-medium">{o.titulo}</div>
                    <div className="text-xs text-muted-foreground">
                      {o.tipo || "Sem tipo"} · {new Date(o.created_at).toLocaleString("pt-BR")}
                    </div>
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      o.status === "aberta"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-turno-100 text-turno-800"
                    }`}
                  >
                    {o.status === "aberta" ? "Aberta" : "Concluída"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      )}
    </div>
  );
}