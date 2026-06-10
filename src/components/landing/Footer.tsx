import { Link } from "@tanstack/react-router";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full bg-turno-700 border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 md:flex-row md:px-6">
        <span className="text-base font-semibold text-turno-400">Turno</span>
        <nav className="flex items-center gap-7 text-sm text-white/70">
          <Link to="/privacidade" className="hover:text-white transition-colors">Privacidade</Link>
          <Link to="/termos" className="hover:text-white transition-colors">Termos</Link>
          <Link to="/suporte" className="hover:text-white transition-colors">Suporte</Link>
        </nav>
        <span className="text-xs text-white/50">© {year} Turno</span>
      </div>
    </footer>
  );
}
