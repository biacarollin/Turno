import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { P as PageHeader } from "./PageHeader-XNv6HAI7.js";
import { C as Card } from "./card-RGlIzTYo.js";
import { B as Button } from "./button-DA2gxxPy.js";
import { I as Input } from "./input-C0QjszdI.js";
import { T as Textarea } from "./textarea-DSyJ1nlY.js";
import { L as Label } from "./label-JU3yqRBo.js";
import { Plus, Lock, StickyNote, Trash2 } from "lucide-react";
import { D as Dialog, a as DialogContent, d as DialogHeader, e as DialogTitle, c as DialogFooter } from "./dialog-BZpy7vbf.js";
import { toast } from "sonner";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { s as supabase } from "./client-BDUtUdlc.js";
import { a as useSession } from "./use-session-S7Dx9RFc.js";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-label";
import "@radix-ui/react-dialog";
import "@supabase/supabase-js";
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
  const [open, setOpen] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [destinatario, setDestinatario] = useState("");
  const [sugestoes, setSugestoes] = useState([]);
  const debounceRef = useRef(null);
  useEffect(() => {
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
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl space-y-6", children: [
    /* @__PURE__ */ jsx(PageHeader, { title: "Notas privadas", subtitle: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsx(Lock, { className: "h-3.5 w-3.5" }),
      " Visível para você (e para o destinatário, se houver)"
    ] }), actions: /* @__PURE__ */ jsxs(Button, { className: "bg-turno-600 hover:bg-turno-700", onClick: () => setOpen(true), children: [
      /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }),
      " Nova nota"
    ] }) }),
    isLoading ? /* @__PURE__ */ jsx(Card, { className: "p-8 text-center text-sm text-muted-foreground", children: "Carregando..." }) : notas.length === 0 ? /* @__PURE__ */ jsxs(Card, { className: "p-10 text-center", children: [
      /* @__PURE__ */ jsx(StickyNote, { className: "mx-auto h-10 w-10 text-muted-foreground/40" }),
      /* @__PURE__ */ jsx("h3", { className: "mt-3 text-base font-medium", children: "Nenhuma nota ainda" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Use este espaço para anotações privadas sobre a equipe ou operação." })
    ] }) : /* @__PURE__ */ jsx("div", { className: "grid gap-3 md:grid-cols-2", children: notas.map((n) => /* @__PURE__ */ jsxs(Card, { className: "p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
        /* @__PURE__ */ jsx("div", { className: "font-medium", children: n.titulo }),
        /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", onClick: () => {
          if (confirm("Excluir?")) excluir.mutate({
            id: n.id,
            filial_id: n.filial_id
          });
        }, children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4 text-destructive" }) })
      ] }),
      n.conteudo && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground whitespace-pre-wrap", children: n.conteudo }),
      /* @__PURE__ */ jsx("div", { className: "mt-2 text-xs text-muted-foreground", children: new Date(n.created_at).toLocaleString("pt-BR") })
    ] }, n.id)) }),
    /* @__PURE__ */ jsx(Dialog, { open, onOpenChange: setOpen, children: /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: "Nova nota" }) }),
      /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "nt", children: "Título" }),
          /* @__PURE__ */ jsx(Input, { id: "nt", value: titulo, onChange: (e) => setTitulo(e.target.value), required: true })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "nd", children: "Destinatário (opcional)" }),
          /* @__PURE__ */ jsx(Input, { id: "nd", placeholder: "@nome-sobrenome", value: destinatario, onChange: (e) => setDestinatario(e.target.value), autoComplete: "off" }),
          sugestoes.length > 0 && /* @__PURE__ */ jsx("ul", { className: "mt-1 max-h-40 overflow-y-auto rounded-md border bg-popover text-sm shadow", children: sugestoes.map((u) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("button", { type: "button", className: "flex w-full items-center justify-between gap-2 px-3 py-1.5 text-left hover:bg-muted", onClick: () => {
            setDestinatario("@" + u.username);
            setSugestoes([]);
          }, children: [
            /* @__PURE__ */ jsxs("span", { children: [
              "@",
              u.username
            ] }),
            u.nome_completo && /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: u.nome_completo })
          ] }) }, u.user_id)) }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Se preenchido, a nota também aparece para essa pessoa." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "nc", children: "Conteúdo" }),
          /* @__PURE__ */ jsx(Textarea, { id: "nc", value: conteudo, onChange: (e) => setConteudo(e.target.value), className: "min-h-28" })
        ] }),
        /* @__PURE__ */ jsxs(DialogFooter, { children: [
          /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", onClick: () => setOpen(false), children: "Cancelar" }),
          /* @__PURE__ */ jsx(Button, { type: "submit", className: "bg-turno-600 hover:bg-turno-700", disabled: criar.isPending, children: "Salvar" })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  Notas as component
};
