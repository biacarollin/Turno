import { Bell, LogOut, User } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useSession } from "@/hooks/use-session";
import { useQueryClient } from "@tanstack/react-query";

type Notificacao = { id: string; title: string; desc: string; time: string };

export function AppHeader() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { data: sessao } = useSession();
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);

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

  const headerLabel = sessao?.filial_nome
    ? `${sessao.filial_nome}${sessao.segmento_topo ? ` · ${sessao.segmento_topo}` : ""}`
    : "";

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-background px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <span className="text-sm text-muted-foreground">{headerLabel}</span>
      </div>
      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              {notificacoes.length > 0 && (
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-0">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <h3 className="text-sm font-medium">Notificações</h3>
              {notificacoes.length > 0 && (
                <button onClick={marcarTodasComoLidas} className="text-xs text-turno-700 hover:underline">
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
            <button className="rounded-full focus:outline-none focus:ring-2 focus:ring-turno-300">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-turno-100 text-xs text-turno-900">
                  {initials || "U"}
                </AvatarFallback>
              </Avatar>
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