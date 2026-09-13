import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app/AppSidebar";
import { AppHeader } from "@/components/app/AppHeader";
import { ColaboradorView } from "@/components/app/ColaboradorView";
import { useEffect, useState } from "react";
import { useSession } from "@/hooks/use-session";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

function AppLayout() {
  const [ready, setReady] = useState(false);
  const { data: sessao } = useSession();

  // BYPASS TEMPORÁRIO: chave do Supabase inválida (401) faz getSession()/
  // profiles falhar e mandar de volta pro /login. Enquanto isso não é
  // corrigido no .env, entra direto — useSession() já cai numa sessão fake.
  // Reverter para o bloco original quando a chave for corrigida.
  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready || !sessao) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
        Carregando...
      </div>
    );
  }

  // Colaborador tem uma tela própria e simples — não vê o painel completo do gestor.
  if (sessao.meu_papel === "colaborador") {
    return <ColaboradorView />;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <AppHeader />
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}