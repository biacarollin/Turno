import { QueryClientProvider, useQueryClient, QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, useRouter, Link, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { s as supabase } from "./client-BDUtUdlc.js";
import "@supabase/supabase-js";
const appCss = "/assets/styles-BUAnDWh-.css";
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Página não encontrada" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "A página que você está procurando não existe ou foi movida." }),
    /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Voltar ao início"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  const router = useRouter();
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "Algo deu errado" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Ocorreu um erro inesperado. Tente novamente ou volte ao início." }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Tentar novamente"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Voltar ao início"
        }
      )
    ] })
  ] }) });
}
const Route$k = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Turno · Gestão de turnos inteligente" },
      { name: "description", content: "Sistema digital de passagem de turno para equipes de trabalho em escala rotativa. Registre, acompanhe e nunca perca uma informação crítica." },
      { name: "author", content: "Turno" },
      { property: "og:title", content: "Turno · Gestão de turnos inteligente" },
      { property: "og:description", content: "Sistema digital de passagem de turno para equipes de trabalho em escala rotativa." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@turno" }
    ],
    links: [{ rel: "stylesheet", href: appCss }]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "pt-BR", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$k.useRouteContext();
  return /* @__PURE__ */ jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsx(AuthSync, {}),
    /* @__PURE__ */ jsx(Outlet, {})
  ] });
}
function AuthSync() {
  const router = useRouter();
  const qc = useQueryClient();
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "TOKEN_REFRESHED") {
        router.invalidate();
        qc.invalidateQueries();
      }
    });
    return () => subscription.unsubscribe();
  }, [router, qc]);
  return null;
}
const $$splitComponentImporter$j = () => import("./termos-DPZcwMW_.js");
const Route$j = createFileRoute("/termos")({
  component: lazyRouteComponent($$splitComponentImporter$j, "component"),
  head: () => ({
    meta: [{
      title: "Termos de Uso — Turno"
    }, {
      name: "description",
      content: "Termos e condições de uso do Turno."
    }]
  })
});
const $$splitComponentImporter$i = () => import("./suporte-CGRK3rZ2.js");
const Route$i = createFileRoute("/suporte")({
  component: lazyRouteComponent($$splitComponentImporter$i, "component"),
  head: () => ({
    meta: [{
      title: "Suporte — Turno"
    }, {
      name: "description",
      content: "Central de ajuda do Turno."
    }]
  })
});
const $$splitComponentImporter$h = () => import("./privacidade-Bv-94RB9.js");
const Route$h = createFileRoute("/privacidade")({
  component: lazyRouteComponent($$splitComponentImporter$h, "component"),
  head: () => ({
    meta: [{
      title: "Política de Privacidade — Turno"
    }, {
      name: "description",
      content: "Como o Turno trata seus dados."
    }]
  })
});
const $$splitComponentImporter$g = () => import("./pagamento-C8kDT57n.js");
const Route$g = createFileRoute("/pagamento")({
  component: lazyRouteComponent($$splitComponentImporter$g, "component"),
  head: () => ({
    meta: [{
      title: "Pagamento · Turno"
    }]
  })
});
const $$splitComponentImporter$f = () => import("./onboarding-Bx_M-eze.js");
const Route$f = createFileRoute("/onboarding")({
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./login-CfSJJh12.js");
const Route$e = createFileRoute("/login")({
  component: lazyRouteComponent($$splitComponentImporter$e, "component"),
  head: () => ({
    meta: [{
      title: "Entrar · Turno"
    }]
  })
});
const $$splitComponentImporter$d = () => import("./contato-DIdiUK_e.js");
const Route$d = createFileRoute("/contato")({
  component: lazyRouteComponent($$splitComponentImporter$d, "component"),
  head: () => ({
    meta: [{
      title: "Falar com a equipe — Turno"
    }, {
      name: "description",
      content: "Entre em contato com nossa equipe."
    }]
  })
});
const $$splitComponentImporter$c = () => import("./confirmar-D_b6ZnZN.js");
const Route$c = createFileRoute("/confirmar")({
  component: lazyRouteComponent($$splitComponentImporter$c, "component"),
  head: () => ({
    meta: [{
      title: "Confirmar acesso · Turno"
    }]
  })
});
const $$splitComponentImporter$b = () => import("./app-BROqMeya.js");
const Route$b = createFileRoute("/app")({
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./index-nP3_bxFD.js");
const Route$a = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./app.index-DKHFEdMd.js");
const Route$9 = createFileRoute("/app/")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./app.turnos-D0ggf3p1.js");
const Route$8 = createFileRoute("/app/turnos")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./app.plano-BTn4n1dT.js");
const Route$7 = createFileRoute("/app/plano")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./app.ocorrencias-DKo8u7zF.js");
const Route$6 = createFileRoute("/app/ocorrencias")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./app.notas-5TvsXgBX.js");
const Route$5 = createFileRoute("/app/notas")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./app.membros-DHn-zzbi.js");
const Route$4 = createFileRoute("/app/membros")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./app.historico-BxeH1qa4.js");
const Route$3 = createFileRoute("/app/historico")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./app.folgas-Cpp_siKB.js");
const Route$2 = createFileRoute("/app/folgas")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./app.configuracoes-CDUax1mT.js");
const Route$1 = createFileRoute("/app/configuracoes")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./app.cargos-DsYZ407S.js");
const Route = createFileRoute("/app/cargos")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const TermosRoute = Route$j.update({
  id: "/termos",
  path: "/termos",
  getParentRoute: () => Route$k
});
const SuporteRoute = Route$i.update({
  id: "/suporte",
  path: "/suporte",
  getParentRoute: () => Route$k
});
const PrivacidadeRoute = Route$h.update({
  id: "/privacidade",
  path: "/privacidade",
  getParentRoute: () => Route$k
});
const PagamentoRoute = Route$g.update({
  id: "/pagamento",
  path: "/pagamento",
  getParentRoute: () => Route$k
});
const OnboardingRoute = Route$f.update({
  id: "/onboarding",
  path: "/onboarding",
  getParentRoute: () => Route$k
});
const LoginRoute = Route$e.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$k
});
const ContatoRoute = Route$d.update({
  id: "/contato",
  path: "/contato",
  getParentRoute: () => Route$k
});
const ConfirmarRoute = Route$c.update({
  id: "/confirmar",
  path: "/confirmar",
  getParentRoute: () => Route$k
});
const AppRoute = Route$b.update({
  id: "/app",
  path: "/app",
  getParentRoute: () => Route$k
});
const IndexRoute = Route$a.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$k
});
const AppIndexRoute = Route$9.update({
  id: "/",
  path: "/",
  getParentRoute: () => AppRoute
});
const AppTurnosRoute = Route$8.update({
  id: "/turnos",
  path: "/turnos",
  getParentRoute: () => AppRoute
});
const AppPlanoRoute = Route$7.update({
  id: "/plano",
  path: "/plano",
  getParentRoute: () => AppRoute
});
const AppOcorrenciasRoute = Route$6.update({
  id: "/ocorrencias",
  path: "/ocorrencias",
  getParentRoute: () => AppRoute
});
const AppNotasRoute = Route$5.update({
  id: "/notas",
  path: "/notas",
  getParentRoute: () => AppRoute
});
const AppMembrosRoute = Route$4.update({
  id: "/membros",
  path: "/membros",
  getParentRoute: () => AppRoute
});
const AppHistoricoRoute = Route$3.update({
  id: "/historico",
  path: "/historico",
  getParentRoute: () => AppRoute
});
const AppFolgasRoute = Route$2.update({
  id: "/folgas",
  path: "/folgas",
  getParentRoute: () => AppRoute
});
const AppConfiguracoesRoute = Route$1.update({
  id: "/configuracoes",
  path: "/configuracoes",
  getParentRoute: () => AppRoute
});
const AppCargosRoute = Route.update({
  id: "/cargos",
  path: "/cargos",
  getParentRoute: () => AppRoute
});
const AppRouteChildren = {
  AppCargosRoute,
  AppConfiguracoesRoute,
  AppFolgasRoute,
  AppHistoricoRoute,
  AppMembrosRoute,
  AppNotasRoute,
  AppOcorrenciasRoute,
  AppPlanoRoute,
  AppTurnosRoute,
  AppIndexRoute
};
const AppRouteWithChildren = AppRoute._addFileChildren(AppRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AppRoute: AppRouteWithChildren,
  ConfirmarRoute,
  ContatoRoute,
  LoginRoute,
  OnboardingRoute,
  PagamentoRoute,
  PrivacidadeRoute,
  SuporteRoute,
  TermosRoute
};
const routeTree = Route$k._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router;
};
export {
  getRouter
};
