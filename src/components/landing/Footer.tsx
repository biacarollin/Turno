import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

const colunas = [
  {
    titulo: "Empresa",
    links: [
      { label: "Sobre", href: "#" },
      { label: "Contato", href: "/contato" },
    ],
  },
  {
    titulo: "Legal",
    links: [
      { label: "Privacidade", href: "/privacidade" },
      { label: "Termos de uso", href: "/termos" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full bg-gray-950">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <div className="col-span-2 sm:col-span-1">
            <Logo variant="dark" />
            <p className="mt-4 max-w-[220px] text-xs leading-relaxed text-gray-500">
              Gestão de turnos digitais para equipes que não podem perder informação.
            </p>
          </div>
          {colunas.map((c) => (
            <div key={c.titulo}>
              <h3 className="text-[11px] font-semibold uppercase tracking-wide text-white">
                {c.titulo}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    {l.href.startsWith("#") ? (
                      <a href={l.href} className="text-xs text-gray-500 hover:text-gray-300">
                        {l.label}
                      </a>
                    ) : (
                      <Link to={l.href} className="text-xs text-gray-500 hover:text-gray-300">
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-gray-800 pt-6 sm:flex-row">
          <span className="text-[11px] text-gray-600">
            © {year} Turno · turnoai.com.br
          </span>
          <span className="text-[11px] text-gray-600">Feito com ♥ no Brasil</span>
        </div>
      </div>
    </footer>
  );
}
