import { Y as reactExports, P as jsxRuntimeExports } from "./server-DznBcuRC-Ca9cSwVK.js";
import { P as PageHeader } from "./PageHeader-XNv6HAI7-DvbZ8VVl.js";
import { C as Card } from "./card-RGlIzTYo-CtW8vlBf.js";
import { B as Button } from "./button-DA2gxxPy-BWxuMPe6.js";
import { B as Badge } from "./badge-DyfXZgLs-Dm1__2dG.js";
import { D as Dialog, a as DialogContent, d as DialogHeader, e as DialogTitle, b as DialogDescription, c as DialogFooter } from "./dialog-BZpy7vbf-CF__RtWH.js";
import { I as Input } from "./input-C0QjszdI-Br7DySBD.js";
import { L as Label } from "./label-JU3yqRBo-LAbxxb-d.js";
import { S as Switch } from "./switch-CQ4rbtn8-DLWA4btA.js";
import { t as toast } from "./index-BaU94aXf.js";
import { i as useTurnos, h as useSalvarTurno, e as useExcluirTurno } from "./equipe-DeH1yNtv-DIwYCTLM.js";
import { u as useMinhasEquipes } from "./use-session-S7Dx9RFc-Y3pQNEXx.js";
import { B as Bell } from "./bell-DI88Rxgx.js";
import { C as Clock } from "./clock-SmikHkMN.js";
import { T as Trash2 } from "./trash-2-C4B39ZBa.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./utils-H80jjgLf-8RO4xBwZ.js";
import "./index-CfmbNbeB.js";
import "./index--2tixE5c.js";
import "./index-CNOW3nDF.js";
import "./router-Bpeyu-Rv-V2oQ01bo.js";
import "./client-BDUtUdlc-DgbAZHFC.js";
import "./index-B80FucMh.js";
import "./stripe.esm.worker-BZ5uBE48.js";
import "./index-BcVeuedm.js";
import "./x-DZTB6rYI.js";
import "./createLucideIcon-BTIl1RQt.js";
import "./index-aodOUY5N.js";
import "./index-Bf-kGjEd.js";
import "./useQuery-OXnHj9R2.js";
import "./useMutation-miMrN0Tq.js";
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
  const [open, setOpen] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState(turnoVazio);
  const [cargosTxt, setCargosTxt] = reactExports.useState("");
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Turnos", subtitle: "Defina janelas, notificações antecipadas e limite pós-encerramento.", actions: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "bg-turno-600 hover:bg-turno-700", onClick: abrirNovo, children: "Novo turno" }) }),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "Carregando..." }),
    !isLoading && turnos.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-6 text-center text-sm text-muted-foreground", children: 'Nenhum turno cadastrado. Clique em "Novo turno".' }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-2", children: turnos.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-base font-medium", children: t.nome }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 font-mono text-sm text-muted-foreground", children: [
            t.inicio,
            " – ",
            t.fim
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: t.ativo ? "bg-turno-500" : "bg-muted text-muted-foreground", children: t.ativo ? "Ativo" : "Inativo" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex flex-wrap gap-1.5", children: t.cargos.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "bg-turno-50 text-turno-800", children: c }, c)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-2 border-t pt-4 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-3.5 w-3.5" }),
          "Notificação antecipada: ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { className: "text-foreground", children: [
            t.antecedencia,
            " min"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5" }),
          "Limite pós-encerramento: ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { className: "text-foreground", children: [
            t.posLimite,
            " min"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "mt-4 w-full", onClick: () => abrirEditar(t), children: "Editar turno" })
    ] }, t.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: setOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: form.id ? "Editar turno" : "Novo turno" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Configure a janela, cargos e regras de notificação." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "nome", children: "Nome" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "nome", value: form.nome, onChange: (e) => setForm({
            ...form,
            nome: e.target.value
          }), placeholder: "Ex.: Manhã" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "inicio", children: "Início" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "inicio", type: "time", value: form.inicio, onChange: (e) => setForm({
              ...form,
              inicio: e.target.value
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "fim", children: "Fim" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "fim", type: "time", value: form.fim, onChange: (e) => setForm({
              ...form,
              fim: e.target.value
            }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cargos", children: "Cargos (separados por vírgula)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "cargos", value: cargosTxt, onChange: (e) => setCargosTxt(e.target.value), placeholder: "Farmacêutico, Auxiliar" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ant", children: "Notificação antecipada (min)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "ant", type: "number", min: 0, value: form.antecedencia, onChange: (e) => setForm({
              ...form,
              antecedencia: Number(e.target.value)
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pos", children: "Limite pós-encerramento (min)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "pos", type: "number", min: 0, value: form.posLimite, onChange: (e) => setForm({
              ...form,
              posLimite: Number(e.target.value)
            }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-md border p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ativo", children: "Turno ativo" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Quando inativo, não gera passagens." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { id: "ativo", checked: form.ativo, onCheckedChange: (v) => setForm({
            ...form,
            ativo: v
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: form.id ? "!justify-between" : "", children: [
        form.id && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "destructive", onClick: remover, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "mr-1 h-4 w-4" }),
          " Excluir"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setOpen(false), children: "Cancelar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "bg-turno-600 hover:bg-turno-700", onClick: salvar, children: "Salvar" })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  Turnos as component
};
