import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { createCheckoutSession } from "@/lib/checkout";

export const Route = createFileRoute("/test-checkout")({
  component: TestCheckout,
});

const PRICE_KEYS = [
  "basico_mensal",
  "basico_anual",
  "equipe_mensal",
  "equipe_anual",
  "profissional_mensal",
  "profissional_anual",
];

function TestCheckout() {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleClick(priceKey: string) {
    setLoading(priceKey);
    setError(null);
    try {
      const result = await createCheckoutSession({
        data: { priceKey } as never,
      });
      if (result?.url) {
        window.location.href = result.url;
      } else {
        setError("Sem URL retornada");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1>Teste de Checkout Stripe</h1>
      {error && <p style={{ color: "red" }}>Erro: {error}</p>}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 300 }}>
        {PRICE_KEYS.map((key) => (
          <button
            key={key}
            onClick={() => handleClick(key)}
            disabled={loading === key}
            style={{ padding: 12, cursor: "pointer" }}
          >
            {loading === key ? "Aguarde..." : key}
          </button>
        ))}
      </div>
    </div>
  );
}