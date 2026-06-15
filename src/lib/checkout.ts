import { createServerFn } from "@tanstack/react-start";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createCheckoutSession = createServerFn({ method: "POST" }).handler(async (ctx: any) => {
  const priceKey = ctx?.data?.priceKey as string | undefined;

  if (!priceKey || typeof priceKey !== "string") {
    throw new Error("priceKey inválido");
  }

  const { default: Stripe } = await import("stripe");

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY não definida");

  const stripe = new Stripe(key);

  const prices = await stripe.prices.list({
    lookup_keys: [priceKey],
  });

  if (!prices.data.length) {
    throw new Error("Plano não encontrado");
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: prices.data[0].id, quantity: 1 }],
    subscription_data: { trial_period_days: 7 },
    success_url: `https://turnoai.com.br/app?checkout=success`,
    cancel_url: `https://turnoai.com.br/precos?checkout=cancelled`,
    locale: "pt-BR",
  });

  return { url: session.url };
});