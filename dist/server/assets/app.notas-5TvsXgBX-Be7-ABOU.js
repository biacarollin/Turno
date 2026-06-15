import { Y as reactExports, P as jsxRuntimeExports } from "./server-AHFj_Bgy-gsoihpy4.js";
import { P as PageHeader } from "./PageHeader-XNv6HAI7-knc3Lhra.js";
import { C as Card } from "./card-RGlIzTYo-B34J4GZ4.js";
import { B as Button } from "./button-DA2gxxPy-CUtl2pTC.js";
import { I as Input } from "./input-C0QjszdI-D0Nowbjj.js";
import { T as Textarea } from "./textarea-DSyJ1nlY-BJEJR38S.js";
import { L as Label } from "./label-JU3yqRBo-Dlrqtcjr.js";
import { D as Dialog, a as DialogContent, d as DialogHeader, e as DialogTitle, c as DialogFooter } from "./dialog-BZpy7vbf-CTRBBq-G.js";
import { t as toast } from "./index-v-vtUMd9.js";
import { u as useQuery } from "./useQuery-CT2fcLBS.js";
import { o as useQueryClient } from "./router-BfE_NWn3-LgtRmdPD.js";
import { u as useMutation } from "./useMutation-DIK3tE9K.js";
import { s as supabase } from "./client-BDUtUdlc-BgkiGMRQ.js";
import { a as useSession } from "./use-session-S7Dx9RFc-D3XJIkxI.js";
import { P as Plus } from "./plus-C_5shYh4.js";
import { L as Lock } from "./lock-BBzn4fhu.js";
import { c as createLucideIcon } from "./createLucideIcon-DtALbmVw.js";
import { T as Trash2 } from "./trash-2-D9LpYFk2.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./utils-H80jjgLf-8RO4xBwZ.js";
import "./index-QcqZe4R0.js";
import "./index-BPTzbsrp.js";
import "./index-CT_HDpbD.js";
import "./index-OEEPllM9.js";
import "./index-BlRNeFf7.js";
import "./x-g8BMWhwB.js";
import "./stripe.esm.worker-BZ5uBE48.js";
const __iconNode = [
  [
    "path",
    {
      d: "M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z",
      key: "1dfntj"
    }
  ],
  ["path", { d: "M15 3v5a1 1 0 0 0 1 1h5", key: "6s6qgf" }]
];
const StickyNote = createLucideIcon("sticky-note", __iconNode);
function useNotas(filial_id) {
  return useQuery({
    queryKey: ["notas", filial_id],
    enabled: !!filial_id,
    queryFn: async () => {
      const { data, error } = await supabase.from("notas").select("id, user_id, filial_id, titulo, conteudo, destinatario_user_id, created_at").eq("filial_id", filial_id).order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    }
  });
}
function useCriarNota() {
  const qc = useQueryClient();
  const { data: sessao } = useSession();
  return useMutation({
    mutationFn: async (input) => {
      if (!sessao?.user_id || !sessao?.filial_ativa_id)
        throw new Error("Sessão inválida");
      let destinatario_user_id = null;
      if (input.destinatario_username?.trim()) {
        const uname = input.destinatario_username.trim().toLowerCase().replace(/^@/, "");
        const { data, error: error2 } = await supabase.from("profiles_public").select("user_id").eq("username", uname).single();
        if (error2) throw new Error(`@${uname} não encontrado`);
        destinatario_user_id = data?.user_id ?? null;
      }
      const { error } = await supabase.from("notas").insert({
        user_id: sessao.user_id,
        filial_id: sessao.filial_ativa_id,
        titulo: input.titulo,
        conteudo: input.conteudo || null,
        destinatario_user_id
      });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notas", sessao?.filial_ativa_id] })
  });
}
function useExcluirNota() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, filial_id }) => {
      const { error } = await supabase.from("notas").delete().eq("id", id);
      if (error) throw error;
      return filial_id;
    },
    onSuccess: (filial_id) => qc.invalidateQueries({ queryKey: ["notas", filial_id] })
  });
}
async function searchUsernames(prefix) {
  const clean = prefix.trim().toLowerCase().replace(/^@/, "");
  if (clean.length < 1) return [];
  const { data, error } = await supabase.from("profiles_public").select("user_id, username, nome_completo").ilike("username", `${clean}%`).limit(8);
  if (error) throw error;
  return data ?? [];
}
function Notas() {
  const {
    data: sessao
  } = useSession();
  const filial_id = sessao?.filial_ativa_id ?? void 0;
  const {
    data: notas = [],
    isLoading
  } = useNotas(filial_id);
  const criar = useCriarNota();
  const excluir = useExcluirNota();
  const [open, setOpen] = reactExports.useState(false);
  const [titulo, setTitulo] = reactExports.useState("");
  const [conteudo, setConteudo] = reactExports.useState("");
  const [destinatario, setDestinatario] = reactExports.useState("");
  const [sugestoes, setSugestoes] = reactExports.useState([]);
  const debounceRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const q = destinatario.trim().replace(/^@/, "");
    if (q.length < 1) {
      setSugestoes([]);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      try {
        setSugestoes(await searchUsernames(q));
      } catch {
        setSugestoes([]);
      }
    }, 200);
  }, [destinatario]);
  const submit = async (e) => {
    e.preventDefault();
    if (!titulo.trim()) return;
    try {
      await criar.mutateAsync({
        titulo: titulo.trim(),
        conteudo,
        destinatario_username: destinatario.trim() || void 0
      });
      toast.success("Nota salva");
      setOpen(false);
      setTitulo("");
      setConteudo("");
      setDestinatario("");
    } catch (e2) {
      toast.error(e2 instanceof Error ? e2.message : "Erro");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Notas privadas", subtitle: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-3.5 w-3.5" }),
      " Visível para você (e para o destinatário, se houver)"
    ] }), actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "bg-turno-600 hover:bg-turno-700", onClick: () => setOpen(true), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
      " Nova nota"
    ] }) }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-8 text-center text-sm text-muted-foreground", children: "Carregando..." }) : notas.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-10 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StickyNote, { className: "mx-auto h-10 w-10 text-muted-foreground/40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 text-base font-medium", children: "Nenhuma nota ainda" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Use este espaço para anotações privadas sobre a equipe ou operação." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 md:grid-cols-2", children: notas.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: n.titulo }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: () => {
          if (confirm("Excluir?")) excluir.mutate({
            id: n.id,
            filial_id: n.filial_id
          });
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" }) })
      ] }),
      n.conteudo && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground whitespace-pre-wrap", children: n.conteudo }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-xs text-muted-foreground", children: new Date(n.created_at).toLocaleString("pt-BR") })
    ] }, n.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: setOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Nova nota" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "nt", children: "Título" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "nt", value: titulo, onChange: (e) => setTitulo(e.target.value), required: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "nd", children: "Destinatário (opcional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "nd", placeholder: "@nome-sobrenome", value: destinatario, onChange: (e) => setDestinatario(e.target.value), autoComplete: "off" }),
          sugestoes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-1 max-h-40 overflow-y-auto rounded-md border bg-popover text-sm shadow", children: sugestoes.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: "flex w-full items-center justify-between gap-2 px-3 py-1.5 text-left hover:bg-muted", onClick: () => {
            setDestinatario("@" + u.username);
            setSugestoes([]);
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "@",
              u.username
            ] }),
            u.nome_completo && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: u.nome_completo })
          ] }) }, u.user_id)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Se preenchido, a nota também aparece para essa pessoa." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "nc", children: "Conteúdo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { id: "nc", value: conteudo, onChange: (e) => setConteudo(e.target.value), className: "min-h-28" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: () => setOpen(false), children: "Cancelar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "bg-turno-600 hover:bg-turno-700", disabled: criar.isPending, children: "Salvar" })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  Notas as component
};
