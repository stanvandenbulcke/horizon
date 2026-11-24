# Horizon – Plan

> *Elke stap brengt je horizon dichterbij.*

Dit is het bouwplan van Horizon. De volledige wensenlijst staat in
[docs/spec/horizon-gigaprompt.md](docs/spec/horizon-gigaprompt.md). Belangrijke keuzes en
waarom we ze maakten staan in [DECISIONS.md](DECISIONS.md).

**Status:** ✅ M0 afgewerkt en getest op de iPhone. ✅ M1 en M2 gebouwd (labels `m1`, `m2`),
nog te testen op de iPhone. Online op https://horizon.stanvandenbulck.workers.dev.

---

## 1. Techkeuzes

| Onderdeel | Keuze | Waarom (in één zin) |
|---|---|---|
| Soort app | **PWA** (webapp die je op je beginscherm zet) | Werkt gratis op je iPhone zonder Mac of Apple-account. |
| Bouwgereedschap | **Vite** | Start razendsnel en ververst je scherm meteen als de code verandert. |
| Schermen bouwen | **React** | De bekendste manier om schermen uit losse blokjes te bouwen, met veel uitleg online. |
| Taal | **TypeScript (strict)** | JavaScript met een "spellingscontrole" die fouten vindt voor je ze op je iPhone ziet. |
| 3D-wereld | **react-three-fiber + drei** (three.js) | Laat ons de 3D-kaart als gewone React-blokjes bouwen; een iPhone 13 kan dit vlot aan. |
| Camera | **Vaste schuine camera, orthografisch** | Geeft het diorama-gevoel (geen perspectief-vervorming) en kan later vrijgegeven worden om te draaien. |
| UI-animaties | **Motion** (de nieuwe naam van Framer Motion) | Maakt stuiterende, "juicy" animaties met weinig code. |
| Feestpartikels | **canvas-confetti** | Klein en gratis, en kan schelpjes en sterretjes als confetti gebruiken. |
| Opslag op je toestel | **IndexedDB via Dexie** | De ingebouwde database van de browser, en Dexie maakt die simpel en ververst schermen automatisch. |
| Tijdelijke app-toestand | **Zustand** | Een piepklein hulpmiddel om dingen te delen die niet bewaard moeten worden, zoals "welk feestje speelt nu". |
| Schermwissels | **React Router** | Regelt de 3 tabs, het eilandscherm en instellingen, en laat de terugknop werken. |
| Offline + installeren | **vite-plugin-pwa** | Maakt automatisch het manifest (naam, icoon) en de service worker (het stukje dat de app offline laat werken). |
| Geluid | **Howler.js** | Lost de lastige geluidsregels van Safari op iPhone voor ons op. |
| Datums | **eigen hulpjes** in `src/game/time/` | Een paar kleine, geteste functies voor de dagwissel om 04:00; een extra bibliotheek is niet nodig (zie D19). |
| Lettertypes | **Fredoka** (titels) + **Nunito** (tekst), via Fontsource | Allebei rond en gratis, en we zetten ze in de app zelf zodat ze offline werken. |
| Tests | **Vitest** (+ fake-indexeddb) | Test de spelregels automatisch, zodat een fix later niets anders kapotmaakt. |
| Netheid | **ESLint + Prettier** | Prettier zet alle code automatisch in dezelfde vorm, ESLint bewaakt de regels uit §2. |
| Stijl | **CSS Modules** + CSS-variabelen | Gewone CSS naast elk scherm, met alle kleuren en maten op één plek (`src/styles/tokens.css`). |
| Hosting | **Cloudflare Workers**, gekoppeld aan **GitHub** | Gratis, HTTPS, onbeperkt verkeer, en elke opgeslagen versie komt vanzelf online (zie D15). |
| Fase 1b | **Supabase** (gratis plan) + **Cloudflare Worker** met cron | Login, database en meldingen zonder kosten (zie §6 voor de limieten). |

