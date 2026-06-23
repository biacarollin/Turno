import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ?? ""
);

export const PLANS = {
  basico: {
    name: "Básico",
    priceMonthly: "basico_mensal",
    priceAnnual: "basico_anual",
    amount: { monthly: 6900, annual: 68400 },
  },
  equipe: {
    name: "Equipe",
    priceMonthly: "equipe_mensal",
    priceAnnual: "equipe_anual",
    amount: { monthly: 15900, annual: 158400 },
  },
  profissional: {
    name: "Profissional",
    priceMonthly: "profissional_mensal",
    priceAnnual: "profissional_anual",
    amount: { monthly: 28900, annual: 288000 },
  },
};