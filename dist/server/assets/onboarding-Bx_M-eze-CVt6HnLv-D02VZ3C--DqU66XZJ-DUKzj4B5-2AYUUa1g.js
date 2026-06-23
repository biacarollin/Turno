import { Y as reactExports, P as jsxRuntimeExports } from "./server-AHFj_Bgy-gsoihpy4-CbyuSDu4-Ble6ghI2-BbTWyedm-DMY4rmEE.js";
import { u as useNavigate } from "./router-BfE_NWn3-LgtRmdPD-C07lmE3T-BBvol4Fb-CaQxh4DF-DI3ZXuwt.js";
import { s as supabase } from "./client-BDUtUdlc-BgkiGMRQ-BFQ4tIWJ-OPLCuHla-DDf4-v7v-Dm7zLGxE.js";
import { S as SEGMENTOS } from "./segmentos-BeD3Suz1-BeD3Suz1-BeD3Suz1-BeD3Suz1-BeD3Suz1-BeD3Suz1.js";
import { u as useConfigurarSegmento } from "./segmento-CphbABvY-CwhLoLE8-_8ql5Kc5-CKY8EjPK-UD-THbUr-Cyz_Fgwn.js";
import { C as Card } from "./card-RGlIzTYo-B34J4GZ4-DDQrq4Oi-Dj_b9Mln-RljLwUmW-B7Ze6dPL.js";
import { B as Button } from "./button-DA2gxxPy-CUtl2pTC-ErPINpYe-DKbncp_B-Tad0GHuE-BV1-pB3e.js";
import { I as Input } from "./input-C0QjszdI-D0Nowbjj-BlGc600N-CG6Wsqmc-CIMgTJSL-CX_fTxgv.js";
import { L as Label } from "./label-JU3yqRBo-Dlrqtcjr-PWN2ra3Y-CzL43b9s-Bb4cDb8s-CUa9VnmA.js";
import { t as toast } from "./index-v-vtUMd9-C3Q0HLzL-DoO4nzZW-Cw9fb2Zp-eT4KzRbZ.js";
import { c as createLucideIcon } from "./createLucideIcon-DtALbmVw-CBqAgreN-Bp4R2JQA-DhYh3WUG-C9iE_qXX.js";
import { L as LoaderCircle } from "./loader-circle-Tdb4du6C-Dj2D0HP--BlCE9rBb-43AU7_Qy-DX38fdIF.js";
import { C as Check } from "./check-kVh9eIoB-e_5-Q7gI-Bm1ScBst-CcbUTWMs-DbqhBIgJ.js";
import { T as Trash2 } from "./trash-2-D9LpYFk2-CBBs-yBo-DccVvo2x-jdva0Wry-Csur_ASY.js";
import { P as Plus } from "./plus-C_5shYh4-DGwihgF5-IRZ4gHEY-BlkexBmZ-C97UyAgL.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./stripe.esm.worker-BZ5uBE48-BZ5uBE48-BZ5uBE48-BZ5uBE48-BZ5uBE48.js";
import "./index-BlRNeFf7-93iW_Z4T-93iW_Z4T-93iW_Z4T-93iW_Z4T.js";
import "./useQuery-CT2fcLBS-CQXjZXMx-CZ3zJieM-CTXinx3o-BtfJ4J1S.js";
import "./useMutation-DIK3tE9K-BLJeySS_-BDSpGrcn-BrYQeD-t-c_n52Lgo.js";
import "./utils-H80jjgLf-8RO4xBwZ-8RO4xBwZ-8RO4xBwZ-8RO4xBwZ-8RO4xBwZ.js";
import "./index-QcqZe4R0-BtpN0_mD-B-IZFptm-RV47Io5--BsvVBnmG.js";
const __iconNode$2 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$2);
const __iconNode$1 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
];
const Pencil = createLucideIcon("pencil", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
      key: "1s2grr"
    }
  ],
  ["path", { d: "M20 2v4", key: "1rf3ol" }],
  ["path", { d: "M22 4h-4", key: "gwowj6" }],
  ["circle", { cx: "4", cy: "20", r: "2", key: "6kqj1y" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode);
function OnboardingPage() {
  const navigate = useNavigate();
  const configurar = useConfigurarSegmento();
  const [loading, setLoading] = reactExports.useState(true);
  const [step, setStep] = reactExports.useState("empresa");
  const [empresa, setEmpresa] = reactExports.useState("");
  const [topoId, setTopoId] = reactExports.useState(null);
  const [subId, setSubId] = reactExports.useState(null);
  const [subNomeCustom, setSubNomeCustom] = reactExports.useState("");
  const [edit, setEdit] = reactExports.useState(false);
  const [cargos, setCargos] = reactExports.useState([]);
  const [turnos, setTurnos] = reactExports.useState([]);
  const [tipos, setTipos] = reactExports.useState([]);
  reactExports.useEffect(() => {
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
  const topo = reactExports.useMemo(() => SEGMENTOS.find((t) => t.id === topoId) ?? null, [topoId]);
  const sub = reactExports.useMemo(() => topo?.subs.find((s) => s.id === subId) ?? null, [topo, subId]);
  reactExports.useEffect(() => {
    if (step === "confirm" && sub) {
      setCargos(sub.cargosSugeridos);
      setTurnos(sub.turnosSugeridos);
      setTipos(sub.tiposOcorrencia);
      setEdit(false);
    }
  }, [step, sub]);
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center text-sm text-muted-foreground", children: "Carregando..." });
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-muted/30 px-4 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-turno-100 text-turno-700", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold", children: "Vamos personalizar o Turno para você" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Em poucos passos sua conta fica pronta com cargos, turnos e tipos de ocorrência típicos da sua operação." })
    ] }),
    step === "empresa" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "empresa", className: "text-base", children: "Nome da empresa ou operação" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "É o nome que vai aparecer no topo da ferramenta. Você pode editar depois." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "empresa", autoFocus: true, className: "mt-3", placeholder: "Ex.: Hospital São Lucas, Transportadora XYZ", value: empresa, onChange: (e) => setEmpresa(e.target.value) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "bg-turno-600 hover:bg-turno-700", disabled: !empresa.trim(), onClick: () => setStep("topo"), children: "Continuar" }) })
    ] }),
    step === "topo" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BackBtn, { onClick: () => setStep("empresa") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-3 text-lg font-medium", children: "Em qual segmento você atua?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 md:grid-cols-2", children: SEGMENTOS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
        setTopoId(t.id);
        setSubId(null);
        setStep("sub");
      }, className: "rounded-lg border bg-card p-5 text-left transition hover:border-turno-400 hover:shadow-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-base font-medium", children: t.nome }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm text-muted-foreground", children: t.exemplos })
      ] }, t.id)) })
    ] }),
    step === "sub" && topo && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BackBtn, { onClick: () => setStep("topo") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-1 text-lg font-medium", children: topo.nome }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-sm text-muted-foreground", children: "Escolha a subcategoria mais próxima da sua operação." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 md:grid-cols-2", children: topo.subs.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
        setSubId(s.id);
        setSubNomeCustom("");
        setStep("confirm");
      }, className: "rounded-lg border bg-card p-4 text-left transition hover:border-turno-400 hover:shadow-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: s.nome }),
        s.id === "outras" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs text-muted-foreground", children: "Crie do zero com o nome que quiser" })
      ] }, s.id)) })
    ] }),
    step === "confirm" && topo && sub && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BackBtn, { onClick: () => setStep("sub") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: topo.nome }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-medium", children: sub.id === "outras" ? subNomeCustom || "Sua operação" : sub.nome }),
        sub.id === "outras" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "custom", children: "Como você chama esse segmento?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "custom", className: "mt-1.5", placeholder: "Ex.: Atendimento veterinário", value: subNomeCustom, onChange: (e) => setSubNomeCustom(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: sub.id === "outras" && cargos.length === 0 ? "Você vai começar com a estrutura em branco e cria tudo do seu jeito." : "Vamos criar essa estrutura inicial na sua conta. Você pode editar tudo depois." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid gap-4 md:grid-cols-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PreviewBox, { title: "Cargos", items: cargos.map((c) => c.nome), editing: edit, onRemove: (i) => setCargos((arr) => arr.filter((_, x) => x !== i)), onAdd: (nome) => setCargos((arr) => [...arr, {
            nome,
            cor: "#10b981"
          }]), placeholder: "Novo cargo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PreviewBox, { title: "Turnos", items: turnos.map((t) => `${t.nome} (${t.inicio}–${t.fim})`), editing: edit, onRemove: (i) => setTurnos((arr) => arr.filter((_, x) => x !== i)), onAdd: (nome) => setTurnos((arr) => [...arr, {
            nome,
            inicio: "08:00",
            fim: "18:00"
          }]), placeholder: "Novo turno" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PreviewBox, { title: "Tipos de ocorrência", items: tipos.map((t) => t.nome), editing: edit, onRemove: (i) => setTipos((arr) => arr.filter((_, x) => x !== i)), onAdd: (nome) => setTipos((arr) => [...arr, {
            nome,
            gravidade_default: "media"
          }]), placeholder: "Novo tipo" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-end gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setStep("topo"), children: "Trocar de categoria" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: () => setEdit((v) => !v), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "mr-1.5 h-4 w-4" }),
            edit ? "Concluir edição" : "Editar estrutura sugerida"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "bg-turno-600 hover:bg-turno-700", onClick: concluir, disabled: configurar.isPending, children: configurar.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-1.5 h-4 w-4 animate-spin" }),
            " Configurando..."
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "mr-1.5 h-4 w-4" }),
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick, className: "mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }),
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
  const [novo, setNovo] = reactExports.useState("");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border bg-muted/30 p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium uppercase tracking-wide text-muted-foreground", children: title }),
    items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-xs text-muted-foreground", children: "Você criará do zero" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-2 space-y-1 text-sm", children: items.map((i, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between gap-2 text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "• ",
        i
      ] }),
      editing && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onRemove(idx), className: "text-muted-foreground hover:text-destructive", "aria-label": `Remover ${i}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
    ] }, `${i}-${idx}`)) }),
    editing && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: novo, onChange: (e) => setNovo(e.target.value), placeholder, className: "h-8 text-xs", onKeyDown: (e) => {
        if (e.key === "Enter" && novo.trim()) {
          e.preventDefault();
          onAdd(novo.trim());
          setNovo("");
        }
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", size: "sm", variant: "outline", className: "h-8 px-2", onClick: () => {
        if (novo.trim()) {
          onAdd(novo.trim());
          setNovo("");
        }
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }) })
    ] })
  ] });
}
export {
  OnboardingPage as component
};