**Waarom niet PixiJS (2D)?** Dan zou je voor elk eiland, elke boom en elk wezentje afbeeldingen
moeten tekenen of omzetten. Met echte 3D-modellen gebruiken we Kenney-pakketten rechtstreeks,
en je iPhone 13 heeft kracht genoeg. We houden het licht met de trucs uit §7.

---

## 2. Mappenstructuur: alles op zijn vaste plek

Het idee: **elk mapje heeft één taak.** Zo weet je bij een fix meteen waar je moet zoeken,
en blijft de code een opgeruimde kast in plaats van een berg.

```
horizon/
├── CLAUDE.md              projectregels (Claude leest dit elke keer)
├── PLAN.md                dit plan
├── DECISIONS.md           logboek van alle keuzes
├── CREDITS.md             bronnen en licenties van gratis assets
├── README.md              hoe start je het project op je pc
├── (instellingen)         package.json, vite.config.ts, eslint.config.js, wrangler.jsonc, …
├── docs/                  uitleg in gewone taal
│   ├── spec/              de originele gigaprompt
│   └── guides/            stap-voor-stap-gidsen (hosting, iPhone, Supabase, widget)
├── public/                bestanden die ongewijzigd online komen
│   ├── icons/             app-iconen (ook het iPhone-icoon)
│   ├── models/            3D-modellen (.glb), per pakket een mapje
│   └── sounds/            geluiden, per soort een mapje
├── scripts/               hulpscriptjes (iconen maken, assets klaarzetten)
├── supabase/              (fase 1b) database-instellingen en serverfuncties
├── worker/                (fase 1b) Cloudflare Worker voor meldingen
├── widget/                (fase 1b) het Scriptable-script
└── src/                   de app zelf
    ├── main.tsx           startpunt
    ├── app/               de ruggengraat: tabs, schermwissels, opstarten
    ├── game/              SPELREGELS – puur rekenwerk, geen schermen, geen 3D
    │   ├── config.ts      ALLE getallen uit §7 van de gigaprompt
    │   ├── model/         hoe de data eruitziet (Island, Routine, …), één bestand per soort
    │   ├── time/          dagwissel om 04:00, weken
    │   ├── shells/        schelpen en dagdoel
    │   ├── streak/        streak, schilden, rustige zee
    │   ├── islands/       voortgang van pad en brug, slapende eilanden
    │   ├── companion/     groeipunten en levels van je reisgezel
    │   └── boat/          focuseiland en buit
    ├── data/              OPSLAG – alles wat met de database te maken heeft
    │   ├── db.ts          de Dexie-database: tabellen en versies
    │   ├── repositories/  per soort data één bestand: opslaan, ophalen, wissen
    │   ├── hooks/         "luister naar data"-hulpjes voor schermen (useRoutines, …)
    │   └── backup/        export en import (JSON)
    ├── actions/           HANDELINGEN – wat er gebeurt als je iets doet
    │                      (bv. completeRoutine: regels + opslaan + welk feestje)
    ├── features/          SCHERMEN – per onderdeel van de app één mapje
    │   ├── home/          🏝️ Thuis-tab
    │   ├── map/           🗺️ Kaart-tab (knoppen en lagen bovenop de 3D)
    │   ├── islands/       eilandscherm, eiland aanmaken, stappen
    │   ├── routines/      routines beheren
    │   ├── celebrations/  de feestladder (partikels, schudeffect, teksten)
    │   ├── onboarding/    de eerste 60 seconden
    │   ├── settings/      instellingen (tandwiel)
    │   └── logbook/       📖 Logboek-tab (placeholder in 1a)
    ├── world/             3D – alles wat je in de 3D-wereld ziet
    │   ├── scene/         canvas, camera, licht, schuiven en zoomen
    │   ├── sea/           de zee en golfjes
    │   ├── fog/           mistwolken
    │   ├── islands/       3D-eilanden (thuis, pad, brug)
    │   ├── creatures/     wezentjes en reisgezel, gebouwd uit vormen in code
    │   ├── boat/          de boot
    │   ├── decor/         palmbomen, hutje, vuurtoren, … uit eenvoudige vormen
    │   └── labels/        naambordjes boven de eilanden
    ├── ui/                BOUWSTENEN – knoppen, kaartjes, schelpenteller, voortgangsring
    ├── audio/             de geluidsspeler en de lijst met geluiden
    ├── content/           ALLE TEKSTEN (Nederlands) en standaarddata
    │   ├── texts/         per situatie een lijst met varianten
    │   └── defaults/      standaardroutines, wezentjessoorten, …
    ├── lib/               kleine algemene hulpjes (willekeurig kiezen, id's maken)
    └── styles/            kleuren, lettertypes, globale stijl
```

