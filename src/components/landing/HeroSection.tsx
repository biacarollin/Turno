import { Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { HeroCanvas } from "./HeroCanvas";

const ocorrencias = [
  {
    titulo: "Equipamento parado — Setor C",
    meta: "Manutenção acionada · 23h14",
    badge: "Alta",
    badgeClass: "bg-amber-500 text-amber-950",
    cardClass: "bg-amber-100",
  },
  {
    titulo: "Checklist de fechamento concluído",
    meta: "Todos os itens OK · 05h50",
    badge: "Rotina",
    badgeClass: "bg-app-100 text-app-700",
    cardClass: "bg-app-50",
  },
];

export function HeroSection() {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] w-full items-center overflow-hidden bg-app-900 text-white">
      <HeroCanvas />
      <div className="relative mx-auto flex w-full max-w-[1800px] flex-col gap-12 px-4 py-16 md:flex-row md:items-center md:justify-between md:gap-16 md:px-20 md:py-20">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-app-700 bg-app-800 px-3.5 py-1.5 text-xs font-semibold text-app-300">
            ✦ Passagem de turno digital
          </div>

          <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Cada turno,
            <br />
            <span className="text-app-400">registrado.</span>
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-gray-400">
            Substitua WhatsApp e papel por registros digitais com assinatura
            eletrônica, log de ocorrências e histórico completo.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-lg bg-app-400 px-6 py-3.5 text-sm font-bold text-app-900 transition-colors hover:bg-app-300"
            >
              Testar grátis por 7 dias
            </Link>
            <a
              href="#funcionalidades"
              className="text-sm font-medium text-gray-400 transition-colors hover:text-white"
            >
              Como funciona →
            </a>
          </div>
          <p className="mt-3 text-xs text-gray-500">
            Sem cartão de crédito. Cancele quando quiser.
          </p>

          <div className="mt-10 flex items-center gap-8">
            <div>
              <div className="text-2xl font-bold tracking-tight">94%</div>
              <div className="mt-1 text-[11px] leading-snug text-gray-500">
                das passagens
                <br />
                assinadas
              </div>
            </div>
            <div className="h-10 w-px bg-app-700" />
            <div>
              <div className="text-2xl font-bold tracking-tight">12k+</div>
              <div className="mt-1 text-[11px] leading-snug text-gray-500">
                turnos
                <br />
                registrados
              </div>
            </div>
            <div className="h-10 w-px bg-app-700" />
            <div>
              <div className="text-2xl font-bold tracking-tight">NPS 9</div>
              <div className="mt-1 text-[11px] leading-snug text-gray-500">
                saúde &amp;
                <br />
                logística
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white text-left shadow-2xl md:w-[552px] md:shrink-0">
          <div className="flex items-center justify-between bg-app-800 px-5 py-3.5">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-400/80" />
              <span className="h-3 w-3 rounded-full bg-amber-400/80" />
              <span className="h-3 w-3 rounded-full bg-app-400/80" />
              <span className="ml-3 text-xs text-app-400">turno — Equipe Noturna</span>
            </div>
            <span className="rounded-full bg-app-700 px-2.5 py-1 text-[10px] font-semibold text-app-400">
              ● Ativo
            </span>
          </div>
          <div className="border-b border-gray-100 p-5">
            <div className="grid grid-cols-3 gap-3 rounded-lg border border-gray-200 p-3">
              <div>
                <div className="text-[9px] font-semibold uppercase tracking-wide text-gray-400">Responsável</div>
                <div className="mt-1 text-[13px] font-semibold text-gray-900">Carlos M. · Operador</div>
              </div>
              <div>
                <div className="text-[9px] font-semibold uppercase tracking-wide text-gray-400">Período</div>
                <div className="mt-1 text-[13px] font-semibold text-gray-900">22:00 — 06:00</div>
              </div>
              <div>
                <div className="text-[9px] font-semibold uppercase tracking-wide text-gray-400">Unidade</div>
                <div className="mt-1 text-[13px] font-semibold text-app-600">UN-042</div>
              </div>
            </div>
          </div>
          <div className="p-5">
            <div className="text-[9px] font-semibold uppercase tracking-wide text-gray-400">
              Ocorrências do turno
            </div>
            <div className="mt-3 space-y-2">
              {ocorrencias.map((o) => (
                <div key={o.titulo} className={`flex items-center justify-between rounded-lg p-3 ${o.cardClass}`}>
                  <div>
                    <div className="text-xs font-semibold text-gray-900">{o.titulo}</div>
                    <div className="mt-0.5 text-[11px] text-gray-500">{o.meta}</div>
                  </div>
                  <span className={`shrink-0 rounded-md px-2 py-0.5 text-[9px] font-bold ${o.badgeClass}`}>
                    {o.badge}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-3 rounded-lg border border-app-200 bg-app-50 p-3">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-app-700">
                ✦ Resumo gerado pela IA
              </div>
              <p className="mt-1.5 text-[11px] leading-relaxed text-gray-600">
                1 pendência crítica (Setor C). Demais atividades concluídas. Próxima
                equipe: verificar retorno da manutenção.
              </p>
            </div>

            <button className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg bg-app-600 py-3 text-sm font-semibold text-white">
              <ShieldCheck className="h-4 w-4" /> Assinar e encerrar turno
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
