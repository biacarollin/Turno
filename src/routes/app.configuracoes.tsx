import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, useEffect } from "react";
import { PageHeader } from "@/components/app/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { AlertTriangle, Lock } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { jsPDF } from "jspdf";
import { useCargos, useMembros } from "@/stores/equipe";
import { excluirOrganizacao } from "@/lib/organizacao.functions";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { useSession, useMinhasEquipes } from "@/hooks/use-session";
import { getSegmentoLabel } from "@/lib/segmentos";

export const Route = createFileRoute("/app/configuracoes")({ component: Configuracoes });

const FUSOS = [
  { value: "America/Sao_Paulo", label: "Brasília (GMT-3)" },
  { value: "America/Manaus", label: "Manaus (GMT-4)" },
  { value: "America/Noronha", label: "Fernando de Noronha (GMT-2)" },
  { value: "America/Rio_Branco", label: "Rio Branco (GMT-5)" },
  { value: "Europe/Lisbon", label: "Lisboa (GMT+0/+1)" },
  { value: "Europe/Madrid", label: "Madrid (GMT+1/+2)" },
  { value: "Europe/London", label: "Londres (GMT+0/+1)" },
  { value: "America/New_York", label: "Nova York (GMT-5/-4)" },
  { value: "Asia/Tokyo", label: "Tóquio (GMT+9)" },
];

const MOTIVOS_EXCLUSAO = [
  "Encerrei a operação",
  "Não atende às nossas necessidades",
  "Preço alto",
  "Migrando para outra ferramenta",
  "Outro",
];

function SettingRow({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <div className="flex-1">
        <div className="text-sm font-medium">{title}</div>
        {desc && <p className="text-xs text-muted-foreground">{desc}</p>}
      </div>
      {children}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card className="p-5">
      <h2 className="mb-2 text-sm font-medium uppercase tracking-wide text-muted-foreground">{title}</h2>
      <div className="divide-y">{children}</div>
    </Card>
  );
}

