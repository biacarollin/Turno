import { Y as reactExports, P as jsxRuntimeExports } from "./server-AHFj_Bgy-gsoihpy4.js";
import { P as PageHeader } from "./PageHeader-XNv6HAI7-knc3Lhra.js";
import { C as Card } from "./card-RGlIzTYo-B34J4GZ4.js";
import { B as Button } from "./button-DA2gxxPy-CUtl2pTC.js";
import { B as Badge } from "./badge-DyfXZgLs-Dr2EDbw7.js";
import { I as Input } from "./input-C0QjszdI-D0Nowbjj.js";
import { L as Label } from "./label-JU3yqRBo-Dlrqtcjr.js";
import { D as Dialog, a as DialogContent, d as DialogHeader, e as DialogTitle, c as DialogFooter } from "./dialog-BZpy7vbf-CTRBBq-G.js";
import { S as Select, c as SelectTrigger, d as SelectValue, a as SelectContent, b as SelectItem } from "./select-NX1S2Qd--BQDJuCqm.js";
import { t as toast } from "./index-v-vtUMd9.js";
import { c as useFolgas, a as useCriarFolga, u as useAtualizarStatusFolga, b as useExcluirFolga } from "./folgas-ZdQoj1SD-CLpA4mTI.js";
import { f as useMembros } from "./equipe-DeH1yNtv-Broy9XQy.js";
import { a as useSession, u as useMinhasEquipes } from "./use-session-S7Dx9RFc-D3XJIkxI.js";
import { P as Plus } from "./plus-C_5shYh4.js";
import { c as createLucideIcon } from "./createLucideIcon-DtALbmVw.js";
import { C as Check } from "./check-kVh9eIoB.js";
import { X } from "./x-g8BMWhwB.js";
import { T as Trash2 } from "./trash-2-D9LpYFk2.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./utils-H80jjgLf-8RO4xBwZ.js";
import "./index-QcqZe4R0.js";
import "./router-BfE_NWn3-LgtRmdPD.js";
import "./client-BDUtUdlc-BgkiGMRQ.js";
import "./index-BlRNeFf7.js";
import "./stripe.esm.worker-BZ5uBE48.js";
import "./index-BPTzbsrp.js";
import "./index-CT_HDpbD.js";
import "./index-OEEPllM9.js";
import "./index-BmdaHLDZ.js";
import "./index-Cj6RN1ru.js";
import "./index-CIAuSBNL.js";
import "./index-B1H3wbDX.js";
import "./chevron-down-ChgOX_V1.js";
import "./useQuery-CT2fcLBS.js";
import "./useMutation-DIK3tE9K.js";
const __iconNode = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M16 18h.01", key: "kzsmim" }]
];
const CalendarDays = createLucideIcon("calendar-days", __iconNode);
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
  const [open, setOpen] = reactExports.useState(false);
  const [membroId, setMembroId] = reactExports.useState("");
  const [inicio, setInicio] = reactExports.useState("");
  const [fim, setFim] = reactExports.useState("");
  const [motivo, setMotivo] = reactExports.useState("");
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Folgas", subtitle: "Registre e acompanhe folgas da equipe.", actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "bg-turno-600 hover:bg-turno-700", onClick: () => setOpen(true), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
      " Nova folga"
    ] }) }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-8 text-center text-sm text-muted-foreground", children: "Carregando..." }) : folgas.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-10 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "mx-auto h-10 w-10 text-muted-foreground/40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 text-base font-medium", children: "Nenhuma folga registrada" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Quando alguém pedir folga, registre aqui." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "divide-y", children: folgas.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: f.status === "aprovada" ? "default" : f.status === "recusada" ? "outline" : "secondary", className: f.status === "aprovada" ? "bg-turno-500" : f.status === "recusada" ? "border-destructive text-destructive" : "", children: f.status }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: nomeMembro(f.membro_id) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
          new Date(f.data_inicio).toLocaleDateString("pt-BR"),
          " – ",
          new Date(f.data_fim).toLocaleDateString("pt-BR"),
          f.motivo && ` · ${f.motivo}`
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
        f.status !== "aprovada" && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: () => atualizarStatus.mutate({
          id: f.id,
          status: "aprovada",
          filial_id: f.filial_id
        }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 text-turno-600" }) }),
        f.status !== "recusada" && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: () => atualizarStatus.mutate({
          id: f.id,
          status: "recusada",
          filial_id: f.filial_id
        }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4 text-amber-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: () => {
          if (confirm("Excluir?")) excluir.mutate({
            id: f.id,
            filial_id: f.filial_id
          });
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" }) })
      ] })
    ] }, f.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: setOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Nova folga" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
        membros.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Membro" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: membroId, onValueChange: setMembroId, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Escolha um membro" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: membros.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: m.id, children: m.nome }, m.id)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "i", children: "Início" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "i", type: "date", value: inicio, onChange: (e) => setInicio(e.target.value), required: true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "f", children: "Fim" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "f", type: "date", value: fim, onChange: (e) => setFim(e.target.value), required: true })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "mo", children: "Motivo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "mo", value: motivo, onChange: (e) => setMotivo(e.target.value), placeholder: "Opcional" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: () => setOpen(false), children: "Cancelar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "bg-turno-600 hover:bg-turno-700", disabled: criar.isPending, children: "Registrar" })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  Folgas as component
};
