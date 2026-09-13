// BYPASS TEMPORÁRIO — MODO DEMO (gravação de portfólio)
// ---------------------------------------------------------------------------
// Base de dados falsa, só em memória, pra dar pra navegar e usar o app sem
// depender do Supabase (a chave em .env está inválida — 401 em tudo). Os
// stores (src/stores/*.ts) leem e escrevem aqui em vez de bater na rede.
// Estado reseta a cada reload da página; dentro de uma mesma navegação
// (SPA) as alterações persistem, então "salvar" uma ocorrência, por
// exemplo, reflete na lista imediatamente.
//
// Pra reverter: apagar este arquivo e desfazer os imports dele nos stores
// (procure "BYPASS TEMPORÁRIO" nesses arquivos) quando a chave do Supabase
// for corrigida e o app voltar a falar com o Supabase de verdade.
// ---------------------------------------------------------------------------

export const DEMO_ORG_ID = "demo-org-1";
export const DEMO_FILIAL_ID = "demo-filial-1";
export const DEMO_EQUIPE_ID = "demo-equipe-1";
export const DEMO_USER_ID = "demo-user-1";

export function demoNovoId(prefixo: string) {
  return `${prefixo}-${Math.random().toString(36).slice(2, 10)}-${Date.now().toString(36)}`;
}

