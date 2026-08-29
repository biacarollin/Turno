import { Link } from "@tanstack/react-router";

export function CTASection() {
  return (
    <section className="w-full bg-app-800 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 md:flex-row md:px-6">
        <div className="flex items-center gap-4">
          <span className="hidden h-14 w-1 shrink-0 rounded-sm bg-app-400 sm:block" />
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-[30px]">
              Comece hoje. Sem cartão de crédito.
            </h2>
            <p className="mt-1.5 text-[15px] text-app-300">
              7 dias grátis, depois você decide.
            </p>
          </div>
        </div>
        <Link
          to="/login"
          className="inline-flex shrink-0 items-center justify-center rounded-lg bg-app-400 px-8 py-3 text-sm font-bold text-app-900 transition-colors hover:bg-app-300"
        >
          Criar conta grátis
        </Link>
      </div>
    </section>
  );
}
