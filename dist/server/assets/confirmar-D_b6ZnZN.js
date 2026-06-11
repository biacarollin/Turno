import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { C as Card } from "./card-RGlIzTYo.js";
import { B as Button } from "./button-DA2gxxPy.js";
import { L as Logo } from "./Logo-D1BtzRXO.js";
import { Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { s as supabase } from "./client-BDUtUdlc.js";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@supabase/supabase-js";
function Confirmar() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [confirmando, setConfirmando] = useState(false);
  const [equipeNome, setEquipeNome] = useState(null);
  const [filialNome, setFilialNome] = useState(null);
  const [equipeId, setEquipeId] = useState(null);
  const [erro, setErro] = useState(null);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const invite = params.get("invite");
    if (!invite) {
      setErro("Link de convite inválido.");
      setLoading(false);
      return;
    }
    supabase.from("equipes").select("id, nome, filiais(nome)").eq("id", invite).single().then(({
      data,
      error
    }) => {
      if (error || !data) {
        setErro("Convite não encontrado ou expirado.");
      } else {
        setEquipeId(data.id);
        setEquipeNome(data.nome);
        setFilialNome(data.filiais?.nome ?? null);
      }
      setLoading(false);
    });
  }, []);
  const confirmar = async () => {
    if (!equipeId) return;
    setConfirmando(true);
    try {
      const {
        data: {
          session
        }
      } = await supabase.auth.getSession();
      if (!session) {
        sessionStorage.setItem("convite_equipe_id", equipeId);
        navigate({
          to: "/login"
        });
        return;
      }
      const user_id = session.user.id;
      const {
        error
      } = await supabase.from("membros_equipe").upsert({
        user_id,
        equipe_id: equipeId,
        dispositivo: "verificado"
      }, {
        onConflict: "user_id,equipe_id"
      });
      if (error) throw error;
      const {
        data: equipe
      } = await supabase.from("equipes").select("filial_id").eq("id", equipeId).single();
      if (equipe?.filial_id) {
        await supabase.from("membros_filial").upsert({
          user_id,
          filial_id: equipe.filial_id,
          papel: "colaborador"
        }, {
          onConflict: "user_id,filial_id"
        });
        await supabase.from("profiles").update({
          filial_ativa_id: equipe.filial_id
        }).eq("user_id", user_id);
      }
      toast.success("Acesso confirmado! Bem-vindo à equipe.");
      navigate({
        to: "/app"
      });
    } catch (e) {
      toast.error(e.message || "Erro ao confirmar acesso");
      setConfirmando(false);
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center", children: /* @__PURE__ */ jsx(Loader2, { className: "h-6 w-6 animate-spin text-turno-600" }) });
  }
  if (erro) {
    return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-muted/40 px-4", children: /* @__PURE__ */ jsxs(Card, { className: "w-full max-w-md p-7 text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(Logo, {}) }),
      /* @__PURE__ */ jsx("h1", { className: "mt-6 text-xl font-medium text-destructive", children: "Convite inválido" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: erro }),
      /* @__PURE__ */ jsx(Button, { className: "mt-6 w-full bg-turno-600 hover:bg-turno-700", onClick: () => navigate({
        to: "/login"
      }), children: "Ir para o login" })
    ] }) });
  }
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-muted/40 px-4", children: /* @__PURE__ */ jsxs(Card, { className: "w-full max-w-md p-7 text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(Logo, {}) }),
    /* @__PURE__ */ jsx("h1", { className: "mt-6 text-xl font-medium", children: "Você foi convidado!" }),
    /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Confirme para entrar na equipe abaixo." }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-col items-center gap-2 rounded-lg border bg-muted/30 p-5", children: [
      /* @__PURE__ */ jsx("div", { className: "text-base font-medium", children: equipeNome }),
      filialNome && /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: filialNome })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-4 inline-flex items-center gap-1.5 text-xs text-turno-700", children: [
      /* @__PURE__ */ jsx(ShieldCheck, { className: "h-3.5 w-3.5" }),
      " Este dispositivo será vinculado à sua conta."
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex gap-2", children: [
      /* @__PURE__ */ jsx(Button, { variant: "outline", className: "flex-1", onClick: () => navigate({
        to: "/login"
      }), children: "Cancelar" }),
      /* @__PURE__ */ jsx(Button, { className: "flex-1 bg-turno-600 hover:bg-turno-700", onClick: confirmar, disabled: confirmando, children: confirmando ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Loader2, { className: "mr-1.5 h-4 w-4 animate-spin" }),
        " Confirmando..."
      ] }) : "Confirmar e entrar" })
    ] })
  ] }) });
}
export {
  Confirmar as component
};
