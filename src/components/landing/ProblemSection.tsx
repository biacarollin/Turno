import { Cross, BarChart3, FileText, Star } from "lucide-react";

const segments = [
  {
    icon: Cross,
    title: "Saúde",
    sub: "Hospitais, UPAs, clínicas e farmácias",
    items: ["Conferência de psicotrópicos", "Reação adversa à medicação", "Intercorrência clínica"],
  },
  {
    icon: BarChart3,
    title: "Logística",
    sub: "CDs, transportadoras e armazéns",
    items: ["Avaria em carga", "Veículo parado na doca", "Atraso na expedição"],
  },
  {
    icon: FileText,
    title: "Hotelaria",
    sub: "Hotéis, resorts e pousadas",
    items: ["Quarto em manutenção", "Reclamação de hóspede", "Falta de enxoval"],
  },
  {
    icon: Star,
    title: "Segurança",
    sub: "Portarias, condomínios e vigilância",
    items: ["Acesso não autorizado", "Ronda concluída", "Equipamento com falha"],
  },
];

export function ProblemSection() {
  return (
    <section id="segmentos" className="w-full bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-[2.75rem]">
            Para qualquer equipe que trabalha em turnos contínuos
          </h2>
          <p className="mt-4 text-muted-foreground">
            O Turno adapta a linguagem e as sugestões de ocorrência ao seu segmento — sem precisar configurar nada manualmente.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {segments.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-border bg-card p-6 transition-all hover:border-turno-400/40 hover:shadow-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-turno-50 text-primary">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-foreground">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{s.sub}</p>
              <ul className="mt-5 flex flex-col gap-2">
                {s.items.map((it) => (
                  <li key={it} className="flex items-start gap-2 text-sm text-foreground/80">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-turno-400" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
