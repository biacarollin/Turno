const depoimentos = [
  {
    texto:
      "Antes a passagem era no grupo do WhatsApp e a gente perdia tudo. Agora cada ocorrência fica registrada e assinada. Não tem como negar que foi comunicado.",
    nome: "Ana Paula S.",
    cargo: "Supervisora de Enfermagem · UPA Centro",
    iniciais: "AP",
    cor: "bg-app-600",
  },
  {
    texto:
      "Em logística, um turno mal comunicado vira atraso na entrega. Com o Turno, o próximo operador já entra sabendo o que está pendente. Economizamos 30 min por turno.",
    nome: "Ricardo M.",
    cargo: "Coordenador Operacional · LogBrasil",
    iniciais: "RM",
    cor: "bg-blue-700",
  },
  {
    texto:
      "O resumo da IA foi o que mais surpreendeu. O sistema lê o turno e entrega um parágrafo em 20 segundos. Mudou completamente nossa reunião de manhã.",
    nome: "Camila L.",
    cargo: "Gerente de Operações · Hotel Vista Mar",
    iniciais: "CL",
    cor: "bg-violet-700",
  },
];

export function TestimonialsSection() {
  return (
    <section className="w-full bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <span className="text-[10px] font-semibold uppercase tracking-[2px] text-app-600">
          O que dizem quem usa
        </span>
        <h2 className="mt-3 max-w-2xl text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Equipes que pararam de perder informação
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {depoimentos.map((d) => (
            <div key={d.nome} className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
              <div className="text-amber-500 tracking-[2px]">★★★★★</div>
              <p className="mt-6 text-sm leading-relaxed text-gray-800">"{d.texto}"</p>
              <div className="mt-8 flex items-center gap-3">
                <span className={`flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold text-white ${d.cor}`}>
                  {d.iniciais}
                </span>
                <div>
                  <div className="text-[13px] font-semibold text-gray-900">{d.nome}</div>
                  <div className="text-[11px] text-gray-500">{d.cargo}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
