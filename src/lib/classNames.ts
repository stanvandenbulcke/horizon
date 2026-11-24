/**
 * Plakt CSS-klassen aan elkaar en slaat lege waarden over.
 * Bv. `cx(styles.card, done && styles.done)` → "card done" of "card".
 */
export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}
