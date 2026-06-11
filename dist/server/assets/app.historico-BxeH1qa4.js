import { jsxs, jsx } from "react/jsx-runtime";
import { P as PageHeader } from "./PageHeader-XNv6HAI7.js";
import { C as Card } from "./card-RGlIzTYo.js";
import { FileSignature, ShieldCheck } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { s as supabase } from "./client-BDUtUdlc.js";
import { a as useSession, u as useMinhasEquipes } from "./use-session-S7Dx9RFc.js";
import "react";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@supabase/supabase-js";
function usePassagens(equipe_id) {
  return useQuery({
    queryKey: ["passagens", equipe_id],
    enabled: !!equipe_id,
    queryFn: async () => {
      const { data, error } = await supabase.from("passagens_turno").select("id, equipe_id, turno_id, data, resumo, assinado_por, hash_assinatura, ip_assinatura, device_assinatura, assinado_em, created_at").eq("equipe_id", equipe_id).order("data", { ascending: false });
      if (error) throw error;
      return data ?? [];
    }
  });
}
function Historico() {
  const {
    data: sessao
  } = useSession();
  const {
    data: equipes = []
  } = useMinhasEquipes();
  const equipe_id = equipes[0]?.equipe_id;
  const {
    data: passagens = [],
    isLoading
  } = usePassagens(equipe_id);
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl space-y-6", children: [
    /* @__PURE__ */ jsx(PageHeader, { title: "Histórico de passagens", subtitle: "Toda passagem de turno fica registrada aqui." }),
    isLoading ? /* @__PURE__ */ jsx(Card, { className: "p-8 text-center text-sm text-muted-foreground", children: "Carregando..." }) : passagens.length === 0 ? /* @__PURE__ */ jsxs(Card, { className: "p-10 text-center", children: [
      /* @__PURE__ */ jsx(FileSignature, { className: "mx-auto h-10 w-10 text-muted-foreground/40" }),
      /* @__PURE__ */ jsx("h3", { className: "mt-3 text-base font-medium", children: "Nenhuma passagem registrada" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Quando a equipe começar a registrar passagens de turno, elas aparecerão aqui automaticamente." })
    ] }) : /* @__PURE__ */ jsx(Card, { className: "divide-y", children: passagens.map((p) => /* @__PURE__ */ jsxs("div", { className: "px-4 py-3 text-sm", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("span", { className: "font-medium", children: new Date(p.data).toLocaleDateString("pt-BR") }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          p.hash_assinatura && /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 text-xs text-emerald-600", children: [
            /* @__PURE__ */ jsx(ShieldCheck, { className: "h-3 w-3" }),
            " Assinado"
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: p.assinado_por || "Sem assinatura" })
        ] })
      ] }),
      p.resumo && /* @__PURE__ */ jsx("p", { className: "mt-1 text-muted-foreground", children: p.resumo }),
      p.assinado_em && /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-xs text-muted-foreground", children: new Date(p.assinado_em).toLocaleString("pt-BR") })
    ] }, p.id)) })
  ] });
}
export {
  Historico as component
};
