import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/contato")({
  component: Contato,
  head: () => ({
    meta: [
      { title: "Falar com a equipe — Turno" },
      { name: "description", content: "Entre em contato com nossa equipe." },
    ],
  }),
});

function Contato() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
    toast.success("Mensagem enviada! Vamos responder em breve.");
    (e.target as HTMLFormElement).reset();
  }

  return (
    <div className="flex min-h-screen flex-col bg-primary">
      <Navbar />
      <main className="flex-1 px-4 pt-32 pb-20 md:px-6">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-4xl font-semibold tracking-tight text-white">
            Falar com a equipe
          </h1>
          <p className="mt-3 text-white/70">
            Conte sobre seu cenário. Vamos responder por email.
          </p>

          <Card className="mt-8 p-6">
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid gap-1.5">
                <Label htmlFor="nome">Nome</Label>
                <Input id="nome" name="nome" required maxLength={100} />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required maxLength={255} />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="contato">Contato (telefone/WhatsApp)</Label>
                <Input id="contato" name="contato" required maxLength={30} />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="assunto">Assunto</Label>
                <Input id="assunto" name="assunto" required maxLength={120} />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="mensagem">Mensagem</Label>
                <Textarea id="mensagem" name="mensagem" required rows={5} maxLength={2000} />
              </div>
              <Button type="submit" className="w-full bg-turno-600 hover:bg-turno-700">
                Enviar mensagem
              </Button>
              {sent && (
                <p className="text-center text-sm text-turno-700">
                  Recebemos sua mensagem. Em breve entraremos em contato.
                </p>
              )}
            </form>
          </Card>

          <p className="mt-6 text-center text-xs text-white/60">
            <Link to="/" className="underline hover:text-white">Voltar à página inicial</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}