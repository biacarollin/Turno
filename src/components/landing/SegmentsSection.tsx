import { Link } from "@tanstack/react-router";

const segmentos = [
  {
    emoji: "🏥",
    nome: "Saúde",
    descricao: "UTI, enfermagem, farmácia hospitalar. Rastreabilidade clínica e conformidade de protocolo.",
  },
  {
    emoji: "🚚",
    nome: "Logística",
    descricao: "Almoxarifado, transporte, CD. Controle de ocorrências e inventário por turno.",
  },
  {
    emoji: "🏨",
    nome: "Hotelaria",
    descricao: "Recepção, governança, manutenção. Pendências sem depender de memória ou WhatsApp.",
  },
  {
    emoji: "🔒",
    nome: "Segurança",
    descricao: "Portaria, monitoramento, rondas. Registro com timestamp e assinatura do responsável.",
  },
];

export function SegmentsSection() {
  return (
    <section id="segmentos" className="w-full bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <span className="text-[10px] font-semibold uppercase tracking-[2px] text-app-600">
          Para quem é
        </span>
        <h2 className="mt-3 max-w-2xl text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Qualquer equipe que trabalha em turnos
        </h2>
        <p className="mt-3 max-w-xl text-gray-600">
          O fluxo é o mesmo — o vocabulário muda conforme o segmento.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {segmentos.map((s) => (
            <Link
              key={s.nome}
              to="/login"
              className="group rounded-2xl border border-gray-200 bg-gray-50 p-6 transition-colors hover:border-app-300 hover:bg-app-50"
            >
              <span className="text-3xl">{s.emoji}</span>
              <h3 className="mt-6 text-lg font-bold tracking-tight text-gray-900">{s.nome}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{s.descricao}</p>
              <span className="mt-4 inline-block text-sm text-app-600 transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
