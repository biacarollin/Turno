import { createFileRoute } from "@tanstack/react-router";
import { Logo } from "@/components/landing/Logo";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#04342c] px-4 text-center">
      <Logo className="mb-8 scale-150" />
      <h1 className="mt-6 text-3xl font-bold text-white">
        Estamos chegando
      </h1>
      <p className="mt-3 max-w-sm text-base text-turno-300">
        O Turno está sendo preparado com cuidado. Em breve você poderá gerenciar passagens de turno de forma inteligente.
      </p>
      <div className="mt-8 flex items-center gap-2 rounded-full border border-turno-700 bg-turno-950 px-4 py-2">
        <span className="h-2 w-2 animate-pulse rounded-full bg-turno-400" />
        <span className="text-sm text-turno-400">Lançamento em breve</span>
      </div>
    </div>
  );
}