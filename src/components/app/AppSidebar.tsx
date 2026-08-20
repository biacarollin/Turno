import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  History,
  AlertCircle,
  Users,
  Tag,
  CalendarClock,
  CalendarOff,
  Lock,
  CreditCard,
  Settings,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { useSession } from "@/hooks/use-session";
import { toast } from "sonner";

const operacao = [
  { title: "Dashboard", url: "/app", icon: LayoutDashboard },
  { title: "Passagens", url: "/app/historico", icon: History },
  { title: "Ocorrências", url: "/app/ocorrencias", icon: AlertCircle },
  { title: "Turnos", url: "/app/turnos", icon: CalendarClock },
  { title: "Folgas e trocas", url: "/app/folgas", icon: CalendarOff },
];

const equipe = [
  { title: "Membros", url: "/app/membros", icon: Users },
  { title: "Cargos", url: "/app/cargos", icon: Tag },
  { title: "Notas privadas", url: "/app/notas", icon: Lock },
];

const conta = [
  { title: "Plano e faturamento", url: "/app/plano", icon: CreditCard },
  { title: "Configurações", url: "/app/configuracoes", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const navigate = useNavigate();
  const { data: sessao } = useSession();
  const currentPath = useRouterState({
    select: (r) => r.location.pathname,
  });

  const isActive = (path: string) =>
    path === "/app" ? currentPath === "/app" : currentPath.startsWith(path);

  const nome = sessao?.nome_completo ?? "";
  const initials = (nome || sessao?.email || "?")
    .split(/\s+/)
    .map((s) => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const filialLabel = sessao?.filial_nome
    ? sessao.segmento_topo
      ? `${sessao.filial_nome} — ${sessao.segmento_topo}`
      : sessao.filial_nome
    : "Minha unidade";

  const renderGroup = (label: string, items: typeof operacao) => (
    <SidebarGroup>
      {!collapsed && (
        <SidebarGroupLabel className="px-2 text-[9px] font-semibold tracking-[1px] text-gray-500 uppercase">
          {label}
        </SidebarGroupLabel>
      )}
      <SidebarGroupContent>
        <SidebarMenu className="gap-0.5">
          {items.map((item) => {
            const active = isActive(item.url);
            return (
              <SidebarMenuItem key={item.url}>
                <SidebarMenuButton
                  asChild
                  isActive={active}
                  className={
                    active
                      ? "border border-sidebar-border bg-sidebar-accent text-white hover:bg-sidebar-accent hover:text-white data-[active=true]:bg-sidebar-accent data-[active=true]:text-white"
                      : "text-gray-400 hover:bg-sidebar-accent/60 hover:text-gray-200"
                  }
                >
                  <Link to={item.url} className="flex items-center gap-2.5">
                    {active && (
                      <span className="absolute left-0 top-1/2 h-3.5 w-[3px] -translate-y-1/2 rounded-sm bg-app-400" />
                    )}
                    <item.icon className={`h-3.5 w-3.5 shrink-0 ${active ? "text-app-400" : ""}`} />
                    {!collapsed && (
                      <span className={`text-[12px] ${active ? "font-semibold" : "font-medium"}`}>
                        {item.title}
                      </span>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <Link to="/app" className="flex items-center gap-2 px-2 py-1.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-app-600 text-[11px] font-bold text-app-200">
            T
          </span>
          {!collapsed && (
            <span className="text-[15px] font-semibold tracking-[-0.4px] text-white">turno</span>
          )}
        </Link>
        {!collapsed && (
          <div className="mx-2 mb-1.5 rounded-[7px] border border-app-600 bg-sidebar-accent px-3 py-1.5">
            <p className="truncate text-[11px] font-medium text-app-300">{filialLabel}</p>
          </div>
        )}
      </SidebarHeader>
      <SidebarContent className="gap-1 py-2">
        {renderGroup("Principal", operacao)}
        {renderGroup("Gestão", equipe)}
        {renderGroup("Conta", conta)}
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border bg-app-950">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-2 px-2 py-1.5">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-app-700 bg-app-600 text-[10px] font-bold text-app-200">
                {initials || "U"}
              </span>
              {!collapsed && (
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[11px] font-semibold text-white">{nome || "Usuário"}</p>
                  <p className="truncate text-[10px] text-gray-500">Administrador</p>
                </div>
              )}
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => {
                toast.success("Você saiu da conta.");
                navigate({ to: "/" });
              }}
              className="text-gray-500 hover:bg-app-800 hover:text-red-400"
            >
              <LogOut className="h-3.5 w-3.5 shrink-0" />
              {!collapsed && <span className="text-[12px]">Sair da conta</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
