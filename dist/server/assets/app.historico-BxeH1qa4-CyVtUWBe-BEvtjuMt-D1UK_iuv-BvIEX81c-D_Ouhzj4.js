import { P as jsxRuntimeExports } from "./server-AHFj_Bgy-gsoihpy4-CbyuSDu4-Ble6ghI2-BbTWyedm-DMY4rmEE.js";
import { P as PageHeader } from "./PageHeader-XNv6HAI7-knc3Lhra-DJhx1cV--CPlw6dN2-C5AGiOZ7-Diyt-F2u.js";
import { C as Card } from "./card-RGlIzTYo-B34J4GZ4-DDQrq4Oi-Dj_b9Mln-RljLwUmW-B7Ze6dPL.js";
import { u as useQuery } from "./useQuery-CT2fcLBS-CQXjZXMx-CZ3zJieM-CTXinx3o-BtfJ4J1S.js";
import { s as supabase } from "./client-BDUtUdlc-BgkiGMRQ-BFQ4tIWJ-OPLCuHla-DDf4-v7v-Dm7zLGxE.js";
import { a as useSession, u as useMinhasEquipes } from "./use-session-S7Dx9RFc-D3XJIkxI-DJOreupP-CHn8DVBd-BynqLMTc-Tf37-Mq5.js";
import { c as createLucideIcon } from "./createLucideIcon-DtALbmVw-CBqAgreN-Bp4R2JQA-DhYh3WUG-C9iE_qXX.js";
import { S as ShieldCheck } from "./shield-check-CYxVQaLx-B98wjwdS-zm5Rxoi--Jg6h1v2M-BMmKI_ru.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./utils-H80jjgLf-8RO4xBwZ-8RO4xBwZ-8RO4xBwZ-8RO4xBwZ-8RO4xBwZ.js";
import "./router-BfE_NWn3-LgtRmdPD-C07lmE3T-BBvol4Fb-CaQxh4DF-DI3ZXuwt.js";
import "./stripe.esm.worker-BZ5uBE48-BZ5uBE48-BZ5uBE48-BZ5uBE48-BZ5uBE48.js";
import "./index-BlRNeFf7-93iW_Z4T-93iW_Z4T-93iW_Z4T-93iW_Z4T.js";
const __iconNode = [
  [
    "path",
    {
      d: "M14.364 13.634a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506l4.013-4.009a1 1 0 0 0-3.004-3.004z",
      key: "ukzhwg"
    }
  ],
  ["path", { d: "M14.487 7.858A1 1 0 0 1 14 7V2", key: "1klhew" }],
  [
    "path",
    {
      d: "M20 19.645V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l2.516 2.516",
      key: "rxaxab"
    }
  ],
  ["path", { d: "M8 18h1", key: "13wk12" }]
];
const FilePenLine = createLucideIcon("file-pen-line", __iconNode);
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Histórico de passagens", subtitle: "Toda passagem de turno fica registrada aqui." }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-8 text-center text-sm text-muted-foreground", children: "Carregando..." }) : passagens.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-10 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FilePenLine, { className: "mx-auto h-10 w-10 text-muted-foreground/40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 text-base font-medium", children: "Nenhuma passagem registrada" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Quando a equipe começar a registrar passagens de turno, elas aparecerão aqui automaticamente." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "divide-y", children: passagens.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: new Date(p.data).toLocaleDateString("pt-BR") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          p.hash_assinatura && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-emerald-600", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3 w-3" }),
            " Assinado"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: p.assinado_por || "Sem assinatura" })
        ] })
      ] }),
      p.resumo && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-muted-foreground", children: p.resumo }),
      p.assinado_em && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs text-muted-foreground", children: new Date(p.assinado_em).toLocaleString("pt-BR") })
    ] }, p.id)) })
  ] });
}
export {
  Historico as component
};
