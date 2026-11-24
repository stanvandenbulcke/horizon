/** Een functie die een getal van 0 tot (niet tot en met) 1 geeft, zoals Math.random. */
export type RandomSource = () => number;

/** Kiest willekeurig één item uit een lijst. */
export function pickRandom<T>(items: readonly T[], random: RandomSource = Math.random): T {
  if (items.length === 0) {
    throw new Error('pickRandom: de lijst is leeg');
  }
  const index = Math.min(Math.floor(random() * items.length), items.length - 1);
  return items[index] as T;
}

/**
 * Zoals pickRandom, maar nooit twee keer na elkaar hetzelfde.
 * Handig voor teksten en geluiden, zodat het na 200 keer nog fris aanvoelt.
 */
export function pickDifferent<T>(
  items: readonly T[],
  previous: T,
  random: RandomSource = Math.random,
): T {
  const others = items.filter((item) => item !== previous);
  return pickRandom(others.length > 0 ? others : items, random);
}