// Usa componentes de data locais (não toISOString, que é UTC e pode "virar
// o dia" errado dependendo do fuso horário — mesmo motivo de src/lib/data.ts).
function hojeISOLocal(offsetDias = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDias);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dia = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dia}`;
}

function horarioHoje(hora: string, offsetDias = 0) {
  return `${hojeISOLocal(offsetDias)}T${hora}:00`;
}

/* ---------- CARGOS ---------- */
export type DemoCargo = { id: string; nome: string; cor: string; filial_id: string };

const SEED_CARGOS: DemoCargo[] = [
  { id: "cargo-1", nome: "Enfermeiro(a) chefe", cor: "#10b981", filial_id: DEMO_FILIAL_ID },
  { id: "cargo-2", nome: "Técnico(a) de enfermagem", cor: "#3b82f6", filial_id: DEMO_FILIAL_ID },
  { id: "cargo-3", nome: "Auxiliar de enfermagem", cor: "#f59e0b", filial_id: DEMO_FILIAL_ID },
];

/* ---------- MEMBROS ---------- */
export type DemoMembro = {
  id: string;
  user_id: string | null;
  equipe_id: string;
  nome: string;
  email: string;
  cargo_id: string | null;
  turno_nome: string;
  dispositivo: "verificado" | "pendente" | "convite" | "inativo";
};

const SEED_MEMBROS: DemoMembro[] = [
  { id: "membro-1", user_id: DEMO_USER_ID, equipe_id: DEMO_EQUIPE_ID, nome: "Ana Beatriz Souza", email: "ana.souza@exemplo.com", cargo_id: "cargo-1", turno_nome: "Manhã", dispositivo: "verificado" },
  { id: "membro-2", user_id: null, equipe_id: DEMO_EQUIPE_ID, nome: "Carlos Eduardo Lima", email: "carlos.lima@exemplo.com", cargo_id: "cargo-2", turno_nome: "Manhã", dispositivo: "verificado" },
  { id: "membro-3", user_id: null, equipe_id: DEMO_EQUIPE_ID, nome: "Fernanda Ramos", email: "fernanda.ramos@exemplo.com", cargo_id: "cargo-2", turno_nome: "Tarde", dispositivo: "pendente" },
  { id: "membro-4", user_id: null, equipe_id: DEMO_EQUIPE_ID, nome: "João Pedro Alves", email: "joao.alves@exemplo.com", cargo_id: "cargo-3", turno_nome: "Noite", dispositivo: "verificado" },
  { id: "membro-5", user_id: null, equipe_id: DEMO_EQUIPE_ID, nome: "Marina Costa", email: "marina.costa@exemplo.com", cargo_id: "cargo-3", turno_nome: "Tarde", dispositivo: "convite" },
];

/* ---------- TURNOS ---------- */
export type DemoTurno = {
  id: string;
  equipe_id: string;
  nome: string;
  inicio: string;
  fim: string;
  cargos: string[];
  antecedencia: number;
  pos_limite: number;
  ativo: boolean;
};

const SEED_TURNOS: DemoTurno[] = [
  { id: "turno-1", equipe_id: DEMO_EQUIPE_ID, nome: "Manhã", inicio: "07:00", fim: "15:00", cargos: [], antecedencia: 30, pos_limite: 15, ativo: true },
  { id: "turno-2", equipe_id: DEMO_EQUIPE_ID, nome: "Tarde", inicio: "15:00", fim: "23:00", cargos: [], antecedencia: 30, pos_limite: 15, ativo: false },
  { id: "turno-3", equipe_id: DEMO_EQUIPE_ID, nome: "Noite", inicio: "23:00", fim: "07:00", cargos: [], antecedencia: 30, pos_limite: 15, ativo: false },
];

/* ---------- OCORRÊNCIAS ---------- */
export type DemoOcorrencia = {
  id: string;
  equipe_id: string;
  criado_por: string | null;
  titulo: string;
  descricao: string | null;
  tipo: string | null;
  gravidade: "baixa" | "media" | "alta";
  status: "aberta" | "concluida";
  local: string | null;
  created_at: string;
};

const SEED_OCORRENCIAS: DemoOcorrencia[] = [
  { id: "ocorrencia-1", equipe_id: DEMO_EQUIPE_ID, criado_por: "membro-1", titulo: "Queda de paciente registrada", descricao: "Paciente do leito 12 apresentou queda ao se levantar sem assistência. Sinais vitais estáveis, sem lesões aparentes. Médico plantonista avisado.", tipo: "Segurança do paciente", gravidade: "alta", status: "aberta", local: "Ala B — Leito 12", created_at: horarioHoje("08:40") },
  { id: "ocorrencia-2", equipe_id: DEMO_EQUIPE_ID, criado_por: "membro-2", titulo: "Falta de insumos de curativo", descricao: "Estoque de gaze estéril e atadura crepe baixo, precisa reposição urgente do almoxarifado.", tipo: "Almoxarifado", gravidade: "media", status: "aberta", local: "Almoxarifado central", created_at: horarioHoje("09:15") },
  { id: "ocorrencia-3", equipe_id: DEMO_EQUIPE_ID, criado_por: "membro-2", titulo: "Monitor com bateria baixa", descricao: "Monitor multiparâmetro do leito 07 apresentando alerta de bateria fraca mesmo conectado.", tipo: "Equipamento", gravidade: "baixa", status: "aberta", local: "Ala A — Leito 07", created_at: horarioHoje("10:02") },
  { id: "ocorrencia-4", equipe_id: DEMO_EQUIPE_ID, criado_por: "membro-1", titulo: "Repasse de plantão incompleto", descricao: "Passagem do plantão anterior não mencionou troca de curativo pendente do leito 03.", tipo: "Comunicação", gravidade: "media", status: "concluida", local: null, created_at: horarioHoje("07:20", -1) },
  { id: "ocorrencia-5", equipe_id: DEMO_EQUIPE_ID, criado_por: "membro-4", titulo: "Visitante fora do horário", descricao: "Visitante encontrado na ala fora do horário autorizado, orientado e encaminhado à recepção.", tipo: "Rotina", gravidade: "baixa", status: "concluida", local: "Ala B", created_at: horarioHoje("22:10", -1) },
];

/* ---------- FOLGAS ---------- */
export type DemoFolga = {
  id: string;
  filial_id: string;
  membro_id: string | null;
  membro_troca_id: string | null;
  tipo: "folga" | "troca";
  data_inicio: string;
  data_fim: string;
  motivo: string | null;
  status: "aprovada" | "pendente" | "recusada";
  created_at: string;
};

const SEED_FOLGAS: DemoFolga[] = [
  { id: "folga-1", filial_id: DEMO_FILIAL_ID, membro_id: "membro-3", membro_troca_id: null, tipo: "folga", data_inicio: hojeISOLocal(4), data_fim: hojeISOLocal(5), motivo: "Consulta médica", status: "pendente", created_at: horarioHoje("09:00") },
  { id: "folga-2", filial_id: DEMO_FILIAL_ID, membro_id: "membro-4", membro_troca_id: "membro-2", tipo: "troca", data_inicio: hojeISOLocal(2), data_fim: hojeISOLocal(2), motivo: "Compromisso familiar", status: "pendente", created_at: horarioHoje("11:30") },
  { id: "folga-3", filial_id: DEMO_FILIAL_ID, membro_id: "membro-5", membro_troca_id: null, tipo: "folga", data_inicio: hojeISOLocal(-6), data_fim: hojeISOLocal(-5), motivo: "Férias", status: "aprovada", created_at: horarioHoje("08:00", -8) },
];

/* ---------- PASSAGENS DE TURNO ---------- */
export type DemoPassagem = {
  id: string;
  equipe_id: string;
  turno_id: string | null;
  data: string;
  resumo: string | null;
  assinado_por: string | null;
  hash_assinatura: string | null;
  ip_assinatura: string | null;
  device_assinatura: string | null;
  assinado_em: string | null;
  created_at: string;
};

const SEED_PASSAGENS: DemoPassagem[] = [
  {
    id: "passagem-1", equipe_id: DEMO_EQUIPE_ID, turno_id: "turno-1", data: hojeISOLocal(0),
    resumo: "Plantão da manhã com 3 ocorrências registradas, sendo 1 crítica (queda de paciente no leito 12, sem lesões, médico já avisado). Estoque de curativos precisa de reposição. Equipe completa, sem ausências.",
    assinado_por: "Ana Beatriz Souza", hash_assinatura: "7a1c9e2f4b8d3e6a1f0c9b8a7d6e5f4c3b2a1908f7e6d5c4b3a2918f7e6d5c4b",
    ip_assinatura: "127.0.0.1", device_assinatura: "Chrome · Windows", assinado_em: horarioHoje("15:03"), created_at: horarioHoje("15:03"),
  },
  {
    id: "passagem-2", equipe_id: DEMO_EQUIPE_ID, turno_id: "turno-2", data: hojeISOLocal(-1),
    resumo: "Plantão tranquilo, sem ocorrências críticas. Repasse do plantão anterior corrigido e concluído. Visitante fora de horário orientado sem intercorrências.",
    assinado_por: "Fernanda Ramos", hash_assinatura: "1908f7e6d5c4b3a2918f7e6d5c4b3a2917a1c9e2f4b8d3e6a1f0c9b8a7d6e5f",
    ip_assinatura: "127.0.0.1", device_assinatura: "Safari · iPhone", assinado_em: horarioHoje("23:05", -1), created_at: horarioHoje("23:05", -1),
  },
  {
    id: "passagem-3", equipe_id: DEMO_EQUIPE_ID, turno_id: "turno-3", data: hojeISOLocal(-2),
    resumo: "Noite de rotina, todos os leitos monitorados. Nenhuma ocorrência de gravidade média ou alta registrada.",
    assinado_por: "João Pedro Alves", hash_assinatura: "3b2a1908f7e6d5c4b3a2918f7e6d5c4b3a291908f7e6d5c4b3a2918f7e6d5c4",
    ip_assinatura: "127.0.0.1", device_assinatura: "Chrome · Android", assinado_em: horarioHoje("07:02", -2), created_at: horarioHoje("07:02", -2),
  },
];

/* ---------- TIPOS DE OCORRÊNCIA ---------- */
export type DemoTipoOcorrencia = {
  id: string;
  filial_id: string;
  nome: string;
  gravidade_default: "baixa" | "media" | "alta";
};

const SEED_TIPOS_OCORRENCIA: DemoTipoOcorrencia[] = [
  { id: "tipo-1", filial_id: DEMO_FILIAL_ID, nome: "Segurança do paciente", gravidade_default: "alta" },
  { id: "tipo-2", filial_id: DEMO_FILIAL_ID, nome: "Almoxarifado", gravidade_default: "media" },
  { id: "tipo-3", filial_id: DEMO_FILIAL_ID, nome: "Equipamento", gravidade_default: "baixa" },
  { id: "tipo-4", filial_id: DEMO_FILIAL_ID, nome: "Comunicação", gravidade_default: "media" },
  { id: "tipo-5", filial_id: DEMO_FILIAL_ID, nome: "Rotina", gravidade_default: "baixa" },
];

/* ---------- NOTAS PRIVADAS ---------- */
export type DemoNota = {
  id: string;
  user_id: string;
  filial_id: string;
  titulo: string;
  conteudo: string | null;
  destinatario_user_id: string | null;
  created_at: string;
};

const SEED_NOTAS: DemoNota[] = [
  { id: "nota-1", user_id: DEMO_USER_ID, filial_id: DEMO_FILIAL_ID, titulo: "Renovar contrato de manutenção do desfibrilador", conteudo: "Vence dia 15, já pedir orçamento novo.", destinatario_user_id: null, created_at: horarioHoje("09:40") },
  { id: "nota-2", user_id: DEMO_USER_ID, filial_id: DEMO_FILIAL_ID, titulo: "Checar certificado da Fernanda", conteudo: "Antes de colocar ela na próxima escala de fim de semana.", destinatario_user_id: null, created_at: horarioHoje("14:10", -1) },
];

/* ---------- estado mutável (reseta a cada reload de página) ---------- */
export const demoStore = {
  cargos: [...SEED_CARGOS],
  membros: [...SEED_MEMBROS],
  turnos: [...SEED_TURNOS],
  ocorrencias: [...SEED_OCORRENCIAS],
  folgas: [...SEED_FOLGAS],
  passagens: [...SEED_PASSAGENS],
  notas: [...SEED_NOTAS],
  tiposOcorrencia: [...SEED_TIPOS_OCORRENCIA],
};
