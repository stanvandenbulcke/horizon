// Jubelteksten voor de feestladder. Per situatie een paar varianten, zodat het fris blijft.
export const celebrationTexts = {
  goalReached: (name: string) => [
    `Dagdoel gehaald! ${name} groeit een beetje.`,
    `Amai! ${name} krijgt een groeipunt.`,
    `Goe bezig! Er groeit iets nieuws in de tuin.`,
  ],
  landmark: ['Land in zicht!', 'Amai, bezienswaardigheid bereikt!', 'Goe bezig, kapitein!'],
  pillar: ['Pijler geplaatst! 🏛️', 'Weer een pijler erbij. Stevig!', 'De brug groeit!'],
  island: ['Eiland verkend! 🏆', 'Allee, dat eiland is van u!', 'Land veroverd, kapitein! 🎉'],
  hatched: ['Er kwam een wezentje uit het ei! 🥚', 'Krak! Een nieuw wezentje!'],
} as const;
