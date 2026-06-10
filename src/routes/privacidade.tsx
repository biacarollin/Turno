import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/privacidade")({
  component: Privacidade,
  head: () => ({
    meta: [
      { title: "Política de Privacidade — Turno" },
      { name: "description", content: "Como o Turno trata seus dados." },
    ],
  }),
});

function Privacidade() {
  return (
    <div className="flex min-h-screen flex-col bg-primary">
      <Navbar />
      <main className="flex-1 px-4 pt-32 pb-20 md:px-6">
        <article className="mx-auto max-w-3xl rounded-2xl bg-white p-8 md:p-12 prose prose-slate">
          <h1>Política de Privacidade</h1>
          <p className="text-sm text-muted-foreground">Última atualização: 26 de maio de 2026</p>

          <h2>1. Quais dados coletamos</h2>
          <p>
            Coletamos dados de cadastro (nome, email, CPF), dados de uso do
            aplicativo (turnos, ocorrências, passagens) e dados de pagamento
            processados por nossos parceiros (não armazenamos dados de cartão).
          </p>

          <h2>2. Como usamos seus dados</h2>
          <p>
            Usamos os dados para prestar o serviço, autenticar usuários, processar
            pagamentos, gerar relatórios da própria organização e melhorar o produto.
            Não vendemos dados a terceiros.
          </p>

          <h2>3. Compartilhamento</h2>
          <p>
            Compartilhamos dados apenas com provedores de infraestrutura, pagamento
            e comunicação estritamente necessários ao funcionamento do serviço.
          </p>

          <h2>4. Seus direitos (LGPD)</h2>
          <p>
            Você pode solicitar acesso, correção, portabilidade ou exclusão dos seus
            dados a qualquer momento, em contato@turno.app.
          </p>

          <h2>5. Segurança</h2>
          <p>
            Os dados são armazenados em servidores com criptografia em trânsito e em
            repouso. Acesso interno é restrito por princípio do menor privilégio.
          </p>

          <h2>6. Contato</h2>
          <p>Dúvidas sobre privacidade: privacidade@turno.app</p>
        </article>
      </main>
      <Footer />
    </div>
  );
}