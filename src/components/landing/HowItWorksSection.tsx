const stats = [
  { value: "94%", label: "passagens assinadas" },
  { value: "+3", label: "setores atendidos" },
  { value: "-72%", label: "tempo na passagem de turno" },
];

const googleReviews = [
  {
    name: "Camila Ferreira",
    initials: "CF",
    role: "Coordenadora de enfermagem",
    when: "há 2 semanas",
    text:
      "Mudou completamente a passagem de turno na nossa unidade. O resumo automático economiza pelo menos 20 minutos por plantão e ninguém mais perde informação crítica.",
    color: "bg-rose-500",
  },
  {
    name: "Lucas Andrade",
    initials: "LA",
    role: "Gerente operacional",
    when: "há 1 mês",
    text:
      "Implantamos em 3 setores e a adesão foi imediata. A equipe gostou da assinatura digital e os supervisores passaram a ter rastreabilidade real do que aconteceu em cada turno.",
    color: "bg-sky-500",
  },
  {
    name: "Patrícia Gomes",
    initials: "PG",
    role: "Farmacêutica",
    when: "há 3 dias",
    text:
      "Suporte rápido e interface muito simples. Em uma semana a gente já tinha esquecido o grupo do WhatsApp. Recomendo demais para qualquer equipe que trabalha em escala.",
    color: "bg-amber-500",
  },
];

export function HowItWorksSection() {
  return (
    <section className="w-full bg-primary text-white py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="text-center text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Equipes que pararam de usar WhatsApp
        </h2>

        <div className="mt-12 grid grid-cols-3 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-semibold text-turno-400 sm:text-4xl md:text-5xl">
                {s.value}
              </div>
              <div className="mt-2 text-xs text-white/60 sm:text-sm">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {googleReviews.map((r) => (
            <figure
              key={r.name}
              className="flex flex-col rounded-2xl border border-white/10 bg-white p-6 text-foreground"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${r.color} text-sm font-semibold text-white`}
                >
                  {r.initials}
                </span>
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-foreground">
                    {r.name}
                  </div>
                  <div className="truncate text-xs text-foreground/60">
                    {r.role}
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <div className="flex gap-0.5" aria-label="5 de 5 estrelas">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      viewBox="0 0 20 20"
                      className="h-4 w-4 fill-turno-500"
                      aria-hidden="true"
                    >
                      <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L10 14.77l-5.2 2.74.99-5.79L1.58 7.62l5.82-.85L10 1.5z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs text-foreground/50">{r.when}</span>
              </div>
              <blockquote className="mt-3 text-sm leading-relaxed text-foreground/80">
                {r.text}
              </blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
