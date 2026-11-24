import { Color, MeshBasicMaterial, MeshLambertMaterial } from 'three';

/** Mat materiaal met platte vlakken: geeft de chunky low-poly look en is zuinig. */
function flat(color: string): MeshLambertMaterial {
  return new MeshLambertMaterial({ color, flatShading: true });
}

/**
 * Alle materialen (kleuren) van de wereld, één keer gemaakt en overal hergebruikt.
 * Zo hoeft je iPhone niet voor elke palmboom een nieuw materiaal te maken.
 */
export const materials = {
  sand: flat('#f6cf7a'),
  sandDark: flat('#e0ac5c'),
  grass: flat('#62cf6b'),
  grassDark: flat('#43ad55'),
  trunk: flat('#9a6233'),
  leaf: flat('#36b862'),
  leafDark: flat('#27994f'),
  coconut: flat('#6b4423'),
  wood: flat('#c08a52'),
  woodDark: flat('#7d5130'),
  white: flat('#fdf8ee'),
  roof: flat('#e8604c'),
  rock: flat('#a3afb8'),
  metal: flat('#40525e'),
  // Wolkjes gloeien een beetje zelf, zodat ook hun schaduwkant licht en zacht blijft
  cloud: new MeshLambertMaterial({ color: '#ffffff', emissive: '#b9cad8', flatShading: true }),
  lampOn: new MeshBasicMaterial({ color: '#ffe27a' }),
  lampOff: flat('#6f7f8a'),
  // Wezentjes: gladde vormen (niet plat) zien er zachter en schattiger uit
  eyeWhite: new MeshBasicMaterial({ color: '#ffffff' }),
  pupil: new MeshBasicMaterial({ color: '#1d2433' }),
  cheek: new MeshLambertMaterial({ color: '#ff9fb3' }),
  horn: new MeshLambertMaterial({ color: '#fff1c9' }),
  scarf: new MeshLambertMaterial({ color: '#e8604c' }),
  hat: new MeshLambertMaterial({ color: '#2b3340' }),
  gold: new MeshLambertMaterial({ color: '#ffc53d', emissive: '#7a4f00' }),
  petalCenter: new MeshLambertMaterial({ color: '#ffd84d' }),
};

const creatureBodies = new Map<string, MeshLambertMaterial>();

/** Het lijfje van een wezentje (glad, in de kleur van zijn eiland). Lichter = de buik. */
export function creatureMaterial(color: string, lighter = false): MeshLambertMaterial {
  const key = `${color}-${lighter}`;
  let material = creatureBodies.get(key);
  if (!material) {
    const tone = new Color(color);
    if (lighter) tone.lerp(new Color('#ffffff'), 0.55);
    material = new MeshLambertMaterial({ color: tone });
    creatureBodies.set(key, material);
  }
  return material;
}

const tinted = new Map<string, MeshLambertMaterial>();

/** Een materiaal in de kleur van een eiland (voor vlaggen en vuurtorens). Wordt hergebruikt. */
export function tintMaterial(color: string): MeshLambertMaterial {
  let material = tinted.get(color);
  if (!material) {
    material = flat(color);
    tinted.set(color, material);
  }
  return material;
}
