import { Clock, Check, Bell, User } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Resumo inteligente por IA",
    description:
      "Ao encerrar o turno, a IA gera automaticamente um resumo das ocorrências em linguagem natural. O próximo profissional lê em segundos e já sabe o que precisa de atenção.",
    highlight: true,
  },
  {
    icon: Check,
    title: "Assinatura digital rastreável",
    description:
      "Cada passagem é assinada com hash criptográfico, IP e dados do dispositivo. Rastreabilidade completa para auditorias e conformidade com a LGPD.",
  },
  {
    icon: Bell,
    title: "Pendências que não se perdem",
    description:
      "Ocorrências não resolvidas migram automaticamente para o turno seguinte com histórico completo — nada fica esquecido na troca de equipe.",
  },
  {
    icon: User,
    title: "Gestão de equipe e cargos",
    description:
      "Cadastre cargos, associe membros, gerencie turnos, folgas e trocas. Notas privadas para o gestor registrar feedbacks individuais com sigilo.",
  },
];

export function FeaturesSection() {
  return (
    <section id="funcionalidades" className="w-full bg-muted/40 py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-[2.5rem]">
            Tudo que sua equipe precisa
          </h2>
          <p className="mt-3 text-muted-foreground">
            Do registro à assinatura — rastreável, seguro e acessível.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
          {features.map((f) => (
            <div
              key={f.title}
              className={`rounded-2xl border p-7 transition-all ${
                f.highlight
                  ? "border-turno-400/40 bg-turno-50"
                  : "border-border bg-card"
              }`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                  f.highlight ? "bg-primary text-white" : "bg-turno-50 text-primary"
                }`}
              >
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm text-foreground/70 leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
