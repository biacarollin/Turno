import { Y as reactExports, P as jsxRuntimeExports } from "./server-AHFj_Bgy-gsoihpy4-CbyuSDu4-Ble6ghI2-BbTWyedm.js";
import { P as PageHeader } from "./PageHeader-XNv6HAI7-knc3Lhra-DJhx1cV--CPlw6dN2-C5AGiOZ7.js";
import { C as Card } from "./card-RGlIzTYo-B34J4GZ4-DDQrq4Oi-Dj_b9Mln-RljLwUmW.js";
import { B as Badge } from "./badge-DyfXZgLs-Dr2EDbw7-Dt_YEU2s-CG-QoDcV-bKbdM3-_.js";
import { B as Button } from "./button-DA2gxxPy-CUtl2pTC-ErPINpYe-DKbncp_B-Tad0GHuE.js";
import { I as Input } from "./input-C0QjszdI-D0Nowbjj-BlGc600N-CG6Wsqmc-CIMgTJSL.js";
import { L as Label } from "./label-JU3yqRBo-Dlrqtcjr-PWN2ra3Y-CzL43b9s-Bb4cDb8s.js";
import { T as Textarea } from "./textarea-DSyJ1nlY-BJEJR38S-DiJ4m1Uc-CyHDNb_n-Ct0DY3J1.js";
import { D as Dialog, a as DialogContent, d as DialogHeader, e as DialogTitle, c as DialogFooter } from "./dialog-BZpy7vbf-CTRBBq-G-tqLi9Zr8-C3AWzkp--BK-GnVAq.js";
import { S as Select, c as SelectTrigger, d as SelectValue, a as SelectContent, b as SelectItem } from "./select-NX1S2Qd--BQDJuCqm-DMSZIi8C-XaUY0BXg-CmOldYxC.js";
import { t as toast } from "./index-v-vtUMd9-C3Q0HLzL-DoO4nzZW-Cw9fb2Zp.js";
import { c as useOcorrencias, a as useCriarOcorrencia, u as useAtualizarStatusOcorrencia, b as useExcluirOcorrencia, C as CircleCheck } from "./ocorrencias-CWdEvQgY-fw7GQqRh-zlStEsDD-B_qRTtCc-DSpJCqjw.js";
import { a as useTiposOcorrencia } from "./segmento-CphbABvY-CwhLoLE8-_8ql5Kc5-CKY8EjPK-UD-THbUr.js";
import { a as useSession, u as useMinhasEquipes } from "./use-session-S7Dx9RFc-D3XJIkxI-DJOreupP-CHn8DVBd-BynqLMTc.js";
import { P as Plus } from "./plus-C_5shYh4-DGwihgF5-IRZ4gHEY-BlkexBmZ.js";
import { C as CircleAlert } from "./circle-alert-COmp4TT0-D7hD_4OR-DcEhy-Bm-5TL82XrJ.js";
import { c as createLucideIcon } from "./createLucideIcon-DtALbmVw-CBqAgreN-Bp4R2JQA-DhYh3WUG.js";
import { T as Trash2 } from "./trash-2-D9LpYFk2-CBBs-yBo-DccVvo2x-jdva0Wry.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./utils-H80jjgLf-8RO4xBwZ-8RO4xBwZ-8RO4xBwZ-8RO4xBwZ.js";
import "./index-QcqZe4R0-BtpN0_mD-B-IZFptm-RV47Io5-.js";
import "./index-BPTzbsrp-DhwZnvmV-BfJgqgod-B4ke32GD.js";
import "./index-CT_HDpbD-DFZI880l-DNpWO7Mr-BdyN3wdT.js";
import "./router-BfE_NWn3-LgtRmdPD-C07lmE3T-BBvol4Fb-CaQxh4DF.js";
import "./client-BDUtUdlc-BgkiGMRQ-BFQ4tIWJ-OPLCuHla-DDf4-v7v.js";
import "./index-BlRNeFf7-93iW_Z4T-93iW_Z4T-93iW_Z4T.js";
import "./stripe.esm.worker-BZ5uBE48-BZ5uBE48-BZ5uBE48-BZ5uBE48.js";
import "./index-OEEPllM9-HBciSBcN-Iiq0qPmz-B7kg3vt1.js";
import "./x-g8BMWhwB-DMM2ctZM-DGRCVHHF-Dd1IC55S.js";
import "./index-BmdaHLDZ-CpN9ND6T-BNr9QpgQ-Jh6ncu3J.js";
import "./index-Cj6RN1ru-pIt5HwOm-Bjjs2k74-DWZhJhxN.js";
import "./index-CIAuSBNL-DbelsWEH-k-En0Igi-DvmrAeb_.js";
import "./index-B1H3wbDX-BJ93EP_V-DlSncZ_u-D4YY_7jK.js";
import "./chevron-down-ChgOX_V1-CX9uQr7B-kdWBng0Q-1kuwCucs.js";
import "./check-kVh9eIoB-e_5-Q7gI-Bm1ScBst-CcbUTWMs.js";
import "./useQuery-CT2fcLBS-CQXjZXMx-CZ3zJieM-CTXinx3o.js";
import "./useMutation-DIK3tE9K-BLJeySS_-BDSpGrcn-BrYQeD-t.js";
import "./segmentos-BeD3Suz1-BeD3Suz1-BeD3Suz1-BeD3Suz1-BeD3Suz1.js";
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
];
const RotateCcw = createLucideIcon("rotate-ccw", __iconNode);
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
  const [open, setOpen] = reactExports.useState(false);
  const [titulo, setTitulo] = reactExports.useState("");
  const [descricao, setDescricao] = reactExports.useState("");
  const [tipo, setTipo] = reactExports.useState("");
  const [tipoCustom, setTipoCustom] = reactExports.useState("");
  const [gravidade, setGravidade] = reactExports.useState("media");
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Ocorrências", subtitle: "Registre tudo o que acontece nos turnos.", actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "bg-turno-600 hover:bg-turno-700", onClick: () => setOpen(true), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
      " Nova ocorrência"
    ] }) }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-8 text-center text-sm text-muted-foreground", children: "Carregando..." }) : lista.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-10 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "mx-auto h-10 w-10 text-muted-foreground/40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 text-base font-medium", children: "Nenhuma ocorrência ainda" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Quando algo acontecer no turno, registre aqui." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "mt-4 bg-turno-600 hover:bg-turno-700", onClick: () => setOpen(true), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        " Registrar primeira ocorrência"
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: lista.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: gravBadge(o.gravidade), children: o.gravidade === "alta" ? "Alta" : o.gravidade === "media" ? "Média" : "Baixa" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: o.status === "aberta" ? "bg-amber-500" : "bg-turno-500", children: o.status === "aberta" ? "Aberta" : "Concluída" }),
          o.tipo && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: o.tipo })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 font-medium", children: o.titulo }),
        o.descricao && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: o.descricao }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs text-muted-foreground", children: new Date(o.created_at).toLocaleString("pt-BR") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", "aria-label": "Alternar status", onClick: () => atualizarStatus.mutate({
          id: o.id,
          status: o.status === "aberta" ? "concluida" : "aberta",
          equipe_id
        }), children: o.status === "aberta" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-turno-600" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-4 w-4 text-amber-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", "aria-label": "Excluir", onClick: () => {
          if (confirm("Excluir ocorrência?")) excluir.mutate({
            id: o.id,
            equipe_id
          });
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" }) })
      ] })
    ] }) }, o.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: setOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Nova ocorrência" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "t", children: "Título" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "t", value: titulo, onChange: (e) => setTitulo(e.target.value), required: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Tipo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: tipo, onValueChange: (v) => {
            setTipo(v);
            if (v !== "__outros__") {
              setTipoCustom("");
              const t = tipos.find((x) => x.nome === v);
              if (t) setGravidade(t.gravidade_default);
            }
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Escolha um tipo" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              tipos.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: t.nome, children: t.nome }, t.id)),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "__outros__", children: "Outros" })
            ] })
          ] }),
          tipo === "__outros__" && /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "mt-2", placeholder: "Descreva o tipo", value: tipoCustom, onChange: (e) => setTipoCustom(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Gravidade" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: ["baixa", "media", "alta"].map((g) => {
            const selected = gravidade === g;
            const styles = g === "baixa" ? selected ? "border-emerald-500 bg-emerald-50 text-emerald-800" : "border-input text-muted-foreground hover:border-emerald-300 hover:text-emerald-700" : g === "media" ? selected ? "border-amber-500 bg-amber-50 text-amber-800" : "border-input text-muted-foreground hover:border-amber-300 hover:text-amber-700" : selected ? "border-red-500 bg-red-50 text-red-800" : "border-input text-muted-foreground hover:border-red-300 hover:text-red-700";
            return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setGravidade(g), className: `rounded-md border px-3 py-2 text-sm font-medium transition ${styles}`, children: g === "alta" ? "Alta" : g === "media" ? "Média" : "Baixa" }, g);
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "d", children: "Descrição" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { id: "d", value: descricao, onChange: (e) => setDescricao(e.target.value) })
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
  Ocorrencias as component
};
