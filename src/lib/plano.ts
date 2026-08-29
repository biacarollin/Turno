import { useEffect, useState } from "react";

export type PlanoId = "gratis" | "basico" | "equipe" | "profissional" | "enterprise";

const KEY = "turno-plano-ativo";
const DEFAULT: PlanoId = "gratis";

export const PLANOS: Array<{
  id: PlanoId;
  nome: string;
  preco: string;
  precoNumero: number;
  membros: string;
  beneficios: string[];
  destaque?: boolean;
  sobConsulta?: boolean;
}> = [
  {
    id: "gratis",
    nome: "Grátis",
    preco: "R$ 0/mês",
    precoNumero: 0,
    membros: "Até 3 membros",
    beneficios: [
      "Uso ilimitado no tempo",
      "Passagens de turno",
      "Histórico 7 dias",
      "App mobile + painel web simples",
    ],
  },
  {
    id: "basico",
    nome: "Básico",
    preco: "R$ 69/mês",
    precoNumero: 69,
    membros: "Até 8 membros",
    beneficios: [
      "Tudo do Grátis +",
      "Resumo com IA ao encerrar turno",
      "Assinatura digital nas passagens",
      "Histórico 90 dias",
      "Suporte por e-mail (até 72h úteis)",
    ],
  },
  {
    id: "equipe",
    nome: "Equipe",
    preco: "R$ 159/mês",
    precoNumero: 159,
    membros: "Até 20 membros",
    destaque: true,
    beneficios: [
      "Tudo do Básico +",
      "Análises por IA",
      "Histórico 1 ano",
      "Notas privadas do gestor",
    ],
  },
  {
    id: "profissional",
    nome: "Profissional",
    preco: "R$ 289/mês",
    precoNumero: 289,
    membros: "Até 50 membros",
    beneficios: [
      "Tudo do Equipe +",
      "Multi-unidade (até 5, diluindo os 50 membros)",
      "Exportação em PDF",
      "Relatórios avançados + Chat IA 24/7",
      "Histórico ilimitado",
      "Suporte 24/7",
    ],
  },
  {
    id: "enterprise",
    nome: "Enterprise",
    preco: "Sob consulta",
    precoNumero: 9999,
    membros: "Acima de 50 membros",
    beneficios: [
      "Tudo do Profissional +",
      "Multi-unidade ilimitada",
      "SSO (login corporativo)",
      "Onboarding dedicado",
      "SLA contratual + suporte direto",
    ],
    sobConsulta: true,
  },
];

export function getPlanoAtivo(): PlanoId {
  if (typeof window === "undefined") return DEFAULT;
  const v = window.localStorage.getItem(KEY);
  if (v === "gratis" || v === "basico" || v === "equipe" || v === "profissional" || v === "enterprise") return v;
  return DEFAULT;
}

export function setPlanoAtivo(id: PlanoId) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, id);
  window.dispatchEvent(new Event("plano-changed"));
}

export function usePlanoAtivo(): PlanoId {
  const [plano, setPlano] = useState<PlanoId>(DEFAULT);
  useEffect(() => {
    setPlano(getPlanoAtivo());
    const onChange = () => setPlano(getPlanoAtivo());
    window.addEventListener("plano-changed", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("plano-changed", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);
  return plano;
}

export function planoIndex(id: PlanoId): number {
  return PLANOS.findIndex((p) => p.id === id);
}

export function planoPor(id: PlanoId) {
  return PLANOS.find((p) => p.id === id)!;
}