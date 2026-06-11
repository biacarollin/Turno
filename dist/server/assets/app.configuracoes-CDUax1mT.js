import { jsxs, jsx } from "react/jsx-runtime";
import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter, isRedirect } from "@tanstack/react-router";
import { P as PageHeader } from "./PageHeader-XNv6HAI7.js";
import { C as Card } from "./card-RGlIzTYo.js";
import { B as Button } from "./button-DA2gxxPy.js";
import { I as Input } from "./input-C0QjszdI.js";
import { S as Switch } from "./switch-CQ4rbtn8.js";
import { L as Label } from "./label-JU3yqRBo.js";
import { Lock, AlertTriangle } from "lucide-react";
import { S as Select, c as SelectTrigger, d as SelectValue, a as SelectContent, b as SelectItem } from "./select-NX1S2Qd-.js";
import { D as Dialog, a as DialogContent, d as DialogHeader, e as DialogTitle, b as DialogDescription, c as DialogFooter } from "./dialog-BZpy7vbf.js";
import { T as Textarea } from "./textarea-DSyJ1nlY.js";
import { toast } from "sonner";
import { jsPDF } from "jspdf";
import { f as useMembros, c as useCargos } from "./equipe-DeH1yNtv.js";
import { T as TSS_SERVER_FUNCTION, b as getServerFnById, a as createServerFn } from "./server-vRqOTwj5.js";
import { r as requireSupabaseAuth } from "./auth-middleware-pz5aXczO.js";
import { s as supabase } from "./client-BDUtUdlc.js";
import { a as useSession, u as useMinhasEquipes } from "./use-session-S7Dx9RFc.js";
import { g as getSegmentoLabel } from "./segmentos-BeD3Suz1.js";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-switch";
import "@radix-ui/react-label";
import "@radix-ui/react-select";
import "@radix-ui/react-dialog";
import "@tanstack/react-query";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "@tanstack/react-router/ssr/server";
import "@supabase/supabase-js";
function useServerFn(serverFn) {
  const router = useRouter();
  return React.useCallback(async (...args) => {
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
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
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
  return /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-4 py-3", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsx("div", { className: "text-sm font-medium", children: title }),
      desc && /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: desc })
    ] }),
    children
  ] });
}
function Section({
  title,
  children
}) {
  return /* @__PURE__ */ jsxs(Card, { className: "p-5", children: [
    /* @__PURE__ */ jsx("h2", { className: "mb-2 text-sm font-medium uppercase tracking-wide text-muted-foreground", children: title }),
    /* @__PURE__ */ jsx("div", { className: "divide-y", children })
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
  const [fuso, setFuso] = useState("America/Sao_Paulo");
  const [antecedencia, setAntecedencia] = useState(15);
  const [posLimite, setPosLimite] = useState(30);
  const [assinatura, setAssinatura] = useState(true);
  const [conclusaoManual, setConclusaoManual] = useState(false);
  const [herdar, setHerdar] = useState(true);
  const [iaUrgencia, setIaUrgencia] = useState(true);
  const [iaResumo, setIaResumo] = useState(true);
  const [push, setPush] = useState(true);
  const [emailDiario, setEmailDiario] = useState(false);
  const [alertaNaoAssumido, setAlertaNaoAssumido] = useState(10);
  useEffect(() => {
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
  const [excluirOpen, setExcluirOpen] = useState(false);
  const [motivo, setMotivo] = useState(MOTIVOS_EXCLUSAO[0]);
  const [detalhe, setDetalhe] = useState("");
  const [senha, setSenha] = useState("");
  const [excluindo, setExcluindo] = useState(false);
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
    const doc = new jsPDF();
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
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl space-y-6", children: [
    /* @__PURE__ */ jsx(PageHeader, { title: "Configurações", subtitle: "Personalize como o Turno funciona para sua equipe." }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxs(Section, { title: "Turnos e passagens", children: [
        /* @__PURE__ */ jsx(SettingRow, { title: "Notificação antecipada", desc: "Alertar X minutos antes do início.", children: /* @__PURE__ */ jsx(Input, { type: "number", className: "w-20", value: antecedencia, onChange: (e) => setAntecedencia(Number(e.target.value)), onBlur: () => salvar({
          antecedencia_minutos: antecedencia
        }) }) }),
        /* @__PURE__ */ jsx(SettingRow, { title: "Limite pós-encerramento", desc: "Janela em minutos após encerrar.", children: /* @__PURE__ */ jsx(Input, { type: "number", className: "w-20", value: posLimite, onChange: (e) => setPosLimite(Number(e.target.value)), onBlur: () => salvar({
          pos_limite_minutos: posLimite
        }) }) }),
        /* @__PURE__ */ jsx(SettingRow, { title: "Assinatura obrigatória", children: /* @__PURE__ */ jsx(Switch, { checked: assinatura, onCheckedChange: onChange(setAssinatura, "assinatura_obrigatoria") }) }),
        /* @__PURE__ */ jsx(SettingRow, { title: "Conclusão manual pelo gestor", children: /* @__PURE__ */ jsx(Switch, { checked: conclusaoManual, onCheckedChange: onChange(setConclusaoManual, "conclusao_manual_gestor") }) })
      ] }),
      /* @__PURE__ */ jsxs(Section, { title: "Ocorrências", children: [
        /* @__PURE__ */ jsx(SettingRow, { title: "Herdar pendências para o próximo turno", children: /* @__PURE__ */ jsx(Switch, { checked: herdar, onCheckedChange: onChange(setHerdar, "herdar_pendencias") }) }),
        /* @__PURE__ */ jsx(SettingRow, { title: "Sugestão de urgência por IA", children: /* @__PURE__ */ jsx(Switch, { checked: iaUrgencia, onCheckedChange: onChange(setIaUrgencia, "sugestao_urgencia_ia") }) }),
        /* @__PURE__ */ jsx(SettingRow, { title: "Resumo do turno por IA", children: /* @__PURE__ */ jsx(Switch, { checked: iaResumo, onCheckedChange: onChange(setIaResumo, "resumo_turno_ia") }) })
      ] }),
      /* @__PURE__ */ jsxs(Section, { title: "Notificações", children: [
        /* @__PURE__ */ jsx(SettingRow, { title: "Push no app", children: /* @__PURE__ */ jsx(Switch, { checked: push, onCheckedChange: onChange(setPush, "push_app") }) }),
        /* @__PURE__ */ jsx(SettingRow, { title: "E-mail diário com resumo", children: /* @__PURE__ */ jsx(Switch, { checked: emailDiario, onCheckedChange: onChange(setEmailDiario, "email_diario") }) }),
        /* @__PURE__ */ jsx(SettingRow, { title: "Alerta de turno não assumido", desc: "Após X minutos do horário de início.", children: /* @__PURE__ */ jsx(Input, { type: "number", className: "w-20", value: alertaNaoAssumido, onChange: (e) => setAlertaNaoAssumido(Number(e.target.value)), onBlur: () => salvar({
          alerta_turno_nao_assumido: alertaNaoAssumido
        }) }) })
      ] }),
      /* @__PURE__ */ jsxs(Section, { title: "Organização", children: [
        /* @__PURE__ */ jsx(SettingRow, { title: "Nome", desc: "Contate o suporte para alterar.", children: /* @__PURE__ */ jsxs("div", { className: "flex w-56 items-center gap-2", children: [
          /* @__PURE__ */ jsx(Input, { value: empresaNome, readOnly: true, disabled: true, className: "bg-muted/40" }),
          /* @__PURE__ */ jsx(Lock, { className: "h-4 w-4 shrink-0 text-muted-foreground" })
        ] }) }),
        /* @__PURE__ */ jsx(SettingRow, { title: "Segmento", desc: "Contate o suporte para alterar.", children: /* @__PURE__ */ jsxs("div", { className: "flex w-56 items-center gap-2", children: [
          /* @__PURE__ */ jsx(Input, { value: segmentoLabel, readOnly: true, disabled: true, className: "bg-muted/40" }),
          /* @__PURE__ */ jsx(Lock, { className: "h-4 w-4 shrink-0 text-muted-foreground" })
        ] }) }),
        /* @__PURE__ */ jsx(SettingRow, { title: "Fuso horário", children: /* @__PURE__ */ jsx("div", { className: "w-56", children: /* @__PURE__ */ jsxs(Select, { value: fuso, onValueChange: onChange(setFuso, "fuso_horario"), children: [
          /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsx(SelectContent, { children: FUSOS.map((f) => /* @__PURE__ */ jsx(SelectItem, { value: f.value, children: f.label }, f.value)) })
        ] }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Card, { className: "border-destructive/40 bg-destructive/5 p-5", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsx(AlertTriangle, { className: "mt-0.5 h-5 w-5 text-destructive" }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-sm font-medium text-destructive", children: "Zona de risco" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Ações irreversíveis. Confirmação dupla obrigatória." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-3 flex flex-wrap gap-2", children: [
          /* @__PURE__ */ jsx(Button, { variant: "outline", className: "border-destructive/40 text-destructive hover:bg-destructive/10", onClick: exportarPDF, children: "Exportar todos os dados" }),
          /* @__PURE__ */ jsx(Button, { variant: "destructive", onClick: () => setExcluirOpen(true), children: "Excluir organização" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Dialog, { open: excluirOpen, onOpenChange: setExcluirOpen, children: /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { className: "text-destructive", children: "Excluir organização" }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "Esta ação apaga membros, turnos, ocorrências e histórico. Não pode ser desfeita." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { children: "Por que está saindo?" }),
          /* @__PURE__ */ jsxs(Select, { value: motivo, onValueChange: setMotivo, children: [
            /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsx(SelectContent, { children: MOTIVOS_EXCLUSAO.map((m) => /* @__PURE__ */ jsx(SelectItem, { value: m, children: m }, m)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { children: "Detalhes (opcional)" }),
          /* @__PURE__ */ jsx(Textarea, { value: detalhe, onChange: (e) => setDetalhe(e.target.value), placeholder: "Conte mais para nos ajudar a melhorar." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { children: "Confirme com sua senha" }),
          /* @__PURE__ */ jsx(Input, { type: "password", value: senha, onChange: (e) => setSenha(e.target.value), placeholder: "••••••••" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => setExcluirOpen(false), disabled: excluindo, children: "Cancelar" }),
        /* @__PURE__ */ jsx(Button, { variant: "destructive", onClick: confirmarExcluir, disabled: excluindo, children: excluindo ? "Excluindo..." : "Excluir definitivamente" })
      ] })
    ] }) })
  ] });
}
export {
  Configuracoes as component
};
