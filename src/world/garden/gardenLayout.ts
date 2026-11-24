/** Een plantje in de tuin van je thuiseiland. */
export interface GardenPlant {
  x: number;
  z: number;
  kind: 'flower' | 'bush' | 'sapling';
  /** Kleur van de bloemblaadjes (bij een bloem) */
  color: string;
  scale: number;
}

const petalColors = ['#ff8fa3', '#ffd84d', '#a274ff', '#ff6b5e', '#ffffff', '#5b8cff'];
const kinds: GardenPlant['kind'][] = ['flower', 'flower', 'bush', 'flower', 'sapling'];

/** Plekken waar al iets staat op het thuiseiland (hutje, palmbomen, vlag), met hun "straal". */
const occupied = [
  { x: -0.6, z: -0.5, r: 0.95 },
  { x: 1.2, z: -1.1, r: 0.45 },
  { x: -1.7, z: 0.7, r: 0.45 },
  { x: 1.7, z: 0.4, r: 0.45 },
  { x: -1.3, z: -1.4, r: 0.35 },
  // Voor de deur blijft het vrij: daar staat je reisgezel
  { x: 0.5, z: 0.6, r: 0.75 },
];

/** Alle mogelijke plekjes op het gras, van binnen naar buiten, die nog vrij zijn. */
function freeSpots(): Array<{ x: number; z: number }> {
  const spots: Array<{ x: number; z: number }> = [];
  for (const radius of [1.15, 1.65, 2.15]) {
    const count = Math.round(radius * 7);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + radius;
      const spot = { x: Math.cos(angle) * radius, z: Math.sin(angle) * radius };
      if (occupied.every((o) => Math.hypot(o.x - spot.x, o.z - spot.z) > o.r)) spots.push(spot);
    }
  }
  return spots;
}

const spots = freeSpots();

/** Het grootste aantal plantjes dat op het eiland past. */
export const maxGardenPlants = spots.length;

/**
 * De tuin met `count` plantjes: één per dag dat je je dagdoel haalde.
 * Voor hetzelfde aantal staat alles altijd op dezelfde plek; er komt telkens één bij.
 */
export function gardenLayout(count: number): GardenPlant[] {
  return spots.slice(0, Math.max(0, count)).map((spot, index) => ({
    ...spot,
    kind: kinds[index % kinds.length] ?? 'flower',
    color: petalColors[index % petalColors.length] ?? '#ff8fa3',
    scale: 0.85 + ((index * 37) % 10) / 30,
  }));
}
