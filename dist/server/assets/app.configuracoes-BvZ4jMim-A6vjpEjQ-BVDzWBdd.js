import { Y as reactExports, P as jsxRuntimeExports, ab as useRouter, L as isRedirect, l as createServerFn } from "./server-AHFj_Bgy-gsoihpy4-CbyuSDu4.js";
import { P as PageHeader } from "./PageHeader-XNv6HAI7-knc3Lhra-DJhx1cV-.js";
import { C as Card } from "./card-RGlIzTYo-B34J4GZ4-DDQrq4Oi.js";
import { B as Button } from "./button-DA2gxxPy-CUtl2pTC-ErPINpYe.js";
import { I as Input } from "./input-C0QjszdI-D0Nowbjj-BlGc600N.js";
import { S as Switch } from "./switch-CQ4rbtn8-DEW1kikl-D09k1wwm.js";
import { L as Label } from "./label-JU3yqRBo-Dlrqtcjr-PWN2ra3Y.js";
import { S as Select, c as SelectTrigger, d as SelectValue, a as SelectContent, b as SelectItem } from "./select-NX1S2Qd--BQDJuCqm-DMSZIi8C.js";
import { D as Dialog, a as DialogContent, d as DialogHeader, e as DialogTitle, b as DialogDescription, c as DialogFooter } from "./dialog-BZpy7vbf-CTRBBq-G-tqLi9Zr8.js";
import { T as Textarea } from "./textarea-DSyJ1nlY-BJEJR38S-DiJ4m1Uc.js";
import { t as toast } from "./index-v-vtUMd9-C3Q0HLzL.js";
import { E } from "./jspdf.es.min-DQonIvKl-BblhDE_G.js";
import { f as useMembros, c as useCargos } from "./equipe-DeH1yNtv-Broy9XQy-CzWVmSlU.js";
import { c as createSsrRpc } from "./createSsrRpc-D16C2ze1-CJrHoas8-B9y0K8nq.js";
import { r as requireSupabaseAuth } from "./auth-middleware-D6oXehNp-CQbOxQaB-BCbAknz2.js";
import { s as supabase } from "./client-BDUtUdlc-BgkiGMRQ-BFQ4tIWJ.js";
import { a as useSession, u as useMinhasEquipes } from "./use-session-S7Dx9RFc-D3XJIkxI-DJOreupP.js";
import { g as getSegmentoLabel } from "./segmentos-BeD3Suz1-BeD3Suz1-BeD3Suz1.js";
import { L as Lock } from "./lock-BBzn4fhu-B9MtPQUT.js";
import { c as createLucideIcon } from "./createLucideIcon-DtALbmVw-CBqAgreN.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./utils-H80jjgLf-8RO4xBwZ-8RO4xBwZ.js";
import "./index-QcqZe4R0-BtpN0_mD.js";
import "./index-CT_HDpbD-DFZI880l.js";
import "./router-BfE_NWn3-LgtRmdPD-C07lmE3T.js";
import "./stripe.esm.worker-BZ5uBE48-BZ5uBE48.js";
import "./index-BlRNeFf7-93iW_Z4T.js";
import "./index-B1H3wbDX-BJ93EP_V.js";
import "./index-CIAuSBNL-DbelsWEH.js";
import "./index-BmdaHLDZ-CpN9ND6T.js";
import "./index-BPTzbsrp-DhwZnvmV.js";
import "./index-OEEPllM9-HBciSBcN.js";
import "./index-Cj6RN1ru-pIt5HwOm.js";
import "./chevron-down-ChgOX_V1-CX9uQr7B.js";
import "./check-kVh9eIoB-e_5-Q7gI.js";
import "./x-g8BMWhwB-DMM2ctZM.js";
import "./useQuery-CT2fcLBS-CQXjZXMx.js";
import "./useMutation-DIK3tE9K-BLJeySS_.js";
const __iconNode = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode);
function useServerFn(serverFn) {
  const router = useRouter();
  return reactExports.useCallback(async (...args) => {
    try {
      const res = await serverFn(...args);
      if (isRedirect(res)) throw res;
      return res;
    } catch (err) {
      if (isRedirect(err)) {
        err.options._fromLocation = router.stores.location.get();
        return router.navigate(router.resolveRedirect(err).options);
      }
      throw err;
    }
  }, [router, serverFn]);
}
const excluirOrganizacao = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("25257d290f80a1a900f15a88549a5603b8717ded10882ffd3b0c64a41e187be5"));
const FUSOS = [{
  value: "America/Sao_Paulo",
  label: "Brasília (GMT-3)"
}, {
  value: "America/Manaus",
  label: "Manaus (GMT-4)"
}, {
  value: "America/Noronha",
  label: "Fernando de Noronha (GMT-2)"
}, {
  value: "America/Rio_Branco",
  label: "Rio Branco (GMT-5)"
}, {
  value: "Europe/Lisbon",
  label: "Lisboa (GMT+0/+1)"
}, {
  value: "Europe/Madrid",
  label: "Madrid (GMT+1/+2)"
}, {
  value: "Europe/London",
  label: "Londres (GMT+0/+1)"
}, {
  value: "America/New_York",
  label: "Nova York (GMT-5/-4)"
}, {
  value: "Asia/Tokyo",
  label: "Tóquio (GMT+9)"
}];
const MOTIVOS_EXCLUSAO = ["Encerrei a operação", "Não atende às nossas necessidades", "Preço alto", "Migrando para outra ferramenta", "Outro"];
function SettingRow({
  title,
  desc,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 py-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: title }),
      desc && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: desc })
    ] }),
    children
  ] });
}
function Section({
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-2 text-sm font-medium uppercase tracking-wide text-muted-foreground", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y", children })
  ] });
}
function Configuracoes() {
  const excluirOrgFn = useServerFn(excluirOrganizacao);
  const {
    data: sessao
  } = useSession();
  const {
    data: equipes = []
  } = useMinhasEquipes();
  const equipe_id = equipes[0]?.equipe_id;
  const filial_id = sessao?.filial_ativa_id ?? void 0;
  const {
    data: membros = []
  } = useMembros(equipe_id);
  const {
    data: cargos = []
  } = useCargos(filial_id);
  const empresaNome = sessao?.filial_nome || "—";
  const segmentoLabel = getSegmentoLabel(sessao?.segmento_topo ?? null, sessao?.segmento ?? null, null) || "—";
  const [fuso, setFuso] = reactExports.useState("America/Sao_Paulo");
  const [antecedencia, setAntecedencia] = reactExports.useState(15);
  const [posLimite, setPosLimite] = reactExports.useState(30);
  const [assinatura, setAssinatura] = reactExports.useState(true);
  const [conclusaoManual, setConclusaoManual] = reactExports.useState(false);
  const [herdar, setHerdar] = reactExports.useState(true);
  const [iaUrgencia, setIaUrgencia] = reactExports.useState(true);
  const [iaResumo, setIaResumo] = reactExports.useState(true);
  const [push, setPush] = reactExports.useState(true);
  const [emailDiario, setEmailDiario] = reactExports.useState(false);
  const [alertaNaoAssumido, setAlertaNaoAssumido] = reactExports.useState(10);
  reactExports.useEffect(() => {
    if (!filial_id) return;
    supabase.from("configuracoes_filial").select("*").eq("filial_id", filial_id).single().then(({
      data
    }) => {
      if (!data) return;
      setFuso(data.fuso_horario);
      setAntecedencia(data.antecedencia_minutos);
      setPosLimite(data.pos_limite_minutos);
      setAssinatura(data.assinatura_obrigatoria);
      setConclusaoManual(data.conclusao_manual_gestor);
      setHerdar(data.herdar_pendencias);
      setIaUrgencia(data.sugestao_urgencia_ia);
      setIaResumo(data.resumo_turno_ia);
      setPush(data.push_app);
      setEmailDiario(data.email_diario);
      setAlertaNaoAssumido(data.alerta_turno_nao_assumido);
    });
  }, [filial_id]);
  const salvar = async (patch) => {
    if (!filial_id) return;
    const {
      error
    } = await supabase.from("configuracoes_filial").update(patch).eq("filial_id", filial_id);
    if (error) toast.error("Erro ao salvar");
    else toast.success("Salvo", {
      duration: 1200
    });
  };
  const onChange = (setter, campo) => (v) => {
    setter(v);
    salvar({
      [campo]: v
    });
  };
  const [excluirOpen, setExcluirOpen] = reactExports.useState(false);
  const [motivo, setMotivo] = reactExports.useState(MOTIVOS_EXCLUSAO[0]);
  const [detalhe, setDetalhe] = reactExports.useState("");
  const [senha, setSenha] = reactExports.useState("");
  const [excluindo, setExcluindo] = reactExports.useState(false);
  const confirmarExcluir = async () => {
    if (!senha) return toast.error("Confirme com sua senha");
    setExcluindo(true);
    try {
      const {
        data: userData
      } = await supabase.auth.getUser();
      const email = userData.user?.email;
      if (!email) throw new Error("Sessão inválida");
      const {
        error: signInErr
      } = await supabase.auth.signInWithPassword({
        email,
        password: senha
      });
      if (signInErr) throw new Error("Senha incorreta");
      await excluirOrgFn();
      try {
        await supabase.auth.signOut({
          scope: "global"
        });
      } catch {
      }
      try {
        window.localStorage.clear();
      } catch {
      }
      try {
        window.sessionStorage.clear();
      } catch {
      }
      toast.success("Organização excluída");
      setExcluirOpen(false);
      window.location.replace("/login?excluida=1");
    } catch (e) {
      toast.error(e.message);
      setExcluindo(false);
    }
  };
  const exportarPDF = () => {
    const doc = new E();
    let y = 18;
    doc.setFontSize(16);
    doc.text(`Dados — ${empresaNome}`, 14, y);
    y += 8;
    doc.setFontSize(10);
    doc.text(`Segmento: ${segmentoLabel}`, 14, y);
    y += 6;
    doc.text(`Fuso: ${fuso}`, 14, y);
    y += 6;
    doc.text(`Exportado em: ${(/* @__PURE__ */ new Date()).toLocaleString("pt-BR")}`, 14, y);
    y += 10;
    doc.setFontSize(13);
    doc.text("Cargos", 14, y);
    y += 7;
    doc.setFontSize(10);
    cargos.forEach((c) => {
      doc.text(`• ${c.nome}`, 16, y);
      y += 5;
    });
    y += 4;
    doc.setFontSize(13);
    doc.text("Membros", 14, y);
    y += 7;
    doc.setFontSize(10);
    membros.forEach((m) => {
      const cargo = cargos.find((c) => c.id === m.cargoId)?.nome ?? "—";
      doc.text(`• ${m.nome}  —  ${m.email}  —  ${cargo}`, 16, y);
      y += 5;
      if (y > 280) {
        doc.addPage();
        y = 18;
      }
    });
    doc.save("organizacao-export.pdf");
    toast.success("Exportação concluída");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Configurações", subtitle: "Personalize como o Turno funciona para sua equipe." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Turnos e passagens", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SettingRow, { title: "Notificação antecipada", desc: "Alertar X minutos antes do início.", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", className: "w-20", value: antecedencia, onChange: (e) => setAntecedencia(Number(e.target.value)), onBlur: () => salvar({
          antecedencia_minutos: antecedencia
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SettingRow, { title: "Limite pós-encerramento", desc: "Janela em minutos após encerrar.", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", className: "w-20", value: posLimite, onChange: (e) => setPosLimite(Number(e.target.value)), onBlur: () => salvar({
          pos_limite_minutos: posLimite
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SettingRow, { title: "Assinatura obrigatória", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: assinatura, onCheckedChange: onChange(setAssinatura, "assinatura_obrigatoria") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SettingRow, { title: "Conclusão manual pelo gestor", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: conclusaoManual, onCheckedChange: onChange(setConclusaoManual, "conclusao_manual_gestor") }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Ocorrências", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SettingRow, { title: "Herdar pendências para o próximo turno", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: herdar, onCheckedChange: onChange(setHerdar, "herdar_pendencias") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SettingRow, { title: "Sugestão de urgência por IA", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: iaUrgencia, onCheckedChange: onChange(setIaUrgencia, "sugestao_urgencia_ia") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SettingRow, { title: "Resumo do turno por IA", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: iaResumo, onCheckedChange: onChange(setIaResumo, "resumo_turno_ia") }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Notificações", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SettingRow, { title: "Push no app", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: push, onCheckedChange: onChange(setPush, "push_app") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SettingRow, { title: "E-mail diário com resumo", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: emailDiario, onCheckedChange: onChange(setEmailDiario, "email_diario") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SettingRow, { title: "Alerta de turno não assumido", desc: "Após X minutos do horário de início.", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", className: "w-20", value: alertaNaoAssumido, onChange: (e) => setAlertaNaoAssumido(Number(e.target.value)), onBlur: () => salvar({
          alerta_turno_nao_assumido: alertaNaoAssumido
        }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Organização", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SettingRow, { title: "Nome", desc: "Contate o suporte para alterar.", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-56 items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: empresaNome, readOnly: true, disabled: true, className: "bg-muted/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-4 w-4 shrink-0 text-muted-foreground" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SettingRow, { title: "Segmento", desc: "Contate o suporte para alterar.", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-56 items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: segmentoLabel, readOnly: true, disabled: true, className: "bg-muted/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-4 w-4 shrink-0 text-muted-foreground" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SettingRow, { title: "Fuso horário", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-56", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: fuso, onValueChange: onChange(setFuso, "fuso_horario"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: FUSOS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: f.value, children: f.label }, f.value)) })
        ] }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-destructive/40 bg-destructive/5 p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "mt-0.5 h-5 w-5 text-destructive" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-medium text-destructive", children: "Zona de risco" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Ações irreversíveis. Confirmação dupla obrigatória." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "border-destructive/40 text-destructive hover:bg-destructive/10", onClick: exportarPDF, children: "Exportar todos os dados" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "destructive", onClick: () => setExcluirOpen(true), children: "Excluir organização" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: excluirOpen, onOpenChange: setExcluirOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-destructive", children: "Excluir organização" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Esta ação apaga membros, turnos, ocorrências e histórico. Não pode ser desfeita." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Por que está saindo?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: motivo, onValueChange: setMotivo, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: MOTIVOS_EXCLUSAO.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: m, children: m }, m)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Detalhes (opcional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: detalhe, onChange: (e) => setDetalhe(e.target.value), placeholder: "Conte mais para nos ajudar a melhorar." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Confirme com sua senha" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "password", value: senha, onChange: (e) => setSenha(e.target.value), placeholder: "••••••••" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setExcluirOpen(false), disabled: excluindo, children: "Cancelar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "destructive", onClick: confirmarExcluir, disabled: excluindo, children: excluindo ? "Excluindo..." : "Excluir definitivamente" })
      ] })
    ] }) })
  ] });
}
export {
  Configuracoes as component
};