### Wie mag wie gebruiken?

Om te voorkomen dat alles door elkaar gaat hangen, gelden deze regels.
**ESLint controleert ze automatisch**, dus een fout valt meteen op.

| Map | Mag gebruiken | Waarom |
|---|---|---|
| `game/` | niets anders (alleen `lib/`) | Spelregels moeten los staan, zodat ze testbaar zijn en later naar een echte iPhone-app kunnen. |
| `data/` | `game/`, `lib/` | Opslag kent de vorm van de data, maar geen schermen. |
| `actions/` | `game/`, `data/`, `content/`, `lib/` | Combineert regels en opslag op één plek. |
| `world/` | `game/`, `content/`, `audio/`, `lib/` | 3D krijgt zijn data van het scherm dat hem toont, en leest zelf niets uit de database. |
| `features/` | alles hierboven + `ui/` | Schermen tonen data en roepen handelingen aan. |
| `ui/` | `lib/`, `styles/` | Bouwstenen weten niets van het spel, zodat je ze overal kan hergebruiken. |

Een feature gebruikt een andere feature **alleen via zijn `index.ts`** (de "voordeur").

### Afspraken over bestanden

- **Code in het Engels, uitleg in het Nederlands.** Namen van functies en bestanden zijn
  Engels (zoals in alle bibliotheken), commentaar in de code is Nederlands zodat jij het snapt.
- **Geen tekst in schermcode.** Alles wat je op het scherm leest, staat in `src/content/texts/`.
- **Geen losse getallen.** Alle spelgetallen staan in `src/game/config.ts`.
- **Eén component per bestand**, met een naam als `HomeScreen.tsx` (component = één schermblokje).
  Andere bestanden heten zoals `streak.ts`.
- **Tests staan naast hun bestand:** `streak.ts` en `streak.test.ts` in hetzelfde mapje.
- **Kleine bestanden:** groeit een bestand boven ±200 regels, dan splitsen we het.
- **Korte imports:** `@/game/streak` in plaats van `../../../game/streak`.
- **Elk hoofdmapje in `src/` krijgt een kort `README.md`:** wat hoort hier wel en niet.
- **Geen dode code:** wat niet meer gebruikt wordt, gaat weg (git onthoudt het toch).

### Waar zoek ik als…?

| Probleem | Kijk in |
|---|---|
| Schelpen of dagdoel kloppen niet | `src/game/shells/` |
| Streak of schild doet raar | `src/game/streak/` |
| Een getal aanpassen (bv. prijs van een schild) | `src/game/config.ts` |
| Een tekst aanpassen of toevoegen | `src/content/texts/` |
| Een knop of kaartje ziet er raar uit | `src/ui/` |
| Iets op het thuisscherm | `src/features/home/` |
| De zee, de mist of een eiland in 3D | `src/world/sea/`, `src/world/fog/`, `src/world/islands/` |
| Data wordt niet goed bewaard | `src/data/repositories/` |
| Een feestje is te groot of te klein | `src/features/celebrations/` |

