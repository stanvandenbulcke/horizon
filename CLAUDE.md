# Horizon – projectregels voor Claude

Horizon is een doelen-app die aanvoelt als een spel: een levenskaart vol mist met eilanden
(doelen), wezentjes en een reisgezel. Volledige wensen: `docs/spec/horizon-gigaprompt.md`.
Plan en mijlpalen: `PLAN.md`. Keuzes: `DECISIONS.md`.

## Wie is de gebruiker
- Stan, student, **beginner** in programmeren. Leg alles uit in **eenvoudig Nederlands**.
  Gebruik je een vakterm, leg die dan in één zin uit.
- Werkt op een **Windows-pc** (PowerShell), test op een **iPhone 13 of nieuwer**. Geen Mac.
- **Alles moet gratis zijn:** geen betaalde diensten, geen Apple-ontwikkelaarsaccount, geen abonnementen.

## Werkwijze
- Werk in de **mijlpalen uit PLAN.md**. Na elke mijlpaal:
  1. kort uitleggen wat er gebouwd is,
  2. uitleggen hoe Stan het test op zijn iPhone,
  3. zeggen wat Stan zelf moet doen,
  4. **wachten op akkoord** voor je verdergaat.
- Onduidelijk? **Vraag het** in plaats van te gokken.
- Nieuwe belangrijke keuze → noteer in `DECISIONS.md` (nummer, datum, keuze, waarom).
- Gebruikte gratis asset → noteer in `CREDITS.md` (bron, licentie).
- **Git:** commit na elke werkende stap, met een duidelijk Nederlands bericht dat begint
  met de mijlpaal of soort: `M1: routines afvinken`, `fix: schelpenteller na middernacht`,
  `docs: hostinggids`. Een afgewerkte mijlpaal krijgt een tag (`m0`, `m1`, …).
- Voor je een commit maakt: `npm run check` (types, lint en tests) moet slagen.

## Geordend werken (belangrijk voor Stan)
Elk mapje heeft één taak. Zie PLAN.md §2 voor de volledige boom en "Waar zoek ik als…?".

| Map | Taak | Mag gebruiken |
|---|---|---|
| `src/game/` | spelregels, puur rekenwerk, geen React/3D/database | alleen `lib/` |
| `src/data/` | Dexie-database, repositories, data-hooks, backup | `game/`, `lib/` |
| `src/actions/` | handelingen: regels + opslag samen | `game/`, `data/`, `content/`, `lib/` |
| `src/world/` | alles in 3D (react-three-fiber); krijgt data via props | `game/`, `content/`, `audio/`, `lib/` |
| `src/features/` | schermen, per onderdeel een mapje | alles hierboven + `ui/` |
| `src/ui/` | herbruikbare bouwstenen, weten niets van het spel | `lib/`, `styles/` |
| `src/content/` | alle Nederlandse teksten + standaarddata | `game/` (alleen types) |
| `src/audio/`, `src/lib/`, `src/styles/` | geluid, kleine hulpjes, stijl | `lib/` |

Regels:
- Een feature gebruikt een andere feature alleen via haar `index.ts`.
- **Code in het Engels, commentaar in het Nederlands** (kort, legt het *waarom* uit).
- **Geen tekst in schermcode:** alles wat de gebruiker leest staat in `src/content/texts/`,
  per situatie een lijst met varianten waaruit willekeurig gekozen wordt.
- **Geen losse getallen:** spelgetallen staan in `src/game/config.ts`.
- **Eén component per bestand** (`HomeScreen.tsx`), andere bestanden in camelCase (`streak.ts`).
- **Tests naast het bestand:** `streak.ts` + `streak.test.ts`.
- Bestand groter dan ±200 regels → splitsen.
- Imports via `@/…` (bv. `@/game/streak`), nooit lange `../../../`.
- Elk hoofdmapje in `src/` heeft een kort `README.md` (wat hoort hier wel/niet). Houd die bij.
- Geen dode code, geen uitgecommentarieerde blokken, geen ongebruikte bestanden.
- Nieuw soort ding dat nergens past? Eerst nadenken over de juiste plek, en bij twijfel vragen.

## Datamodel-afspraken
- Wat je kan uitrekenen (streak, record, level, slapend) wordt **niet apart opgeslagen**.
- Schelpen zijn een **kasboek** (`ShellTransaction`); het saldo is de som.
- Elke rij: unieke id (`crypto.randomUUID()`), `updatedAt`, `deletedAt` (klaar voor sync).
- Speldag wisselt om **04:00 lokale tijd**; datums als `YYYY-MM-DD`-tekst van de speldag.
- Export bevat een `schemaVersion`.

## Absolute regels
- ❌ Geen reclame, betalingen, in-app-aankopen, tracking of analytics.
- ❌ Geen schuldgevoel, geen straffen, nooit iets dat je kan verliezen. Wezentjes worden
  nooit ziek, triest of dood.
- ❌ Maximaal 2 meldingen per dag.
- ❌ Maximaal 3 tabs onderaan (Kaart, Thuis, Logboek) + tandwiel rechtsboven.
  Dagelijkse acties in maximaal 2 tikken.
- ✅ Vlot op iPhone: low-poly, `frameloop="demand"`, dpr max 2, beperkte schaduwen,
  zware onderdelen lui laden.
- ✅ Werkt offline.
- ✅ Basistoegankelijkheid: genoeg contrast, leesbare tekst, labels op knoppen,
  grote duimvriendelijke knoppen, safe areas respecteren.

## Toon van de teksten
- Nederlands, kort, **grappig en droog**, met een **piratentoets** ("Ahoy, kapitein!",
  "Land in zicht!") en af en toe een **Vlaams woordje** ("Allee", "Amai", "Goe bezig").
- **Verboden:** schuldgevoel en drama ("Je hebt gefaald", "Je wezentje is triest",
  "Je streak is kapot 😢").

## iPhone-webapp: beperkingen
- Kan niet trillen → schudeffect, partikels, geluid.
- Geen echte widget → Scriptable-widget (fase 1b).
- Pushmeldingen alleen als de app op het beginscherm staat, na toestemming via een knop,
  en met een server die ze verstuurt (fase 1b).
- Safari-tabblad en beginscherm-app hebben aparte opslag: testen in de geïnstalleerde app.

## Commando's (na M0)
- `npm run dev` – app lokaal starten
- `npm run test` – tests draaien
- `npm run check` – types + lint + tests (moet slagen voor elke commit)
- `npm run build` – productieversie bouwen
