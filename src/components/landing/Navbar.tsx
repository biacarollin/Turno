import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const navLinks = [
  { label: "Segmentos", href: "#segmentos" },
  { label: "Preços", href: "#precos" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-app-700 bg-app-900">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <a href="/" aria-label="Turno · página inicial">
          <Logo variant="dark" />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-400 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="/login"
            className="inline-flex items-center justify-center rounded-lg border border-app-600 bg-app-800 px-4 py-2 text-sm font-medium text-app-300 transition-colors hover:bg-app-700"
          >
            Entrar
          </a>
          <a
            href="/login"
            className="inline-flex items-center justify-center rounded-lg bg-app-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-app-600"
          >
            Começar grátis
          </a>
        </div>

        <button
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md text-white hover:bg-app-800"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-app-700 bg-app-900 px-4 py-4">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-400 transition-colors hover:text-white"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <hr className="border-app-700 my-1" />
            <a
              href="/login"
              className="inline-flex items-center justify-center rounded-lg bg-app-500 px-4 py-2.5 text-sm font-semibold text-white"
            >
              Entrar
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
