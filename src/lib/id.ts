/** Maakt een nieuwe unieke id (een UUID), die op geen enkel toestel botst. */
export function createId(): string {
  return crypto.randomUUID();
}
