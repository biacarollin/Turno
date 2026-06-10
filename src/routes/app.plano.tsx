import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/app/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, CreditCard, Check, Pin, QrCode, Lock, ArrowUpRight } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { jsPDF } from "jspdf";
import { PLANOS, planoIndex, planoPor, setPlanoAtivo, usePlanoAtivo, type PlanoId } from "@/lib/plano";
import { useSession } from "@/hooks/use-session";

export const Route = createFileRoute("/app/plano")({ component: Plano });

const faturas = [
  { mes: "Maio · 2026", valor: "R$ 199,00", status: "Paga" },
  { mes: "Abril · 2026", valor: "R$ 199,00", status: "Paga" },
  { mes: "Março · 2026", valor: "R$ 199,00", status: "Paga" },
];

const MOTIVOS_CANCEL = [
  "Encerrei a operação",
  "Mudei para outra ferramenta",
  "Caro demais",
  "Faltou um recurso essencial",
  "Pausa temporária",
  "Outro",
];

function Plano() {
  const { data: sessao } = useSession();
  const empresaNome = sessao?.filial_nome || "Sua organização";

  const planoAtivoId = usePlanoAtivo();
  const planoAtivo = planoPor(planoAtivoId);
  const idxAtivo = planoIndex(planoAtivoId);

  const totalMembros = (() => {
    const m = planoAtivo.membros.match(/\d+/);
    return m ? Number(m[0]) : 0;
  })();
  const usados = Math.min(2, totalMembros);
  const pct = totalMembros ? (usados / totalMembros) * 100 : 0;

  const [comparativoOpen, setComparativoOpen] = useState(false);
  const [upgradeAlvo, setUpgradeAlvo] = useState<PlanoId | null>(null);
  const [pagamentoOpen, setPagamentoOpen] = useState(false);
  const [cancelarOpen, setCancelarOpen] = useState(false);
  const [contatoOpen, setContatoOpen] = useState(false);
  const [contatoSent, setContatoSent] = useState(false);

  const [metodo, setMetodo] = useState<"cartao" | "pix">("cartao");
  const [numero, setNumero] = useState("");
  const [validade, setValidade] = useState("");
  const [cvv, setCvv] = useState("");
  const [nomeCartao, setNomeCartao] = useState("");
  const [fixarCartao, setFixarCartao] = useState(false);
  const [metodoUpgrade, setMetodoUpgrade] = useState<"cartao" | "pix">("cartao");

  const [motivo, setMotivo] = useState(MOTIVOS_CANCEL[0]);
  const [detalhe, setDetalhe] = useState("");
  const [senha, setSenha] = useState("");

  const tentarAlterarPlano = (id: PlanoId) => {
    if (id === planoAtivoId) return;
    const alvo = planoPor(id);
    if (alvo.sobConsulta) { setContatoOpen(true); return; }
    if (alvo.precoNumero <= planoAtivo.precoNumero) {
      toast.error(`Downgrade indisponível pelo app. Entre em contato com o suporte.`);
      return;
    }
    setUpgradeAlvo(id);
    setComparativoOpen(false);
  };

  const confirmarUpgrade = () => {
    if (!upgradeAlvo) return;
    setPlanoAtivo(upgradeAlvo);
    toast.success(`Upgrade para ${planoPor(upgradeAlvo).nome} confirmado`);
    setUpgradeAlvo(null);
  };

  const salvarPagamento = () => {
    if (metodo === "cartao" && (!numero || !validade || !cvv)) return toast.error("Preencha os dados do cartão");
    toast.success(metodo === "pix" ? "Pix gerado" : fixarCartao ? "Cartão fixado" : "Cartão atualizado");
    setPagamentoOpen(false);
    setNumero(""); setValidade(""); setCvv(""); setFixarCartao(false);
  };

  const confirmarCancelar = () => {
    if (!senha) return toast.error("Confirme com sua senha");
    setPlanoAtivo("gratis");
    toast.success("Assinatura cancelada — você voltou ao plano Grátis");
    setCancelarOpen(false);
    setSenha(""); setDetalhe("");
  };

  const baixarFatura = (mes: string, valor: string) => {
    const doc = new jsPDF();
    doc.setFontSize(16); doc.text("Nota Fiscal — Turno", 14, 18);
    doc.setFontSize(10);
    doc.text(`Competência: ${mes}`, 14, 30);
    doc.text(`Valor: ${valor}`, 14, 36);
    doc.text(`${empresaNome}`, 14, 46);
    doc.text(`Plano ${planoAtivo.nome} · ${planoAtivo.membros}`, 14, 52);
    doc.text(`Status: Paga`, 14, 58);
    doc.save(`fatura-${mes.replace(/\s|·/g, "-")}.pdf`);
    toast.success("NF baixada");
  };

  const isPago = planoAtivo.precoNumero > 0;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <PageHeader title="Plano e faturamento" subtitle="Seu plano ativo, uso e histórico de cobrança." />

      <Card className="overflow-hidden border-turno-200 bg-white text-turno-900">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <Badge className="bg-turno-100 text-turno-800">
                <Lock className="mr-1 h-3 w-3" /> Plano ativo
              </Badge>
              <h2 className="mt-2 text-2xl font-medium">{planoAtivo.nome}</h2>
              <p className="mt-1 text-sm text-turno-900/60">{planoAtivo.membros}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-medium">{planoAtivo.preco}</div>
              <div className="mt-1 text-xs text-turno-900/60">
                {isPago ? "Próxima cobrança · 15/06/2026" : "Sem cobrança · uso ilimitado"}
              </div>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm">
              <span>Membros</span>
              <span className="font-mono">{usados} / {totalMembros}</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-turno-100">
              <div className="h-full bg-turno-600" style={{ width: `${pct}%` }} />
            </div>
          </div>
          {isPago && (
            <div className="mt-6 flex items-center gap-2 border-t border-turno-100 pt-4 text-sm text-turno-900/70">
              <CreditCard className="h-4 w-4" /> Visa terminado em •••• 4242
            </div>
          )}
        </div>
      </Card>

      <Card className="border-turno-200 bg-turno-50/50 p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm font-medium text-turno-900">Fazer upgrade</div>
            <p className="mt-1 text-sm text-turno-900/70">Compare planos lado a lado.</p>
          </div>
          <Button variant="outline" className="border-turno-300 text-turno-900" onClick={() => setComparativoOpen(true)}>
            Ver comparativo
          </Button>
        </div>
      </Card>

      {isPago && (
        <Card>
          <div className="border-b px-5 py-3 text-sm font-medium">Histórico de faturas</div>
          <table className="w-full text-sm">
            <tbody>
              {faturas.map((f) => (
                <tr key={f.mes} className="border-t">
                  <td className="px-5 py-3">{f.mes}</td>
                  <td className="px-5 py-3 font-mono">{f.valor}</td>
                  <td className="px-5 py-3"><Badge className="bg-turno-500">{f.status}</Badge></td>
                  <td className="px-5 py-3 text-right">
                    <Button variant="ghost" size="sm" onClick={() => baixarFatura(f.mes, f.valor)}>
                      <Download className="mr-1 h-3.5 w-3.5" /> Baixar PDF
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      <div className="flex flex-wrap gap-2 border-t pt-5">
        <Button variant="outline" onClick={() => setComparativoOpen(true)}>
          <ArrowUpRight className="mr-1 h-4 w-4" /> Fazer upgrade
        </Button>
        {isPago && (
          <>
            <Button variant="outline" onClick={() => setPagamentoOpen(true)}>Atualizar pagamento</Button>
            <Button variant="ghost" className="text-destructive hover:text-destructive" onClick={() => setCancelarOpen(true)}>
              Cancelar assinatura
            </Button>
          </>
        )}
      </div>

      {/* Comparativo */}
      <Dialog open={comparativoOpen} onOpenChange={setComparativoOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Comparar planos</DialogTitle>
            <DialogDescription>Você só pode trocar para um plano superior. Downgrade só pelo suporte.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {PLANOS.map((p) => {
              const ativo = p.id === planoAtivoId;
              const idx = planoIndex(p.id);
              const isUpgrade = idx > idxAtivo;
              const isDowngrade = idx < idxAtivo;
              return (
                <Card key={p.id} className={`p-4 ${ativo ? "border-turno-500 ring-2 ring-turno-200" : ""}`}>
                  <div className="flex items-center justify-between">
                    <div className="text-base font-medium">{p.nome}</div>
                    {ativo && <Badge className="bg-turno-500">Atual</Badge>}
                  </div>
                  <div className="mt-1 text-2xl font-medium">{p.sobConsulta ? "Sob consulta" : p.preco}</div>
                  <div className="text-xs text-muted-foreground">{p.membros}</div>
                  <ul className="mt-3 space-y-1.5 text-sm">
                    {p.beneficios.map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-turno-600" /> {b}
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-4 w-full bg-turno-600 hover:bg-turno-700"
                    disabled={ativo || isDowngrade} onClick={() => tentarAlterarPlano(p.id)}>
                    {ativo ? "Plano atual" : p.sobConsulta ? "Falar com a equipe" : isUpgrade ? "Fazer upgrade" : "Indisponível"}
                  </Button>
                </Card>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>

      {/* Upgrade */}
      <Dialog open={!!upgradeAlvo} onOpenChange={(o) => !o && setUpgradeAlvo(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar upgrade</DialogTitle>
            <DialogDescription>
              {upgradeAlvo && <>Mudando de <strong>{planoAtivo.nome}</strong> para <strong>{planoPor(upgradeAlvo).nome}</strong> · {planoPor(upgradeAlvo).preco}.</>}
            </DialogDescription>
          </DialogHeader>
          <div className="mb-2 inline-flex gap-1 rounded-md border p-1">
            {(["cartao", "pix"] as const).map((m) => (
              <button key={m} type="button" onClick={() => setMetodoUpgrade(m)}
                className={`inline-flex items-center gap-1.5 rounded px-3 py-1.5 text-sm ${metodoUpgrade === m ? "bg-turno-600 text-white" : "text-muted-foreground"}`}>
                {m === "cartao" ? <><CreditCard className="h-4 w-4" /> Cartão</> : <><QrCode className="h-4 w-4" /> Pix</>}
              </button>
            ))}
          </div>
          {metodoUpgrade === "cartao" ? (
            <div className="space-y-3">
              <div className="space-y-1.5"><Label>Nome no cartão</Label><Input value={nomeCartao} onChange={(e) => setNomeCartao(e.target.value.toUpperCase())} /></div>
              <div className="space-y-1.5"><Label>Número</Label><Input value={numero} onChange={(e) => setNumero(e.target.value)} placeholder="0000 0000 0000 0000" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5"><Label>Validade</Label><Input value={validade} onChange={(e) => setValidade(e.target.value)} placeholder="MM/AA" /></div>
                <div className="space-y-1.5"><Label>CVV</Label><Input value={cvv} onChange={(e) => setCvv(e.target.value)} placeholder="000" /></div>
              </div>
            </div>
          ) : (
            <div className="rounded-md border bg-muted/30 p-6 text-center text-sm text-muted-foreground">
              QR Code Pix gerado na confirmação. Vencimento em 30 minutos.
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setUpgradeAlvo(null)}>Cancelar</Button>
            <Button className="bg-turno-600 hover:bg-turno-700" onClick={() => {
              if (metodoUpgrade === "cartao" && (!nomeCartao.trim() || !numero || !validade || !cvv))
                return toast.error("Preencha todos os dados do cartão");
              confirmarUpgrade();
              setNumero(""); setValidade(""); setCvv(""); setNomeCartao("");
            }}>
              {metodoUpgrade === "pix" ? "Já paguei o Pix" : "Pagar e fazer upgrade"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Atualizar pagamento */}
      <Dialog open={pagamentoOpen} onOpenChange={setPagamentoOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Atualizar pagamento</DialogTitle></DialogHeader>
          <div className="mb-2 inline-flex gap-1 rounded-md border p-1">
            {(["cartao", "pix"] as const).map((m) => (
              <button key={m} type="button" onClick={() => setMetodo(m)}
                className={`inline-flex items-center gap-1.5 rounded px-3 py-1.5 text-sm ${metodo === m ? "bg-turno-600 text-white" : "text-muted-foreground"}`}>
                {m === "cartao" ? <><CreditCard className="h-4 w-4" /> Cartão</> : <><QrCode className="h-4 w-4" /> Pix</>}
              </button>
            ))}
          </div>
          {metodo === "cartao" ? (
            <div className="space-y-3">
              <div className="space-y-1.5"><Label>Número</Label><Input value={numero} onChange={(e) => setNumero(e.target.value)} placeholder="0000 0000 0000 0000" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5"><Label>Validade</Label><Input value={validade} onChange={(e) => setValidade(e.target.value)} placeholder="MM/AA" /></div>
                <div className="space-y-1.5"><Label>CVV</Label><Input value={cvv} onChange={(e) => setCvv(e.target.value)} placeholder="000" /></div>
              </div>
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <input type="checkbox" checked={fixarCartao} onChange={(e) => setFixarCartao(e.target.checked)} className="h-4 w-4" />
                <Pin className="h-3.5 w-3.5" /> Fixar como cartão padrão
              </label>
            </div>
          ) : (
            <div className="rounded-md border bg-muted/30 p-6 text-center text-sm text-muted-foreground">
              <QrCode className="mx-auto mb-2 h-16 w-16" /> QR Code gerado na confirmação.
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setPagamentoOpen(false)}>Cancelar</Button>
            <Button className="bg-turno-600 hover:bg-turno-700" onClick={salvarPagamento}>
              {metodo === "pix" ? "Gerar Pix" : "Salvar cartão"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancelar */}
      <Dialog open={cancelarOpen} onOpenChange={setCancelarOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-destructive">Cancelar assinatura</DialogTitle>
            <DialogDescription>Sua assinatura segue ativa até o fim do período pago.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>Por que está cancelando?</Label>
              <Select value={motivo} onValueChange={setMotivo}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{MOTIVOS_CANCEL.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5"><Label>Detalhes (opcional)</Label><Textarea value={detalhe} onChange={(e) => setDetalhe(e.target.value)} /></div>
            <div className="space-y-1.5"><Label>Confirme com sua senha</Label><Input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="••••••••" /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelarOpen(false)}>Voltar</Button>
            <Button variant="destructive" onClick={confirmarCancelar}>Cancelar assinatura</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Enterprise */}
      <Dialog open={contatoOpen} onOpenChange={(o) => { setContatoOpen(o); if (!o) setContatoSent(false); }}>
        <DialogContent>
          <DialogHeader><DialogTitle>Falar com a equipe</DialogTitle></DialogHeader>
          <form onSubmit={(e) => { e.preventDefault(); setContatoSent(true); toast.success("Mensagem enviada!"); }} className="space-y-4">
            <div className="grid gap-1.5"><Label>Nome</Label><Input name="nome" required maxLength={100} /></div>
            <div className="grid gap-1.5"><Label>Email</Label><Input name="email" type="email" required /></div>
            <div className="grid gap-1.5"><Label>Contato</Label><Input name="contato" required maxLength={30} /></div>
            <div className="grid gap-1.5"><Label>Mensagem</Label><Textarea name="mensagem" required rows={4} maxLength={2000} /></div>
            <Button type="submit" className="w-full bg-turno-600 hover:bg-turno-700">Enviar mensagem</Button>
            {contatoSent && <p className="text-center text-sm text-turno-700">Recebemos! Em breve entraremos em contato.</p>}
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}