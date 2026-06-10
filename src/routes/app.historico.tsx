import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/PageHeader";
import { Card } from "@/components/ui/card";
import { FileSignature, ShieldCheck } from "lucide-react";
import { usePassagens } from "@/stores/passagens";
import { useSession, useMinhasEquipes } from "@/hooks/use-session";

export const Route = createFileRoute("/app/historico")({ component: Historico });

function Historico() {
  const { data: sessao } = useSession();
  const { data: equipes = [] } = useMinhasEquipes();
  const equipe_id = equipes[0]?.equipe_id;

  const { data: passagens = [], isLoading } = usePassagens(equipe_id);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <PageHeader
        title="Histórico de passagens"
        subtitle="Toda passagem de turno fica registrada aqui."
      />
      {isLoading ? (
        <Card className="p-8 text-center text-sm text-muted-foreground">Carregando...</Card>
      ) : passagens.length === 0 ? (
        <Card className="p-10 text-center">
          <FileSignature className="mx-auto h-10 w-10 text-muted-foreground/40" />
          <h3 className="mt-3 text-base font-medium">Nenhuma passagem registrada</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Quando a equipe começar a registrar passagens de turno, elas aparecerão aqui automaticamente.
          </p>
        </Card>
      ) : (
        <Card className="divide-y">
          {passagens.map((p) => (
            <div key={p.id} className="px-4 py-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="font-medium">
                  {new Date(p.data).toLocaleDateString("pt-BR")}
                </span>
                <div className="flex items-center gap-2">
                  {p.hash_assinatura && (
                    <span className="flex items-center gap-1 text-xs text-emerald-600">
                      <ShieldCheck className="h-3 w-3" /> Assinado
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground">
                    {p.assinado_por || "Sem assinatura"}
                  </span>
                </div>
              </div>
              {p.resumo && (
                <p className="mt-1 text-muted-foreground">{p.resumo}</p>
              )}
              {p.assinado_em && (
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {new Date(p.assinado_em).toLocaleString("pt-BR")}
                </p>
              )}
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}