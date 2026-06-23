import { Y as reactExports, P as jsxRuntimeExports } from "./server-AHFj_Bgy-gsoihpy4-CbyuSDu4-Ble6ghI2-BbTWyedm-DMY4rmEE.js";
import { u as useNavigate } from "./router-BfE_NWn3-LgtRmdPD-C07lmE3T-BBvol4Fb-CaQxh4DF-DI3ZXuwt.js";
import { C as Card } from "./card-RGlIzTYo-B34J4GZ4-DDQrq4Oi-Dj_b9Mln-RljLwUmW-B7Ze6dPL.js";
import { B as Button } from "./button-DA2gxxPy-CUtl2pTC-ErPINpYe-DKbncp_B-Tad0GHuE-BV1-pB3e.js";
import { L as Logo } from "./Logo-Cu4L5Ikj-BM_o3fNJ-BLDDCtNi-ox367wn0-BPutXCDV-h8EAksnZ.js";
import { t as toast } from "./index-v-vtUMd9-C3Q0HLzL-DoO4nzZW-Cw9fb2Zp-eT4KzRbZ.js";
import { s as supabase } from "./client-BDUtUdlc-BgkiGMRQ-BFQ4tIWJ-OPLCuHla-DDf4-v7v-Dm7zLGxE.js";
import { L as LoaderCircle } from "./loader-circle-Tdb4du6C-Dj2D0HP--BlCE9rBb-43AU7_Qy-DX38fdIF.js";
import { S as ShieldCheck } from "./shield-check-CYxVQaLx-B98wjwdS-zm5Rxoi--Jg6h1v2M-BMmKI_ru.js";
import "./createLucideIcon-DtALbmVw-CBqAgreN-Bp4R2JQA-DhYh3WUG-C9iE_qXX.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./stripe.esm.worker-BZ5uBE48-BZ5uBE48-BZ5uBE48-BZ5uBE48-BZ5uBE48.js";
import "./index-BlRNeFf7-93iW_Z4T-93iW_Z4T-93iW_Z4T-93iW_Z4T.js";
import "./utils-H80jjgLf-8RO4xBwZ-8RO4xBwZ-8RO4xBwZ-8RO4xBwZ-8RO4xBwZ.js";
import "./index-QcqZe4R0-BtpN0_mD-B-IZFptm-RV47Io5--BsvVBnmG.js";
function Confirmar() {
  const navigate = useNavigate();
  const [loading, setLoading] = reactExports.useState(true);
  const [confirmando, setConfirmando] = reactExports.useState(false);
  const [equipeNome, setEquipeNome] = reactExports.useState(null);
  const [filialNome, setFilialNome] = reactExports.useState(null);
  const [equipeId, setEquipeId] = reactExports.useState(null);
  const [erro, setErro] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const invite = params.get("invite");
    if (!invite) {
      setErro("Link de convite inválido.");
      setLoading(false);
      return;
    }
    supabase.from("equipes").select("id, nome, filiais(nome)").eq("id", invite).single().then(({
      data,
      error
    }) => {
      if (error || !data) {
        setErro("Convite não encontrado ou expirado.");
      } else {
        setEquipeId(data.id);
        setEquipeNome(data.nome);
        setFilialNome(data.filiais?.nome ?? null);
      }
      setLoading(false);
    });
  }, []);
  const confirmar = async () => {
    if (!equipeId) return;
    setConfirmando(true);
    try {
      const {
        data: {
          session
        }
      } = await supabase.auth.getSession();
      if (!session) {
        sessionStorage.setItem("convite_equipe_id", equipeId);
        navigate({
          to: "/login"
        });
        return;
      }
      const user_id = session.user.id;
      const {
        error
      } = await supabase.from("membros_equipe").upsert({
        user_id,
        equipe_id: equipeId,
        dispositivo: "verificado"
      }, {
        onConflict: "user_id,equipe_id"
      });
      if (error) throw error;
      const {
        data: equipe
      } = await supabase.from("equipes").select("filial_id").eq("id", equipeId).single();
      if (equipe?.filial_id) {
        await supabase.from("membros_filial").upsert({
          user_id,
          filial_id: equipe.filial_id,
          papel: "colaborador"
        }, {
          onConflict: "user_id,filial_id"
        });
        await supabase.from("profiles").update({
          filial_ativa_id: equipe.filial_id
        }).eq("user_id", user_id);
      }
      toast.success("Acesso confirmado! Bem-vindo à equipe.");
      navigate({
        to: "/app"
      });
    } catch (e) {
      toast.error(e.message || "Erro ao confirmar acesso");
      setConfirmando(false);
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-turno-600" }) });
  }
  if (erro) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-muted/40 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "w-full max-w-md p-7 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-6 text-xl font-medium text-destructive", children: "Convite inválido" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: erro }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "mt-6 w-full bg-turno-600 hover:bg-turno-700", onClick: () => navigate({
        to: "/login"
      }), children: "Ir para o login" })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-muted/40 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "w-full max-w-md p-7 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-6 text-xl font-medium", children: "Você foi convidado!" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Confirme para entrar na equipe abaixo." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-col items-center gap-2 rounded-lg border bg-muted/30 p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-base font-medium", children: equipeNome }),
      filialNome && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: filialNome })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 inline-flex items-center gap-1.5 text-xs text-turno-700", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3.5 w-3.5" }),
      " Este dispositivo será vinculado à sua conta."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "flex-1", onClick: () => navigate({
        to: "/login"
      }), children: "Cancelar" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "flex-1 bg-turno-600 hover:bg-turno-700", onClick: confirmar, disabled: confirmando, children: confirmando ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-1.5 h-4 w-4 animate-spin" }),
        " Confirmando..."
      ] }) : "Confirmar e entrar" })
    ] })
  ] }) });
}
export {
  Confirmar as component
};
