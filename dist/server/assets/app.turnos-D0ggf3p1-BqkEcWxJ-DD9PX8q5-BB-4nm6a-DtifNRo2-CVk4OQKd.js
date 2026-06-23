import { Y as reactExports, P as jsxRuntimeExports } from "./server-AHFj_Bgy-gsoihpy4-CbyuSDu4-Ble6ghI2-BbTWyedm-DMY4rmEE.js";
import { P as PageHeader } from "./PageHeader-XNv6HAI7-knc3Lhra-DJhx1cV--CPlw6dN2-C5AGiOZ7-Diyt-F2u.js";
import { C as Card } from "./card-RGlIzTYo-B34J4GZ4-DDQrq4Oi-Dj_b9Mln-RljLwUmW-B7Ze6dPL.js";
import { B as Button } from "./button-DA2gxxPy-CUtl2pTC-ErPINpYe-DKbncp_B-Tad0GHuE-BV1-pB3e.js";
import { B as Badge } from "./badge-DyfXZgLs-Dr2EDbw7-Dt_YEU2s-CG-QoDcV-bKbdM3-_-CpG5HTym.js";
import { D as Dialog, a as DialogContent, d as DialogHeader, e as DialogTitle, b as DialogDescription, c as DialogFooter } from "./dialog-BZpy7vbf-CTRBBq-G-tqLi9Zr8-C3AWzkp--BK-GnVAq-BMVOxKPM.js";
import { I as Input } from "./input-C0QjszdI-D0Nowbjj-BlGc600N-CG6Wsqmc-CIMgTJSL-CX_fTxgv.js";
import { L as Label } from "./label-JU3yqRBo-Dlrqtcjr-PWN2ra3Y-CzL43b9s-Bb4cDb8s-CUa9VnmA.js";
import { S as Switch } from "./switch-CQ4rbtn8-DEW1kikl-D09k1wwm-B9WoNBnU-vCw7gR22-vyuFKesK.js";
import { t as toast } from "./index-v-vtUMd9-C3Q0HLzL-DoO4nzZW-Cw9fb2Zp-eT4KzRbZ.js";
import { i as useTurnos, h as useSalvarTurno, e as useExcluirTurno } from "./equipe-DeH1yNtv-Broy9XQy-CzWVmSlU-DZhqQZGt-CMFPOddv-CXKHGFPh.js";
import { u as useMinhasEquipes } from "./use-session-S7Dx9RFc-D3XJIkxI-DJOreupP-CHn8DVBd-BynqLMTc-Tf37-Mq5.js";
import { B as Bell } from "./bell-D4Z2Kr02-gQQPIIne-DA0zSBii-C4wrrZ9H-hsh4-VCx.js";
import { C as Clock } from "./clock-CVU7nYU8-BMPiFcEP-BYn5OtmG-C4uwJjT9-B8GaeVl7.js";
import { T as Trash2 } from "./trash-2-D9LpYFk2-CBBs-yBo-DccVvo2x-jdva0Wry-Csur_ASY.js";
import "./createLucideIcon-DtALbmVw-CBqAgreN-Bp4R2JQA-DhYh3WUG-C9iE_qXX.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./utils-H80jjgLf-8RO4xBwZ-8RO4xBwZ-8RO4xBwZ-8RO4xBwZ-8RO4xBwZ.js";
import "./index-QcqZe4R0-BtpN0_mD-B-IZFptm-RV47Io5--BsvVBnmG.js";
import "./index-BPTzbsrp-DhwZnvmV-BfJgqgod-B4ke32GD-CzpO3NTa.js";
import "./index-CT_HDpbD-DFZI880l-DNpWO7Mr-BdyN3wdT-jJeE0WN7.js";
import "./router-BfE_NWn3-LgtRmdPD-C07lmE3T-BBvol4Fb-CaQxh4DF-DI3ZXuwt.js";
import "./client-BDUtUdlc-BgkiGMRQ-BFQ4tIWJ-OPLCuHla-DDf4-v7v-Dm7zLGxE.js";
import "./index-BlRNeFf7-93iW_Z4T-93iW_Z4T-93iW_Z4T-93iW_Z4T.js";
import "./stripe.esm.worker-BZ5uBE48-BZ5uBE48-BZ5uBE48-BZ5uBE48-BZ5uBE48.js";
import "./index-OEEPllM9-HBciSBcN-Iiq0qPmz-B7kg3vt1-DQ29zJ2I.js";
import "./x-g8BMWhwB-DMM2ctZM-DGRCVHHF-Dd1IC55S-rAyy0ZEZ.js";
import "./index-B1H3wbDX-BJ93EP_V-DlSncZ_u-D4YY_7jK-BbGtHVtZ.js";
import "./index-CIAuSBNL-DbelsWEH-k-En0Igi-DvmrAeb_-DQ6rjS71.js";
import "./useQuery-CT2fcLBS-CQXjZXMx-CZ3zJieM-CTXinx3o-BtfJ4J1S.js";
import "./useMutation-DIK3tE9K-BLJeySS_-BDSpGrcn-BrYQeD-t-c_n52Lgo.js";
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
