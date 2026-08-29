/**
 * Máscara para WhatsApp BR: (11) 9 9999-9999 — 11 dígitos.
 * Mantém apenas dígitos e formata progressivamente.
 */
export function formatWhatsapp(input: string): string {
  const digits = input.replace(/\D/g, "").slice(0, 11);
  const len = digits.length;
  if (len === 0) return "";
  if (len <= 2) return `(${digits}`;
  if (len === 3) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (len <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2, 3)} ${digits.slice(3)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 3)} ${digits.slice(3, 7)}-${digits.slice(7)}`;
}

export const WHATSAPP_PLACEHOLDER = "(11) 9 9999-9999";
export const WHATSAPP_MAX_LENGTH = 16; // "(11) 9 9999-9999"