---

## 3. Datamodel (verbeterd voorstel)

Dit zijn de "soorten data" die de app bewaart. Verbeteringen tegenover de gigaprompt
staan onderaan.

| Soort | Belangrijkste velden |
|---|---|
| **Profile** (jij, één rij) | naam reisgezel, groeipunten, schilden in voorraad, instellingen (dagdoel, geluid, meldingstijden), focuseiland, seizoen |
| **Island** | naam, type (`path` = pad / `bridge` = brug), kleur, emoji, status (`active` / `completed` / `drifted`), hoofdeiland (bij side quests), wezentje (soort, stadium, shiny), brief, positie op de kaart, doelgetal + eenheid (brug), laatste activiteit |
| **Landmark** (bezienswaardigheid) | eiland, titel, volgorde, gehaald op, polaroid (1b) |
| **Step** (stap) | bezienswaardigheid of eiland, titel, hoeveelheid (brug), gedaan op, volgorde |
| **Routine** | naam, emoji, schelpen (1–3), dagen van de week, actief, volgorde |
| **DayLog** (dagboekje per speldag) | datum (na de 04:00-wissel), afgevinkte routines, dagdoel van die dag, rustige zee, focuseiland, schild gebruikt |
| **ShellTransaction** (schelpenkasboek) | hoeveel (+3 of −15), waarom (routine, buit, schild, …), wanneer |
| **Inventory, Collection, Season, MysteryChallenge** | zoals in de gigaprompt, pas in fase 1b |

**Verbeteringen:**

1. **Wat je kan uitrekenen, bewaren we niet apart.** Streak, record, level en "slapend"
   rekenen we uit de daglogs en datums. Zo kunnen ze nooit "uit sync" raken.
   (Bijvoorbeeld: level = groeipunten ÷ 7, naar beneden afgerond, + 1.)
2. **Schelpen als kasboek.** Elke schelp die erbij komt of eraf gaat, is een regel.
   Je saldo is de som. Dat maakt "ongedaan maken" veilig, en de seizoensrecap en
   spookboot hebben later meteen alle cijfers.
3. **Klaar voor synchronisatie later.** Elke rij krijgt een unieke id (geen 1, 2, 3 die
   botsen tussen toestellen), een `updatedAt` en een `deletedAt` (verwijderen = markeren),
   zodat Supabase-sync in fase 1b werkt zonder alles om te bouwen.
4. **Een tik kan je terugdraaien.** Per ongeluk een routine afgevinkt? Nog eens tikken
   haalt het vinkje en de schelpen weer weg.
5. **Versienummer in de export**, zodat oude backups later nog ingeladen kunnen worden.

---

## 4. Mijlpalen

Na elke mijlpaal: ik leg uit wat er gebouwd is, hoe je het test op je iPhone, wat jij moet
doen, en ik **wacht op je akkoord**. Elke werkende stap = een git-commit; elke afgewerkte
mijlpaal krijgt een label (bv. `m1`), zodat je altijd terug kan.

### Fase 1a – de kern

**M0 – Opzet en "Hallo Horizon"**
- Jij: Node.js en Git installeren, een GitHub-account maken (ik geef de stappen).
- Ik: project opzetten (Vite, React, TypeScript, ESLint, Prettier, Vitest), de mappenstructuur
  met een README per map, PWA-instellingen, iconen, lettertypes en een "Hallo Horizon"-scherm.
- Samen: GitHub-repository (privé) + Cloudflare koppelen, met een gids in `docs/guides/`.
- **Klaar als:** je de link op je iPhone opent, op je beginscherm zet, en de app schermvullend
  opent met eigen icoon, ook in vliegtuigmodus.

**M1 – Data en routines**
- Database, datamodel, standaardroutines, de dagwissel om 04:00.
- Eenvoudig thuisscherm: routines van vandaag, afvinken (en terugdraaien), schelpenteller,
  dagdoelring. Routines maken, bewerken, verwijderen. De 3 tabs + tandwiel.
