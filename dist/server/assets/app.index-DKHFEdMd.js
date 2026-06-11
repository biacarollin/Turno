import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { Clock, AlertCircle, CheckCircle2, Users, Plus } from "lucide-react";
import { P as PageHeader } from "./PageHeader-XNv6HAI7.js";
import { C as Card } from "./card-RGlIzTYo.js";
import { B as Button } from "./button-DA2gxxPy.js";
import { c as useOcorrencias, u as useAtualizarStatusOcorrencia } from "./ocorrencias-CWdEvQgY.js";
import { f as useMembros, i as useTurnos } from "./equipe-DeH1yNtv.js";
import { c as useFolgas } from "./folgas-ZdQoj1SD.js";
import { a as useSession, u as useMinhasEquipes } from "./use-session-S7Dx9RFc.js";
import { f as findSegmento } from "./segmentos-BeD3Suz1.js";
import "react";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@tanstack/react-query";
import "./client-BDUtUdlc.js";
import "@supabase/supabase-js";
function Dashboard() {
  const {
    data: sessao
  } = useSession();
  const {
    data: equipes = []
  } = useMinhasEquipes();
  const equipe_id = equipes[0]?.equipe_id;
  const filial_id = sessao?.filial_ativa_id ?? void 0;
  const {
    data: ocorrencias = []
  } = useOcorrencias(equipe_id);
  const atualizarStatus = useAtualizarStatusOcorrencia();
  const {
    data: membros = []
  } = useMembros(equipe_id);
  const {
    data: turnos = []
  } = useTurnos(equipe_id);
  const {
    data: folgas = []
  } = useFolgas(filial_id);
  const seg = findSegmento(sessao?.segmento ?? null);
  const abertas = ocorrencias.filter((o) => o.status === "aberta").length;
  const concluidas = ocorrencias.filter((o) => o.status === "concluida").length;
  const turnosAtivos = turnos.filter((t) => t.ativo).length;
  const urgentes = ocorrencias.filter((o) => o.status === "aberta" && o.gravidade === "alta");
  const stats = [{
    label: "Turnos ativos",
    value: turnosAtivos,
    icon: Clock
  }, {
    label: "Ocorrências abertas",
    value: abertas,
    icon: AlertCircle
  }, {
    label: "Concluídas",
    value: concluidas,
    icon: CheckCircle2
  }, {
    label: "Membros",
    value: membros.length,
    icon: Users
  }];
  const totalRegistros = ocorrencias.length + membros.length + folgas.length;
  if (!sessao) {
    return /* @__PURE__ */ jsx("div", { className: "flex h-40 items-center justify-center text-muted-foreground", children: "Carregando..." });
  }
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl space-y-6", children: [
    /* @__PURE__ */ jsx(PageHeader, { title: "Dashboard", subtitle: seg ? `Segmento: ${seg.topo.nome} · ${seg.sub.nome}` : "Visão geral da sua operação" }),
    urgentes.length > 0 && /* @__PURE__ */ jsxs(Card, { className: "border-red-300 bg-red-50/60 p-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-3 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxs("span", { className: "relative flex h-2.5 w-2.5", children: [
            /* @__PURE__ */ jsx("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-60" }),
            /* @__PURE__ */ jsx("span", { className: "relative inline-flex h-2.5 w-2.5 rounded-full bg-red-600" })
          ] }),
          /* @__PURE__ */ jsxs("h2", { className: "text-base font-semibold text-red-800", children: [
            "Urgente · ",
            urgentes.length,
            " ocorrência",
            urgentes.length > 1 ? "s" : "",
            " de alta gravidade"
          ] })
        ] }),
        /* @__PURE__ */ jsx(Link, { to: "/app/ocorrencias", children: /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", className: "text-red-700 hover:text-red-800", children: "Ver todas" }) })
      ] }),
      /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: urgentes.slice(0, 5).map((o) => /* @__PURE__ */ jsxs("li", { className: "flex items-center justify-between gap-3 rounded-md border border-red-200 bg-background p-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsx("div", { className: "truncate text-sm font-medium", children: o.titulo }),
          /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground", children: [
            o.tipo || "Sem tipo",
            " · ",
            new Date(o.created_at).toLocaleString("pt-BR")
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "outline", className: "border-red-300 text-red-700 hover:bg-red-100", onClick: () => atualizarStatus.mutate({
          id: o.id,
          status: "concluida",
          equipe_id
        }), children: [
          /* @__PURE__ */ jsx(CheckCircle2, { className: "mr-1 h-3.5 w-3.5" }),
          " Concluir"
        ] })
      ] }, o.id)) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4", children: stats.map((s) => /* @__PURE__ */ jsxs(Card, { className: "p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: s.label }),
        /* @__PURE__ */ jsx(s.icon, { className: "h-4 w-4 text-turno-500" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-2 text-3xl font-medium text-foreground", children: s.value })
    ] }, s.label)) }),
    totalRegistros === 0 ? /* @__PURE__ */ jsxs(Card, { className: "p-10 text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-turno-100 text-turno-700", children: /* @__PURE__ */ jsx(Plus, { className: "h-6 w-6" }) }),
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium", children: "Comece a usar o Turno" }),
      /* @__PURE__ */ jsx("p", { className: "mx-auto mt-1 max-w-md text-sm text-muted-foreground", children: "Você ainda não registrou nada. Cadastre os primeiros membros da equipe e comece a registrar ocorrências do dia." }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 flex justify-center gap-2", children: [
        /* @__PURE__ */ jsx(Link, { to: "/app/membros", children: /* @__PURE__ */ jsx(Button, { className: "bg-turno-600 hover:bg-turno-700", children: "Adicionar membros" }) }),
        /* @__PURE__ */ jsx(Link, { to: "/app/ocorrencias", children: /* @__PURE__ */ jsx(Button, { variant: "outline", children: "Nova ocorrência" }) })
      ] })
    ] }) : /* @__PURE__ */ jsxs(Card, { className: "p-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-base font-medium", children: "Últimas ocorrências" }),
        /* @__PURE__ */ jsx(Link, { to: "/app/ocorrencias", children: /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", children: "Ver todas" }) })
      ] }),
      ocorrencias.length === 0 ? /* @__PURE__ */ jsx("div", { className: "py-6 text-center text-sm text-muted-foreground", children: "Nenhuma ocorrência registrada ainda." }) : /* @__PURE__ */ jsx("ul", { className: "divide-y", children: ocorrencias.slice(0, 5).map((o) => /* @__PURE__ */ jsxs("li", { className: "flex items-center justify-between py-3", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "text-sm font-medium", children: o.titulo }),
          /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground", children: [
            o.tipo || "Sem tipo",
            " · ",
            new Date(o.created_at).toLocaleString("pt-BR")
          ] })
        ] }),
        /* @__PURE__ */ jsx("span", { className: `rounded-full px-2 py-0.5 text-xs ${o.status === "aberta" ? "bg-amber-100 text-amber-800" : "bg-turno-100 text-turno-800"}`, children: o.status === "aberta" ? "Aberta" : "Concluída" })
      ] }, o.id)) })
    ] })
  ] });
}
export {
  Dashboard as component
};
