import { jsxs, jsx } from "react/jsx-runtime";
import { P as PageHeader } from "./PageHeader-XNv6HAI7.js";
import { C as Card } from "./card-RGlIzTYo.js";
import { B as Badge } from "./badge-DyfXZgLs.js";
import { b as buttonVariants, B as Button } from "./button-DA2gxxPy.js";
import { A as Avatar, a as AvatarFallback } from "./avatar-BJDbbUeP.js";
import { Mail, UserPlus, ShieldCheck, UserX, ShieldAlert, Smartphone, Check, Copy, Trash2 } from "lucide-react";
import * as React from "react";
import { useState } from "react";
import { toast } from "sonner";
import { D as Dialog, a as DialogContent, d as DialogHeader, e as DialogTitle, b as DialogDescription, c as DialogFooter } from "./dialog-BZpy7vbf.js";
import { I as Input } from "./input-C0QjszdI.js";
import { L as Label } from "./label-JU3yqRBo.js";
import { S as Switch } from "./switch-CQ4rbtn8.js";
import { S as Select, c as SelectTrigger, d as SelectValue, a as SelectContent, b as SelectItem } from "./select-NX1S2Qd-.js";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { c as cn } from "./utils-H80jjgLf.js";
import { c as useCargos, f as useMembros, a as useAdicionarMembro, b as useAtualizarMembro, d as useExcluirMembro, T as TURNOS_OPCOES } from "./equipe-DeH1yNtv.js";
import { a as useSession, u as useMinhasEquipes } from "./use-session-S7Dx9RFc.js";
import "class-variance-authority";
import "@radix-ui/react-slot";
import "@radix-ui/react-avatar";
import "@radix-ui/react-dialog";
import "@radix-ui/react-label";
import "@radix-ui/react-switch";
import "@radix-ui/react-select";
import "clsx";
import "tailwind-merge";
import "@tanstack/react-query";
import "./client-BDUtUdlc.js";
import "@supabase/supabase-js";
const AlertDialog = AlertDialogPrimitive.Root;
const AlertDialogPortal = AlertDialogPrimitive.Portal;
const AlertDialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;
const AlertDialogContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs(AlertDialogPortal, { children: [
  /* @__PURE__ */ jsx(AlertDialogOverlay, {}),
  /* @__PURE__ */ jsx(
    AlertDialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props
    }
  )
] }));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;
const AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
AlertDialogHeader.displayName = "AlertDialogHeader";
const AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
AlertDialogFooter.displayName = "AlertDialogFooter";
const AlertDialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold", className),
    ...props
  }
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;
const AlertDialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;
const AlertDialogAction = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AlertDialogPrimitive.Action, { ref, className: cn(buttonVariants(), className), ...props }));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;
const AlertDialogCancel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Cancel,
  {
    ref,
    className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
    ...props
  }
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;
function formatWhatsapp(input) {
  const digits = input.replace(/\D/g, "").slice(0, 11);
  const len = digits.length;
  if (len === 0) return "";
  if (len <= 2) return `(${digits}`;
  if (len === 3) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (len <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2, 3)} ${digits.slice(3)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 3)} ${digits.slice(3, 7)}-${digits.slice(7)}`;
}
const WHATSAPP_PLACEHOLDER = "(11) 9 9999-9999";
const WHATSAPP_MAX_LENGTH = 16;
function Membros() {
  const {
    data: sessao
  } = useSession();
  const {
    data: equipes = []
  } = useMinhasEquipes();
  const equipe_id = equipes[0]?.equipe_id;
  const filial_id = sessao?.filial_ativa_id ?? void 0;
  const {
    data: cargos = []
  } = useCargos(filial_id);
  const {
    data: membros = [],
    isLoading
  } = useMembros(equipe_id);
  const adicionarMembro = useAdicionarMembro();
  const atualizarMembro = useAtualizarMembro();
  const excluirMembro = useExcluirMembro();
  const [convidarOpen, setConvidarOpen] = useState(false);
  const [adicionarOpen, setAdicionarOpen] = useState(false);
  const [novoNome, setNovoNome] = useState("");
  const [novoEmail, setNovoEmail] = useState("");
  const [novoWhats, setNovoWhats] = useState("");
  const [novoCargo, setNovoCargo] = useState("none");
  const [novoTurno, setNovoTurno] = useState("—");
  const [editarId, setEditarId] = useState(null);
  const [excluirId, setExcluirId] = useState(null);
  const [linkConvite, setLinkConvite] = useState(null);
  const [emailConvite, setEmailConvite] = useState("");
  const [copiado, setCopiado] = useState(false);
  const editando = membros.find((m) => m.id === editarId) ?? null;
  const cargoDe = (id) => cargos.find((c) => c.id === id) ?? null;
  const limparForm = () => {
    setNovoNome("");
    setNovoEmail("");
    setNovoWhats("");
    setNovoCargo("none");
    setNovoTurno("—");
  };
  const validarComuns = () => {
    if (!novoNome.trim()) {
      toast.error("Informe o nome");
      return true;
    }
    if (novoCargo === "none") {
      toast.error("Informe o cargo");
      return true;
    }
    if (!novoEmail.trim() && !novoWhats.trim()) {
      toast.error("Informe e-mail ou WhatsApp");
      return true;
    }
    if (novoWhats.trim()) {
      const digits = novoWhats.replace(/\D/g, "");
      if (digits.length !== 11) {
        toast.error("WhatsApp incompleto");
        return true;
      }
    }
    return false;
  };
  const salvarConvite = async () => {
    if (validarComuns() || !equipe_id) return;
    try {
      const membro = await adicionarMembro.mutateAsync({
        equipe_id,
        user_id: crypto.randomUUID(),
        // placeholder — será substituído quando o usuário aceitar o convite
        cargo_id: novoCargo === "none" ? void 0 : novoCargo,
        turno_nome: novoTurno,
        dispositivo: "convite"
      });
      const url = `${window.location.origin}/confirmar?invite=${encodeURIComponent(equipe_id)}&email=${encodeURIComponent(novoEmail.trim())}`;
      setLinkConvite(url);
      setEmailConvite(novoEmail.trim());
      setCopiado(false);
      toast.success("Convite gerado");
      setConvidarOpen(false);
    } catch (e) {
      toast.error(e.message);
    }
  };
  const salvarManual = async () => {
    if (validarComuns() || !equipe_id) return;
    try {
      await adicionarMembro.mutateAsync({
        equipe_id,
        user_id: crypto.randomUUID(),
        cargo_id: novoCargo === "none" ? void 0 : novoCargo,
        turno_nome: novoTurno,
        dispositivo: "verificado"
      });
      toast.success("Membro adicionado");
      setAdicionarOpen(false);
      limparForm();
    } catch (e) {
      toast.error(e.message);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl space-y-6", children: [
    /* @__PURE__ */ jsx(PageHeader, { title: "Membros", subtitle: "Quem faz parte da equipe e o status de cada dispositivo.", actions: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
      /* @__PURE__ */ jsxs(Button, { className: "bg-turno-600 hover:bg-turno-700", onClick: () => {
        limparForm();
        setConvidarOpen(true);
      }, children: [
        /* @__PURE__ */ jsx(Mail, { className: "h-4 w-4" }),
        " Convidar membro"
      ] }),
      /* @__PURE__ */ jsxs(Button, { variant: "outline", onClick: () => {
        limparForm();
        setAdicionarOpen(true);
      }, children: [
        /* @__PURE__ */ jsx(UserPlus, { className: "h-4 w-4" }),
        " Adicionar membro"
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Card, { className: "overflow-hidden", children: isLoading ? /* @__PURE__ */ jsx("div", { className: "p-6 text-sm text-muted-foreground", children: "Carregando..." }) : membros.length === 0 ? /* @__PURE__ */ jsx("div", { className: "p-6 text-center text-sm text-muted-foreground", children: 'Nenhum membro ainda. Clique em "Adicionar membro".' }) : /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-muted/50 text-left text-xs uppercase tracking-wide text-muted-foreground", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-4 py-2.5", children: "Membro" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-2.5", children: "Cargo" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-2.5", children: "Turno" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-2.5", children: "Dispositivo" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-2.5" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: membros.map((m) => {
        const cargo = cargoDe(m.cargoId);
        return /* @__PURE__ */ jsxs("tr", { className: "border-t", children: [
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(Avatar, { className: "h-8 w-8", children: /* @__PURE__ */ jsx(AvatarFallback, { className: "bg-turno-100 text-xs text-turno-900", children: m.nome.split(" ").map((n) => n[0]).slice(0, 2).join("") }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "font-medium", children: m.nome }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: m.email })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: !cargo ? /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "—" }) : /* @__PURE__ */ jsx(Badge, { variant: "outline", style: {
            borderColor: cargo.cor,
            color: cargo.cor
          }, children: cargo.nome }) }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-muted-foreground", children: m.turnoNome }),
          /* @__PURE__ */ jsxs("td", { className: "px-4 py-3", children: [
            m.dispositivo === "verificado" && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 text-xs text-turno-700", children: [
              /* @__PURE__ */ jsx(ShieldCheck, { className: "h-3.5 w-3.5" }),
              " Verificado"
            ] }),
            m.dispositivo === "inativo" && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 text-xs text-destructive", children: [
              /* @__PURE__ */ jsx(UserX, { className: "h-3.5 w-3.5" }),
              " Inativo"
            ] }),
            m.dispositivo === "pendente" && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 text-xs text-amber-700", children: [
              /* @__PURE__ */ jsx(ShieldAlert, { className: "h-3.5 w-3.5" }),
              " Pendente"
            ] }),
            m.dispositivo === "convite" && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsx(Smartphone, { className: "h-3.5 w-3.5" }),
              " Convite enviado"
            ] })
          ] }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", onClick: () => setEditarId(m.id), children: "Editar" }) })
        ] }, m.id);
      }) })
    ] }) }),
    /* @__PURE__ */ jsx(Dialog, { open: convidarOpen, onOpenChange: setConvidarOpen, children: /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: "Convidar membro" }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "Gere um link de convite para enviar por e-mail ou WhatsApp." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxs(Label, { children: [
            "Nome ",
            /* @__PURE__ */ jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsx(Input, { value: novoNome, onChange: (e) => setNovoNome(e.target.value), placeholder: "Nome completo" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { children: "E-mail" }),
            /* @__PURE__ */ jsx(Input, { type: "email", value: novoEmail, onChange: (e) => setNovoEmail(e.target.value) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { children: "WhatsApp" }),
            /* @__PURE__ */ jsx(Input, { value: novoWhats, onChange: (e) => setNovoWhats(formatWhatsapp(e.target.value)), placeholder: WHATSAPP_PLACEHOLDER, maxLength: WHATSAPP_MAX_LENGTH, inputMode: "tel" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxs(Label, { children: [
              "Cargo ",
              /* @__PURE__ */ jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxs(Select, { value: novoCargo, onValueChange: setNovoCargo, children: [
              /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsx(SelectItem, { value: "none", children: "Selecione" }),
                cargos.map((c) => /* @__PURE__ */ jsx(SelectItem, { value: c.id, children: c.nome }, c.id))
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { children: "Turno" }),
            /* @__PURE__ */ jsxs(Select, { value: novoTurno, onValueChange: setNovoTurno, children: [
              /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsx(SelectContent, { children: TURNOS_OPCOES.map((t) => /* @__PURE__ */ jsx(SelectItem, { value: t, children: t }, t)) })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => setConvidarOpen(false), children: "Cancelar" }),
        /* @__PURE__ */ jsx(Button, { className: "bg-turno-600 hover:bg-turno-700", onClick: salvarConvite, disabled: adicionarMembro.isPending, children: adicionarMembro.isPending ? "Gerando..." : "Gerar convite" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Dialog, { open: adicionarOpen, onOpenChange: setAdicionarOpen, children: /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: "Adicionar membro" }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "Cadastro manual. O membro entra direto como ativo." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxs(Label, { children: [
            "Nome ",
            /* @__PURE__ */ jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsx(Input, { value: novoNome, onChange: (e) => setNovoNome(e.target.value), placeholder: "Nome completo" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { children: "E-mail" }),
            /* @__PURE__ */ jsx(Input, { type: "email", value: novoEmail, onChange: (e) => setNovoEmail(e.target.value) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { children: "WhatsApp" }),
            /* @__PURE__ */ jsx(Input, { value: novoWhats, onChange: (e) => setNovoWhats(formatWhatsapp(e.target.value)), placeholder: WHATSAPP_PLACEHOLDER, maxLength: WHATSAPP_MAX_LENGTH, inputMode: "tel" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxs(Label, { children: [
              "Cargo ",
              /* @__PURE__ */ jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxs(Select, { value: novoCargo, onValueChange: setNovoCargo, children: [
              /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsx(SelectItem, { value: "none", children: "Selecione" }),
                cargos.map((c) => /* @__PURE__ */ jsx(SelectItem, { value: c.id, children: c.nome }, c.id))
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { children: "Turno" }),
            /* @__PURE__ */ jsxs(Select, { value: novoTurno, onValueChange: setNovoTurno, children: [
              /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsx(SelectContent, { children: TURNOS_OPCOES.map((t) => /* @__PURE__ */ jsx(SelectItem, { value: t, children: t }, t)) })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => setAdicionarOpen(false), children: "Cancelar" }),
        /* @__PURE__ */ jsx(Button, { className: "bg-turno-600 hover:bg-turno-700", onClick: salvarManual, disabled: adicionarMembro.isPending, children: adicionarMembro.isPending ? "Salvando..." : "Concluir" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Dialog, { open: !!linkConvite, onOpenChange: (o) => !o && setLinkConvite(null), children: /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: "Convite criado" }),
        /* @__PURE__ */ jsxs(DialogDescription, { children: [
          "Envie este link para ",
          /* @__PURE__ */ jsx("strong", { children: emailConvite }),
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Input, { readOnly: true, value: linkConvite ?? "", onFocus: (e) => e.currentTarget.select() }),
        /* @__PURE__ */ jsx(Button, { variant: "outline", size: "icon", onClick: async () => {
          if (!linkConvite) return;
          await navigator.clipboard.writeText(linkConvite);
          setCopiado(true);
          toast.success("Link copiado");
        }, children: copiado ? /* @__PURE__ */ jsx(Check, { className: "h-4 w-4 text-emerald-600" }) : /* @__PURE__ */ jsx(Copy, { className: "h-4 w-4" }) })
      ] }),
      /* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsx(Button, { className: "bg-turno-600 hover:bg-turno-700", onClick: () => setLinkConvite(null), children: "Fechar" }) })
    ] }) }),
    /* @__PURE__ */ jsx(Dialog, { open: !!editando, onOpenChange: (o) => !o && setEditarId(null), children: /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: "Editar membro" }),
        /* @__PURE__ */ jsxs(DialogDescription, { children: [
          editando?.nome,
          " · ",
          editando?.email
        ] })
      ] }),
      editando && equipe_id && /* @__PURE__ */ jsx(EditarMembroForm, { membro: editando, cargos, onSalvar: async (patch) => {
        try {
          await atualizarMembro.mutateAsync({
            id: editando.id,
            equipe_id,
            patch
          });
          toast.success("Membro atualizado");
          setEditarId(null);
        } catch (e) {
          toast.error(e.message);
        }
      }, onExcluir: () => {
        setExcluirId(editando.id);
        setEditarId(null);
      } })
    ] }) }),
    /* @__PURE__ */ jsx(AlertDialog, { open: !!excluirId, onOpenChange: (o) => !o && setExcluirId(null), children: /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsx(AlertDialogTitle, { children: "Excluir membro?" }),
        /* @__PURE__ */ jsx(AlertDialogDescription, { children: "Remove o membro da equipe. Não pode ser desfeito." })
      ] }),
      /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsx(AlertDialogCancel, { children: "Cancelar" }),
        /* @__PURE__ */ jsx(AlertDialogAction, { onClick: async () => {
          if (excluirId && equipe_id) {
            try {
              await excluirMembro.mutateAsync({
                id: excluirId,
                equipe_id
              });
              toast.success("Membro excluído");
            } catch (e) {
              toast.error(e.message);
            }
          }
          setExcluirId(null);
        }, children: "Excluir" })
      ] })
    ] }) })
  ] });
}
function EditarMembroForm({
  membro,
  cargos,
  onSalvar,
  onExcluir
}) {
  const [cargoId, setCargoId] = useState(membro.cargoId ?? "none");
  const [turno, setTurno] = useState(membro.turnoNome);
  const [ativo, setAtivo] = useState(membro.dispositivo !== "inativo");
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsx(Label, { children: "Cargo" }),
      /* @__PURE__ */ jsxs(Select, { value: cargoId, onValueChange: setCargoId, children: [
        /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
        /* @__PURE__ */ jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsx(SelectItem, { value: "none", children: "Sem cargo" }),
          cargos.map((c) => /* @__PURE__ */ jsx(SelectItem, { value: c.id, children: c.nome }, c.id))
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsx(Label, { children: "Turno" }),
      /* @__PURE__ */ jsxs(Select, { value: turno, onValueChange: setTurno, children: [
        /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
        /* @__PURE__ */ jsx(SelectContent, { children: TURNOS_OPCOES.map((t) => /* @__PURE__ */ jsx(SelectItem, { value: t, children: t }, t)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-4 rounded-lg border p-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "text-sm font-medium", children: "Membro ativo" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Ao desativar, o membro perde acesso imediato." })
      ] }),
      /* @__PURE__ */ jsx(Switch, { checked: ativo, onCheckedChange: setAtivo })
    ] }),
    /* @__PURE__ */ jsxs(DialogFooter, { className: "!justify-between", children: [
      /* @__PURE__ */ jsxs(Button, { variant: "destructive", onClick: onExcluir, children: [
        /* @__PURE__ */ jsx(Trash2, { className: "mr-1 h-4 w-4" }),
        " Excluir"
      ] }),
      /* @__PURE__ */ jsx(Button, { className: "bg-turno-600 hover:bg-turno-700", onClick: () => {
        const novoStatus = ativo ? membro.dispositivo === "inativo" ? "verificado" : membro.dispositivo : "inativo";
        onSalvar({
          cargo_id: cargoId === "none" ? null : cargoId,
          turno_nome: turno,
          dispositivo: novoStatus
        });
      }, children: "Salvar" })
    ] })
  ] });
}
export {
  Membros as component
};
