import { Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { createCheckoutSession } from "@/lib/checkout";

type Plan = {
  name: string;
  tagline: string;
  priceMonthly: string;
  priceAnnual: string;
  priceAnnualFull: string;
  annualEquivalent: string;
  seats: string;
  features: string[];
  cta: string;
  popular?: boolean;
  priceKeyMonthly?: string;
  priceKeyAnnual?: string;
};

const plans: Plan[] = [
  {
    name: "Grátis",
    tagline: "Para conhecer o produto",
    priceMonthly: "0",
    priceAnnual: "0",
    priceAnnualFull: "0",
    annualEquivalent: "0",
    seats: "Até 3 membros",
    features: ["1 equipe", "Até 5 membros", "Log de ocorrências", "Chat com IA"],
    cta: "Começar grátis",
  },
  {
    name: "Básico",
    tagline: "Para equipes pequenas",
    priceMonthly: "69",
    priceAnnual: "684",
    priceAnnualFull: "828",
    annualEquivalent: "57",
    seats: "Até 8 membros",
    features: ["3 equipes", "Até 20 membros", "Assinatura digital", "Histórico completo", "Chat com IA"],
    cta: "Começar trial",
    priceKeyMonthly: "basico_mensal",
    priceKeyAnnual: "basico_anual",
  },
  {
    name: "Equipe",
    tagline: "O mais escolhido",
    priceMonthly: "159",
    priceAnnual: "1.584",
    priceAnnualFull: "1.908",
    annualEquivalent: "132",
    seats: "Até 20 membros",
    features: [
      "Equipes ilimitadas",
      "Até 80 membros",
      "Assinatura digital",
      "Resumo por IA",
      "Painel do gestor",
      "Notas privadas",
      "Chat com IA",
    ],
    cta: "Começar trial",
    popular: true,
    priceKeyMonthly: "equipe_mensal",
    priceKeyAnnual: "equipe_anual",
  },
  {
    name: "Profissional",
    tagline: "Para operações complexas",
    priceMonthly: "289",
    priceAnnual: "2.880",
    priceAnnualFull: "3.468",
    annualEquivalent: "240",
    seats: "Até 50 membros",
    features: ["Multi-filial", "Membros ilimitados", "Alertas de IA", "Exportação PDF", "Relatórios avançados", "Suporte prioritário"],
    cta: "Começar trial",
    priceKeyMonthly: "profissional_mensal",
    priceKeyAnnual: "profissional_anual",
  },
];

export function PricingSection() {
  const [annual, setAnnual] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  async function handleCheckout(plan: Plan) {
    const priceKey = annual ? plan.priceKeyAnnual : plan.priceKeyMonthly;
    if (!priceKey) return;

    setLoadingPlan(plan.name);
    try {
      const result = await createCheckoutSession({
        data: { priceKey } as never,
      });
      if (result?.url) {
        window.location.href = result.url;
      }
    } catch (err) {
      console.error("Erro ao iniciar checkout:", err);
    } finally {
      setLoadingPlan(null);
    }
  }

  return (
    <section id="precos" className="w-full bg-gray-50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-xl text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[2px] text-app-600">
            Preços
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Simples e transparente
          </h2>
          <p className="mt-3 text-gray-600">
            Comece grátis. 7 dias de trial em todos os planos pagos.
          </p>

          <div className="mt-8 inline-flex items-center gap-1 rounded-full bg-gray-200 p-1">
            <button
              type="button"
              onClick={() => setAnnual(false)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                !annual ? "bg-white text-gray-900 shadow-sm" : "text-gray-600"
              }`}
            >
              Mensal
            </button>
            <button
              type="button"
              onClick={() => setAnnual(true)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                annual ? "bg-white text-gray-900 shadow-sm" : "text-gray-600"
              }`}
            >
              Anual −17%
            </button>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => {
            const gratis = plan.priceMonthly === "0";
            return (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-2xl p-6 ${
                  plan.popular
                    ? "border-2 border-app-500 bg-app-900"
                    : "border border-gray-200 bg-white"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-app-500 px-3.5 py-1 text-[11px] font-semibold text-white">
                    Mais escolhido
                  </span>
                )}

                <h3 className={`text-[11px] font-semibold uppercase tracking-wide ${plan.popular ? "text-app-400" : "text-gray-500"}`}>
                  {plan.name}
                </h3>

                <div className="mt-3 flex items-baseline gap-1">
                  <span className={`text-4xl font-extrabold tracking-tight ${plan.popular ? "text-white" : "text-gray-900"}`}>
                    R${gratis ? "0" : annual ? plan.priceAnnual : plan.priceMonthly}
                  </span>
                  <span className={`text-sm ${plan.popular ? "text-app-400" : "text-gray-500"}`}>
                    {gratis ? "/mês" : annual ? "/ano" : "/mês"}
                  </span>
                </div>
                <p className={`mt-2 text-xs ${plan.popular ? "text-app-400" : "text-gray-500"}`}>{plan.tagline}</p>

                <div className={`my-5 h-px ${plan.popular ? "bg-app-700" : "bg-gray-200"}`} />

                <ul className="flex flex-1 flex-col gap-2.5">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className={`flex items-start gap-2 text-xs ${plan.popular ? "text-app-200" : "text-gray-700"}`}
                    >
                      <Check className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${plan.popular ? "text-app-400" : "text-app-600"}`} />
                      {f}
                    </li>
                  ))}
                </ul>

                {gratis ? (
                  <Link
                    to="/login"
                    className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-gray-100 px-4 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-200"
                  >
                    {plan.cta}
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleCheckout(plan)}
                    disabled={loadingPlan === plan.name}
                    className={`mt-6 inline-flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${
                      plan.popular
                        ? "bg-app-500 text-white hover:bg-app-400"
                        : "bg-gray-900 text-white hover:bg-gray-800"
                    }`}
                  >
                    {loadingPlan === plan.name ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Aguarde...
                      </>
                    ) : (
                      plan.cta
                    )}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-center text-sm text-gray-600">
          Enterprise com SLA e suporte dedicado.{" "}
          <Link to="/contato" className="font-semibold text-app-600 hover:underline">
            Fale com a gente
          </Link>
        </p>
      </div>
    </section>
  );
}
