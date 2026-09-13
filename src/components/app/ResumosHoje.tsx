import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { usePassagensHoje, type PassagemHoje } from "@/stores/passagens";

const MESES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

function statusCard(p: PassagemHoje): { label: string; pillBg: string; pillText: string; borda: string } {
  if (p.criticas > 0) {
    return { label: `${p.criticas} crítica${p.criticas > 1 ? "s" : ""}`, pillBg: "bg-red-50", pillText: "text-red-800", borda: "bg-red-500" };
  }
  if (p.medias > 0) {
    return { label: `${p.medias} pendência${p.medias > 1 ? "s" : ""}`, pillBg: "bg-amber-100", pillText: "text-amber-800", borda: "bg-amber-500" };
  }
  return { label: "Sem pendências", pillBg: "bg-emerald-50", pillText: "text-emerald-800", borda: "bg-green-500" };
}

function CardResumo({ p }: { p: PassagemHoje }) {
  const status = statusCard(p);
  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-4">
      <span className={`absolute left-0 top-0 h-full w-[3px] ${status.borda}`} />

      <div className="mb-2 flex items-start justify-between gap-2 pl-1.5">
        <div className="min-w-0">
          <div className="truncate text-[12px] font-semibold text-gray-900">
            {p.turno_nome ?? p.equipe_nome}
          </div>
          <div className="truncate text-[10px] text-gray-400">
            {p.turno_inicio && p.turno_fim ? `${p.turno_inicio.slice(0, 5)} – ${p.turno_fim.slice(0, 5)} · ` : ""}
            {p.assinado_por ?? "—"}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2.5">
          <span className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[9px] font-semibold ${status.pillBg} ${status.pillText}`}>
            {status.label}
          </span>
          <Link to="/app/historico" className="text-[11px] font-semibold text-app-500 hover:underline">
            Ver →
          </Link>
        </div>
      </div>

      <p className="mb-3 line-clamp-3 pl-1.5 text-[11px] leading-[1.6] text-gray-700">{p.resumo}</p>

      <div className="flex items-center justify-between gap-2 pl-1.5">
        <div className="flex flex-wrap items-center gap-1.5">
          {p.criticas > 0 && (
            <span className="rounded-full bg-red-50 px-2 py-0.5 text-[9px] font-medium text-red-800">
              {p.criticas} crítica{p.criticas > 1 ? "s" : ""}
            </span>
          )}
          {p.medias > 0 && (
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[9px] font-medium text-amber-800">
              {p.medias} média{p.medias > 1 ? "s" : ""}
            </span>
          )}
          {p.rotinas > 0 && (
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-medium text-emerald-800">
              {p.rotinas} rotina{p.rotinas > 1 ? "s" : ""}
            </span>
          )}
          {p.criticas === 0 && p.medias === 0 && p.rotinas === 0 && (
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-medium text-emerald-800">
              0 ocorrências
            </span>
          )}
        </div>
        {p.assinado_em ? (
          <span className="flex shrink-0 items-center gap-1 text-[10px] text-gray-400">
            <ShieldCheck className="h-3 w-3 text-app-500" />
            Assinado {new Date(p.assinado_em).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
          </span>
        ) : (
          <span className="shrink-0 text-[10px] font-medium text-red-500">⏳ Pendente</span>
        )}
      </div>
    </div>
  );
}

export function ResumosHoje({ equipeIds }: { equipeIds: string[] }) {
  const { data: resumos = [], isLoading, error } = usePassagensHoje(equipeIds);

  useEffect(() => {
    if (error) {
      console.error("Erro ao buscar resumos de hoje:", error);
      toast.error(`Resumos de hoje: ${(error as Error).message}`);
    }
  }, [error]);

  if (isLoading) {
    return <div className="mb-2 h-40 animate-pulse rounded-xl border border-gray-200 bg-white" />;
  }

  if (resumos.length === 0) return null;

  const hoje = new Date();
  const dataLabel = `${hoje.getDate()} ${MESES[hoje.getMonth()]} ${hoje.getFullYear()}`;
  const visiveis = resumos.slice(0, 3);

  return (
    <section>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-app-900 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-app-400">
            ✦ IA
          </span>
          <span className="text-[14px] font-semibold text-gray-900">Resumos das passagens de hoje</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-full border border-gray-200 bg-gray-100 px-3 py-1 text-[10px] text-gray-500">
            {resumos.length} passagen{resumos.length !== 1 ? "s" : ""} · {dataLabel}
          </span>
          <Link to="/app/historico" className="text-[11px] font-semibold text-app-500 hover:underline">
            Ver todas →
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {visiveis.map((p) => (
          <CardResumo key={p.id} p={p} />
        ))}
      </div>
    </section>
  );
}
