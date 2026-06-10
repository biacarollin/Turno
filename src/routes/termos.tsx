import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/termos")({
  component: Termos,
  head: () => ({
    meta: [
      { title: "Termos de Uso — Turno" },
      { name: "description", content: "Termos e condições de uso do Turno." },
    ],
  }),
});

function Termos() {
  return (
    <div className="flex min-h-screen flex-col bg-primary">
      <Navbar />
      <main className="flex-1 px-4 pt-32 pb-20 md:px-6">
        <article className="mx-auto max-w-3xl rounded-2xl bg-white p-8 md:p-12 prose prose-slate">
          <h1>Termos de Uso</h1>
          <p className="text-sm text-muted-foreground">Última atualização: 26 de maio de 2026</p>

          <h2>1. Aceitação</h2>
          <p>
            Ao criar uma conta no Turno você concorda com estes Termos. Se não
            concordar, não utilize o serviço.
          </p>

          <h2>2. Conta e responsabilidade</h2>
          <p>
            Você é responsável pela veracidade dos dados informados e pelo uso
            adequado da plataforma por todos os membros que convidar.
          </p>

          <h2>3. Assinatura e cobrança</h2>
          <p>
            O período de teste é gratuito. Após o término, a cobrança será feita
            automaticamente no método de pagamento cadastrado. Você pode cancelar
            a qualquer momento pelas configurações da sua conta.
          </p>

          <h2>4. Uso aceitável</h2>
          <p>
            É proibido utilizar a plataforma para atividades ilícitas, ofensivas
            ou que violem direitos de terceiros.
          </p>

          <h2>5. Limitação de responsabilidade</h2>
          <p>
            O Turno é fornecido "como está". Não nos responsabilizamos por danos
            decorrentes de mau uso, perda de dados causada por terceiros ou
            indisponibilidade temporária do serviço.
          </p>

          <h2>6. Alterações</h2>
          <p>
            Estes termos podem ser atualizados. Mudanças relevantes serão
            comunicadas por email com antecedência.
          </p>

          <h2>7. Foro</h2>
          <p>Fica eleito o foro da comarca de São Paulo/SP para dirimir conflitos.</p>
        </article>
      </main>
      <Footer />
    </div>
  );
}