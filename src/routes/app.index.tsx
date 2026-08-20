import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertCircle, CheckCircle2, Clock, Plus, ShieldCheck, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/app/PageHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useOcorrencias, useAtualizarStatusOcorrencia } from "@/stores/ocorrencias";
import { useMembros, useTurnos } from "@/stores/equipe";
import { useFolgas } from "@/stores/folgas";
import { usePassagens } from "@/stores/passagens";
import { useSession, useMinhasEquipes } from "@/hooks/use-session";
import { findSegmento } from "@/lib/segmentos";

export const Route = createFileRoute("/app/")({
  component: Dashboard,
});

const AVATAR_CORES = ["bg-app-600", "bg-blue-700", "bg-violet-700", "bg-amber-700", "bg-pink-700"];
const corAvatar = (seed: string) => {
  const i = seed.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return AVATAR_CORES[i % AVATAR_CORES.length];
};
const iniciais = (nome: string) =>
  nome.split(/\s+/).map((s) => s[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();

const gravidadeInfo: Record<string, { bar: string; badge: string; label: string }> = {
  alta: { bar: "bg-amber-500", badge: "bg-amber-100 text-amber-700", label: "Alta" },
  media: { bar: "bg-orange-500", badge: "bg-orange-50 text-orange-700", label: "Média" },
  baixa: { bar: "bg-app-500", badge: "bg-app-100 text-app-700", label: "Baixa" },
};

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
  const { data: passagens = [] } = usePassagens(equipe_id);

  const seg = findSegmento(sessao?.segmento ?? null);

  const abertas = ocorrencias.filter((o) => o.status === "aberta").length;
  const concluidas = ocorrencias.filter((o) => o.status === "concluida").length;
  const turnosAtivos = turnos.filter((t) => t.ativo);
  const criticaPendente = ocorrencias.some((o) => o.status === "aberta" && o.gravidade === "alta");

  const assinadasHoje = passagens.filter((p) => {
    const hoje = new Date().toDateString();
    return p.hash_assinatura && new Date(p.data).toDateString() === hoje;
  }).length;

  const urgentes = ocorrencias.filter(
    (o) => o.status === "aberta" && o.gravidade === "alta",
  );

  const abertasOrdenadas = ocorrencias
    .filter((o) => o.status === "aberta")
    .slice(0, 4);

  const stats = [
    { label: "Turnos ativos", value: turnosAtivos.length, icon: Clock, hint: turnosAtivos[0]?.nome ?? "Nenhum turno ativo" },
    { label: "Ocorrências abertas", value: abertas, icon: AlertCircle, hint: criticaPendente ? "1+ crítica pendente" : "Sem críticas" },
    { label: "Concluídas", value: concluidas, icon: CheckCircle2, hint: "No total" },
    { label: "Assinadas hoje", value: assinadasHoje, icon: ShieldCheck, hint: `${membros.length} membros na equipe` },
  ];

  const totalRegistros = ocorrencias.length + membros.length + folgas.length;

  if (!sessao) {
    return (
      <div className="flex h-40 items-center justify-center text-muted-foreground">
        Carregando...
      </div>
    );
  }

  const turnoAtivo = turnosAtivos[0];
  const membrosDoTurno = turnoAtivo
    ? membros.filter((m) => m.turnoNome === turnoAtivo.nome)
    : [];

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        title="Visão geral"
        subtitle={
          seg
            ? `${seg.topo.nome} · ${seg.sub.nome}${sessao.filial_nome ? ` · ${sessao.filial_nome}` : ""}`
            : "Visão geral da sua operação"
        }
      />

      {urgentes.length > 0 && (
        <Card className="border-amber-300 bg-amber-50/60 p-5">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-500 opacity-60"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-600"></span>
              </span>
              <h2 className="text-base font-semibold text-amber-800">
                Urgente · {urgentes.length} ocorrência{urgentes.length > 1 ? "s" : ""} de alta gravidade
              </h2>
            </div>
            <Link to="/app/ocorrencias">
              <Button variant="ghost" size="sm" className="text-amber-700 hover:text-amber-800">Ver todas</Button>
            </Link>
          </div>
          <ul className="space-y-2">
            {urgentes.slice(0, 5).map((o) => (
              <li
                key={o.id}
                className="flex items-center justify-between gap-3 rounded-md border border-amber-200 bg-background p-3"
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
                  className="border-amber-300 text-amber-700 hover:bg-amber-100"
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
          <Card key={s.label} className="rounded-xl border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">{s.label}</span>
              <s.icon className="h-4 w-4 text-app-500" />
            </div>
            <div className="mt-2 text-[28px] font-extrabold tracking-[-0.5px] text-gray-900">{s.value}</div>
            <div className="mt-1 truncate text-[11px] font-medium text-gray-500">{s.hint}</div>
          </Card>
        ))}
      </div>

      {totalRegistros === 0 ? (
        <Card className="p-10 text-center">
          <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-app-100 text-app-700">
            <Plus className="h-6 w-6" />
          </div>
          <h2 className="text-lg font-medium">Comece a usar o Turno</h2>
          <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
            Você ainda não registrou nada. Cadastre os primeiros membros da equipe e comece a registrar ocorrências do dia.
          </p>
          <div className="mt-4 flex justify-center gap-2">
            <Link to="/app/membros">
              <Button className="bg-app-900 hover:bg-app-800">Adicionar membros</Button>
            </Link>
            <Link to="/app/ocorrencias">
              <Button variant="outline">Nova ocorrência</Button>
            </Link>
          </div>
        </Card>
      ) : (
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {turnoAtivo && (
              <Card className="overflow-hidden rounded-xl border-gray-200 p-0">
                <div className="flex items-center justify-between bg-app-900 px-4 py-2.5">
                  <span className="text-[13px] font-semibold text-white">
                    {turnoAtivo.nome}
                    {membrosDoTurno[0] ? ` — ${membrosDoTurno[0].nome}` : ""}
                  </span>
                  <span className="text-xs text-app-300">
                    {turnoAtivo.inicio.slice(0, 5)}–{turnoAtivo.fim.slice(0, 5)}
                  </span>
                </div>
                <div className="p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-900">Turno ativo agora</h3>
                    <Badge className="rounded-full bg-app-100 px-2.5 py-0.5 text-[10px] font-semibold text-app-700 hover:bg-app-100">
                      ● Em andamento
                    </Badge>
                  </div>
                  {membrosDoTurno.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Nenhum membro atribuído a este turno ainda.</p>
                  ) : (
                    <div className="flex flex-wrap gap-6">
                      {membrosDoTurno.slice(0, 5).map((m) => (
                        <div key={m.id} className="flex items-center gap-2">
                          <span className={`flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold text-white ${corAvatar(m.id)}`}>
                            {iniciais(m.nome)}
                          </span>
                          <div>
                            <div className="text-[11px] font-semibold text-gray-900">{m.nome}</div>
                            <div className="text-[10px] text-app-600">● Ativo</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                    <span className="text-[11px] text-gray-500">
                      {abertas} ocorrência{abertas !== 1 ? "s" : ""} aberta{abertas !== 1 ? "s" : ""}
                    </span>
                    <Link to="/app/historico" className="text-[11px] font-semibold text-app-600 hover:underline">
                      Ver passagem →
                    </Link>
                  </div>
                </div>
              </Card>
            )}

            <Card className="rounded-xl border-gray-200 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900">Passagens recentes</h3>
                <Link to="/app/historico" className="text-[11px] font-semibold text-app-600 hover:underline">
                  Ver todas →
                </Link>
              </div>
              {passagens.length === 0 ? (
                <div className="py-6 text-center text-sm text-muted-foreground">
                  Nenhuma passagem registrada ainda.
                </div>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {passagens.slice(0, 4).map((p) => (
                    <li key={p.id} className="flex items-center justify-between gap-3 py-2.5">
                      <div className="min-w-0">
                        <div className="truncate text-xs font-semibold text-gray-900">
                          {new Date(p.data).toLocaleDateString("pt-BR")}
                        </div>
                        <div className="truncate text-[11px] text-gray-400">
                          {p.assinado_por || "Sem assinatura"}
                        </div>
                      </div>
                      {p.hash_assinatura ? (
                        <Badge className="rounded-md bg-app-100 px-2.5 py-1 text-[10px] font-semibold text-app-700 hover:bg-app-100">
                          ✓ Assinado
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="rounded-md text-[10px] font-semibold text-gray-500">
                          Pendente
                        </Badge>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="rounded-xl border-gray-200 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900">Ocorrências abertas</h3>
                <Link to="/app/ocorrencias" className="text-[11px] font-semibold text-app-600 hover:underline">
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              {abertasOrdenadas.length === 0 ? (
                <div className="py-6 text-center text-sm text-muted-foreground">Nenhuma ocorrência aberta.</div>
              ) : (
                <div className="space-y-2">
                  {abertasOrdenadas.map((o) => {
                    const info = gravidadeInfo[o.gravidade];
                    return (
                      <div key={o.id} className="flex items-stretch gap-2 rounded-[10px] border border-gray-200 py-2 pr-2">
                        <span className={`w-1 shrink-0 rounded-full ${info.bar}`} />
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-xs font-semibold text-gray-900">{o.titulo}</div>
                          <div className="truncate text-[10px] text-gray-400">
                            {o.tipo || "Sem tipo"} · {new Date(o.created_at).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                          </div>
                        </div>
                        <Badge className={`h-fit self-start rounded-md px-1.5 py-0.5 text-[10px] font-semibold hover:bg-inherit ${info.badge}`}>
                          {info.label}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>

            <Card className="rounded-xl border-gray-200 p-4">
              <h3 className="mb-3 text-sm font-semibold text-gray-900">Resumo</h3>
              <ul className="divide-y divide-gray-100">
                <li className="flex items-center justify-between py-2 text-xs">
                  <span className="text-gray-600">Turnos configurados</span>
                  <span className="font-semibold text-gray-900">{turnos.length}</span>
                </li>
                <li className="flex items-center justify-between py-2 text-xs">
                  <span className="text-gray-600">Passagens assinadas</span>
                  <span className="font-semibold text-gray-900">{passagens.filter((p) => p.hash_assinatura).length}</span>
                </li>
                <li className="flex items-center justify-between py-2 text-xs">
                  <span className="text-gray-600">Ocorrências críticas</span>
                  <span className="font-semibold text-gray-900">{ocorrencias.filter((o) => o.gravidade === "alta").length}</span>
                </li>
                <li className="flex items-center justify-between py-2 text-xs">
                  <span className="text-gray-600">Folgas registradas</span>
                  <span className="font-semibold text-gray-900">{folgas.length}</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
