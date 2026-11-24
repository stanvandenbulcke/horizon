/**
 * Alle spelgetallen van Horizon op één plek.
 * Wil je iets bijstellen (bv. het standaard dagdoel)? Dan doe je dat hier, en nergens anders.
 */
export const config = {
  /** Om dit uur (lokale tijd) begint een nieuwe speldag, zodat laat opblijven nog als "vandaag" telt. */
  dayStartHour: 4,

  /** Hoeveel schelpen je per dag wil verdienen. */
  dailyGoal: {
    default: 5,
    min: 1,
    max: 20,
  },

  routine: {
    minShells: 1,
    maxShells: 3,
    maxNameLength: 40,
    /** Icoon voor een routine waarbij je zelf niets koos. */
    fallbackEmoji: '⭐',
  },

  companion: {
    maxNameLength: 20,
  },
} as const;