- Tests: dagwissel, dagdoel, schelpen.
- **Klaar als:** je routines afvinkt, de app sluit, opnieuw opent, en alles er nog staat.

**M2 – De kaart**
- 3D-zee met golfjes, thuiseiland, eilanden en mist; schuiven en knijpen om te zoomen
  (met grenzen); eiland aantikken opent het eilandscherm.
- De kaart laadt pas als je de tab opent, zodat Thuis snel opstart.
- **Klaar als:** schuiven en zoomen vlot gaat op je iPhone.

**M3 – Eilanden**
- Pad- en brug-eilanden aanmaken, bezienswaardigheden, stappen, "plan wat je ziet",
  side quests, alles bewerken/verwijderen/herschikken. De mist hangt aan je voortgang.
- Tests: voortgang van pad en brug.
- **Klaar als:** je een echt doel als eiland aanmaakt en de brug ziet groeien.

**M4 – Feestladder en wezentjes**
- De drie feestniveaus met geluid, partikels, schudeffect en wisselende teksten.
- Wezentjes in code die uit een ei komen en groeien; je reisgezel met groeipunten,
  levels en een tuin die groeit.
- Tests: groeipunten en levels.
- **Klaar als:** het afvinken van een stap écht voldoening geeft.

**M5 – Dagelijkse lus en vangnet**
- Boot uitsturen met buit, rustige zee, streak met schild, slapende eilanden,
  export/import, onboarding met installatie-uitleg.
- Tests: streak, schilden, rustige zee, slapende eilanden.
- **Klaar als:** je de app een dag gebruikt zoals bedoeld, van onboarding tot buit.
- ➡️ **Einde van 1a: jij test 1 à 2 weken voor we verdergaan.**

### Fase 1b – afwerking (één mijlpaal per onderdeel, in deze volgorde)

| | Onderdeel | Extra tests |
|---|---|---|
| M6 | Kisten (gewoon/zeldzaam/episch, laten rijpen, openingsanimatie) | kansen in kisten |
| M7 | Evolutie en verzamelboek (3–4 stadia, shiny) | |
| M8 | Polaroidmoment (foto of zin, gecomprimeerd) | |
| M9 | Brieven aan je toekomstige zelf + tijdcapsule | |
| M10 | Flessenpost met mysterie-uitdagingen (~40 sjablonen) | |
| M11 | Een eiland laten wegdrijven | |
| M12 | Comeback-bonus | comeback-bonus |
| M13 | Mini-vuurtoren in de Logboek-tab | |
| M14 | Seizoenen en recap (verhaal-slides), jaarboek | |
| M15 | Online synchronisatie met Supabase (e-maillink, local-first, RLS) | |
| M16 | Meldingen via webpush (max 2 per dag, piratentoon) | |
| M17 | Scriptable-widget (klein + middelgroot) | |

### Fase 1.5
- **M18 – Spookboot:** deze maand tegenover vorige maand, altijd positief gebracht.

### Later (niet bouwen, wel rekening mee houden)
Draaibare eilanden (camera vrijgeven), duo-eilanden, figuurtje op je computer, gezellige storm,
groeiende soundtrack, AI-gids, echte beloningen, blijvende wereld, echte iPhone-app.
Dat laatste is waarom `game/` volledig los staat van React en 3D.

---

## 5. Gratis assets

