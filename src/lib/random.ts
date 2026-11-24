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
 * Kiest altijd hetzelfde item voor hetzelfde zaadje (seed), bv. de dag van vandaag.
 * Zo verandert een tekst niet bij elke klik, maar wel elke dag.
 */
export function pickBySeed<T>(items: readonly T[], seed: string): T {
  // Een eenvoudige hash (FNV-1a): zet de tekst om in een getal
  let hash = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    hash = Math.imul(hash ^ seed.charCodeAt(i), 16777619);
  }
  // Goed door elkaar husselen, zodat bijna-gelijke zaadjes (zoals opeenvolgende dagen)
  // toch heel verschillende getallen geven
  hash ^= hash >>> 16;
  hash = Math.imul(hash, 0x85ebca6b);
  hash ^= hash >>> 13;
  hash = Math.imul(hash, 0xc2b2ae35);
  hash ^= hash >>> 16;
  return pickRandom(items, () => (hash >>> 0) / 2 ** 32);
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
