import { Y as reactExports, P as jsxRuntimeExports } from "./server-DznBcuRC-Ca9cSwVK.js";
import { P as PageHeader } from "./PageHeader-XNv6HAI7-DvbZ8VVl.js";
import { C as Card } from "./card-RGlIzTYo-CtW8vlBf.js";
import { B as Button } from "./button-DA2gxxPy-BWxuMPe6.js";
import { t as toast } from "./index-BaU94aXf.js";
import { D as Dialog, a as DialogContent, d as DialogHeader, e as DialogTitle, b as DialogDescription, c as DialogFooter } from "./dialog-BZpy7vbf-CF__RtWH.js";
import { I as Input } from "./input-C0QjszdI-Br7DySBD.js";
import { L as Label } from "./label-JU3yqRBo-LAbxxb-d.js";
import { c as useCargos, f as useMembros, u as useAdicionarCargo, g as useRenomearCargo, d as useExcluirMembro } from "./equipe-DeH1yNtv-DIwYCTLM.js";
import { a as useSession, u as useMinhasEquipes } from "./use-session-S7Dx9RFc-Y3pQNEXx.js";
import { C as CircleAlert } from "./circle-alert-D8E1v7EY.js";
import { c as createLucideIcon } from "./createLucideIcon-BTIl1RQt.js";
import { T as Trash2 } from "./trash-2-C4B39ZBa.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./utils-H80jjgLf-8RO4xBwZ.js";
import "./index-CfmbNbeB.js";
import "./router-Bpeyu-Rv-V2oQ01bo.js";
import "./client-BDUtUdlc-DgbAZHFC.js";
import "./index-B80FucMh.js";
import "./stripe.esm.worker-BZ5uBE48.js";
import "./index--2tixE5c.js";
import "./index-CNOW3nDF.js";
import "./index-BcVeuedm.js";
import "./x-DZTB6rYI.js";
import "./useQuery-OXnHj9R2.js";
import "./useMutation-miMrN0Tq.js";
const __iconNode = [
  ["circle", { cx: "9", cy: "12", r: "1", key: "1vctgf" }],
  ["circle", { cx: "9", cy: "5", r: "1", key: "hp0tcf" }],
  ["circle", { cx: "9", cy: "19", r: "1", key: "fkjjf6" }],
  ["circle", { cx: "15", cy: "12", r: "1", key: "1tmaij" }],
  ["circle", { cx: "15", cy: "5", r: "1", key: "19l28e" }],
  ["circle", { cx: "15", cy: "19", r: "1", key: "f4zoj3" }]
];
const GripVertical = createLucideIcon("grip-vertical", __iconNode);
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
  const [novoOpen, setNovoOpen] = reactExports.useState(false);
  const [nome, setNome] = reactExports.useState("");
  const [cor, setCor] = reactExports.useState(CORES[0]);
  const [editId, setEditId] = reactExports.useState(null);
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Cargos", subtitle: "Cada cargo tem uma cor associada que aparece em toda a operação.", actions: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "bg-turno-600 hover:bg-turno-700", onClick: () => setNovoOpen(true), children: "Novo cargo" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "mt-0.5 h-4 w-4 shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Excluir um membro pelo cargo o remove de toda a operação. Para apenas trocar de cargo, edite o membro." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "divide-y", children: cargos.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 text-center text-sm text-muted-foreground", children: "Nenhum cargo cadastrado ainda." }) : cargos.map((c) => {
      const qtd = membrosDoCargo(c.id).length;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(GripVertical, { className: "h-4 w-4 cursor-grab text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-4 w-4 rounded", style: {
          backgroundColor: c.cor
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: c.nome }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
            qtd,
            " ",
            qtd === 1 ? "membro" : "membros"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: () => setEditId(c.id), children: "Editar" })
      ] }, c.id);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: novoOpen, onOpenChange: setNovoOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Novo cargo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Defina o nome e a cor." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Nome" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: nome, onChange: (e) => setNome(e.target.value), placeholder: "Ex.: Coordenador" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Cor" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: CORES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setCor(c), className: `h-7 w-7 rounded-full ring-offset-2 ${cor === c ? "ring-2 ring-foreground" : ""}`, style: {
            backgroundColor: c
          }, "aria-label": c }, c)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setNovoOpen(false), children: "Cancelar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "bg-turno-600 hover:bg-turno-700", onClick: salvarNovo, children: "Adicionar" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!editando, onOpenChange: (o) => !o && setEditId(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Editar cargo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Renomeie, mude a cor ou gerencie membros." })
      ] }),
      editando && equipe_id && /* @__PURE__ */ jsxRuntimeExports.jsx(EditarCargoForm, { cargo: editando, membros: membrosDoCargo(editando.id), onSalvar: async (novoNome, novaCor) => {
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
  const [nome, setNome] = reactExports.useState(cargo.nome);
  const [cor, setCor] = reactExports.useState(cargo.cor);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Nome" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: nome, onChange: (e) => setNome(e.target.value) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Cor" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: CORES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setCor(c), className: `h-7 w-7 rounded-full ring-offset-2 ${cor === c ? "ring-2 ring-foreground" : ""}`, style: {
        backgroundColor: c
      }, "aria-label": c }, c)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Membros neste cargo" }),
      membros.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Nenhum membro." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y rounded-md border", children: membros.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-3 py-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: m.nome }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "h-7 w-7 text-red-600 hover:text-red-700", onClick: () => onExcluirMembro(m.id), "aria-label": `Excluir ${m.nome}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
      ] }, m.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "bg-turno-600 hover:bg-turno-700", onClick: () => onSalvar(nome.trim(), cor), children: "Salvar" }) })
  ] });
}
export {
  Cargos as component
};
