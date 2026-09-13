// Datas vindas do banco (coluna `date`, formato "YYYY-MM-DD") não podem passar por
// `new Date(string)` direto: o JS interpreta como UTC meia-noite, e ao formatar de
// volta no fuso local (Brasil, UTC-3) o dia "volta" um dia. Essas funções evitam isso
// construindo a Date a partir dos componentes locais.

export function dataLocal(dataISO: string): Date {
  const [y, m, d] = dataISO.slice(0, 10).split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function formatDataBR(dataISO: string): string {
  return dataLocal(dataISO).toLocaleDateString("pt-BR");
}

export function hojeISO(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dia = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dia}`;
}
