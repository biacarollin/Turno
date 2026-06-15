import { Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { createCheckoutSession } from "@/lib/checkout";

type Plan = {
  name: string;
  badge?: string;
  priceMonthly: string;
  priceAnnual: string;
  priceAnnualFull: string;
  annualEquivalent: string;
  seats: string;
  features: string[];
  cta: string;
  popular?: boolean;
  enterprise?: boolean;
  priceKeyMonthly?: string;
  priceKeyAnnual?: string;
};

const plans: Plan[] = [
  {
    name: "Grátis",
    priceMonthly: "0",
    priceAnnual: "0",
    priceAnnualFull: "0",
    annualEquivalent: "0",
    seats: "Até 3 membros",
    features: [
      "Passagens de turno",
      "Histórico 7 dias",
      "App mobile + painel web",
    ],
    cta: "Começar grátis",
  },
  {
    name: "Básico",
    priceMonthly: "69",
    priceAnnual: "684",
    priceAnnualFull: "828",
    annualEquivalent: "57",
    seats: "Até 8 membros",
    features: [
      "Tudo do Grátis +",
      "Resumo IA ao encerrar turno",
      "Assinatura digital",
      "Histórico 90 dias",
    ],
    cta: "Testar 7 dias grátis",
    priceKeyMonthly: "basico_mensal",
    priceKeyAnnual: "basico_anual",
  },
  {
    name: "Equipe",
    badge: "Mais popular",
    priceMonthly: "159",
    priceAnnual: "1.584",
    priceAnnualFull: "1.908",
    annualEquivalent: "132",
    seats: "Até 20 membros",
    features: [
      "Tudo do Básico +",
      "Análises por IA",
      "Histórico 1 ano",
      "Notas privadas do gestor",
    ],
    cta: "Testar 7 dias grátis",
    popular: true,
    priceKeyMonthly: "equipe_mensal",
    priceKeyAnnual: "equipe_anual",
  },
  {
    name: "Profissional",
    priceMonthly: "289",
    priceAnnual: "2.880",
    priceAnnualFull: "3.468",
    annualEquivalent: "240",
    seats: "Até 50 membros",
    features: [
      "Tudo do Equipe +",
      "Multi-unidade (até 5)",
      "Exportação em PDF",
      "Relatórios avançados",
      "Histórico ilimitado",
    ],
    cta: "Testar 7 dias grátis",
    priceKeyMonthly: "profissional_mensal",
    priceKeyAnnual: "profissional_anual",
  },
  {
    name: "Enterprise",
    badge: "Enterprise",
    priceMonthly: "Sob",
    priceAnnual: "Sob",
    priceAnnualFull: "0",
    annualEquivalent: "0",
    seats: "Acima de 50 membros",
    features: [
      "Tudo do Profissional +",
      "Multi-unidade ilimitada",
      "SSO corporativo",
      "Onboarding dedicado",
      "SLA contratual",
    ],
    cta: "Falar com a equipe",
    enterprise: true,
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
    <section id="precos" className="w-full bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-[2.5rem]">
            Preços simples, sem surpresa
          </h2>
          <p className="mt-3 text-muted-foreground">
            Para equipes de qualquer tamanho. Cancele quando quiser.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-turno-200 bg-turno-50 px-4 py-2 text-sm text-turno-600">
            <span className="h-2 w-2 rounded-full bg-turno-400" />
            Chat IA incluído em todos os planos
          </div>

          <div className="mt-6 inline-flex items-center gap-3">
            <span className={`text-sm ${!annual ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
              Mensal
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={annual}
              onClick={() => setAnnual((v) => !v)}
              className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors ${
                annual ? "bg-turno-500" : "bg-muted"
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition-transform ${
                  annual ? "translate-x-[1.375rem]" : "translate-x-0.5"
                }`}
              />
            </button>
            <span className={`text-sm ${annual ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
              Anual{" "}
              <span className="ml-1 rounded-full bg-turno-100 px-2 py-0.5 text-xs text-turno-700">
                17% OFF
              </span>
            </span>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-7 ${
                plan.popular
                  ? "border-2 border-primary bg-card shadow-lg"
                  : plan.enterprise
                  ? "border-turno-200 bg-turno-50"
                  : "border-border bg-card"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-6 inline-flex items-center rounded-full bg-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                  {plan.badge}
                </span>
              )}

              <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>

              {plan.enterprise ? (
                <div className="mt-4">
                  <span className="text-2xl font-semibold text-foreground">Sob consulta</span>
                </div>
              ) : plan.priceMonthly === "0" ? (
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-semibold tracking-tight text-foreground">R$0</span>
                  <span className="text-sm text-muted-foreground">/mês</span>
                </div>
              ) : annual ? (
                <div className="mt-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm font-medium text-foreground">R$</span>
                    <span className="text-4xl font-semibold tracking-tight text-foreground">
                      {plan.priceAnnual}
                    </span>
                    <span className="text-sm text-muted-foreground">/ano</span>
                  </div>
                  <p className="mt-1 text-xs text-turno-600">
                    <s className="text-muted-foreground opacity-60">R${plan.priceAnnualFull}</s>{" "}
                    17% OFF
                  </p>
                  <span className="mt-1 inline-block rounded-md bg-turno-50 px-2 py-0.5 text-[11px] text-turno-700">
                    R${plan.annualEquivalent}/mês equivalente
                  </span>
                </div>
              ) : (
                <div className="mt-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm font-medium text-foreground">R$</span>
                    <span className="text-4xl font-semibold tracking-tight text-foreground">
                      {plan.priceMonthly}
                    </span>
                    <span className="text-sm text-muted-foreground">/mês</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">Cancele quando quiser</p>
                </div>
              )}

              <p className="mt-1 text-xs text-muted-foreground">{plan.seats}</p>

              <ul className="mt-6 flex flex-col gap-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/80">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-turno-500" />
                    {f}
                  </li>
                ))}
              </ul>

              {plan.enterprise ? (
                <Link
                  to="/contato"
                  className="mt-8 inline-flex w-full items-center justify-center rounded-full border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  {plan.cta}
                </Link>
              ) : plan.priceMonthly === "0" ? (
                <Link
                  to="/login"
                  className="mt-8 inline-flex w-full items-center justify-center rounded-full border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  {plan.cta}
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => handleCheckout(plan)}
                  disabled={loadingPlan === plan.name}
                  className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-4 py-2.5 text-sm font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${
                    plan.popular
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "border border-border bg-background text-foreground hover:bg-muted"
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
          ))}
        </div>
      </div>
    </section>
  );
}