import { Link } from "@tanstack/react-router";

export function CTASection() {
  return (
    <section className="w-full bg-turno-700 py-20 md:py-24">
      <div className="mx-auto max-w-4xl px-4 text-center md:px-6">
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Pronto para acabar com o caos na troca de turno?
        </h2>
        <p className="mt-4 text-white/80">
          Sua equipe começa em minutos. Sem treinamento, sem instalação no servidor.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/login"
            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-transparent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            Criar conta grátis
          </Link>
          <Link
            to="/contato"
            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-transparent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            Falar com a equipe
          </Link>
        </div>
      </div>
    </section>
  );
}
