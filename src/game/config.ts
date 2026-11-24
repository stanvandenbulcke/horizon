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

  islands: {
    maxNameLength: 40,
    maxStepLength: 60,
    maxUnitLength: 20,
    /** Een pad heeft 1 tot 5 bezienswaardigheden */
    maxLandmarks: 5,
    /** Een side quest begint met 1 tot 3 stappen */
    maxSideQuestSteps: 3,
    /**
     * Hoeveel van de weg naar een bezienswaardigheid je met stappen alleen aflegt.
     * Het laatste stukje is het moment waarop je zelf zegt: "bereikt!"
     */
    stepCredit: 0.9,
    /** De pijlers van een brug staan op 25, 50, 75 en 100% van het doel */
    bridgeThresholds: [0.25, 0.5, 0.75, 1],
  },

  /** Waar eilanden op de kaart komen (in kaarteenheden; je thuiseiland is ±7 breed). */
  map: {
    /** Afstand van het eerste eiland tot je thuiseiland */
    firstRing: 10,
    /** Hoe snel de spiraal van eilanden naar buiten groeit */
    spacing: 6.5,
    /** Minimale afstand tussen twee grote eilanden */
    minDistance: 6.5,
    /** Afstand van een side quest tot zijn hoofdeiland */
    sideQuestDistance: 4.2,
    /** Hoeveel mist er boven een nieuw eiland hangt (1 = alles); je ziet het net nog liggen */
    startFog: 0.85,
  },
} as const;
