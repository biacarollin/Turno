import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Precisa instalar algum programa?",
    answer:
      "Não. Turno funciona 100% na web para gestores e administradores. Os colaboradores usam um app leve que roda no navegador do celular — não precisa baixar nada da loja se não quiser.",
  },
  {
    question: "E se a internet cair no meio do turno?",
    answer:
      "O app do colaborador guarda as informações localmente e sincroniza automaticamente quando a conexão volta. Nada se perde.",
  },
  {
    question: "Dá para migrar dados de planilha ou outro sistema?",
    answer:
      "Sim. Oferecemos importação via CSV para colaboradores, cargos e histórico básico. Se o volume for grande, nosso time de onboarding ajuda na transição.",
  },
  {
    question: "Quem vê as notas sobre um colaborador?",
    answer:
      "Apenas o gestor que escreveu a nota e os administradores do sistema. Colaboradores não têm acesso às notas privadas, a menos que você configure explicitamente para notificá-los de forma discreta.",
  },
  {
    question: "Posso cancelar a qualquer momento?",
    answer:
      "Sim. Não temos contrato de fidelidade. Cancele quando quiser e continue com os dados até o fim do período pago.",
  },
  {
    question: "Como funciona o trial de 7 dias?",
    answer:
      "Você tem 7 dias para testar todas as funcionalidades do plano escolhido. Pedimos o cartão para evitar fraude, mas só cobramos se você não cancelar antes do fim do trial.",
  },
  {
    question: "O que é o Resumo com IA ao encerrar turno?",
    answer:
      "Ao fechar a passagem de turno, a IA gera automaticamente um resumo em linguagem natural com as ocorrências mais importantes. O próximo profissional lê em segundos e já sabe o que precisa de atenção. Disponível a partir do plano Básico.",
  },
  {
    question: "Como funciona o histórico e a exclusão automática?",
    answer:
      "Cada plano tem um limite de dias de histórico (Grátis: 7 dias, Básico: 90 dias, Equipe: 1 ano, Profissional e Enterprise: ilimitado). Passado esse período, as passagens antigas são excluídas automaticamente da nuvem. Se quiser guardar mais tempo, faça upgrade ou exporte em PDF (Profissional).",
  },
  {
    question: "O que é multi-unidade?",
    answer:
      "Permite gerenciar várias equipes ou setores separados na mesma conta (ex: UTI + Centro Cirúrgico + Pronto-Socorro, ou Hotel Centro + Hotel Praia). Cada unidade tem suas escalas, membros e histórico próprios, mas você vê tudo no mesmo painel. No plano Profissional, você pode criar até 5 unidades diluindo o total de 50 membros entre elas — por exemplo: 1 unidade com 10 membros, outra com 15, outra com 25, desde que a soma não passe de 50. No Enterprise é ilimitado.",
  },
  {
    question: "O que é SSO (login corporativo)?",
    answer:
      "Single Sign-On permite que sua equipe entre no Turno usando o login da empresa (Google Workspace, Microsoft 365, Okta). Quando alguém é desligado, o acesso cai automaticamente. Política de senha e autenticação em dois fatores ficam centralizadas no RH. Exclusivo do Enterprise.",
  },
  {
    question: "Como mudo de plano?",
    answer:
      "Você pode fazer upgrade ou downgrade quando quiser direto no app, em Configurações > Plano. O upgrade é imediato e o downgrade vale a partir do próximo ciclo. Os recursos do novo plano ficam disponíveis na hora.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="w-full py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <div className="flex flex-col items-center text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent">
            Dúvidas
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Perguntas que a gente já ouviu
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Se a sua não estiver aqui, é só mandar uma mensagem. Respondemos de verdade, não robô.
          </p>
        </div>

        <div className="mt-14 flex flex-col gap-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-xl border transition-colors ${
                  isOpen ? "border-accent/30 bg-accent/5" : "border-border bg-card"
                }`}
              >
                <button
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-medium text-foreground">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
