import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { P as PageHeader } from "./PageHeader-XNv6HAI7.js";
import { C as Card } from "./card-RGlIzTYo.js";
import { B as Button } from "./button-DA2gxxPy.js";
import { B as Badge } from "./badge-DyfXZgLs.js";
import { I as Input } from "./input-C0QjszdI.js";
import { L as Label } from "./label-JU3yqRBo.js";
import { Plus, CalendarDays, Check, X, Trash2 } from "lucide-react";
import { D as Dialog, a as DialogContent, d as DialogHeader, e as DialogTitle, c as DialogFooter } from "./dialog-BZpy7vbf.js";
import { S as Select, c as SelectTrigger, d as SelectValue, a as SelectContent, b as SelectItem } from "./select-NX1S2Qd-.js";
import { toast } from "sonner";
import { c as useFolgas, a as useCriarFolga, u as useAtualizarStatusFolga, b as useExcluirFolga } from "./folgas-ZdQoj1SD.js";
import { f as useMembros } from "./equipe-DeH1yNtv.js";
import { a as useSession, u as useMinhasEquipes } from "./use-session-S7Dx9RFc.js";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-label";
import "@radix-ui/react-dialog";
import "@radix-ui/react-select";
import "@tanstack/react-query";
import "./client-BDUtUdlc.js";
import "@supabase/supabase-js";
function Folgas() {
  const {
    data: sessao
  } = useSession();
  const {
    data: equipes = []
  } = useMinhasEquipes();
  const equipe_id = equipes[0]?.equipe_id;
  const filial_id = sessao?.filial_ativa_id ?? void 0;
  const {
    data: folgas = [],
    isLoading
  } = useFolgas(filial_id);
  const {
    data: membros = []
  } = useMembros(equipe_id);
  const criar = useCriarFolga();
  const atualizarStatus = useAtualizarStatusFolga();
  const excluir = useExcluirFolga();
  const [open, setOpen] = useState(false);
  const [membroId, setMembroId] = useState("");
  const [inicio, setInicio] = useState("");
  const [fim, setFim] = useState("");
  const [motivo, setMotivo] = useState("");
  const nomeMembro = (id) => membros.find((m) => m.id === id)?.nome || "—";
  const submit = async (e) => {
    e.preventDefault();
    if (!inicio || !fim) return;
    try {
      await criar.mutateAsync({
        membro_id: membroId || null,
        data_inicio: inicio,
        data_fim: fim,
        motivo
      });
      toast.success("Folga registrada");
      setOpen(false);
      setMembroId("");
      setInicio("");
      setFim("");
      setMotivo("");
    } catch (e2) {
      toast.error(e2 instanceof Error ? e2.message : "Erro");
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl space-y-6", children: [
    /* @__PURE__ */ jsx(PageHeader, { title: "Folgas", subtitle: "Registre e acompanhe folgas da equipe.", actions: /* @__PURE__ */ jsxs(Button, { className: "bg-turno-600 hover:bg-turno-700", onClick: () => setOpen(true), children: [
      /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }),
      " Nova folga"
    ] }) }),
    isLoading ? /* @__PURE__ */ jsx(Card, { className: "p-8 text-center text-sm text-muted-foreground", children: "Carregando..." }) : folgas.length === 0 ? /* @__PURE__ */ jsxs(Card, { className: "p-10 text-center", children: [
      /* @__PURE__ */ jsx(CalendarDays, { className: "mx-auto h-10 w-10 text-muted-foreground/40" }),
      /* @__PURE__ */ jsx("h3", { className: "mt-3 text-base font-medium", children: "Nenhuma folga registrada" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Quando alguém pedir folga, registre aqui." })
    ] }) : /* @__PURE__ */ jsx(Card, { className: "divide-y", children: folgas.map((f) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-4 py-3 text-sm", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Badge, { variant: f.status === "aprovada" ? "default" : f.status === "recusada" ? "outline" : "secondary", className: f.status === "aprovada" ? "bg-turno-500" : f.status === "recusada" ? "border-destructive text-destructive" : "", children: f.status }),
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: nomeMembro(f.membro_id) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground", children: [
          new Date(f.data_inicio).toLocaleDateString("pt-BR"),
          " – ",
          new Date(f.data_fim).toLocaleDateString("pt-BR"),
          f.motivo && ` · ${f.motivo}`
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-1", children: [
        f.status !== "aprovada" && /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", onClick: () => atualizarStatus.mutate({
          id: f.id,
          status: "aprovada",
          filial_id: f.filial_id
        }), children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4 text-turno-600" }) }),
        f.status !== "recusada" && /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", onClick: () => atualizarStatus.mutate({
          id: f.id,
          status: "recusada",
          filial_id: f.filial_id
        }), children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4 text-amber-600" }) }),
        /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", onClick: () => {
          if (confirm("Excluir?")) excluir.mutate({
            id: f.id,
            filial_id: f.filial_id
          });
        }, children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4 text-destructive" }) })
      ] })
    ] }, f.id)) }),
    /* @__PURE__ */ jsx(Dialog, { open, onOpenChange: setOpen, children: /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: "Nova folga" }) }),
      /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
        membros.length > 0 && /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { children: "Membro" }),
          /* @__PURE__ */ jsxs(Select, { value: membroId, onValueChange: setMembroId, children: [
            /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Escolha um membro" }) }),
            /* @__PURE__ */ jsx(SelectContent, { children: membros.map((m) => /* @__PURE__ */ jsx(SelectItem, { value: m.id, children: m.nome }, m.id)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "i", children: "Início" }),
            /* @__PURE__ */ jsx(Input, { id: "i", type: "date", value: inicio, onChange: (e) => setInicio(e.target.value), required: true })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "f", children: "Fim" }),
            /* @__PURE__ */ jsx(Input, { id: "f", type: "date", value: fim, onChange: (e) => setFim(e.target.value), required: true })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "mo", children: "Motivo" }),
          /* @__PURE__ */ jsx(Input, { id: "mo", value: motivo, onChange: (e) => setMotivo(e.target.value), placeholder: "Opcional" })
        ] }),
        /* @__PURE__ */ jsxs(DialogFooter, { children: [
          /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", onClick: () => setOpen(false), children: "Cancelar" }),
          /* @__PURE__ */ jsx(Button, { type: "submit", className: "bg-turno-600 hover:bg-turno-700", disabled: criar.isPending, children: "Registrar" })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  Folgas as component
};
