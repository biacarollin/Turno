import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function HeroSection() {
  const [demoOpen, setDemoOpen] = useState(false);
  return (
    <section className="relative w-full overflow-hidden bg-primary text-white">
      {/* glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[640px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(74,173,152,0.18),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-6xl px-4 pt-32 pb-24 md:px-6 md:pt-40 md:pb-32">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-turno-400/30 bg-turno-400/10 px-3.5 py-1.5 text-xs font-medium text-turno-200">
            <span className="h-1.5 w-1.5 rounded-full bg-turno-400" />
            Gestão de turnos com IA
          </div>

          <h1 className="mt-8 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Passagem de turno{" "}
            <span className="text-turno-400">sem WhatsApp</span>,<br className="hidden sm:block" />{" "}
            sem papel, sem falha
          </h1>

          <p className="mt-6 max-w-2xl text-base text-white/70 leading-relaxed md:text-lg">
            Sua equipe registra, assina digitalmente e assume turnos em segundos.
            O gestor tem visibilidade total em tempo real.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-primary transition-colors hover:bg-white/90"
            >
              Começar 7 dias grátis
            </Link>
            <button
              type="button"
              onClick={() => setDemoOpen(true)}
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-transparent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              Ver demonstração
            </button>
          </div>

          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-white/60">
            <li className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-turno-400" />
              Não será cobrado durante o período de teste
            </li>
          </ul>
        </div>
      </div>

      <Dialog open={demoOpen} onOpenChange={setDemoOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Demonstração do Turno</DialogTitle>
          </DialogHeader>
          <div className="aspect-video w-full overflow-hidden rounded-lg bg-black">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Demonstração"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Vídeo de demonstração — substitua pelo seu vídeo final quando estiver pronto.
          </p>
        </DialogContent>
      </Dialog>
    </section>
  );
}
