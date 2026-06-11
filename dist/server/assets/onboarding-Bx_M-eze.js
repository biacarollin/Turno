import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { s as supabase } from "./client-BDUtUdlc.js";
import { S as SEGMENTOS } from "./segmentos-BeD3Suz1.js";
import { u as useConfigurarSegmento } from "./segmento-CphbABvY.js";
import { C as Card } from "./card-RGlIzTYo.js";
import { B as Button } from "./button-DA2gxxPy.js";
import { I as Input } from "./input-C0QjszdI.js";
import { L as Label } from "./label-JU3yqRBo.js";
import { Sparkles, Pencil, Loader2, Check, ChevronLeft, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";
import "@supabase/supabase-js";
import "@tanstack/react-query";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-label";
function OnboardingPage() {
  const navigate = useNavigate();
  const configurar = useConfigurarSegmento();
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState("empresa");
  const [empresa, setEmpresa] = useState("");
  const [topoId, setTopoId] = useState(null);
  const [subId, setSubId] = useState(null);
  const [subNomeCustom, setSubNomeCustom] = useState("");
  const [edit, setEdit] = useState(false);
  const [cargos, setCargos] = useState([]);
  const [turnos, setTurnos] = useState([]);
  const [tipos, setTipos] = useState([]);
  useEffect(() => {
    let active = true;
    (async () => {
      const {
        data: {
          session
        }
      } = await supabase.auth.getSession();
      if (!active) return;
      if (!session) {
        navigate({
          to: "/login"
        });
        return;
      }
      const {
        data: profile
      } = await supabase.from("profiles").select("filial_ativa_id, segmento").eq("user_id", session.user.id).maybeSingle();
      if (!active) return;
      if (profile?.segmento && profile?.filial_ativa_id) {
        navigate({
          to: "/app"
        });
        return;
      }
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [navigate]);
  const topo = useMemo(() => SEGMENTOS.find((t) => t.id === topoId) ?? null, [topoId]);
  const sub = useMemo(() => topo?.subs.find((s) => s.id === subId) ?? null, [topo, subId]);
  useEffect(() => {
    if (step === "confirm" && sub) {
      setCargos(sub.cargosSugeridos);
      setTurnos(sub.turnosSugeridos);
      setTipos(sub.tiposOcorrencia);
      setEdit(false);
    }
  }, [step, sub]);
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center text-sm text-muted-foreground", children: "Carregando..." });
  }
  const concluir = async () => {
    if (!topoId || !subId) return;
    if (subId === "outras" && !subNomeCustom.trim()) {
      toast.error("Dê um nome para o seu segmento");
      return;
    }
    try {
      await configurar.mutateAsync({
        topoId,
        subId,
        empresaNome: empresa,
        subNomeCustom: subId === "outras" ? subNomeCustom : void 0,
        cargos,
        turnos,
        tiposOcorrencia: tipos
      });
      toast.success("Tudo pronto! Bem-vindo(a) ao Turno.");
      navigate({
        to: "/app"
      });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erro ao configurar");
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-muted/30 px-4 py-10", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8 text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "mx-auto mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-turno-100 text-turno-700", children: /* @__PURE__ */ jsx(Sparkles, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold", children: "Vamos personalizar o Turno para você" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Em poucos passos sua conta fica pronta com cargos, turnos e tipos de ocorrência típicos da sua operação." })
    ] }),
    step === "empresa" && /* @__PURE__ */ jsxs(Card, { className: "p-6", children: [
      /* @__PURE__ */ jsx(Label, { htmlFor: "empresa", className: "text-base", children: "Nome da empresa ou operação" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "É o nome que vai aparecer no topo da ferramenta. Você pode editar depois." }),
      /* @__PURE__ */ jsx(Input, { id: "empresa", autoFocus: true, className: "mt-3", placeholder: "Ex.: Hospital São Lucas, Transportadora XYZ", value: empresa, onChange: (e) => setEmpresa(e.target.value) }),
      /* @__PURE__ */ jsx("div", { className: "mt-6 flex justify-end", children: /* @__PURE__ */ jsx(Button, { className: "bg-turno-600 hover:bg-turno-700", disabled: !empresa.trim(), onClick: () => setStep("topo"), children: "Continuar" }) })
    ] }),
    step === "topo" && /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(BackBtn, { onClick: () => setStep("empresa") }),
      /* @__PURE__ */ jsx("h2", { className: "mb-3 text-lg font-medium", children: "Em qual segmento você atua?" }),
      /* @__PURE__ */ jsx("div", { className: "grid gap-3 md:grid-cols-2", children: SEGMENTOS.map((t) => /* @__PURE__ */ jsxs("button", { onClick: () => {
        setTopoId(t.id);
        setSubId(null);
        setStep("sub");
      }, className: "rounded-lg border bg-card p-5 text-left transition hover:border-turno-400 hover:shadow-md", children: [
        /* @__PURE__ */ jsx("div", { className: "text-base font-medium", children: t.nome }),
        /* @__PURE__ */ jsx("div", { className: "mt-1 text-sm text-muted-foreground", children: t.exemplos })
      ] }, t.id)) })
    ] }),
    step === "sub" && topo && /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(BackBtn, { onClick: () => setStep("topo") }),
      /* @__PURE__ */ jsx("h2", { className: "mb-1 text-lg font-medium", children: topo.nome }),
      /* @__PURE__ */ jsx("p", { className: "mb-3 text-sm text-muted-foreground", children: "Escolha a subcategoria mais próxima da sua operação." }),
      /* @__PURE__ */ jsx("div", { className: "grid gap-3 md:grid-cols-2", children: topo.subs.map((s) => /* @__PURE__ */ jsxs("button", { onClick: () => {
        setSubId(s.id);
        setSubNomeCustom("");
        setStep("confirm");
      }, className: "rounded-lg border bg-card p-4 text-left transition hover:border-turno-400 hover:shadow-md", children: [
        /* @__PURE__ */ jsx("div", { className: "font-medium", children: s.nome }),
        s.id === "outras" && /* @__PURE__ */ jsx("div", { className: "mt-1 text-xs text-muted-foreground", children: "Crie do zero com o nome que quiser" })
      ] }, s.id)) })
    ] }),
    step === "confirm" && topo && sub && /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(BackBtn, { onClick: () => setStep("sub") }),
      /* @__PURE__ */ jsxs(Card, { className: "p-6", children: [
        /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: topo.nome }),
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-medium", children: sub.id === "outras" ? subNomeCustom || "Sua operação" : sub.nome }),
        sub.id === "outras" && /* @__PURE__ */ jsxs("div", { className: "mt-3", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "custom", children: "Como você chama esse segmento?" }),
          /* @__PURE__ */ jsx(Input, { id: "custom", className: "mt-1.5", placeholder: "Ex.: Atendimento veterinário", value: subNomeCustom, onChange: (e) => setSubNomeCustom(e.target.value) })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: sub.id === "outras" && cargos.length === 0 ? "Você vai começar com a estrutura em branco e cria tudo do seu jeito." : "Vamos criar essa estrutura inicial na sua conta. Você pode editar tudo depois." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-5 grid gap-4 md:grid-cols-3", children: [
          /* @__PURE__ */ jsx(PreviewBox, { title: "Cargos", items: cargos.map((c) => c.nome), editing: edit, onRemove: (i) => setCargos((arr) => arr.filter((_, x) => x !== i)), onAdd: (nome) => setCargos((arr) => [...arr, {
            nome,
            cor: "#10b981"
          }]), placeholder: "Novo cargo" }),
          /* @__PURE__ */ jsx(PreviewBox, { title: "Turnos", items: turnos.map((t) => `${t.nome} (${t.inicio}–${t.fim})`), editing: edit, onRemove: (i) => setTurnos((arr) => arr.filter((_, x) => x !== i)), onAdd: (nome) => setTurnos((arr) => [...arr, {
            nome,
            inicio: "08:00",
            fim: "18:00"
          }]), placeholder: "Novo turno" }),
          /* @__PURE__ */ jsx(PreviewBox, { title: "Tipos de ocorrência", items: tipos.map((t) => t.nome), editing: edit, onRemove: (i) => setTipos((arr) => arr.filter((_, x) => x !== i)), onAdd: (nome) => setTipos((arr) => [...arr, {
            nome,
            gravidade_default: "media"
          }]), placeholder: "Novo tipo" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap justify-end gap-2", children: [
          /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => setStep("topo"), children: "Trocar de categoria" }),
          /* @__PURE__ */ jsxs(Button, { variant: "outline", onClick: () => setEdit((v) => !v), children: [
            /* @__PURE__ */ jsx(Pencil, { className: "mr-1.5 h-4 w-4" }),
            edit ? "Concluir edição" : "Editar estrutura sugerida"
          ] }),
          /* @__PURE__ */ jsx(Button, { className: "bg-turno-600 hover:bg-turno-700", onClick: concluir, disabled: configurar.isPending, children: configurar.isPending ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Loader2, { className: "mr-1.5 h-4 w-4 animate-spin" }),
            " Configurando..."
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Check, { className: "mr-1.5 h-4 w-4" }),
            " Confirmar e começar"
          ] }) })
        ] })
      ] })
    ] })
  ] }) });
}
function BackBtn({
  onClick
}) {
  return /* @__PURE__ */ jsxs("button", { onClick, className: "mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground", children: [
    /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" }),
    " Voltar"
  ] });
}
function PreviewBox({
  title,
  items,
  editing,
  onRemove,
  onAdd,
  placeholder
}) {
  const [novo, setNovo] = useState("");
  return /* @__PURE__ */ jsxs("div", { className: "rounded-md border bg-muted/30 p-3", children: [
    /* @__PURE__ */ jsx("div", { className: "text-xs font-medium uppercase tracking-wide text-muted-foreground", children: title }),
    items.length === 0 ? /* @__PURE__ */ jsx("div", { className: "mt-2 text-xs text-muted-foreground", children: "Você criará do zero" }) : /* @__PURE__ */ jsx("ul", { className: "mt-2 space-y-1 text-sm", children: items.map((i, idx) => /* @__PURE__ */ jsxs("li", { className: "flex items-center justify-between gap-2 text-foreground", children: [
      /* @__PURE__ */ jsxs("span", { children: [
        "• ",
        i
      ] }),
      editing && /* @__PURE__ */ jsx("button", { onClick: () => onRemove(idx), className: "text-muted-foreground hover:text-destructive", "aria-label": `Remover ${i}`, children: /* @__PURE__ */ jsx(Trash2, { className: "h-3.5 w-3.5" }) })
    ] }, `${i}-${idx}`)) }),
    editing && /* @__PURE__ */ jsxs("div", { className: "mt-3 flex gap-1.5", children: [
      /* @__PURE__ */ jsx(Input, { value: novo, onChange: (e) => setNovo(e.target.value), placeholder, className: "h-8 text-xs", onKeyDown: (e) => {
        if (e.key === "Enter" && novo.trim()) {
          e.preventDefault();
          onAdd(novo.trim());
          setNovo("");
        }
      } }),
      /* @__PURE__ */ jsx(Button, { type: "button", size: "sm", variant: "outline", className: "h-8 px-2", onClick: () => {
        if (novo.trim()) {
          onAdd(novo.trim());
          setNovo("");
        }
      }, children: /* @__PURE__ */ jsx(Plus, { className: "h-3.5 w-3.5" }) })
    ] })
  ] });
}
export {
  OnboardingPage as component
};