function Configuracoes() {
  const excluirOrgFn = useServerFn(excluirOrganizacao);
  const { data: sessao } = useSession();
  const { data: equipes = [] } = useMinhasEquipes();
  const equipe_id = equipes[0]?.equipe_id;
  const filial_id = sessao?.filial_ativa_id ?? undefined;

  const { data: membros = [] } = useMembros(equipe_id);
  const { data: cargos = [] } = useCargos(filial_id);

  const empresaNome = sessao?.filial_nome || "—";
  const segmentoLabel = getSegmentoLabel(
    sessao?.segmento_topo ?? null,
    sessao?.segmento ?? null,
    null
  ) || "—";

  const [fuso, setFuso] = useState("America/Sao_Paulo");
  const [antecedencia, setAntecedencia] = useState(15);
  const [posLimite, setPosLimite] = useState(30);
  const [assinatura, setAssinatura] = useState(true);
  const [conclusaoManual, setConclusaoManual] = useState(false);
  const [herdar, setHerdar] = useState(true);
  const [iaUrgencia, setIaUrgencia] = useState(true);
  const [iaResumo, setIaResumo] = useState(true);
  const [push, setPush] = useState(true);
  const [emailDiario, setEmailDiario] = useState(false);
  const [alertaNaoAssumido, setAlertaNaoAssumido] = useState(10);

  // Carrega configurações da filial
  useEffect(() => {
    if (!filial_id) return;
    supabase
      .from("configuracoes_filial")
      .select("*")
      .eq("filial_id", filial_id)
      .single()
      .then(({ data }) => {
        if (!data) return;
        setFuso(data.fuso_horario);
        setAntecedencia(data.antecedencia_minutos);
        setPosLimite(data.pos_limite_minutos);
        setAssinatura(data.assinatura_obrigatoria);
        setConclusaoManual(data.conclusao_manual_gestor);
        setHerdar(data.herdar_pendencias);
        setIaUrgencia(data.sugestao_urgencia_ia);
        setIaResumo(data.resumo_turno_ia);
        setPush(data.push_app);
        setEmailDiario(data.email_diario);
        setAlertaNaoAssumido(data.alerta_turno_nao_assumido);
      });
  }, [filial_id]);

  const salvar = async (patch: Partial<Database["public"]["Tables"]["configuracoes_filial"]["Update"]>) => {
    if (!filial_id) return;
    const { error } = await supabase
      .from("configuracoes_filial")
      .update(patch)
      .eq("filial_id", filial_id);
    if (error) toast.error("Erro ao salvar");
    else toast.success("Salvo", { duration: 1200 });
  };

  const onChange = <T,>(setter: (v: T) => void, campo: string) => (v: T) => {
    setter(v);
    salvar({ [campo]: v });
  };

  const [excluirOpen, setExcluirOpen] = useState(false);
  const [motivo, setMotivo] = useState(MOTIVOS_EXCLUSAO[0]);
  const [detalhe, setDetalhe] = useState("");
  const [senha, setSenha] = useState("");
  const [excluindo, setExcluindo] = useState(false);

  const confirmarExcluir = async () => {
    if (!senha) return toast.error("Confirme com sua senha");
    setExcluindo(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      const email = userData.user?.email;
      if (!email) throw new Error("Sessão inválida");
      const { error: signInErr } = await supabase.auth.signInWithPassword({ email, password: senha });
      if (signInErr) throw new Error("Senha incorreta");
      await excluirOrgFn();
      try { await supabase.auth.signOut({ scope: "global" }); } catch { /* melhor esforço, conta já foi excluída */ }
      try { window.localStorage.clear(); } catch { /* melhor esforço */ }
      try { window.sessionStorage.clear(); } catch { /* melhor esforço */ }
      toast.success("Organização excluída");
      setExcluirOpen(false);
      window.location.replace("/login?excluida=1");
    } catch (e) {
      toast.error((e as Error).message);
      setExcluindo(false);
    }
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    let y = 18;
    doc.setFontSize(16);
    doc.text(`Dados — ${empresaNome}`, 14, y); y += 8;
    doc.setFontSize(10);
    doc.text(`Segmento: ${segmentoLabel}`, 14, y); y += 6;
    doc.text(`Fuso: ${fuso}`, 14, y); y += 6;
    doc.text(`Exportado em: ${new Date().toLocaleString("pt-BR")}`, 14, y); y += 10;
    doc.setFontSize(13); doc.text("Cargos", 14, y); y += 7;
    doc.setFontSize(10);
    cargos.forEach((c) => { doc.text(`• ${c.nome}`, 16, y); y += 5; });
    y += 4;
    doc.setFontSize(13); doc.text("Membros", 14, y); y += 7;
    doc.setFontSize(10);
    membros.forEach((m) => {
      const cargo = cargos.find((c) => c.id === m.cargoId)?.nome ?? "—";
      doc.text(`• ${m.nome}  —  ${m.email}  —  ${cargo}`, 16, y);
      y += 5;
      if (y > 280) { doc.addPage(); y = 18; }
    });
    doc.save("organizacao-export.pdf");
    toast.success("Exportação concluída");
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHeader title="Configurações" subtitle="Personalize como o Turno funciona para sua equipe." />

      <div className="grid gap-4 lg:grid-cols-2">
        <Section title="Turnos e passagens">
          <SettingRow title="Notificação antecipada" desc="Alertar X minutos antes do início.">
            <Input type="number" className="w-20" value={antecedencia}
              onChange={(e) => setAntecedencia(Number(e.target.value))}
              onBlur={() => salvar({ antecedencia_minutos: antecedencia })} />
          </SettingRow>
          <SettingRow title="Limite pós-encerramento" desc="Janela em minutos após encerrar.">
            <Input type="number" className="w-20" value={posLimite}
              onChange={(e) => setPosLimite(Number(e.target.value))}
              onBlur={() => salvar({ pos_limite_minutos: posLimite })} />
          </SettingRow>
          <SettingRow title="Assinatura obrigatória">
            <Switch checked={assinatura} onCheckedChange={onChange(setAssinatura, "assinatura_obrigatoria")} />
          </SettingRow>
          <SettingRow title="Conclusão manual pelo gestor">
            <Switch checked={conclusaoManual} onCheckedChange={onChange(setConclusaoManual, "conclusao_manual_gestor")} />
          </SettingRow>
        </Section>

        <Section title="Ocorrências">
          <SettingRow title="Herdar pendências para o próximo turno">
            <Switch checked={herdar} onCheckedChange={onChange(setHerdar, "herdar_pendencias")} />
          </SettingRow>
          <SettingRow title="Sugestão de urgência por IA">
            <Switch checked={iaUrgencia} onCheckedChange={onChange(setIaUrgencia, "sugestao_urgencia_ia")} />
          </SettingRow>
          <SettingRow title="Resumo do turno por IA">
            <Switch checked={iaResumo} onCheckedChange={onChange(setIaResumo, "resumo_turno_ia")} />
          </SettingRow>
        </Section>

        <Section title="Notificações">
          <SettingRow title="Push no app">
            <Switch checked={push} onCheckedChange={onChange(setPush, "push_app")} />
          </SettingRow>
          <SettingRow title="E-mail diário com resumo">
            <Switch checked={emailDiario} onCheckedChange={onChange(setEmailDiario, "email_diario")} />
          </SettingRow>
          <SettingRow title="Alerta de turno não assumido" desc="Após X minutos do horário de início.">
            <Input type="number" className="w-20" value={alertaNaoAssumido}
              onChange={(e) => setAlertaNaoAssumido(Number(e.target.value))}
              onBlur={() => salvar({ alerta_turno_nao_assumido: alertaNaoAssumido })} />
          </SettingRow>
        </Section>

        <Section title="Organização">
          <SettingRow title="Nome" desc="Contate o suporte para alterar.">
            <div className="flex w-56 items-center gap-2">
              <Input value={empresaNome} readOnly disabled className="bg-muted/40" />
              <Lock className="h-4 w-4 shrink-0 text-muted-foreground" />
            </div>
          </SettingRow>
          <SettingRow title="Segmento" desc="Contate o suporte para alterar.">
            <div className="flex w-56 items-center gap-2">
              <Input value={segmentoLabel} readOnly disabled className="bg-muted/40" />
              <Lock className="h-4 w-4 shrink-0 text-muted-foreground" />
            </div>
          </SettingRow>
          <SettingRow title="Fuso horário">
            <div className="w-56">
              <Select value={fuso} onValueChange={onChange(setFuso, "fuso_horario")}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {FUSOS.map((f) => <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </SettingRow>
        </Section>
      </div>

      <Card className="border-destructive/40 bg-destructive/5 p-5">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 text-destructive" />
          <div className="flex-1">
            <h2 className="text-sm font-medium text-destructive">Zona de risco</h2>
            <p className="mt-1 text-xs text-muted-foreground">Ações irreversíveis. Confirmação dupla obrigatória.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button variant="outline" className="border-destructive/40 text-destructive hover:bg-destructive/10" onClick={exportarPDF}>
                Exportar todos os dados
              </Button>
              <Button variant="destructive" onClick={() => setExcluirOpen(true)}>
                Excluir organização
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <Dialog open={excluirOpen} onOpenChange={setExcluirOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-destructive">Excluir organização</DialogTitle>
            <DialogDescription>Esta ação apaga membros, turnos, ocorrências e histórico. Não pode ser desfeita.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>Por que está saindo?</Label>
              <Select value={motivo} onValueChange={setMotivo}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {MOTIVOS_EXCLUSAO.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Detalhes (opcional)</Label>
              <Textarea value={detalhe} onChange={(e) => setDetalhe(e.target.value)} placeholder="Conte mais para nos ajudar a melhorar." />
            </div>
            <div className="space-y-1.5">
              <Label>Confirme com sua senha</Label>
              <Input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="••••••••" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setExcluirOpen(false)} disabled={excluindo}>Cancelar</Button>
            <Button variant="destructive" onClick={confirmarExcluir} disabled={excluindo}>
              {excluindo ? "Excluindo..." : "Excluir definitivamente"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}