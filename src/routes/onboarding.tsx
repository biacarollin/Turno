import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SEGMENTOS, type Subcategoria } from "@/lib/segmentos";
import { useConfigurarSegmento } from "@/stores/segmento";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, ChevronLeft, Loader2, Pencil, Plus, Sparkles, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/onboarding")({
  component: OnboardingPage,
});

type Step = "empresa" | "topo" | "sub" | "confirm";

function OnboardingPage() {
  const navigate = useNavigate();
  const configurar = useConfigurarSegmento();
  const [loading, setLoading] = useState(true);

  const [step, setStep] = useState<Step>("empresa");
  const [empresa, setEmpresa] = useState("");
  const [topoId, setTopoId] = useState<string | null>(null);
  const [subId, setSubId] = useState<string | null>(null);
  const [subNomeCustom, setSubNomeCustom] = useState("");
  const [edit, setEdit] = useState(false);

  const [cargos, setCargos] = useState<Subcategoria["cargosSugeridos"]>([]);
  const [turnos, setTurnos] = useState<Subcategoria["turnosSugeridos"]>([]);
  const [tipos, setTipos] = useState<Subcategoria["tiposOcorrencia"]>([]);

  // Verifica se já tem onboarding completo
  useEffect(() => {
    let active = true;
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!active) return;
      if (!session) { navigate({ to: "/login" }); return; }

      const { data: profile } = await supabase
        .from("profiles")
        .select("filial_ativa_id, segmento")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (!active) return;
      if (profile?.segmento && profile?.filial_ativa_id) {
        navigate({ to: "/app" });
        return;
      }
      setLoading(false);
    })();
    return () => { active = false; };
  }, [navigate]);

  const topo = useMemo(() => SEGMENTOS.find((t) => t.id === topoId) ?? null, [topoId]);
  const sub = useMemo(() => topo?.subs.find((s) => s.id === subId) ?? null, [topo, subId]);

  useEffect(() => {
    if (step === "confirm" && sub) {
      setCargos(sub.cargosSugeridos);
      setTurnos(sub.turnosSugeridos);
      setTipos(sub.tiposOcorrencia);
      setEdit(false);
    }
  }, [step, sub]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
        Carregando...
      </div>
    );
  }

  const concluir = async () => {
    if (!topoId || !subId) return;
    if (subId === "outras" && !subNomeCustom.trim()) {
      toast.error("Dê um nome para o seu segmento");
      return;
    }
    try {
      await configurar.mutateAsync({
        topoId,
        subId,
        empresaNome: empresa,
        subNomeCustom: subId === "outras" ? subNomeCustom : undefined,
        cargos,
        turnos,
        tiposOcorrencia: tipos,
      });
      toast.success("Tudo pronto! Bem-vindo(a) ao Turno.");
      navigate({ to: "/app" });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erro ao configurar");
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-turno-100 text-turno-700">
            <Sparkles className="h-5 w-5" />
          </div>
          <h1 className="text-2xl font-semibold">Vamos personalizar o Turno para você</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Em poucos passos sua conta fica pronta com cargos, turnos e tipos de ocorrência típicos da sua operação.
          </p>
        </div>

        {step === "empresa" && (
          <Card className="p-6">
            <Label htmlFor="empresa" className="text-base">Nome da empresa ou operação</Label>
            <p className="mt-1 text-sm text-muted-foreground">
              É o nome que vai aparecer no topo da ferramenta. Você pode editar depois.
            </p>
            <Input
              id="empresa" autoFocus className="mt-3"
              placeholder="Ex.: Hospital São Lucas, Transportadora XYZ"
              value={empresa} onChange={(e) => setEmpresa(e.target.value)}
            />
            <div className="mt-6 flex justify-end">
              <Button className="bg-turno-600 hover:bg-turno-700"
                disabled={!empresa.trim()} onClick={() => setStep("topo")}>
                Continuar
              </Button>
            </div>
          </Card>
        )}

        {step === "topo" && (
          <div>
            <BackBtn onClick={() => setStep("empresa")} />
            <h2 className="mb-3 text-lg font-medium">Em qual segmento você atua?</h2>
            <div className="grid gap-3 md:grid-cols-2">
              {SEGMENTOS.map((t) => (
                <button key={t.id}
                  onClick={() => { setTopoId(t.id); setSubId(null); setStep("sub"); }}
                  className="rounded-lg border bg-card p-5 text-left transition hover:border-turno-400 hover:shadow-md">
                  <div className="text-base font-medium">{t.nome}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{t.exemplos}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === "sub" && topo && (
          <div>
            <BackBtn onClick={() => setStep("topo")} />
            <h2 className="mb-1 text-lg font-medium">{topo.nome}</h2>
            <p className="mb-3 text-sm text-muted-foreground">Escolha a subcategoria mais próxima da sua operação.</p>
            <div className="grid gap-3 md:grid-cols-2">
              {topo.subs.map((s) => (
                <button key={s.id}
                  onClick={() => { setSubId(s.id); setSubNomeCustom(""); setStep("confirm"); }}
                  className="rounded-lg border bg-card p-4 text-left transition hover:border-turno-400 hover:shadow-md">
                  <div className="font-medium">{s.nome}</div>
                  {s.id === "outras" && (
                    <div className="mt-1 text-xs text-muted-foreground">Crie do zero com o nome que quiser</div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === "confirm" && topo && sub && (
          <div>
            <BackBtn onClick={() => setStep("sub")} />
            <Card className="p-6">
              <div className="text-sm text-muted-foreground">{topo.nome}</div>
              <h2 className="text-xl font-medium">
                {sub.id === "outras" ? subNomeCustom || "Sua operação" : sub.nome}
              </h2>

              {sub.id === "outras" && (
                <div className="mt-3">
                  <Label htmlFor="custom">Como você chama esse segmento?</Label>
                  <Input id="custom" className="mt-1.5" placeholder="Ex.: Atendimento veterinário"
                    value={subNomeCustom} onChange={(e) => setSubNomeCustom(e.target.value)} />
                </div>
              )}

              <p className="mt-3 text-sm text-muted-foreground">
                {sub.id === "outras" && cargos.length === 0
                  ? "Você vai começar com a estrutura em branco e cria tudo do seu jeito."
                  : "Vamos criar essa estrutura inicial na sua conta. Você pode editar tudo depois."}
              </p>

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <PreviewBox title="Cargos" items={cargos.map((c) => c.nome)} editing={edit}
                  onRemove={(i) => setCargos((arr) => arr.filter((_, x) => x !== i))}
                  onAdd={(nome) => setCargos((arr) => [...arr, { nome, cor: "#10b981" }])}
                  placeholder="Novo cargo" />
                <PreviewBox title="Turnos" items={turnos.map((t) => `${t.nome} (${t.inicio}–${t.fim})`)} editing={edit}
                  onRemove={(i) => setTurnos((arr) => arr.filter((_, x) => x !== i))}
                  onAdd={(nome) => setTurnos((arr) => [...arr, { nome, inicio: "08:00", fim: "18:00" }])}
                  placeholder="Novo turno" />
                <PreviewBox title="Tipos de ocorrência" items={tipos.map((t) => t.nome)} editing={edit}
                  onRemove={(i) => setTipos((arr) => arr.filter((_, x) => x !== i))}
                  onAdd={(nome) => setTipos((arr) => [...arr, { nome, gravidade_default: "media" }])}
                  placeholder="Novo tipo" />
              </div>

              <div className="mt-6 flex flex-wrap justify-end gap-2">
                <Button variant="outline" onClick={() => setStep("topo")}>Trocar de categoria</Button>
                <Button variant="outline" onClick={() => setEdit((v) => !v)}>
                  <Pencil className="mr-1.5 h-4 w-4" />
                  {edit ? "Concluir edição" : "Editar estrutura sugerida"}
                </Button>
                <Button className="bg-turno-600 hover:bg-turno-700" onClick={concluir} disabled={configurar.isPending}>
                  {configurar.isPending ? (
                    <><Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> Configurando...</>
                  ) : (
                    <><Check className="mr-1.5 h-4 w-4" /> Confirmar e começar</>
                  )}
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick}
      className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
      <ChevronLeft className="h-4 w-4" /> Voltar
    </button>
  );
}

function PreviewBox({ title, items, editing, onRemove, onAdd, placeholder }: {
  title: string;
  items: string[];
  editing: boolean;
  onRemove: (idx: number) => void;
  onAdd: (nome: string) => void;
  placeholder: string;
}) {
  const [novo, setNovo] = useState("");
  return (
    <div className="rounded-md border bg-muted/30 p-3">
      <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{title}</div>
      {items.length === 0 ? (
        <div className="mt-2 text-xs text-muted-foreground">Você criará do zero</div>
      ) : (
        <ul className="mt-2 space-y-1 text-sm">
          {items.map((i, idx) => (
            <li key={`${i}-${idx}`} className="flex items-center justify-between gap-2 text-foreground">
              <span>• {i}</span>
              {editing && (
                <button onClick={() => onRemove(idx)}
                  className="text-muted-foreground hover:text-destructive" aria-label={`Remover ${i}`}>
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
      {editing && (
        <div className="mt-3 flex gap-1.5">
          <Input value={novo} onChange={(e) => setNovo(e.target.value)}
            placeholder={placeholder} className="h-8 text-xs"
            onKeyDown={(e) => {
              if (e.key === "Enter" && novo.trim()) { e.preventDefault(); onAdd(novo.trim()); setNovo(""); }
            }} />
          <Button type="button" size="sm" variant="outline" className="h-8 px-2"
            onClick={() => { if (novo.trim()) { onAdd(novo.trim()); setNovo(""); } }}>
            <Plus className="h-3.5 w-3.5" />
          </Button>
        </div>
      )}
    </div>
  );
}