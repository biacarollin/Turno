import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Logo } from "@/components/landing/Logo";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/login")({
  component: Login,
  head: () => ({ meta: [{ title: "Entrar · Turno" }] }),
});

function GoogleButton({ label }: { label: string }) {
  const [loading, setLoading] = useState(false);
  const handleGoogle = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/app",
      },
    });
    if (error) {
      toast.error("Erro ao entrar com Google");
      setLoading(false);
    }
  };
  return (
    <Button type="button" variant="outline" className="w-full" disabled={loading} onClick={handleGoogle}>
      <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.4-1.6 4.1-5.5 4.1-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.5 14.7 2.5 12 2.5 6.8 2.5 2.6 6.7 2.6 12s4.2 9.5 9.4 9.5c5.4 0 9-3.8 9-9.2 0-.6-.1-1.1-.2-1.6H12z"/>
      </svg>
      {loading ? "Aguarde..." : label}
    </Button>
  );
}

function Login() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("entrar");
  const [loading, setLoading] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginSenha, setLoginSenha] = useState("");

  const [nome, setNome] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [signupSenha, setSignupSenha] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("excluida") === "1") {
      toast.success("Organização excluída. Crie uma nova conta para começar de novo.");
      const url = new URL(window.location.href);
      url.searchParams.delete("excluida");
      window.history.replaceState({}, "", url.toString());
    }
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/app" });
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) navigate({ to: "/app" });
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail.trim(),
      password: loginSenha,
    });
    setLoading(false);
    if (error) {
      toast.error(
        error.message === "Invalid login credentials"
          ? "E-mail ou senha incorretos"
          : error.message
      );
      return;
    }
    toast.success("Bem-vindo!");
    navigate({ to: "/app" });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signupSenha.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: signupEmail.trim(),
      password: signupSenha,
      options: {
        emailRedirectTo: `${window.location.origin}/app`,
        data: { nome_completo: nome.trim(), celular },
      },
    });
    setLoading(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Cadastro criado! Verifique seu e-mail para confirmar.");
    setTab("entrar");
  };

  const handleForgot = async () => {
    if (!loginEmail.trim()) {
      toast.error("Informe seu e-mail no campo acima primeiro");
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(loginEmail.trim(), {
      redirectTo: `${window.location.origin}/login`,
    });
    if (error) toast.error(error.message);
    else toast.success("Enviamos um link de redefinição para seu e-mail");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-10">
      <Card className="w-full max-w-md p-7">
        <div className="flex justify-center"><Logo /></div>

        <Tabs value={tab} onValueChange={setTab} className="mt-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="entrar">Entrar</TabsTrigger>
            <TabsTrigger value="cadastrar">Cadastre-se</TabsTrigger>
          </TabsList>

          <TabsContent value="entrar" className="mt-6 space-y-4">
            <GoogleButton label="Entrar com Google" />
            <Divider />
            <form className="space-y-4" onSubmit={handleLogin}>
              <div className="space-y-1.5">
                <Label htmlFor="email-in">E-mail</Label>
                <Input id="email-in" type="email" required value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="senha-in">Senha</Label>
                <Input id="senha-in" type="password" required value={loginSenha}
                  onChange={(e) => setLoginSenha(e.target.value)} />
              </div>
              <Button type="submit" disabled={loading} className="w-full bg-turno-600 hover:bg-turno-700">
                {loading ? "Entrando..." : "Entrar"}
              </Button>
              <button type="button" onClick={handleForgot}
                className="block w-full text-center text-xs text-muted-foreground hover:underline">
                Esqueci minha senha
              </button>
            </form>
          </TabsContent>

          <TabsContent value="cadastrar" className="mt-6 space-y-4">
            <GoogleButton label="Cadastrar com Google" />
            <Divider />
            <form className="space-y-4" onSubmit={handleSignup}>
              <div className="space-y-1.5">
                <Label htmlFor="nome">Nome completo</Label>
                <Input id="nome" required value={nome} onChange={(e) => setNome(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email-up">E-mail</Label>
                <Input id="email-up" type="email" required value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="cel">Celular</Label>
                <Input id="cel" inputMode="tel" placeholder="(11) 99999-9999"
                  value={celular} onChange={(e) => setCelular(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="senha-up">Criar senha</Label>
                <Input id="senha-up" type="password" required minLength={6}
                  value={signupSenha} onChange={(e) => setSignupSenha(e.target.value)} />
              </div>
              <Button type="submit" disabled={loading} className="w-full bg-turno-600 hover:bg-turno-700">
                {loading ? "Criando..." : "Criar conta"}
              </Button>
              <p className="text-center text-[11px] text-muted-foreground">
                Ao continuar você concorda com os{" "}
                <a href="/termos" className="underline">Termos</a>{" "}e a{" "}
                <a href="/privacidade" className="underline">Política de Privacidade</a>.
              </p>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}

function Divider() {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t" />
      </div>
      <div className="relative flex justify-center text-[11px] uppercase">
        <span className="bg-card px-2 text-muted-foreground">ou</span>
      </div>
    </div>
  );
}