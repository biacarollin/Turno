import { createFileRoute } from "@tanstack/react-router";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const PRICE_KEY_TO_PLANO: Record<string, string> = {
  basico_mensal: "basico",
  basico_anual: "basico",
  equipe_mensal: "equipe",
  equipe_anual: "equipe",
  profissional_mensal: "profissional",
  profissional_anual: "profissional",
};

const PRICE_KEY_TO_PERIODO: Record<string, string> = {
  basico_mensal: "mensal",
  basico_anual: "anual",
  equipe_mensal: "mensal",
  equipe_anual: "anual",
  profissional_mensal: "mensal",
  profissional_anual: "anual",
};

function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error("Variáveis do Supabase não configuradas");
  }
  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY não definida");
  return new Stripe(key, { apiVersion: "2026-05-27.dahlia" });
}

export const Route = createFileRoute("/api/webhooks/stripe")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const stripe = getStripe();
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

        if (!webhookSecret) {
          return new Response("Webhook secret não configurado", { status: 500 });
        }

        const signature = request.headers.get("stripe-signature");
        if (!signature) {
          return new Response("Assinatura ausente", { status: 400 });
        }

        const body = await request.text();

        let event: Stripe.Event;
        try {
          event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);
        } catch (err) {
          console.error("Falha na verificação da assinatura do webhook:", err);
          return new Response("Assinatura inválida", { status: 400 });
        }

        const supabase = getSupabaseAdmin();

        try {
          switch (event.type) {
            case "checkout.session.completed": {
              const session = event.data.object as Stripe.Checkout.Session;
              const subscriptionId = session.subscription as string;
              const customerId = session.customer as string;
              const userId = session.client_reference_id;

              if (!userId || !subscriptionId) break;

              const subscription = await stripe.subscriptions.retrieve(subscriptionId);
              const priceId = subscription.items.data[0]?.price.id;
              const price = await stripe.prices.retrieve(priceId);
              const lookupKey = price.lookup_key ?? "";

              const plano = PRICE_KEY_TO_PLANO[lookupKey] ?? "gratis";
              const periodo = PRICE_KEY_TO_PERIODO[lookupKey] ?? "mensal";

              await supabase.from("assinaturas").upsert(
                {
                  user_id: userId,
                  stripe_customer_id: customerId,
                  stripe_subscription_id: subscriptionId,
                  stripe_price_id: priceId,
                  plano,
                  periodo,
                  status: subscription.status,
                  trial_end: subscription.trial_end
                    ? new Date(subscription.trial_end * 1000).toISOString()
                    : null,
                  current_period_end: new Date(
                    subscription.items.data[0].current_period_end * 1000
                  ).toISOString(),
                },
                { onConflict: "stripe_subscription_id" }
              );
              break;
            }

            case "customer.subscription.updated":
            case "customer.subscription.deleted": {
              const subscription = event.data.object as Stripe.Subscription;
              const priceId = subscription.items.data[0]?.price.id;
              const price = await stripe.prices.retrieve(priceId);
              const lookupKey = price.lookup_key ?? "";

              const plano = PRICE_KEY_TO_PLANO[lookupKey] ?? "gratis";
              const periodo = PRICE_KEY_TO_PERIODO[lookupKey] ?? "mensal";

              await supabase
                .from("assinaturas")
                .update({
                  plano,
                  periodo,
                  status: subscription.status,
                  current_period_end: new Date(
                    subscription.items.data[0].current_period_end * 1000
                  ).toISOString(),
                })
                .eq("stripe_subscription_id", subscription.id);
              break;
            }

            default:
              break;
          }
        } catch (err) {
          console.error("Erro ao processar evento do webhook:", err);
          return new Response("Erro interno", { status: 500 });
        }

        return new Response(JSON.stringify({ received: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});