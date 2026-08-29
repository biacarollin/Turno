import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { LifeBuoy, Mail, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/suporte")({
  component: Suporte,
  head: () => ({
    meta: [
      { title: "Suporte — Turno" },
      { name: "description", content: "Central de ajuda do Turno." },
    ],
  }),
});

const faqs = [
  {
    q: "Como começo o teste gratuito?",
    a: "Clique em 'Começar 7 dias grátis' na página inicial e crie sua conta. Você não será cobrado durante o período de teste.",
  },
  {
    q: "Posso cancelar a qualquer momento?",
    a: "Sim. Em Configurações > Plano você pode cancelar a assinatura quando quiser, sem multa.",
  },
  {
    q: "Como convido a minha equipe?",
    a: "Dentro do painel, em Membros, clique em 'Convidar membro' para gerar um link e enviar para o profissional.",
  },
  {
    q: "Os dados ficam seguros?",
    a: "Sim. Usamos criptografia em trânsito e em repouso, e seguimos a LGPD.",
  },
];

function Suporte() {
  return (
    <div className="flex min-h-screen flex-col bg-primary">
      <Navbar />
      <main className="flex-1 px-4 pt-32 pb-20 md:px-6">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight text-white">Suporte</h1>
          <p className="mt-3 text-white/70">
            Encontre respostas rápidas ou fale com a gente.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <Card className="p-4">
              <Mail className="h-5 w-5 text-turno-600" />
              <div className="mt-2 text-sm font-medium">Email</div>
              <a href="mailto:suporte@turno.app" className="text-xs text-muted-foreground underline">
                suporte@turno.app
              </a>
            </Card>
            <Card className="p-4">
              <MessageSquare className="h-5 w-5 text-turno-600" />
              <div className="mt-2 text-sm font-medium">Falar com a equipe</div>
              <Link to="/contato" className="text-xs text-muted-foreground underline">
                Abrir formulário
              </Link>
            </Card>
            <Card className="p-4">
              <LifeBuoy className="h-5 w-5 text-turno-600" />
              <div className="mt-2 text-sm font-medium">Horário</div>
              <div className="text-xs text-muted-foreground">Seg–Sex · 9h–18h</div>
            </Card>
          </div>

          <Card className="mt-6 p-6">
            <h2 className="text-lg font-medium">Perguntas frequentes</h2>
            <Accordion type="single" collapsible className="mt-3">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`q-${i}`}>
                  <AccordionTrigger>{f.q}</AccordionTrigger>
                  <AccordionContent>{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}