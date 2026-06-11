import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Plus, AlertCircle, CheckCircle2, RotateCcw, Trash2 } from "lucide-react";
import { P as PageHeader } from "./PageHeader-XNv6HAI7.js";
import { C as Card } from "./card-RGlIzTYo.js";
import { B as Badge } from "./badge-DyfXZgLs.js";
import { B as Button } from "./button-DA2gxxPy.js";
import { I as Input } from "./input-C0QjszdI.js";
import { L as Label } from "./label-JU3yqRBo.js";
import { T as Textarea } from "./textarea-DSyJ1nlY.js";
import { D as Dialog, a as DialogContent, d as DialogHeader, e as DialogTitle, c as DialogFooter } from "./dialog-BZpy7vbf.js";
import { S as Select, c as SelectTrigger, d as SelectValue, a as SelectContent, b as SelectItem } from "./select-NX1S2Qd-.js";
import { toast } from "sonner";
import { c as useOcorrencias, a as useCriarOcorrencia, u as useAtualizarStatusOcorrencia, b as useExcluirOcorrencia } from "./ocorrencias-CWdEvQgY.js";
import { a as useTiposOcorrencia } from "./segmento-CphbABvY.js";
import { a as useSession, u as useMinhasEquipes } from "./use-session-S7Dx9RFc.js";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "class-variance-authority";
import "@radix-ui/react-slot";
import "@radix-ui/react-label";
import "@radix-ui/react-dialog";
import "@radix-ui/react-select";
import "@tanstack/react-query";
import "./client-BDUtUdlc.js";
import "@supabase/supabase-js";
import "./segmentos-BeD3Suz1.js";
function Ocorrencias() {
  const {
    data: sessao
  } = useSession();
  const {
    data: equipes = []
  } = useMinhasEquipes();
  const equipe_id = equipes[0]?.equipe_id;
  const filial_id = sessao?.filial_ativa_id ?? void 0;
  const {
    data: lista = [],
    isLoading
  } = useOcorrencias(equipe_id);
  const {
    data: tipos = []
  } = useTiposOcorrencia(filial_id);
  const criar = useCriarOcorrencia();
  const atualizarStatus = useAtualizarStatusOcorrencia();
  const excluir = useExcluirOcorrencia();
  const [open, setOpen] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState("");
  const [tipoCustom, setTipoCustom] = useState("");
  const [gravidade, setGravidade] = useState("media");
  const submit = async (e) => {
    e.preventDefault();
    if (!titulo.trim() || !equipe_id) return;
    const tipoFinal = tipo === "__outros__" ? tipoCustom.trim() : tipo;
    try {
      await criar.mutateAsync({
        equipe_id,
        titulo: titulo.trim(),
        descricao,
        tipo: tipoFinal,
        gravidade
      });
      toast.success("Ocorrência registrada");
      setOpen(false);
      setTitulo("");
      setDescricao("");
      setTipo("");
      setTipoCustom("");
      setGravidade("media");
    } catch (e2) {
      toast.error(e2 instanceof Error ? e2.message : "Erro");
    }
  };
  const gravBadge = (g) => g === "alta" ? "border-red-500 bg-red-50 text-red-700" : g === "media" ? "border-amber-500 text-amber-700" : "border-emerald-500 text-emerald-700";
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl space-y-6", children: [
    /* @__PURE__ */ jsx(PageHeader, { title: "Ocorrências", subtitle: "Registre tudo o que acontece nos turnos.", actions: /* @__PURE__ */ jsxs(Button, { className: "bg-turno-600 hover:bg-turno-700", onClick: () => setOpen(true), children: [
      /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }),
      " Nova ocorrência"
    ] }) }),
    isLoading ? /* @__PURE__ */ jsx(Card, { className: "p-8 text-center text-sm text-muted-foreground", children: "Carregando..." }) : lista.length === 0 ? /* @__PURE__ */ jsxs(Card, { className: "p-10 text-center", children: [
      /* @__PURE__ */ jsx(AlertCircle, { className: "mx-auto h-10 w-10 text-muted-foreground/40" }),
      /* @__PURE__ */ jsx("h3", { className: "mt-3 text-base font-medium", children: "Nenhuma ocorrência ainda" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Quando algo acontecer no turno, registre aqui." }),
      /* @__PURE__ */ jsxs(Button, { className: "mt-4 bg-turno-600 hover:bg-turno-700", onClick: () => setOpen(true), children: [
        /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }),
        " Registrar primeira ocorrência"
      ] })
    ] }) : /* @__PURE__ */ jsx("div", { className: "space-y-3", children: lista.map((o) => /* @__PURE__ */ jsx(Card, { className: "p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Badge, { variant: "outline", className: gravBadge(o.gravidade), children: o.gravidade === "alta" ? "Alta" : o.gravidade === "media" ? "Média" : "Baixa" }),
          /* @__PURE__ */ jsx(Badge, { className: o.status === "aberta" ? "bg-amber-500" : "bg-turno-500", children: o.status === "aberta" ? "Aberta" : "Concluída" }),
          o.tipo && /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: o.tipo })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-1.5 font-medium", children: o.titulo }),
        o.descricao && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: o.descricao }),
        /* @__PURE__ */ jsx("div", { className: "mt-1 text-xs text-muted-foreground", children: new Date(o.created_at).toLocaleString("pt-BR") })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-1", children: [
        /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", "aria-label": "Alternar status", onClick: () => atualizarStatus.mutate({
          id: o.id,
          status: o.status === "aberta" ? "concluida" : "aberta",
          equipe_id
        }), children: o.status === "aberta" ? /* @__PURE__ */ jsx(CheckCircle2, { className: "h-4 w-4 text-turno-600" }) : /* @__PURE__ */ jsx(RotateCcw, { className: "h-4 w-4 text-amber-600" }) }),
        /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", "aria-label": "Excluir", onClick: () => {
          if (confirm("Excluir ocorrência?")) excluir.mutate({
            id: o.id,
            equipe_id
          });
        }, children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4 text-destructive" }) })
      ] })
    ] }) }, o.id)) }),
    /* @__PURE__ */ jsx(Dialog, { open, onOpenChange: setOpen, children: /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: "Nova ocorrência" }) }),
      /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "t", children: "Título" }),
          /* @__PURE__ */ jsx(Input, { id: "t", value: titulo, onChange: (e) => setTitulo(e.target.value), required: true })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { children: "Tipo" }),
          /* @__PURE__ */ jsxs(Select, { value: tipo, onValueChange: (v) => {
            setTipo(v);
            if (v !== "__outros__") {
              setTipoCustom("");
              const t = tipos.find((x) => x.nome === v);
              if (t) setGravidade(t.gravidade_default);
            }
          }, children: [
            /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Escolha um tipo" }) }),
            /* @__PURE__ */ jsxs(SelectContent, { children: [
              tipos.map((t) => /* @__PURE__ */ jsx(SelectItem, { value: t.nome, children: t.nome }, t.id)),
              /* @__PURE__ */ jsx(SelectItem, { value: "__outros__", children: "Outros" })
            ] })
          ] }),
          tipo === "__outros__" && /* @__PURE__ */ jsx(Input, { className: "mt-2", placeholder: "Descreva o tipo", value: tipoCustom, onChange: (e) => setTipoCustom(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { children: "Gravidade" }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-2", children: ["baixa", "media", "alta"].map((g) => {
            const selected = gravidade === g;
            const styles = g === "baixa" ? selected ? "border-emerald-500 bg-emerald-50 text-emerald-800" : "border-input text-muted-foreground hover:border-emerald-300 hover:text-emerald-700" : g === "media" ? selected ? "border-amber-500 bg-amber-50 text-amber-800" : "border-input text-muted-foreground hover:border-amber-300 hover:text-amber-700" : selected ? "border-red-500 bg-red-50 text-red-800" : "border-input text-muted-foreground hover:border-red-300 hover:text-red-700";
            return /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setGravidade(g), className: `rounded-md border px-3 py-2 text-sm font-medium transition ${styles}`, children: g === "alta" ? "Alta" : g === "media" ? "Média" : "Baixa" }, g);
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "d", children: "Descrição" }),
          /* @__PURE__ */ jsx(Textarea, { id: "d", value: descricao, onChange: (e) => setDescricao(e.target.value) })
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
  Ocorrencias as component
};
