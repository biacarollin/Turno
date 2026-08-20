import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/PageHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Smartphone, ShieldCheck, ShieldAlert, Trash2, Copy, Mail, Check, UserPlus, UserX } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useCargos, useMembros, useAdicionarMembro, useAtualizarMembro, useExcluirMembro, TURNOS_OPCOES, type Cargo, type Membro } from "@/stores/equipe";
import { useSession, useMinhasEquipes } from "@/hooks/use-session";
import { formatWhatsapp, WHATSAPP_MAX_LENGTH, WHATSAPP_PLACEHOLDER } from "@/lib/whatsapp-mask";

export const Route = createFileRoute("/app/membros")({ component: Membros });

function Membros() {
  const { data: sessao } = useSession();
  const { data: equipes = [] } = useMinhasEquipes();
  const equipe_id = equipes[0]?.equipe_id;
  const filial_id = sessao?.filial_ativa_id ?? undefined;

  const { data: cargos = [] } = useCargos(filial_id);
  const { data: membros = [], isLoading } = useMembros(equipe_id);
  const adicionarMembro = useAdicionarMembro();
  const atualizarMembro = useAtualizarMembro();
  const excluirMembro = useExcluirMembro();

  const [convidarOpen, setConvidarOpen] = useState(false);
  const [adicionarOpen, setAdicionarOpen] = useState(false);
  const [novoNome, setNovoNome] = useState("");
  const [novoEmail, setNovoEmail] = useState("");
  const [novoWhats, setNovoWhats] = useState("");
  const [novoCargo, setNovoCargo] = useState<string>("none");
  const [novoTurno, setNovoTurno] = useState<string>("—");
  const [editarId, setEditarId] = useState<string | null>(null);
  const [excluirId, setExcluirId] = useState<string | null>(null);
  const [linkConvite, setLinkConvite] = useState<string | null>(null);
  const [emailConvite, setEmailConvite] = useState<string>("");
  const [copiado, setCopiado] = useState(false);

  const editando = membros.find((m: Membro) => m.id === editarId) ?? null;
  const cargoDe = (id: string | null) => cargos.find((c: Cargo) => c.id === id) ?? null;

  const limparForm = () => {
    setNovoNome(""); setNovoEmail(""); setNovoWhats("");
    setNovoCargo("none"); setNovoTurno("—");
  };

  const validarComuns = () => {
    if (!novoNome.trim()) { toast.error("Informe o nome"); return true; }
    if (novoCargo === "none") { toast.error("Informe o cargo"); return true; }
    if (!novoEmail.trim() && !novoWhats.trim()) { toast.error("Informe e-mail ou WhatsApp"); return true; }
    if (novoWhats.trim()) {
      const digits = novoWhats.replace(/\D/g, "");
      if (digits.length !== 11) { toast.error("WhatsApp incompleto"); return true; }
    }
    return false;
  };

  const salvarConvite = async () => {
    if (validarComuns() || !equipe_id) return;
    try {
      const membro = await adicionarMembro.mutateAsync({
        equipe_id,
        user_id: crypto.randomUUID(), // placeholder — será substituído quando o usuário aceitar o convite
        cargo_id: novoCargo === "none" ? undefined : novoCargo,
        turno_nome: novoTurno,
        dispositivo: "convite",
      });
      const url = `${window.location.origin}/confirmar?invite=${encodeURIComponent(equipe_id)}&email=${encodeURIComponent(novoEmail.trim())}`;
      setLinkConvite(url);
      setEmailConvite(novoEmail.trim());
      setCopiado(false);
      toast.success("Convite gerado");
      setConvidarOpen(false);
    } catch (e) { toast.error((e as Error).message); }
  };

  const salvarManual = async () => {
    if (validarComuns() || !equipe_id) return;
    try {
      await adicionarMembro.mutateAsync({
        equipe_id,
        user_id: crypto.randomUUID(),
        cargo_id: novoCargo === "none" ? undefined : novoCargo,
        turno_nome: novoTurno,
        dispositivo: "verificado",
      });
      toast.success("Membro adicionado");
      setAdicionarOpen(false);
      limparForm();
    } catch (e) { toast.error((e as Error).message); }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <PageHeader
        title="Membros"
        subtitle="Quem faz parte da equipe e o status de cada dispositivo."
        actions={
          <div className="flex flex-wrap gap-2">
            <Button className="bg-app-900 hover:bg-app-800" onClick={() => { limparForm(); setConvidarOpen(true); }}>
              <Mail className="h-4 w-4" /> Convidar membro
            </Button>
            <Button variant="outline" onClick={() => { limparForm(); setAdicionarOpen(true); }}>
              <UserPlus className="h-4 w-4" /> Adicionar membro
            </Button>
          </div>
        }
      />

      <Card className="overflow-hidden rounded-xl border-gray-200 p-0">
        {isLoading ? (
          <div className="p-6 text-sm text-muted-foreground">Carregando...</div>
        ) : membros.length === 0 ? (
          <div className="p-6 text-center text-sm text-muted-foreground">
            Nenhum membro ainda. Clique em "Adicionar membro".
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-100/70 text-left text-[10px] font-semibold uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-4 py-2.5">Membro</th>
                <th className="px-4 py-2.5">Cargo</th>
                <th className="px-4 py-2.5">Turno</th>
                <th className="px-4 py-2.5">Dispositivo</th>
                <th className="px-4 py-2.5"></th>
              </tr>
            </thead>
            <tbody>
              {membros.map((m: Membro) => {
                const cargo = cargoDe(m.cargoId);
                return (
                  <tr key={m.id} className="border-t border-gray-100">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-app-600 text-xs font-bold text-app-200">
                            {m.nome.split(" ").map((n: string) => n[0]).slice(0, 2).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-[12px] font-semibold text-gray-900">{m.nome}</div>
                          <div className="text-[11px] text-gray-400">{m.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {!cargo ? <span className="text-muted-foreground">—</span> : (
                        <Badge variant="outline" style={{ borderColor: cargo.cor, color: cargo.cor }}>
                          {cargo.nome}
                        </Badge>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{m.turnoNome}</td>
                    <td className="px-4 py-3">
                      {m.dispositivo === "verificado" && <span className="inline-flex items-center gap-1.5 rounded-md bg-app-100 px-2 py-0.5 text-[10px] font-semibold text-app-700"><ShieldCheck className="h-3 w-3" /> Verificado</span>}
                      {m.dispositivo === "inativo" && <span className="inline-flex items-center gap-1.5 rounded-md bg-red-50 px-2 py-0.5 text-[10px] font-semibold text-destructive"><UserX className="h-3 w-3" /> Inativo</span>}
                      {m.dispositivo === "pendente" && <span className="inline-flex items-center gap-1.5 rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700"><ShieldAlert className="h-3 w-3" /> Pendente</span>}
                      {m.dispositivo === "convite" && <span className="inline-flex items-center gap-1.5 rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-500"><Smartphone className="h-3 w-3" /> Convite enviado</span>}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="sm" onClick={() => setEditarId(m.id)}>Editar</Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </Card>

      {/* Dialog Convidar */}
      <Dialog open={convidarOpen} onOpenChange={setConvidarOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Convidar membro</DialogTitle>
            <DialogDescription>Gere um link de convite para enviar por e-mail ou WhatsApp.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>Nome <span className="text-destructive">*</span></Label>
              <Input value={novoNome} onChange={(e) => setNovoNome(e.target.value)} placeholder="Nome completo" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>E-mail</Label>
                <Input type="email" value={novoEmail} onChange={(e) => setNovoEmail(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>WhatsApp</Label>
                <Input value={novoWhats} onChange={(e) => setNovoWhats(formatWhatsapp(e.target.value))} placeholder={WHATSAPP_PLACEHOLDER} maxLength={WHATSAPP_MAX_LENGTH} inputMode="tel" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Cargo <span className="text-destructive">*</span></Label>
                <Select value={novoCargo} onValueChange={setNovoCargo}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Selecione</SelectItem>
                    {cargos.map((c: Cargo) => <SelectItem key={c.id} value={c.id}>{c.nome}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Turno</Label>
                <Select value={novoTurno} onValueChange={setNovoTurno}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {TURNOS_OPCOES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConvidarOpen(false)}>Cancelar</Button>
            <Button className="bg-app-900 hover:bg-app-800" onClick={salvarConvite} disabled={adicionarMembro.isPending}>
              {adicionarMembro.isPending ? "Gerando..." : "Gerar convite"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Adicionar manual */}
      <Dialog open={adicionarOpen} onOpenChange={setAdicionarOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar membro</DialogTitle>
            <DialogDescription>Cadastro manual. O membro entra direto como ativo.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>Nome <span className="text-destructive">*</span></Label>
              <Input value={novoNome} onChange={(e) => setNovoNome(e.target.value)} placeholder="Nome completo" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>E-mail</Label>
                <Input type="email" value={novoEmail} onChange={(e) => setNovoEmail(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>WhatsApp</Label>
                <Input value={novoWhats} onChange={(e) => setNovoWhats(formatWhatsapp(e.target.value))} placeholder={WHATSAPP_PLACEHOLDER} maxLength={WHATSAPP_MAX_LENGTH} inputMode="tel" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Cargo <span className="text-destructive">*</span></Label>
                <Select value={novoCargo} onValueChange={setNovoCargo}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Selecione</SelectItem>
                    {cargos.map((c: Cargo) => <SelectItem key={c.id} value={c.id}>{c.nome}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Turno</Label>
                <Select value={novoTurno} onValueChange={setNovoTurno}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {TURNOS_OPCOES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAdicionarOpen(false)}>Cancelar</Button>
            <Button className="bg-app-900 hover:bg-app-800" onClick={salvarManual} disabled={adicionarMembro.isPending}>
              {adicionarMembro.isPending ? "Salvando..." : "Concluir"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Link convite */}
      <Dialog open={!!linkConvite} onOpenChange={(o) => !o && setLinkConvite(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Convite criado</DialogTitle>
            <DialogDescription>Envie este link para <strong>{emailConvite}</strong>.</DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2">
            <Input readOnly value={linkConvite ?? ""} onFocus={(e) => e.currentTarget.select()} />
            <Button variant="outline" size="icon" onClick={async () => {
              if (!linkConvite) return;
              await navigator.clipboard.writeText(linkConvite);
              setCopiado(true);
              toast.success("Link copiado");
            }}>
              {copiado ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          <DialogFooter>
            <Button className="bg-app-900 hover:bg-app-800" onClick={() => setLinkConvite(null)}>Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Editar */}
      <Dialog open={!!editando} onOpenChange={(o) => !o && setEditarId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar membro</DialogTitle>
            <DialogDescription>{editando?.nome} · {editando?.email}</DialogDescription>
          </DialogHeader>
          {editando && equipe_id && (
            <EditarMembroForm
              membro={editando}
              cargos={cargos}
              onSalvar={async (patch) => {
                try {
                  await atualizarMembro.mutateAsync({ id: editando.id, equipe_id, patch });
                  toast.success("Membro atualizado");
                  setEditarId(null);
                } catch (e) { toast.error((e as Error).message); }
              }}
              onExcluir={() => { setExcluirId(editando.id); setEditarId(null); }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* AlertDialog Excluir */}
      <AlertDialog open={!!excluirId} onOpenChange={(o) => !o && setExcluirId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir membro?</AlertDialogTitle>
            <AlertDialogDescription>Remove o membro da equipe. Não pode ser desfeito.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={async () => {
              if (excluirId && equipe_id) {
                try {
                  await excluirMembro.mutateAsync({ id: excluirId, equipe_id });
                  toast.success("Membro excluído");
                } catch (e) { toast.error((e as Error).message); }
              }
              setExcluirId(null);
            }}>Excluir</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function EditarMembroForm({ membro, cargos, onSalvar, onExcluir }: {
  membro: Membro;
  cargos: { id: string; nome: string }[];
  onSalvar: (patch: Partial<{ cargo_id: string | null; turno_nome: string; dispositivo: Membro["dispositivo"] }>) => void;
  onExcluir: () => void;
}) {
  const [cargoId, setCargoId] = useState<string>(membro.cargoId ?? "none");
  const [turno, setTurno] = useState(membro.turnoNome);
  const [ativo, setAtivo] = useState(membro.dispositivo !== "inativo");

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label>Cargo</Label>
        <Select value={cargoId} onValueChange={setCargoId}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Sem cargo</SelectItem>
            {cargos.map((c) => <SelectItem key={c.id} value={c.id}>{c.nome}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1.5">
        <Label>Turno</Label>
        <Select value={turno} onValueChange={setTurno}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {TURNOS_OPCOES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-start justify-between gap-4 rounded-lg border p-3">
        <div>
          <div className="text-sm font-medium">Membro ativo</div>
          <p className="text-xs text-muted-foreground">Ao desativar, o membro perde acesso imediato.</p>
        </div>
        <Switch checked={ativo} onCheckedChange={setAtivo} />
      </div>
      <DialogFooter className="!justify-between">
        <Button variant="destructive" onClick={onExcluir}>
          <Trash2 className="mr-1 h-4 w-4" /> Excluir
        </Button>
        <Button className="bg-app-900 hover:bg-app-800" onClick={() => {
          const novoStatus: Membro["dispositivo"] = ativo
            ? (membro.dispositivo === "inativo" ? "verificado" : membro.dispositivo)
            : "inativo";
          onSalvar({
            cargo_id: cargoId === "none" ? null : cargoId,
            turno_nome: turno,
            dispositivo: novoStatus,
          });
        }}>
          Salvar
        </Button>
      </DialogFooter>
    </div>
  );
}