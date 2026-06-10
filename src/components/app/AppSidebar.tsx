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
import { Logo } from "@/components/landing/Logo";
import { toast } from "sonner";

const operacao = [
  { title: "Dashboard", url: "/app", icon: LayoutDashboard },
  { title: "Ocorrências", url: "/app/ocorrencias", icon: AlertCircle },
  { title: "Histórico", url: "/app/historico", icon: History },
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
  const currentPath = useRouterState({
    select: (r) => r.location.pathname,
  });

  const isActive = (path: string) =>
    path === "/app" ? currentPath === "/app" : currentPath.startsWith(path);

  const renderGroup = (label: string, items: typeof operacao) => (
    <SidebarGroup>
      {!collapsed && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton asChild isActive={isActive(item.url)}>
                <Link to={item.url} className="flex items-center gap-2">
                  <item.icon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span>{item.title}</span>}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b">
        <Link to="/app" className="flex items-center gap-2 px-2 py-1.5">
          <Logo className={collapsed ? "[&>span:last-child]:hidden" : ""} />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {renderGroup("Operação", operacao)}
        {renderGroup("Equipe", equipe)}
        {renderGroup("Conta", conta)}
      </SidebarContent>
      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => {
                toast.success("Você saiu da conta.");
                navigate({ to: "/" });
              }}
              className="text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              {!collapsed && <span>Sair da conta</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}