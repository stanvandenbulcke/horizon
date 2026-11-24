/**
 * Alle getallen voor hoe de 3D-wereld eruitziet en aanvoelt (camera, zoom, maten).
 * De spelregels staan in src/game/config.ts; dit hier is puur uitzicht.
 */
export const worldConfig = {
  camera: {
    /** Waar de camera staat ten opzichte van het punt waar ze naar kijkt: schuin van boven */
    offset: [24, 30, 24] as const,
    startZoom: 26,
    minZoom: 12,
    maxZoom: 75,
  },
  /** Waar de zon staat (voor het licht op eilanden en de glinstering op het water) */
  sunDirection: [8, 14, 5] as const,
  /** Hoe ver voorbij het verste eiland je nog mag schuiven */
  panMargin: 10,
  /** Minimaal schuifgebied, ook als er nog geen eilanden zijn */
  minPanLimit: 16,
  /** Hoeveel pixels je vinger mag bewegen en het toch nog een tik is (geen sleep) */
  tapTolerance: 8,
  /** Hoe lang de golfjes en wolkjes blijven bewegen na je laatste aanraking (ms) */
  ambientAwakeMs: 20000,
  sea: {
    size: 260,
    segments: 160,
  },
  /** Hoe hoog de naambordjes boven de eilanden zweven */
  labelHeight: {
    home: 3.4,
    goal: 3.8,
    sideQuest: 2.4,
  },
  island: {
    homeRadius: 3.6,
    goalRadius: 2.3,
    sideQuestRadius: 1.3,
    /** Hoogte van het gras boven het water */
    landHeight: 0.65,
  },
  bridge: {
    /** Hoe lang de brug is, van de steiger tot het eiland */
    length: 4.6,
    planks: 12,
  },
  fog: {
    /** Maximaal aantal wolkjes boven een groot eiland */
    puffsPerIsland: 14,
    puffsPerSideQuest: 6,
    /** Aantal wolken in de ring rond de bekende wereld */
    ringPuffs: 46,
    ringDistance: 9,
  },
} as const;
