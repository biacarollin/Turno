import { jsxs, jsx } from "react/jsx-runtime";
import { N as Navbar, F as Footer } from "./Footer-_pBn2itB.js";
import "react";
import "lucide-react";
import "./Logo-D1BtzRXO.js";
import "@tanstack/react-router";
function Privacidade() {
  return /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen flex-col bg-primary", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("main", { className: "flex-1 px-4 pt-32 pb-20 md:px-6", children: /* @__PURE__ */ jsxs("article", { className: "mx-auto max-w-3xl rounded-2xl bg-white p-8 md:p-12 prose prose-slate", children: [
      /* @__PURE__ */ jsx("h1", { children: "Política de Privacidade" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Última atualização: 26 de maio de 2026" }),
      /* @__PURE__ */ jsx("h2", { children: "1. Quais dados coletamos" }),
      /* @__PURE__ */ jsx("p", { children: "Coletamos dados de cadastro (nome, email, CPF), dados de uso do aplicativo (turnos, ocorrências, passagens) e dados de pagamento processados por nossos parceiros (não armazenamos dados de cartão)." }),
      /* @__PURE__ */ jsx("h2", { children: "2. Como usamos seus dados" }),
      /* @__PURE__ */ jsx("p", { children: "Usamos os dados para prestar o serviço, autenticar usuários, processar pagamentos, gerar relatórios da própria organização e melhorar o produto. Não vendemos dados a terceiros." }),
      /* @__PURE__ */ jsx("h2", { children: "3. Compartilhamento" }),
      /* @__PURE__ */ jsx("p", { children: "Compartilhamos dados apenas com provedores de infraestrutura, pagamento e comunicação estritamente necessários ao funcionamento do serviço." }),
      /* @__PURE__ */ jsx("h2", { children: "4. Seus direitos (LGPD)" }),
      /* @__PURE__ */ jsx("p", { children: "Você pode solicitar acesso, correção, portabilidade ou exclusão dos seus dados a qualquer momento, em contato@turno.app." }),
      /* @__PURE__ */ jsx("h2", { children: "5. Segurança" }),
      /* @__PURE__ */ jsx("p", { children: "Os dados são armazenados em servidores com criptografia em trânsito e em repouso. Acesso interno é restrito por princípio do menor privilégio." }),
      /* @__PURE__ */ jsx("h2", { children: "6. Contato" }),
      /* @__PURE__ */ jsx("p", { children: "Dúvidas sobre privacidade: privacidade@turno.app" })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  Privacidade as component
};
