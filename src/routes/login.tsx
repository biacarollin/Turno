import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
    <button
      type="button"
      disabled={loading}
      onClick={handleGoogle}
      className="flex w-full items-center justify-center gap-2.5 rounded-[7px] border border-gray-200 bg-white py-2.5 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50 disabled:opacity-60"
    >
      <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.4-1.6 4.1-5.5 4.1-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.5 14.7 2.5 12 2.5 6.8 2.5 2.6 6.7 2.6 12s4.2 9.5 9.4 9.5c5.4 0 9-3.8 9-9.2 0-.6-.1-1.1-.2-1.6H12z"/>
      </svg>
      {loading ? "Aguarde..." : label}
    </button>
  );
}

function FieldLabel({ children, htmlFor }: { children: React.ReactNode; htmlFor: string }) {
  return (
    <Label htmlFor={htmlFor} className="text-[11px] font-medium tracking-[0.1px] text-gray-500">
      {children}
    </Label>
  );
}

function Login() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"entrar" | "cadastrar">("entrar");
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

  const inputClass =
    "h-9 rounded-[7px] border-gray-200 text-[13px] placeholder:text-gray-300 focus-visible:ring-app-300";

  return (
    <div className="flex min-h-screen">
      {/* Painel esquerdo — marca */}
      <div className="relative hidden w-1/2 overflow-hidden bg-app-950 lg:flex lg:flex-col lg:justify-between lg:px-14 lg:py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 right-0 h-[300px] w-[300px] rounded-full bg-app-600/20 blur-3xl"
        />
        <a href="/" className="relative">
          <Logo variant="dark" />
        </a>

        <div className="relative">
          <span className="text-[10px] font-semibold tracking-[2px] text-[#2d6040]">
            GESTÃO DE TURNOS DIGITAL
          </span>
          <h1 className="mt-3 text-[46px] font-medium leading-[1.1] tracking-tight text-white">
            Cada turno,
            <br />
            <span className="text-app-400">registrado.</span>
          </h1>
          <p className="mt-6 max-w-[320px] text-sm leading-relaxed text-[#3a6045]">
            Substitua WhatsApp e papel por registros com assinatura digital, IA
            e rastreabilidade total.
          </p>
        </div>

        <div className="relative">
          <div className="h-px w-full max-w-[560px] bg-app-800" />
          <div className="mt-5 flex gap-12">
            <div>
              <div className="text-xl font-medium tracking-tight text-white">94%</div>
              <div className="mt-1 text-[11px] text-[#2d6040]">passagens assinadas</div>
            </div>
            <div>
              <div className="text-xl font-medium tracking-tight text-white">12k+</div>
              <div className="mt-1 text-[11px] text-[#2d6040]">turnos registrados</div>
            </div>
            <div>
              <div className="text-xl font-medium tracking-tight text-white">NPS 9</div>
              <div className="mt-1 text-[11px] text-[#2d6040]">saúde &amp; logística</div>
            </div>
          </div>
        </div>
      </div>

      {/* Painel direito — formulário */}
      <div className="flex w-full items-center justify-center bg-white px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-[292px]">
          <div className="mb-8 flex justify-center lg:hidden">
            <Logo />
          </div>

          {tab === "entrar" ? (
            <>
              <h2 className="text-[19px] font-medium tracking-tight text-gray-900">
                Bem-vindo de volta
              </h2>
              <p className="mt-1 text-xs text-gray-500">Entre na sua conta para continuar.</p>

              <div className="mt-6">
                <GoogleButton label="Continuar com Google" />
              </div>

              <div className="relative my-5">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-3 text-[11px] text-gray-400">ou</span>
                </div>
              </div>

              <form className="space-y-4" onSubmit={handleLogin}>
                <div className="space-y-1.5">
                  <FieldLabel htmlFor="email-in">E-mail</FieldLabel>
                  <Input
                    id="email-in" type="email" required value={loginEmail}
                    placeholder="seu@email.com"
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <FieldLabel htmlFor="senha-in">Senha</FieldLabel>
                    <button
                      type="button" onClick={handleForgot}
                      className="text-[11px] font-medium text-app-600 hover:underline"
                    >
                      Esqueci minha senha
                    </button>
                  </div>
                  <Input
                    id="senha-in" type="password" required value={loginSenha}
                    onChange={(e) => setLoginSenha(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <Button
                  type="submit" disabled={loading}
                  className="mt-2 w-full rounded-lg bg-app-500 py-2.5 text-sm font-medium hover:bg-app-600"
                >
                  {loading ? "Entrando..." : "Entrar"}
                </Button>
              </form>

              <p className="mt-6 text-center text-xs text-gray-400">
                Não tem conta?{" "}
                <button
                  type="button"
                  onClick={() => setTab("cadastrar")}
                  className="font-medium text-app-600 hover:underline"
                >
                  Cadastre-se grátis
                </button>
              </p>
            </>
          ) : (
            <>
              <h2 className="text-[19px] font-medium tracking-tight text-gray-900">
                Criar sua conta
              </h2>
              <p className="mt-1 text-xs text-gray-500">Comece grátis, sem cartão de crédito.</p>

              <div className="mt-6">
                <GoogleButton label="Cadastrar com Google" />
              </div>

              <div className="relative my-5">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-3 text-[11px] text-gray-400">ou</span>
                </div>
              </div>

              <form className="space-y-4" onSubmit={handleSignup}>
                <div className="space-y-1.5">
                  <FieldLabel htmlFor="nome">Nome completo</FieldLabel>
                  <Input id="nome" required value={nome} onChange={(e) => setNome(e.target.value)} className={inputClass} />
                </div>
                <div className="space-y-1.5">
                  <FieldLabel htmlFor="email-up">E-mail</FieldLabel>
                  <Input
                    id="email-up" type="email" required value={signupEmail}
                    placeholder="seu@email.com"
                    onChange={(e) => setSignupEmail(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div className="space-y-1.5">
                  <FieldLabel htmlFor="cel">Celular</FieldLabel>
                  <Input
                    id="cel" inputMode="tel" placeholder="(11) 99999-9999"
                    value={celular} onChange={(e) => setCelular(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div className="space-y-1.5">
                  <FieldLabel htmlFor="senha-up">Criar senha</FieldLabel>
                  <Input
                    id="senha-up" type="password" required minLength={6}
                    value={signupSenha} onChange={(e) => setSignupSenha(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <Button
                  type="submit" disabled={loading}
                  className="mt-2 w-full rounded-lg bg-app-500 py-2.5 text-sm font-medium hover:bg-app-600"
                >
                  {loading ? "Criando..." : "Criar conta"}
                </Button>
                <p className="text-center text-[11px] text-gray-400">
                  Ao continuar você concorda com os{" "}
                  <a href="/termos" className="underline">Termos</a>{" "}e a{" "}
                  <a href="/privacidade" className="underline">Política de Privacidade</a>.
                </p>
              </form>

              <p className="mt-6 text-center text-xs text-gray-400">
                Já tem conta?{" "}
                <button
                  type="button"
                  onClick={() => setTab("entrar")}
                  className="font-medium text-app-600 hover:underline"
                >
                  Entrar
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
