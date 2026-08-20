import { Bell, LogOut, User } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { toast } from "sonner";
import { useSession } from "@/hooks/use-session";
import { useQueryClient } from "@tanstack/react-query";

type Notificacao = { id: string; title: string; desc: string; time: string };

const TITULOS: Record<string, string> = {
  "/app": "Dashboard",
  "/app/ocorrencias": "Ocorrências",
  "/app/historico": "Passagens",
  "/app/turnos": "Turnos",
  "/app/folgas": "Folgas e trocas",
  "/app/membros": "Membros",
  "/app/cargos": "Cargos",
  "/app/notas": "Notas privadas",
  "/app/plano": "Plano e faturamento",
  "/app/configuracoes": "Configurações",
};

function tituloDaPagina(path: string) {
  if (path === "/app") return TITULOS["/app"];
  const match = Object.keys(TITULOS)
    .filter((k) => k !== "/app" && path.startsWith(k))
    .sort((a, b) => b.length - a.length)[0];
  return match ? TITULOS[match] : "Turno";
}

export function AppHeader() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { data: sessao } = useSession();
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const path = useRouterState({ select: (r) => r.location.pathname });

  const nome = sessao?.nome_completo ?? "";
  const email = sessao?.email ?? "";

  const initials = (nome || email || "?")
    .split(/\s+/)
    .map((s) => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    qc.clear();
    toast.success("Sessão encerrada");
    navigate({ to: "/login" });
  };

  const marcarTodasComoLidas = () => {
    setNotificacoes([]);
    toast.success("Notificações marcadas como lidas");
  };

  const hoje = new Date().toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4">
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <span className="text-sm font-semibold text-gray-900">{tituloDaPagina(path)}</span>
        <span className="hidden text-xs text-gray-400 sm:inline">{hoje}</span>
      </div>
      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="relative h-8 w-8 rounded-lg border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"
            >
              <Bell className="h-3.5 w-3.5" />
              {notificacoes.length > 0 && (
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-0">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <h3 className="text-sm font-medium">Notificações</h3>
              {notificacoes.length > 0 && (
                <button onClick={marcarTodasComoLidas} className="text-xs text-app-600 hover:underline">
                  Marcar como lidas
                </button>
              )}
            </div>
            {notificacoes.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                Nenhuma notificação por enquanto.
              </div>
            ) : (
              <ul className="max-h-80 divide-y overflow-y-auto">
                {notificacoes.map((n) => (
                  <li key={n.id} className="flex gap-3 px-4 py-3 hover:bg-muted/40">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">{n.title}</div>
                      <div className="truncate text-xs text-muted-foreground">{n.desc}</div>
                      <div className="mt-0.5 text-[11px] text-muted-foreground">{n.time}</div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <button className="rounded-full focus:outline-none focus:ring-2 focus:ring-app-300">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-app-600 text-xs font-bold text-app-200">
                {initials || "U"}
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-60 p-0">
            <div className="border-b px-4 py-3">
              <div className="text-sm font-medium">{nome || "Usuário"}</div>
              <div className="truncate text-xs text-muted-foreground">{email}</div>
            </div>
            <ul className="py-1 text-sm">
              <li>
                <button onClick={() => navigate({ to: "/app/configuracoes" })}
                  className="flex w-full items-center gap-2 px-4 py-2 hover:bg-muted/50">
                  <User className="h-4 w-4" /> Minha conta
                </button>
              </li>
              <li>
                <button onClick={handleLogout}
                  className="flex w-full items-center gap-2 px-4 py-2 text-destructive hover:bg-muted/50">
                  <LogOut className="h-4 w-4" /> Sair
                </button>
              </li>
            </ul>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}