| Wat | Bron | Licentie | Waarvoor |
|---|---|---|---|
| **Pirate Kit** | Kenney (kenney.nl) | CC0 (vrij te gebruiken) | boten, kisten, palmbomen, havendecor |
| **Nature Kit** | Kenney | CC0 | bomen, rotsen, bloemen, struiken (ook voor de tuin) |
| **Interface Sounds, Impact Sounds, Music Jingles** | Kenney | CC0 | plopjes, klikjes, fanfare |
| **Particle Pack** | Kenney | CC0 | sterretjes en glinsters voor feestjes |
| **Fredoka, Nunito** | Google Fonts via Fontsource | SIL Open Font License (gratis, mag ingebouwd) | titels en tekst |
| **Wezentjes, reisgezel, vuurtoren, mist, zee** | zelf in code | – | geen bestanden nodig |

We houden ons zoveel mogelijk bij Kenney, zodat alles in dezelfde stijl is. Bij het downloaden
controleer ik telkens de licentie in het pakket zelf en noteer ik alles in `CREDITS.md`.
Ik kopieer alleen de modellen die we echt gebruiken, zodat de app klein blijft.

---

## 6. Gratis diensten en wat hun limieten betekenen

**GitHub (gratis):** onbeperkt privé-repositories. Dient ook als backup van de code.

**Cloudflare Workers (gratis):** het tonen van de app (statische bestanden) is gratis en
onbeperkt. Het bouwen na elke wijziging valt binnen de gratis bouwminuten (één bouw duurt
ongeveer een minuut). In fase 1b draait de meldingstaak op dezelfde plek.

**Supabase (gratis plan, fase 1b)** – nagekeken in november 2026, ik controleer opnieuw bij M15:

| Limiet | Doet het ertoe? |
|---|---|
| 500 MB database | Nee: tekst van jaren gebruik is maar een paar MB. |
| 1 GB bestandsopslag | Een beetje: daarom comprimeren we foto's (±200 KB → ruim 5000 foto's). |
| 5 GB verkeer per maand | Nee, voor één gebruiker ruim genoeg. |
| 50.000 gebruikers per maand | Nee, jij bent de enige. |
| **Pauzeert na 1 week zonder activiteit** | **Ja.** Dan werken sync, widget en meldingen niet tot je hem in het dashboard herstart (je data blijft). Oplossing: de dagelijkse meldingstaak (Cloudflare Worker) doet ook een klein verzoek, zodat het project wakker blijft. |

---

## 7. iPhone-aandachtspunten

- **Vlot en zuinig:** de 3D-wereld tekent alleen als er iets beweegt (`frameloop="demand"`),
  maximaal 2× scherpte i.p.v. 3× (scheelt veel batterij, je ziet het verschil niet),
  zachte nep-schaduwen i.p.v. echte, en veel dezelfde dingen (mistwolkjes, planken)
  in één keer tekenen.
- **Geen trillen:** iPhone-webapps kunnen niet trillen, dus schudeffect + partikels + geluid.
- **Geluid** speelt pas na je eerste tik (regel van Safari); Howler regelt dat.
- **Safari en de beginscherm-app hebben aparte opslag.** Test dus altijd in de geïnstalleerde
  app, niet in een Safari-tabblad.
- **Je data beschermen:** we vragen de browser om de opslag "blijvend" te maken, en de
  export-knop blijft belangrijk tot de sync van fase 1b er is.
- **Updates:** na een nieuwe versie moet je de app soms één keer sluiten en opnieuw openen.
- **Safe areas:** knoppen blijven weg van de notch en de balk onderaan.

---

## 8. Wat jij nu moet doen

1. Dit plan lezen en zeggen of het goed is (of wat je anders wil).
2. Na je akkoord, voor M0:
   - **Node.js** installeren: ga naar nodejs.org, kies de **LTS**-versie, en klik de installatie
     door met de standaardopties.
   - **Git** installeren: ga naar git-scm.com, klik op *Download for Windows*, en klik de
     installatie door met de standaardopties.
   - De Claude-app daarna één keer **volledig afsluiten en opnieuw openen**, zodat hij
     Node en Git vindt.
   - **GitHub-account** maken op github.com (gratis). Dat mag ook later in M0, ik leg het
     dan stap voor stap uit.
