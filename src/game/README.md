# src/game – de spelregels

**Hoort hier:** puur rekenwerk. Hoeveel schelpen krijg ik? Is mijn dagdoel gehaald? Hoe lang
is mijn streak? Slaapt dit eiland? Elke functie krijgt gegevens binnen en geeft een antwoord
terug, zonder iets op te slaan of te tekenen.

- `config.ts` – **alle** spelgetallen (prijs van een schild, dagwissel om 04:00, …)
- `model/` – hoe de data eruitziet (Island, Routine, …)
- per onderwerp een mapje (`streak/`, `shells/`, …) met de regels én hun tests
- `ordering.ts` – iets omhoog of omlaag schuiven in een lijst (routines, stappen, …)
- `testing/` – kleine hulpjes om in tests snel voorbeelddata te maken (niet voor de app zelf)

**Hoort hier niet:** React, 3D, de database, teksten op het scherm.

**Mag gebruiken:** alleen `lib/`. Zo blijven de regels testbaar, en kunnen ze later mee
naar een echte iPhone-app.
