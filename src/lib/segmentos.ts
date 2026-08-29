export type Subcategoria = {
  id: string;
  nome: string;
  cargosSugeridos: { nome: string; cor: string }[];
  tiposOcorrencia: { nome: string; gravidade_default: "baixa" | "media" | "alta" }[];
  turnosSugeridos: { nome: string; inicio: string; fim: string }[];
};

export type SegmentoTopo = {
  id: string;
  nome: string;
  descricao: string;
  exemplos: string;
  subs: Subcategoria[];
};

const turnos24h = [
  { nome: "Manhã", inicio: "06:00", fim: "14:00" },
  { nome: "Tarde", inicio: "14:00", fim: "22:00" },
  { nome: "Noite", inicio: "22:00", fim: "06:00" },
];

const turnoComercial = [{ nome: "Comercial", inicio: "08:00", fim: "18:00" }];

const subOutras: Subcategoria = {
  id: "outras",
  nome: "Outras",
  cargosSugeridos: [],
  tiposOcorrencia: [],
  turnosSugeridos: [],
};

export const SEGMENTOS: SegmentoTopo[] = [
  {
    id: "saude",
    nome: "Saúde",
    descricao: "Setor da saúde",
    exemplos: "Hospitais, clínicas, equipes assistenciais, home care, laboratórios",
    subs: [
      {
        id: "enfermagem",
        nome: "Enfermagem",
        cargosSugeridos: [
          { nome: "Enfermeiro(a)", cor: "#2a917a" },
          { nome: "Técnico(a) de enfermagem", cor: "#4f46e5" },
          { nome: "Auxiliar de enfermagem", cor: "#0ea5e9" },
        ],
        tiposOcorrencia: [
          { nome: "Queda de paciente", gravidade_default: "alta" },
          { nome: "Reação adversa a medicação", gravidade_default: "alta" },
          { nome: "Falta de material", gravidade_default: "media" },
          { nome: "Erro de prescrição", gravidade_default: "alta" },
        ],
        turnosSugeridos: turnos24h,
      },
      {
        id: "farmacia",
        nome: "Farmácia hospitalar",
        cargosSugeridos: [
          { nome: "Farmacêutico(a)", cor: "#2a917a" },
          { nome: "Auxiliar de farmácia", cor: "#0ea5e9" },
          { nome: "Estoquista", cor: "#f59e0b" },
        ],
        tiposOcorrencia: [
          { nome: "Falta de medicamento", gravidade_default: "alta" },
          { nome: "Erro de dispensação", gravidade_default: "alta" },
          { nome: "Validade vencendo", gravidade_default: "media" },
          { nome: "Divergência de estoque", gravidade_default: "media" },
        ],
        turnosSugeridos: turnos24h,
      },
      {
        id: "almoxarifado",
        nome: "Almoxarifado clínico",
        cargosSugeridos: [
          { nome: "Almoxarife", cor: "#2a917a" },
          { nome: "Auxiliar de almoxarifado", cor: "#0ea5e9" },
        ],
        tiposOcorrencia: [
          { nome: "Ruptura de estoque", gravidade_default: "alta" },
          { nome: "Divergência de inventário", gravidade_default: "media" },
          { nome: "Pedido urgente", gravidade_default: "media" },
        ],
        turnosSugeridos: turnos24h,
      },
      {
        id: "higienizacao",
        nome: "Higienização hospitalar",
        cargosSugeridos: [
          { nome: "Supervisor(a) de limpeza", cor: "#2a917a" },
          { nome: "Auxiliar de limpeza", cor: "#0ea5e9" },
        ],
        tiposOcorrencia: [
          { nome: "Limpeza terminal pendente", gravidade_default: "media" },
          { nome: "Falta de insumo", gravidade_default: "media" },
          { nome: "Acidente com material biológico", gravidade_default: "alta" },
        ],
        turnosSugeridos: turnos24h,
      },
      {
        id: "nutricao",
        nome: "Nutrição e cozinha",
        cargosSugeridos: [
          { nome: "Nutricionista", cor: "#2a917a" },
          { nome: "Cozinheiro(a)", cor: "#f59e0b" },
          { nome: "Auxiliar de cozinha", cor: "#0ea5e9" },
        ],
        tiposOcorrencia: [
          { nome: "Dieta especial não entregue", gravidade_default: "alta" },
          { nome: "Falta de insumo", gravidade_default: "media" },
          { nome: "Atraso na refeição", gravidade_default: "media" },
        ],
        turnosSugeridos: turnos24h,
      },
      {
        id: "recepcao-saude",
        nome: "Recepção / Atendimento",
        cargosSugeridos: [
          { nome: "Recepcionista", cor: "#2a917a" },
          { nome: "Atendente", cor: "#0ea5e9" },
        ],
        tiposOcorrencia: [
          { nome: "Fila excessiva", gravidade_default: "media" },
          { nome: "Reclamação de paciente", gravidade_default: "media" },
          { nome: "Falha no sistema", gravidade_default: "media" },
        ],
        turnosSugeridos: turnos24h,
      },
      {
        id: "laboratorio",
        nome: "Laboratório",
        cargosSugeridos: [
          { nome: "Biomédico(a)", cor: "#2a917a" },
          { nome: "Técnico(a) de laboratório", cor: "#0ea5e9" },
        ],
        tiposOcorrencia: [
          { nome: "Amostra perdida / contaminada", gravidade_default: "alta" },
          { nome: "Equipamento parado", gravidade_default: "alta" },
          { nome: "Reagente em falta", gravidade_default: "media" },
        ],
        turnosSugeridos: turnos24h,
      },
      {
        id: "home-care",
        nome: "Home care",
        cargosSugeridos: [
          { nome: "Enfermeiro(a) home care", cor: "#2a917a" },
          { nome: "Cuidador(a)", cor: "#0ea5e9" },
        ],
        tiposOcorrencia: [
          { nome: "Intercorrência clínica", gravidade_default: "alta" },
          { nome: "Falta de insumo", gravidade_default: "media" },
          { nome: "Visita não realizada", gravidade_default: "media" },
        ],
        turnosSugeridos: turnos24h,
      },
      {
        id: "administracao-saude",
        nome: "Administração",
        cargosSugeridos: [
          { nome: "Coordenador(a)", cor: "#2a917a" },
          { nome: "Assistente administrativo", cor: "#0ea5e9" },
        ],
        tiposOcorrencia: [
          { nome: "Falha em sistema", gravidade_default: "media" },
          { nome: "Documento pendente", gravidade_default: "baixa" },
        ],
        turnosSugeridos: turnoComercial,
      },
      subOutras,
    ],
  },
  {
    id: "logistica",
    nome: "Logística",
    descricao: "Operações logísticas e transporte",
    exemplos: "Armazéns, transportadoras, distribuição, last-mile",
    subs: [
      {
        id: "operador-logistico",
        nome: "Operador logístico",
        cargosSugeridos: [
          { nome: "Operador(a) de empilhadeira", cor: "#2a917a" },
          { nome: "Conferente", cor: "#0ea5e9" },
          { nome: "Separador(a)", cor: "#f59e0b" },
        ],
        tiposOcorrencia: [
          { nome: "Avaria de carga", gravidade_default: "alta" },
          { nome: "Divergência no picking", gravidade_default: "media" },
          { nome: "Falha de equipamento", gravidade_default: "media" },
        ],
        turnosSugeridos: turnos24h,
      },
      {
        id: "armazenagem",
        nome: "Armazenagem (WMS)",
        cargosSugeridos: [
          { nome: "Líder de armazém", cor: "#2a917a" },
          { nome: "Conferente", cor: "#0ea5e9" },
        ],
        tiposOcorrencia: [
          { nome: "Endereçamento errado", gravidade_default: "media" },
          { nome: "Produto vencido", gravidade_default: "alta" },
          { nome: "Inventário divergente", gravidade_default: "media" },
        ],
        turnosSugeridos: turnos24h,
      },
      {
        id: "conferencia",
        nome: "Conferência e expedição",
        cargosSugeridos: [
          { nome: "Conferente", cor: "#2a917a" },
          { nome: "Auxiliar de expedição", cor: "#0ea5e9" },
        ],
        tiposOcorrencia: [
          { nome: "Carga divergente", gravidade_default: "alta" },
          { nome: "Etiqueta errada", gravidade_default: "media" },
        ],
        turnosSugeridos: turnos24h,
      },
      {
        id: "distribuicao",
        nome: "Distribuição / Transporte",
        cargosSugeridos: [
          { nome: "Motorista", cor: "#2a917a" },
          { nome: "Ajudante", cor: "#0ea5e9" },
          { nome: "Roteirizador", cor: "#f59e0b" },
        ],
        tiposOcorrencia: [
          { nome: "Atraso na entrega", gravidade_default: "media" },
          { nome: "Veículo com defeito", gravidade_default: "alta" },
          { nome: "Devolução de carga", gravidade_default: "media" },
        ],
        turnosSugeridos: turnos24h,
      },
      {
        id: "last-mile",
        nome: "Last-mile",
        cargosSugeridos: [
          { nome: "Entregador(a)", cor: "#2a917a" },
          { nome: "Coordenador(a) de rota", cor: "#0ea5e9" },
        ],
        tiposOcorrencia: [
          { nome: "Entrega não realizada", gravidade_default: "alta" },
          { nome: "Endereço incorreto", gravidade_default: "media" },
        ],
        turnosSugeridos: turnos24h,
      },
      {
        id: "pcp",
        nome: "Planejamento e controle",
        cargosSugeridos: [
          { nome: "Analista de PCP", cor: "#2a917a" },
          { nome: "Coordenador(a)", cor: "#0ea5e9" },
        ],
        tiposOcorrencia: [
          { nome: "Ruptura de SKU", gravidade_default: "alta" },
          { nome: "Atraso de fornecedor", gravidade_default: "media" },
        ],
        turnosSugeridos: turnoComercial,
      },
      subOutras,
    ],
  },
  {
    id: "hotelaria",
    nome: "Hotelaria",
    descricao: "Hospedagem e eventos",
    exemplos: "Hotéis, pousadas, resorts, centros de eventos",
    subs: [
      {
        id: "recepcao",
        nome: "Recepção",
        cargosSugeridos: [
          { nome: "Recepcionista", cor: "#2a917a" },
          { nome: "Concierge", cor: "#0ea5e9" },
        ],
        tiposOcorrencia: [
          { nome: "Overbooking", gravidade_default: "alta" },
          { nome: "Reclamação de hóspede", gravidade_default: "media" },
          { nome: "Falha no sistema PMS", gravidade_default: "media" },
        ],
        turnosSugeridos: turnos24h,
      },
      {
        id: "governanca",
        nome: "Governança / Camareira",
        cargosSugeridos: [
          { nome: "Camareira", cor: "#2a917a" },
          { nome: "Supervisora de andar", cor: "#0ea5e9" },
        ],
        tiposOcorrencia: [
          { nome: "Limpeza de quarto pendente", gravidade_default: "media" },
          { nome: "Falta de enxoval", gravidade_default: "media" },
          { nome: "Objeto esquecido", gravidade_default: "baixa" },
        ],
        turnosSugeridos: turnos24h,
      },
      {
        id: "a-e-b",
        nome: "A&B (Alimentos e bebidas)",
        cargosSugeridos: [
          { nome: "Garçom / Garçonete", cor: "#2a917a" },
          { nome: "Cozinheiro(a)", cor: "#f59e0b" },
          { nome: "Maître", cor: "#0ea5e9" },
        ],
        tiposOcorrencia: [
          { nome: "Atraso no serviço", gravidade_default: "media" },
          { nome: "Falta de insumo", gravidade_default: "media" },
          { nome: "Reclamação de cliente", gravidade_default: "media" },
        ],
        turnosSugeridos: turnos24h,
      },
      {
        id: "manutencao-predial",
        nome: "Manutenção predial",
        cargosSugeridos: [
          { nome: "Técnico(a) de manutenção", cor: "#2a917a" },
          { nome: "Eletricista", cor: "#0ea5e9" },
        ],
        tiposOcorrencia: [
          { nome: "Equipamento quebrado", gravidade_default: "alta" },
          { nome: "Reparo pendente", gravidade_default: "media" },
        ],
        turnosSugeridos: turnos24h,
      },
      {
        id: "seguranca-portaria",
        nome: "Segurança / Portaria",
        cargosSugeridos: [
          { nome: "Porteiro(a)", cor: "#2a917a" },
          { nome: "Vigilante", cor: "#0ea5e9" },
        ],
        tiposOcorrencia: [
          { nome: "Incidente de segurança", gravidade_default: "alta" },
          { nome: "Acesso não autorizado", gravidade_default: "alta" },
        ],
        turnosSugeridos: turnos24h,
      },
      {
        id: "eventos",
        nome: "Eventos",
        cargosSugeridos: [
          { nome: "Coordenador(a) de eventos", cor: "#2a917a" },
          { nome: "Auxiliar de eventos", cor: "#0ea5e9" },
        ],
        tiposOcorrencia: [
          { nome: "Atraso na montagem", gravidade_default: "media" },
          { nome: "Falha de áudio/vídeo", gravidade_default: "alta" },
        ],
        turnosSugeridos: turnos24h,
      },
      {
        id: "administracao-hotel",
        nome: "Administração",
        cargosSugeridos: [
          { nome: "Gerente", cor: "#2a917a" },
          { nome: "Assistente administrativo", cor: "#0ea5e9" },
        ],
        tiposOcorrencia: [
          { nome: "Documento pendente", gravidade_default: "baixa" },
        ],
        turnosSugeridos: turnoComercial,
      },
      subOutras,
    ],
  },
  {
    id: "seguranca",
    nome: "Segurança",
    descricao: "Segurança patrimonial e privada",
    exemplos: "Vigilância patrimonial, portaria, monitoramento, eventos",
    subs: [
      {
        id: "vigilancia-patrimonial",
        nome: "Vigilância patrimonial",
        cargosSugeridos: [
          { nome: "Vigilante", cor: "#2a917a" },
          { nome: "Supervisor(a)", cor: "#0ea5e9" },
        ],
        tiposOcorrencia: [
          { nome: "Tentativa de invasão", gravidade_default: "alta" },
          { nome: "Equipamento de segurança avariado", gravidade_default: "alta" },
          { nome: "Acesso não autorizado", gravidade_default: "alta" },
        ],
        turnosSugeridos: turnos24h,
      },
      {
        id: "portaria",
        nome: "Portaria",
        cargosSugeridos: [
          { nome: "Porteiro(a)", cor: "#2a917a" },
          { nome: "Controlador(a) de acesso", cor: "#0ea5e9" },
        ],
        tiposOcorrencia: [
          { nome: "Visita não cadastrada", gravidade_default: "media" },
          { nome: "Reclamação de morador", gravidade_default: "baixa" },
          { nome: "Falha de portão / catraca", gravidade_default: "media" },
        ],
        turnosSugeridos: turnos24h,
      },
      {
        id: "monitoramento",
        nome: "Monitoramento (CFTV)",
        cargosSugeridos: [
          { nome: "Operador(a) de CFTV", cor: "#2a917a" },
          { nome: "Supervisor(a)", cor: "#0ea5e9" },
        ],
        tiposOcorrencia: [
          { nome: "Câmera offline", gravidade_default: "media" },
          { nome: "Evento suspeito detectado", gravidade_default: "alta" },
          { nome: "Disparo de alarme", gravidade_default: "alta" },
        ],
        turnosSugeridos: turnos24h,
      },
      {
        id: "ronda",
        nome: "Ronda motorizada",
        cargosSugeridos: [
          { nome: "Rondante", cor: "#2a917a" },
          { nome: "Coordenador(a) de ronda", cor: "#0ea5e9" },
        ],
        tiposOcorrencia: [
          { nome: "Ronda não cumprida", gravidade_default: "media" },
          { nome: "Veículo com defeito", gravidade_default: "media" },
        ],
        turnosSugeridos: turnos24h,
      },
      {
        id: "seguranca-eventos",
        nome: "Segurança de eventos",
        cargosSugeridos: [
          { nome: "Agente de segurança", cor: "#2a917a" },
          { nome: "Coordenador(a)", cor: "#0ea5e9" },
        ],
        tiposOcorrencia: [
          { nome: "Tumulto", gravidade_default: "alta" },
          { nome: "Pessoa sem credencial", gravidade_default: "media" },
        ],
        turnosSugeridos: turnos24h,
      },
      {
        id: "escolta",
        nome: "Escolta",
        cargosSugeridos: [
          { nome: "Escolta armada", cor: "#2a917a" },
          { nome: "Motorista de escolta", cor: "#0ea5e9" },
        ],
        tiposOcorrencia: [
          { nome: "Rota comprometida", gravidade_default: "alta" },
          { nome: "Veículo com defeito", gravidade_default: "media" },
        ],
        turnosSugeridos: turnos24h,
      },
      subOutras,
    ],
  },
  {
    id: "outros",
    nome: "Outros",
    descricao: "Outra operação",
    exemplos: "Qualquer operação com turnos, equipes e passagens de turno",
    subs: [subOutras],
  },
];

export function findSegmento(subId: string | null | undefined) {
  if (!subId) return null;
  for (const topo of SEGMENTOS) {
    const sub = topo.subs.find((s) => s.id === subId);
    if (sub) return { topo, sub };
  }
  return null;
}

/**
 * Returns a human-friendly label for the selected segment, supporting custom names
 * when the user picked "Outras" and typed their own.
 */
export function getSegmentoLabel(
  topoId: string | null | undefined,
  subId: string | null | undefined,
  customNome?: string | null,
): string {
  if (!topoId) return "";
  const topo = SEGMENTOS.find((t) => t.id === topoId);
  if (!topo) return "";
  const sub = topo.subs.find((s) => s.id === subId);
  const subLabel = sub?.id === "outras" && customNome ? customNome : sub?.nome;
  return subLabel ? `${topo.nome} · ${subLabel}` : topo.nome;
}
