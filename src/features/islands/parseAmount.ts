/**
 * Leest een getal zoals je het intypt, ook met een komma (12,50) of spaties (1 000).
 * Geeft null als er geen geldig getal staat.
 */
export function parseAmount(text: string): number | null {
  const normalized = text.replace(/\s/g, '').replace(',', '.');
  if (normalized === '') return null;
  const value = Number(normalized);
  return Number.isFinite(value) ? value : null;
}
