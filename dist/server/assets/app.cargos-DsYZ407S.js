import { jsxs, jsx } from "react/jsx-runtime";
import { P as PageHeader } from "./PageHeader-XNv6HAI7.js";
import { C as Card } from "./card-RGlIzTYo.js";
import { B as Button } from "./button-DA2gxxPy.js";
import { AlertCircle, GripVertical, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { D as Dialog, a as DialogContent, d as DialogHeader, e as DialogTitle, b as DialogDescription, c as DialogFooter } from "./dialog-BZpy7vbf.js";
import { I as Input } from "./input-C0QjszdI.js";
import { L as Label } from "./label-JU3yqRBo.js";
import { c as useCargos, f as useMembros, u as useAdicionarCargo, g as useRenomearCargo, d as useExcluirMembro } from "./equipe-DeH1yNtv.js";
import { a as useSession, u as useMinhasEquipes } from "./use-session-S7Dx9RFc.js";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-dialog";
import "@radix-ui/react-label";
import "@tanstack/react-query";
import "./client-BDUtUdlc.js";
import "@supabase/supabase-js";
const CORES = ["#2a917a", "#1f7563", "#7c3aed", "#f59e0b", "#0ea5e9", "#ef4444", "#ec4899", "#64748b"];
function Cargos() {
  const {
    data: sessao
  } = useSession();
  const {
    data: equipes = []
  } = useMinhasEquipes();
  const equipe_id = equipes[0]?.equipe_id;
  const filial_id = sessao?.filial_ativa_id ?? void 0;
  const {
    data: cargos = []
  } = useCargos(filial_id);
  const {
    data: membros = []
  } = useMembros(equipe_id);
  const adicionarCargo = useAdicionarCargo();
  const renomearCargo = useRenomearCargo();
  const excluirMembro = useExcluirMembro();
  const [novoOpen, setNovoOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [cor, setCor] = useState(CORES[0]);
  const [editId, setEditId] = useState(null);
  const editando = cargos.find((c) => c.id === editId) ?? null;
  const membrosDoCargo = (id) => membros.filter((m) => m.cargoId === id);
  const salvarNovo = async () => {
    if (!nome.trim()) return toast.error("Informe o nome");
    try {
      await adicionarCargo.mutateAsync({
        nome: nome.trim(),
        cor
      });
      toast.success("Cargo criado");
      setNome("");
      setCor(CORES[0]);
      setNovoOpen(false);
    } catch (e) {
      toast.error(e.message);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-4xl space-y-6", children: [
    /* @__PURE__ */ jsx(PageHeader, { title: "Cargos", subtitle: "Cada cargo tem uma cor associada que aparece em toda a operação.", actions: /* @__PURE__ */ jsx(Button, { className: "bg-turno-600 hover:bg-turno-700", onClick: () => setNovoOpen(true), children: "Novo cargo" }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900", children: [
      /* @__PURE__ */ jsx(AlertCircle, { className: "mt-0.5 h-4 w-4 shrink-0" }),
      /* @__PURE__ */ jsx("p", { children: "Excluir um membro pelo cargo o remove de toda a operação. Para apenas trocar de cargo, edite o membro." })
    ] }),
    /* @__PURE__ */ jsx(Card, { className: "divide-y", children: cargos.length === 0 ? /* @__PURE__ */ jsx("div", { className: "p-6 text-center text-sm text-muted-foreground", children: "Nenhum cargo cadastrado ainda." }) : cargos.map((c) => {
      const qtd = membrosDoCargo(c.id).length;
      return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 px-4 py-3", children: [
        /* @__PURE__ */ jsx(GripVertical, { className: "h-4 w-4 cursor-grab text-muted-foreground" }),
        /* @__PURE__ */ jsx("span", { className: "h-4 w-4 rounded", style: {
          backgroundColor: c.cor
        } }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsx("div", { className: "font-medium", children: c.nome }),
          /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground", children: [
            qtd,
            " ",
            qtd === 1 ? "membro" : "membros"
          ] })
        ] }),
        /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", onClick: () => setEditId(c.id), children: "Editar" })
      ] }, c.id);
    }) }),
    /* @__PURE__ */ jsx(Dialog, { open: novoOpen, onOpenChange: setNovoOpen, children: /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: "Novo cargo" }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "Defina o nome e a cor." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { children: "Nome" }),
          /* @__PURE__ */ jsx(Input, { value: nome, onChange: (e) => setNome(e.target.value), placeholder: "Ex.: Coordenador" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { children: "Cor" }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: CORES.map((c) => /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setCor(c), className: `h-7 w-7 rounded-full ring-offset-2 ${cor === c ? "ring-2 ring-foreground" : ""}`, style: {
            backgroundColor: c
          }, "aria-label": c }, c)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => setNovoOpen(false), children: "Cancelar" }),
        /* @__PURE__ */ jsx(Button, { className: "bg-turno-600 hover:bg-turno-700", onClick: salvarNovo, children: "Adicionar" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Dialog, { open: !!editando, onOpenChange: (o) => !o && setEditId(null), children: /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: "Editar cargo" }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "Renomeie, mude a cor ou gerencie membros." })
      ] }),
      editando && equipe_id && /* @__PURE__ */ jsx(EditarCargoForm, { cargo: editando, membros: membrosDoCargo(editando.id), onSalvar: async (novoNome, novaCor) => {
        try {
          await renomearCargo.mutateAsync({
            id: editando.id,
            nome: novoNome,
            cor: novaCor
          });
          toast.success("Cargo atualizado");
          setEditId(null);
        } catch (e) {
          toast.error(e.message);
        }
      }, onExcluirMembro: async (id) => {
        try {
          await excluirMembro.mutateAsync({
            id,
            equipe_id
          });
          toast.success("Membro removido");
        } catch (e) {
          toast.error(e.message);
        }
      } }, editando.id)
    ] }) })
  ] });
}
function EditarCargoForm({
  cargo,
  membros,
  onSalvar,
  onExcluirMembro
}) {
  const [nome, setNome] = useState(cargo.nome);
  const [cor, setCor] = useState(cargo.cor);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsx(Label, { children: "Nome" }),
      /* @__PURE__ */ jsx(Input, { value: nome, onChange: (e) => setNome(e.target.value) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsx(Label, { children: "Cor" }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: CORES.map((c) => /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setCor(c), className: `h-7 w-7 rounded-full ring-offset-2 ${cor === c ? "ring-2 ring-foreground" : ""}`, style: {
        backgroundColor: c
      }, "aria-label": c }, c)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsx(Label, { children: "Membros neste cargo" }),
      membros.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Nenhum membro." }) : /* @__PURE__ */ jsx("div", { className: "divide-y rounded-md border", children: membros.map((m) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-3 py-2 text-sm", children: [
        /* @__PURE__ */ jsx("span", { children: m.nome }),
        /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", className: "h-7 w-7 text-red-600 hover:text-red-700", onClick: () => onExcluirMembro(m.id), "aria-label": `Excluir ${m.nome}`, children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) })
      ] }, m.id)) })
    ] }),
    /* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsx(Button, { className: "bg-turno-600 hover:bg-turno-700", onClick: () => onSalvar(nome.trim(), cor), children: "Salvar" }) })
  ] });
}
export {
  Cargos as component
};
