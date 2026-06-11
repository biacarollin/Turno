import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import * as React from "react";
import { useState, useEffect } from "react";
import { C as Card } from "./card-RGlIzTYo.js";
import { B as Button } from "./button-DA2gxxPy.js";
import { I as Input } from "./input-C0QjszdI.js";
import { L as Label } from "./label-JU3yqRBo.js";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { c as cn } from "./utils-H80jjgLf.js";
import { L as Logo } from "./Logo-D1BtzRXO.js";
import { toast } from "sonner";
import { s as supabase } from "./client-BDUtUdlc.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-label";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
const Tabs = TabsPrimitive.Root;
const TabsList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.List,
  {
    ref,
    className: cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = TabsPrimitive.List.displayName;
const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
const TabsContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
function GoogleButton({
  label
}) {
  const [loading, setLoading] = useState(false);
  const handleGoogle = async () => {
    setLoading(true);
    const {
      error
    } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/app"
      }
    });
    if (error) {
      toast.error("Erro ao entrar com Google");
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs(Button, { type: "button", variant: "outline", className: "w-full", disabled: loading, onClick: handleGoogle, children: [
    /* @__PURE__ */ jsx("svg", { className: "h-4 w-4", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { fill: "#EA4335", d: "M12 10.2v3.9h5.5c-.2 1.4-1.6 4.1-5.5 4.1-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.5 14.7 2.5 12 2.5 6.8 2.5 2.6 6.7 2.6 12s4.2 9.5 9.4 9.5c5.4 0 9-3.8 9-9.2 0-.6-.1-1.1-.2-1.6H12z" }) }),
    loading ? "Aguarde..." : label
  ] });
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
    supabase.auth.getSession().then(({
      data
    }) => {
      if (data.session) navigate({
        to: "/app"
      });
    });
    const {
      data: {
        subscription
      }
    } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) navigate({
        to: "/app"
      });
    });
    return () => subscription.unsubscribe();
  }, [navigate]);
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const {
      error
    } = await supabase.auth.signInWithPassword({
      email: loginEmail.trim(),
      password: loginSenha
    });
    setLoading(false);
    if (error) {
      toast.error(error.message === "Invalid login credentials" ? "E-mail ou senha incorretos" : error.message);
      return;
    }
    toast.success("Bem-vindo!");
    navigate({
      to: "/app"
    });
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    if (signupSenha.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres");
      return;
    }
    setLoading(true);
    const {
      error
    } = await supabase.auth.signUp({
      email: signupEmail.trim(),
      password: signupSenha,
      options: {
        emailRedirectTo: `${window.location.origin}/app`,
        data: {
          nome_completo: nome.trim(),
          celular
        }
      }
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Cadastro criado! Verifique seu e-mail para confirmar.");
    setTab("entrar");
  };
  const handleForgot = async () => {
    if (!loginEmail.trim()) {
      toast.error("Informe seu e-mail no campo acima primeiro");
      return;
    }
    const {
      error
    } = await supabase.auth.resetPasswordForEmail(loginEmail.trim(), {
      redirectTo: `${window.location.origin}/login`
    });
    if (error) toast.error(error.message);
    else toast.success("Enviamos um link de redefinição para seu e-mail");
  };
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-muted/40 px-4 py-10", children: /* @__PURE__ */ jsxs(Card, { className: "w-full max-w-md p-7", children: [
    /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(Logo, {}) }),
    /* @__PURE__ */ jsxs(Tabs, { value: tab, onValueChange: setTab, className: "mt-6", children: [
      /* @__PURE__ */ jsxs(TabsList, { className: "grid w-full grid-cols-2", children: [
        /* @__PURE__ */ jsx(TabsTrigger, { value: "entrar", children: "Entrar" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "cadastrar", children: "Cadastre-se" })
      ] }),
      /* @__PURE__ */ jsxs(TabsContent, { value: "entrar", className: "mt-6 space-y-4", children: [
        /* @__PURE__ */ jsx(GoogleButton, { label: "Entrar com Google" }),
        /* @__PURE__ */ jsx(Divider, {}),
        /* @__PURE__ */ jsxs("form", { className: "space-y-4", onSubmit: handleLogin, children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "email-in", children: "E-mail" }),
            /* @__PURE__ */ jsx(Input, { id: "email-in", type: "email", required: true, value: loginEmail, onChange: (e) => setLoginEmail(e.target.value) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "senha-in", children: "Senha" }),
            /* @__PURE__ */ jsx(Input, { id: "senha-in", type: "password", required: true, value: loginSenha, onChange: (e) => setLoginSenha(e.target.value) })
          ] }),
          /* @__PURE__ */ jsx(Button, { type: "submit", disabled: loading, className: "w-full bg-turno-600 hover:bg-turno-700", children: loading ? "Entrando..." : "Entrar" }),
          /* @__PURE__ */ jsx("button", { type: "button", onClick: handleForgot, className: "block w-full text-center text-xs text-muted-foreground hover:underline", children: "Esqueci minha senha" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(TabsContent, { value: "cadastrar", className: "mt-6 space-y-4", children: [
        /* @__PURE__ */ jsx(GoogleButton, { label: "Cadastrar com Google" }),
        /* @__PURE__ */ jsx(Divider, {}),
        /* @__PURE__ */ jsxs("form", { className: "space-y-4", onSubmit: handleSignup, children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "nome", children: "Nome completo" }),
            /* @__PURE__ */ jsx(Input, { id: "nome", required: true, value: nome, onChange: (e) => setNome(e.target.value) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "email-up", children: "E-mail" }),
            /* @__PURE__ */ jsx(Input, { id: "email-up", type: "email", required: true, value: signupEmail, onChange: (e) => setSignupEmail(e.target.value) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "cel", children: "Celular" }),
            /* @__PURE__ */ jsx(Input, { id: "cel", inputMode: "tel", placeholder: "(11) 99999-9999", value: celular, onChange: (e) => setCelular(e.target.value) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "senha-up", children: "Criar senha" }),
            /* @__PURE__ */ jsx(Input, { id: "senha-up", type: "password", required: true, minLength: 6, value: signupSenha, onChange: (e) => setSignupSenha(e.target.value) })
          ] }),
          /* @__PURE__ */ jsx(Button, { type: "submit", disabled: loading, className: "w-full bg-turno-600 hover:bg-turno-700", children: loading ? "Criando..." : "Criar conta" }),
          /* @__PURE__ */ jsxs("p", { className: "text-center text-[11px] text-muted-foreground", children: [
            "Ao continuar você concorda com os",
            " ",
            /* @__PURE__ */ jsx("a", { href: "/termos", className: "underline", children: "Termos" }),
            " ",
            "e a",
            " ",
            /* @__PURE__ */ jsx("a", { href: "/privacidade", className: "underline", children: "Política de Privacidade" }),
            "."
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
function Divider() {
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center", children: /* @__PURE__ */ jsx("span", { className: "w-full border-t" }) }),
    /* @__PURE__ */ jsx("div", { className: "relative flex justify-center text-[11px] uppercase", children: /* @__PURE__ */ jsx("span", { className: "bg-card px-2 text-muted-foreground", children: "ou" }) })
  ] });
}
export {
  Login as component
};
