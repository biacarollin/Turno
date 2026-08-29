import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { PageHeader } from "@/components/app/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ExternalLink, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { PLANOS, planoPor, type PlanoId } from "@/lib/plano";
import { useSession } from "@/hooks/use-session";
import { buscarAssinatura } from "@/lib/buscar-assinatura";
import { criarPortalStripe } from "@/lib/stripe-portal";
import { createCheckoutSession } from "@/lib/checkout";

export const Route = createFileRoute("/app/plano")({ component: Plano });

function Plano() {
  const navigate = useNavigate();
  const { data: sessao } = useSession();

  const { data: assinatura, isLoading } = useQuery({
    queryKey: ["assinatura"],
    queryFn: () => buscarAssinatura({ data: undefined as never }),
  });

  const planoAtivoId = (assinatura?.plano ?? "gratis") as PlanoId;
  const planoAtivo = planoPor(planoAtivoId);
  const isPago = planoAtivo.precoNumero > 0;
  const emTrial = assinatura?.status === "trialing";

  const totalMembros = (() => {
    const m = planoAtivo.membros.match(/\d+/);
    return m ? Number(m[0]) : 0;
  })();
  const usados = Math.min(2, totalMembros);
  const pct = totalMembros ? (usados / totalMembros) * 100 : 0;

  const portalMutation = useMutation({
    mutationFn: () => criarPortalStripe({ data: undefined as never }),
    onSuccess: (result) => {
      if (result?.url) window.location.href = result.url;
    },
    onError: () => toast.error("Não foi possível abrir o portal. Tente novamente."),
  });

  const checkoutMutation = useMutation({
    mutationFn: (priceKey: string) =>
      createCheckoutSession({ data: { priceKey } as never }),
    onSuccess: (result) => {
      if (result?.url) window.location.href = result.url;
    },
    onError: () => toast.error("Erro ao iniciar checkout. Tente novamente."),
  });

  const proximaCobranca = assinatura?.current_period_end
    ? new Date(assinatura.current_period_end).toLocaleDateString("pt-BR")
    : null;

  const trialEnd = assinatura?.trial_end
    ? new Date(assinatura.trial_end).toLocaleDateString("pt-BR")
    : null;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-turno-600" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <PageHeader
        title="Plano e faturamento"
        subtitle="Seu plano ativo, uso e gerenciamento de assinatura."
      />

      {/* Card do plano ativo */}
      <Card className="overflow-hidden rounded-2xl border-2 border-app-500 bg-app-900 text-white">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <Badge className="rounded-full bg-app-500 px-3 py-1 text-[11px] font-semibold text-gray-900 hover:bg-app-500">
                {planoAtivo.nome}
              </Badge>
              <div className="mt-3 text-[36px] font-extrabold tracking-[-1px]">
                {planoAtivo.preco}
              </div>
              <p className="mt-1 text-sm text-gray-400">{planoAtivo.membros}</p>
            </div>
            <div className="text-right text-xs text-gray-400">
              {emTrial && trialEnd
                ? `Trial gratuito até ${trialEnd}`
                : proximaCobranca
                ? `Próxima cobrança: ${proximaCobranca}`
                : "Sem cobrança · uso ilimitado"}
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between text-sm text-gray-300">
              <span>Membros</span>
              <span className="font-mono">{usados} / {totalMembros || "∞"}</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-app-700">
              <div className="h-full bg-app-500" style={{ width: `${pct}%` }} />
            </div>
          </div>

          {isPago && (
            <div className="mt-6 border-t border-app-700 pt-4">
              <button
                onClick={() => portalMutation.mutate()}
                disabled={portalMutation.isPending}
                className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-app-400 hover:underline disabled:opacity-60"
              >
                {portalMutation.isPending ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <ExternalLink className="h-3.5 w-3.5" />
                )}
                Gerenciar assinatura, faturas e cartão
              </button>
            </div>
          )}
        </div>
      </Card>

      {/* Planos disponíveis */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-turno-900">
          {isPago ? "Trocar de plano" : "Escolher um plano"}
        </h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {PLANOS.filter((p) => p.id !== "gratis" && !p.sobConsulta).map((p) => {
            const ativo = p.id === planoAtivoId;
            const priceKey = `${p.id}_mensal`;
            return (
              <Card
                key={p.id}
                className={`p-4 ${ativo ? "border-turno-500 ring-2 ring-turno-200" : ""} ${p.destaque ? "bg-turno-50" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-base font-medium">{p.nome}</div>
                  {ativo && <Badge className="bg-turno-500">Atual</Badge>}
                  {p.destaque && !ativo && <Badge variant="outline">Popular</Badge>}
                </div>
                <div className="mt-1 text-2xl font-medium">{p.preco}</div>
                <div className="text-xs text-muted-foreground">{p.membros}</div>
                <ul className="mt-3 space-y-1.5 text-sm text-turno-900/80">
                  {p.beneficios.slice(0, 3).map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span className="mt-0.5 text-turno-600">✓</span> {b}
                    </li>
                  ))}
                </ul>
                <Button
                  className="mt-4 w-full bg-turno-600 hover:bg-turno-700"
                  disabled={ativo || checkoutMutation.isPending}
                  onClick={() => {
                    if (ativo) return;
                    if (isPago) {
                      portalMutation.mutate();
                    } else {
                      checkoutMutation.mutate(priceKey);
                    }
                  }}
                >
                  {checkoutMutation.isPending || portalMutation.isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : ativo ? (
                    "Plano atual"
                  ) : isPago ? (
                    <>
                      <ArrowUpRight className="mr-1 h-4 w-4" /> Trocar plano
                    </>
                  ) : (
                    "Assinar · 7 dias grátis"
                  )}
                </Button>
              </Card>
            );
          })}

          {/* Enterprise */}
          <Card className="p-4">
            <div className="text-base font-medium">Enterprise</div>
            <div className="mt-1 text-2xl font-medium">Sob consulta</div>
            <div className="text-xs text-muted-foreground">Acima de 50 membros</div>
            <ul className="mt-3 space-y-1.5 text-sm text-turno-900/80">
              <li className="flex items-start gap-2"><span className="mt-0.5 text-turno-600">✓</span> Multi-unidade ilimitada</li>
              <li className="flex items-start gap-2"><span className="mt-0.5 text-turno-600">✓</span> SSO corporativo</li>
              <li className="flex items-start gap-2"><span className="mt-0.5 text-turno-600">✓</span> SLA contratual</li>
            </ul>
            <Button
              variant="outline"
              className="mt-4 w-full border-turno-300"
              onClick={() => window.open("mailto:contato@turnoai.com.br?subject=Enterprise", "_blank")}
            >
              Falar com a equipe
            </Button>
          </Card>
        </div>
      </div>

      {/* Ações do plano pago */}
      {isPago && (
        <div className="flex flex-wrap gap-2 border-t pt-5">
          <Button
            variant="outline"
            onClick={() => portalMutation.mutate()}
            disabled={portalMutation.isPending}
          >
            {portalMutation.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <ExternalLink className="mr-2 h-4 w-4" />
            )}
            Portal de faturamento
          </Button>
        </div>
      )}
    </div>
  );
}