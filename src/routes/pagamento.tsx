import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/landing/Logo";
import { ShieldCheck, Check } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/pagamento")({
  component: Pagamento,
  head: () => ({ meta: [{ title: "Pagamento · Turno" }] }),
});

function Pagamento() {
  const navigate = useNavigate();
  const [plano, setPlano] = useState<"trial" | "gratuito">("trial");

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-10">
      <Card className="w-full max-w-lg p-7">
        <div className="flex justify-center"><Logo /></div>
        <h1 className="mt-6 text-center text-xl font-medium">Quase lá</h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">
          Escolha como começar. Você pode trocar de plano depois.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <PlanoCard
            ativo={plano === "trial"}
            onClick={() => setPlano("trial")}
            titulo="7 dias grátis"
            descricao="Todos os recursos. Cobrança automática após o período de teste."
            badge="Recomendado"
          />
          <PlanoCard
            ativo={plano === "gratuito"}
            onClick={() => setPlano("gratuito")}
            titulo="Plano gratuito"
            descricao="Limitado a 3 membros e funcionalidades básicas. Sem cartão."
          />
        </div>

        {plano === "trial" ? (
          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Cadastro concluído!");
              navigate({ to: "/app" });
            }}
          >
            <div className="space-y-1.5">
              <Label htmlFor="num">Número do cartão</Label>
              <Input id="num" inputMode="numeric" placeholder="0000 0000 0000 0000" required />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="val">Validade</Label>
                <Input id="val" placeholder="MM/AA" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" inputMode="numeric" placeholder="123" required />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="titular">Nome no cartão</Label>
              <Input id="titular" required />
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-turno-600" />
              Não será cobrado durante o período de teste.
            </div>
            <Button type="submit" className="w-full bg-turno-600 hover:bg-turno-700">
              Começar teste grátis
            </Button>
          </form>
        ) : (
          <div className="mt-6 space-y-4">
            <ul className="space-y-2 text-sm">
              {["Até 3 membros", "Passagens de turno", "App mobile"].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-turno-600" /> {f}
                </li>
              ))}
            </ul>
            <Button
              className="w-full bg-turno-600 hover:bg-turno-700"
              onClick={() => {
                toast.success("Conta criada no plano gratuito!");
                navigate({ to: "/app" });
              }}
            >
              Continuar no plano gratuito
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}

function PlanoCard({
  ativo,
  onClick,
  titulo,
  descricao,
  badge,
}: {
  ativo: boolean;
  onClick: () => void;
  titulo: string;
  descricao: string;
  badge?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative rounded-lg border p-4 text-left transition-colors ${
        ativo ? "border-turno-600 bg-turno-50" : "border-border hover:bg-muted/40"
      }`}
    >
      {badge && (
        <span className="absolute -top-2 right-3 rounded-full bg-turno-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
          {badge}
        </span>
      )}
      <div className="text-sm font-medium">{titulo}</div>
      <p className="mt-1 text-xs text-muted-foreground">{descricao}</p>
    </button>
  );
}