import { Zap, PenLine, ClipboardList, Users } from "lucide-react";

const features = [
  {
    icon: Zap,
    iconBg: "bg-amber-100",
    title: "Log de ocorrências",
    description:
      "Registre ocorrências com tipo, gravidade (baixa/média/alta) e local. Pendências destacadas no dashboard para o gestor.",
  },
  {
    icon: PenLine,
    iconBg: "bg-app-100",
    title: "Assinatura digital",
    description:
      "PIN de 4 dígitos + hash SHA-256 do conteúdo. Trilha de auditoria: responsável, horário e IP.",
  },
  {
    icon: ClipboardList,
    iconBg: "bg-blue-100",
    title: "Histórico completo",
    description:
      "Todas as passagens ficam registradas com resumo, assinatura e data — acessíveis a qualquer momento.",
  },
  {
    icon: Users,
    iconBg: "bg-violet-100",
    title: "Gestão de equipe",
    description:
      "Membros, cargos e turnos configuráveis. Convite por link, aprovação de folgas e notas privadas por colaborador.",
  },
];

export function FeaturesSection() {
  return (
    <section id="funcionalidades" className="w-full bg-gray-100 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <span className="text-[10px] font-semibold uppercase tracking-[2px] text-app-600">
          Funcionalidades
        </span>
        <h2 className="mt-3 max-w-2xl text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Tudo que uma passagem de turno precisa ter
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-gray-200 bg-white p-6">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${f.iconBg}`}>
                <f.icon className="h-5 w-5 text-app-700" />
              </div>
              <h3 className="mt-6 text-[17px] font-bold tracking-tight text-gray-900">{f.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-gray-600">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
