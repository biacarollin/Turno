import { jsxs, jsx } from "react/jsx-runtime";
import { P as PageHeader } from "./PageHeader-XNv6HAI7.js";
import { C as Card } from "./card-RGlIzTYo.js";
import { B as Button } from "./button-DA2gxxPy.js";
import { B as Badge } from "./badge-DyfXZgLs.js";
import { Bell, Clock, Trash2 } from "lucide-react";
import { useState } from "react";
import { D as Dialog, a as DialogContent, d as DialogHeader, e as DialogTitle, b as DialogDescription, c as DialogFooter } from "./dialog-BZpy7vbf.js";
import { I as Input } from "./input-C0QjszdI.js";
import { L as Label } from "./label-JU3yqRBo.js";
import { S as Switch } from "./switch-CQ4rbtn8.js";
import { toast } from "sonner";
import { i as useTurnos, h as useSalvarTurno, e as useExcluirTurno } from "./equipe-DeH1yNtv.js";
import { u as useMinhasEquipes } from "./use-session-S7Dx9RFc.js";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-dialog";
import "@radix-ui/react-label";
import "@radix-ui/react-switch";
import "@tanstack/react-query";
import "./client-BDUtUdlc.js";
import "@supabase/supabase-js";
const turnoVazio = {
  nome: "",
  inicio: "08:00",
  fim: "16:00",
  cargos: [],
  antecedencia: 15,
  posLimite: 30,
  ativo: true
};
function Turnos() {
  const {
    data: equipes = []
  } = useMinhasEquipes();
  const equipe_id = equipes[0]?.equipe_id;
  const {
    data: turnos = [],
    isLoading
  } = useTurnos(equipe_id);
  const salvarTurno = useSalvarTurno();
  const excluirTurno = useExcluirTurno();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(turnoVazio);
  const [cargosTxt, setCargosTxt] = useState("");
  const abrirNovo = () => {
    setForm(turnoVazio);
    setCargosTxt("");
    setOpen(true);
  };
  const abrirEditar = (t) => {
    setForm(t);
    setCargosTxt(t.cargos.join(", "));
    setOpen(true);
  };
  const salvar = async () => {
    if (!form.nome.trim()) {
      toast.error("Informe o nome do turno");
      return;
    }
    if (!equipe_id) {
      toast.error("Nenhuma equipe ativa");
      return;
    }
    const cargos = cargosTxt.split(",").map((c) => c.trim()).filter(Boolean);
    try {
      await salvarTurno.mutateAsync({
        ...form,
        cargos,
        equipe_id
      });
      toast.success(form.id ? "Turno atualizado" : "Turno criado");
      setOpen(false);
    } catch (e) {
      toast.error(e.message);
    }
  };
  const remover = async () => {
    if (!form.id || !equipe_id) return;
    try {
      await excluirTurno.mutateAsync({
        id: form.id,
        equipe_id
      });
      toast.success("Turno excluído");
      setOpen(false);
    } catch (e) {
      toast.error(e.message);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl space-y-6", children: [
    /* @__PURE__ */ jsx(PageHeader, { title: "Turnos", subtitle: "Defina janelas, notificações antecipadas e limite pós-encerramento.", actions: /* @__PURE__ */ jsx(Button, { className: "bg-turno-600 hover:bg-turno-700", onClick: abrirNovo, children: "Novo turno" }) }),
    isLoading && /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: "Carregando..." }),
    !isLoading && turnos.length === 0 && /* @__PURE__ */ jsx(Card, { className: "p-6 text-center text-sm text-muted-foreground", children: 'Nenhum turno cadastrado. Clique em "Novo turno".' }),
    /* @__PURE__ */ jsx("div", { className: "grid gap-4 md:grid-cols-2", children: turnos.map((t) => /* @__PURE__ */ jsxs(Card, { className: "p-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "text-base font-medium", children: t.nome }),
          /* @__PURE__ */ jsxs("div", { className: "mt-1 font-mono text-sm text-muted-foreground", children: [
            t.inicio,
            " – ",
            t.fim
          ] })
        ] }),
        /* @__PURE__ */ jsx(Badge, { className: t.ativo ? "bg-turno-500" : "bg-muted text-muted-foreground", children: t.ativo ? "Ativo" : "Inativo" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-3 flex flex-wrap gap-1.5", children: t.cargos.map((c) => /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "bg-turno-50 text-turno-800", children: c }, c)) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 space-y-2 border-t pt-4 text-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
          /* @__PURE__ */ jsx(Bell, { className: "h-3.5 w-3.5" }),
          "Notificação antecipada: ",
          /* @__PURE__ */ jsxs("strong", { className: "text-foreground", children: [
            t.antecedencia,
            " min"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
          /* @__PURE__ */ jsx(Clock, { className: "h-3.5 w-3.5" }),
          "Limite pós-encerramento: ",
          /* @__PURE__ */ jsxs("strong", { className: "text-foreground", children: [
            t.posLimite,
            " min"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Button, { variant: "outline", className: "mt-4 w-full", onClick: () => abrirEditar(t), children: "Editar turno" })
    ] }, t.id)) }),
    /* @__PURE__ */ jsx(Dialog, { open, onOpenChange: setOpen, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-lg", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: form.id ? "Editar turno" : "Novo turno" }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "Configure a janela, cargos e regras de notificação." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "nome", children: "Nome" }),
          /* @__PURE__ */ jsx(Input, { id: "nome", value: form.nome, onChange: (e) => setForm({
            ...form,
            nome: e.target.value
          }), placeholder: "Ex.: Manhã" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "inicio", children: "Início" }),
            /* @__PURE__ */ jsx(Input, { id: "inicio", type: "time", value: form.inicio, onChange: (e) => setForm({
              ...form,
              inicio: e.target.value
            }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "fim", children: "Fim" }),
            /* @__PURE__ */ jsx(Input, { id: "fim", type: "time", value: form.fim, onChange: (e) => setForm({
              ...form,
              fim: e.target.value
            }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "cargos", children: "Cargos (separados por vírgula)" }),
          /* @__PURE__ */ jsx(Input, { id: "cargos", value: cargosTxt, onChange: (e) => setCargosTxt(e.target.value), placeholder: "Farmacêutico, Auxiliar" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "ant", children: "Notificação antecipada (min)" }),
            /* @__PURE__ */ jsx(Input, { id: "ant", type: "number", min: 0, value: form.antecedencia, onChange: (e) => setForm({
              ...form,
              antecedencia: Number(e.target.value)
            }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "pos", children: "Limite pós-encerramento (min)" }),
            /* @__PURE__ */ jsx(Input, { id: "pos", type: "number", min: 0, value: form.posLimite, onChange: (e) => setForm({
              ...form,
              posLimite: Number(e.target.value)
            }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between rounded-md border p-3", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "ativo", children: "Turno ativo" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Quando inativo, não gera passagens." })
          ] }),
          /* @__PURE__ */ jsx(Switch, { id: "ativo", checked: form.ativo, onCheckedChange: (v) => setForm({
            ...form,
            ativo: v
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(DialogFooter, { className: form.id ? "!justify-between" : "", children: [
        form.id && /* @__PURE__ */ jsxs(Button, { variant: "destructive", onClick: remover, children: [
          /* @__PURE__ */ jsx(Trash2, { className: "mr-1 h-4 w-4" }),
          " Excluir"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => setOpen(false), children: "Cancelar" }),
          /* @__PURE__ */ jsx(Button, { className: "bg-turno-600 hover:bg-turno-700", onClick: salvar, children: "Salvar" })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  Turnos as component
};
