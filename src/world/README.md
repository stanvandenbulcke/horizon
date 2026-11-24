# src/world – de 3D-wereld

**Hoort hier:** alles wat je in 3D ziet, gebouwd met react-three-fiber.

- `scene/` – het canvas, de camera (schuiven en zoomen), het licht, het dag-en-nachtgevoel
- `sea/` – de zee en haar golfjes (met een eigen shader)
- `fog/` – de mistwolkjes boven eilanden en de mistring rond de bekende wereld
- `islands/` – je thuiseiland en de doeleilanden
- `decor/` – losse decorstukken, gebouwd uit eenvoudige vormen: palmboom, hutje, vuurtoren, …
- `labels/` – de naambordjes boven de eilanden (gewone HTML die meeschuift met de kaart)
- `materials.ts` – alle kleuren/materialen, één keer gemaakt en hergebruikt
- `worldConfig.ts` – alle getallen voor het uitzicht (zoom, maten, aantal wolkjes)
- `types.ts` – wat de wereld van een eiland moet weten om het te tekenen

**Belangrijk:** de 3D-wereld leest zelf niets uit de database. Het scherm dat de wereld toont
(`features/map/`) geeft de data door, en de wereld meldt terug als je ergens op tikt.

**Zuinig blijven:** de wereld tekent alleen als er iets beweegt. Golfjes en wolkjes bewegen nog
20 seconden na je laatste aanraking, daarna staat alles stil.

**Hoort hier niet:** knoppen en teksten bovenop de 3D (→ `features/`).

**Mag gebruiken:** `game/`, `content/`, `audio/`, `lib/`.
