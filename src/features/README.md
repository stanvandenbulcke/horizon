# src/features – de schermen

**Hoort hier:** per onderdeel van de app één mapje (`home/`, `map/`, `islands/`, …).
In zo'n mapje:

- het scherm zelf (bv. `HomeScreen.tsx`) met zijn stijl (`HomeScreen.module.css`)
- `components/` – kleinere blokjes die alleen dit scherm gebruikt
- `hooks/` – hulpjes die alleen dit scherm gebruikt
- `paths.ts` – de adressen van de schermen van deze feature (bv. `/settings/routines`)
- `index.ts` – de **voordeur**: wat andere delen van de app mogen gebruiken

**Regel:** een feature gebruikt een andere feature alleen via haar `index.ts`.
Iets dat meerdere features nodig hebben, hoort in `ui/` of `lib/`.

**Mag gebruiken:** alles behalve `app/`.
