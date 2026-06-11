import { createServerFn } from "@tanstack/react-start";
import Stripe from "stripe";

const getStripe = () => {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY não definida");
  return new Stripe(key, { apiVersion: "2026-05-27.dahlia" });
};

export const createCheckoutSession = createServerFn({ method: "POST" })
  .handler(async (ctx) => {
   const data = ctx.data as unknown as { priceKey: string };
    const stripe = getStripe();

    const prices = await stripe.prices.list({
      lookup_keys: [data.priceKey],
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