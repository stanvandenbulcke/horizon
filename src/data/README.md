# src/data – de opslag

**Hoort hier:** alles wat met bewaren te maken heeft.

- `db.ts` – de database (Dexie): welke tabellen er zijn, en hun versies
- `repositories/` – per soort data één bestand met opslaan, ophalen en wissen
- `hooks/` – hulpjes waarmee een scherm "meeluistert" met de data (`useRoutines`, …) en met de
  speldag van vandaag (`useGameDay`, die om 04:00 vanzelf wisselt)
- `records.ts` – de vaste velden van een nieuwe rij (id, tijdstippen)
- `persistentStorage.ts` – de browser vragen om je gegevens niet te wissen
- `backup/` – export en import als JSON-bestand

**Hoort hier niet:** spelregels (→ `game/`), schermen (→ `features/`).

**Mag gebruiken:** `game/` (voor de vorm van de data) en `lib/`.
