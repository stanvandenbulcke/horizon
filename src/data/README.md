# src/data – de opslag

**Hoort hier:** alles wat met bewaren te maken heeft.

- `db.ts` – de database (Dexie): welke tabellen er zijn, en hun versies
- `repositories/` – per soort data één bestand met opslaan, ophalen en wissen
- `hooks/` – hulpjes waarmee een scherm "meeluistert" met de data (`useRoutines`, …)
- `backup/` – export en import als JSON-bestand

**Hoort hier niet:** spelregels (→ `game/`), schermen (→ `features/`).

**Mag gebruiken:** `game/` (voor de vorm van de data) en `lib/`.
