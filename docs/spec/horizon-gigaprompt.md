# Horizon – gigaprompt voor Claude Code

> *Elke stap brengt je horizon dichterbij.*

---

## 0. Wie ik ben en hoe je met mij werkt

- Ik ben Stan, student, en ik ben **beginner** in programmeren. Leg alles uit in eenvoudig Nederlands, zonder jargon. Gebruik je toch een vakterm, leg die dan in één zin uit.
- Ik werk op een **Windows-pc** en test op mijn **iPhone**. Ik heb **geen Mac**.
- **Alles moet gratis zijn**: geen betaalde diensten, geen Apple-ontwikkelaarsaccount, geen abonnementen. Gebruik alleen gratis tools, gratis hosting en gratis assets.
- Werk in **kleine mijlpalen** (zie §11). Na elke mijlpaal:
  1. Leg kort uit wat je gebouwd hebt.
  2. Leg uit hoe ik het test op mijn iPhone.
  3. Zeg wat ik zelf moet doen, als dat nodig is.
  4. **Wacht op mijn akkoord** voor je verdergaat.
- Is iets onduidelijk, stel dan een vraag in plaats van te gokken.
- Houd een `DECISIONS.md` bij met alle belangrijke keuzes, en een `CLAUDE.md` met de projectregels uit deze prompt.
- Gebruik git en commit na elke werkende stap, met duidelijke berichten.

---

## 1. Het idee in het kort

**Horizon** is een doelen-app die aanvoelt als een spel. Je leven is een **levenskaart**: een zee vol mist met eilanden.

- Elk groot doel is een **eiland**. Met elke stap die je zet, trekt de mist verder op.
- Op elk eiland woont een **wezentje** dat meegroeit met dat doel.
- Op je **thuiseiland** woont je **reisgezel**, een cute wezentje dat je zelf een naam geeft. Hij groeit mee met je dagelijkse **routines**, die je **schelpen** opleveren.
- De app moet **enorm leuk** zijn, een beetje **cute en cool**, en je een **echt voldaan gevoel** geven telkens je een deeldoel haalt.
- Er is **nooit schuldgevoel**: je kan niets verliezen, en herbeginnen wordt beloond.

---

## 2. Platform en techniek

### Platform
- Een **Progressive Web App (PWA)** die ik via Safari op mijn iPhone installeer ("Zet op beginscherm").
- De app opent schermvullend (standalone), werkt **offline** en heeft een eigen icoon.
- Ze moet ook werken in een browser op mijn computer.
- Er is maar één gebruiker: ik.

### Voorgestelde techstack
Je mag een betere keuze voorstellen, maar leg dan uit waarom.
- **Vite + React + TypeScript** (strict)
- **3D-wereld:** `react-three-fiber` + `drei` (three.js)
  - **Voorkeur:** echte **low-poly 3D-modellen** met een **vaste schuine camera in bovenaanzicht** (orthografisch). Zo ziet het eruit als 2.5D-diorama's.
  - **Waarom:** ik moet geen 3D-modellen omzetten naar afbeeldingen, en later kunnen de eilanden draaibaar worden door de camera vrij te geven.
  - In versie 1 kan je de kaart **verschuiven en inzoomen**, maar **niet draaien**.
  - Denk je dat dit te zwaar is voor Safari op een iPhone? Stel dan een alternatief voor (bv. PixiJS met afbeeldingen) en leg het verschil uit.
- **UI-animaties:** Framer Motion
- **Lokale opslag:** IndexedDB via **Dexie**
- **PWA:** `vite-plugin-pwa` (manifest, service worker, offline, iOS-icoon via apple-touch-icon)
- **Geluid:** Howler.js of de Web Audio API
- **Tests:** Vitest voor alle spellogica
- **Hosting:** gratis, met HTTPS (bv. Cloudflare Pages, Netlify of Vercel). Kies er één en leg me stap voor stap uit hoe ik het opzet.
- **Fase 1b:** **Supabase**, gratis plan (login + database) voor synchronisatie, de widget en meldingen. Controleer de actuele limieten van het gratis plan en vertel me welke beperkingen ertoe doen.

### Assets (gratis)
- Voor eilanden, boten, palmbomen en decor gebruik je gratis low-poly 3D-pakketten met **CC0-licentie**, bv. van **Kenney** (kenney.nl, zoals de Pirate Kit en de Nature Kit). Gebruik zoveel mogelijk één maker, zodat de stijl klopt. Controleer de licentie en vermeld de bronnen in `CREDITS.md`.
- De **wezentjes en de reisgezel bouw je zelf in code**, uit eenvoudige 3D-vormen: een rond lijf, grote ogen, oortjes of hoorntjes, en kleurvarianten. Ze moeten cute en expressief zijn: knipperen, stuiteren, dansen en snurken.
- Gebruik gratis **CC0-geluiden**, bv. de audiopakketten van Kenney.

### Belangrijke beperkingen van een iPhone-webapp
- **Een webapp kan een iPhone niet laten trillen.** Gebruik in plaats daarvan een schudeffect op het scherm, partikels en geluid.
- Er is **geen echte widget** mogelijk. Daarom komt er in fase 1b een **Scriptable-widget** (zie §6).
- **Pushmeldingen** werken alleen als de app op het beginscherm staat, als ik toestemming geef via een knop, en als er een server is die ze verstuurt (fase 1b).

### Architectuur
- Houd de **spellogica** (schelpen, streak, schilden, kisten, slapen, seizoenen) in **aparte, pure TypeScript-modules** (bv. `src/game/`), los van React en de 3D-weergave. Schrijf er unit tests voor.
- Zo kan de app later naar een echte iPhone-app verhuizen zonder alles te herschrijven.
- Alle getallen uit §7 staan in **één configbestand** (`src/game/config.ts`).

---

## 3. De wereld

### Levenskaart
- Een zee met zachte golfjes en **mist** (zachte wolken) over alle onontdekte delen.
- In het midden ligt je **thuiseiland**.
- Rondom liggen je **grote eilanden** (doelen), elk in hun eigen stuk mist.
- **Side quests** zijn kleine eilandjes vlak naast een groot eiland.
- Je **boot** vaart tussen de eilanden.

### Eilandtypes in versie 1
1. **🧭 Pad naar de vuurtoren:** voor projecten met stappen in een volgorde. Een pad loopt langs 3 à 5 bezienswaardigheden naar de top of de vuurtoren.
2. **🌉 Brug bouwen:** voor doelen met een getal (bv. €500 sparen, 50 km lopen, 300 woorden leren).
   - Elke stap is een hoeveelheid die planken legt, en de brug groeit zichtbaar naar het eiland toe.
   - De bezienswaardigheden zijn **pijlers op 25, 50, 75 en 100%**.

### Wezentjes
- Elk groot eiland heeft een eigen wezentje dat **uit een ei komt** zodra je het eiland aanmaakt.
- Bij elke bezienswaardigheid groeit of evolueert het.
- Wezentjes worden **nooit ziek, triest of dood**.

### Reisgezel
- Je kiest zijn naam bij de start.
- Hij woont op je thuiseiland en krijgt **groeipunten** als je je dagdoel haalt.
- Op bepaalde levels krijgt hij een nieuwe look en leert hij een trucje.

---

## 4. Navigatie en schermen

Er zijn **maximaal 3 tabs onderaan**, want ik haat veel menu's:
1. **🗺️ Kaart:** de levenskaart. Tik op een eiland om het eilandscherm te openen.
2. **🏝️ Thuis:** je thuiseiland met je reisgezel, de routines van vandaag, je schelpenteller en je dagdoel.
3. **📖 Logboek:** jaarboek, verzamelboek en vuurtoren. Deze tab komt in fase 1b; in 1a mag hij een simpele placeholder zijn.

Instellingen open je met een tandwiel rechtsboven.

**Regels:**
- Dagelijkse acties vragen maximaal 2 tikken.
- De dagelijkse routine in de app duurt minder dan 2 minuten.
- Grote knoppen die je makkelijk met je duim raakt, en rekening houden met de safe areas van de iPhone.

---

## 5. Fase 1a: de kern (eerst speelbaar)

### Onboarding (max 60 seconden)
1. Een korte intro: "Ahoy, kapitein!"
2. Je reisgezel komt uit een ei, en je geeft hem een naam.
3. Je kiest 3 à 5 routines uit de standaardlijst (zie §7). Eigen routines maken kan later.
4. Je kiest een dagdoel (standaard 5 schelpen).
5. Je maakt een eerste eiland aan (mag je overslaan).
6. Uitleg over hoe je de app op je beginscherm zet.

### Eilanden en stappen
- **Een eiland aanmaken:** je kiest een naam, een type (pad of brug), een kleur of emoji, en ruwweg 3 à 5 bezienswaardigheden.
  - Bij een brug vul je een doelgetal en een eenheid in.
- **Je plant alleen wat je ziet:** stappen vul je alleen in voor de **eerstvolgende** bezienswaardigheid. Haal je die, dan vraagt de app vrolijk om de volgende stappen ("De mist trekt op! Wat zijn je volgende stappen, kapitein?").
- **Side quests:** een klein eilandje bij een groot eiland, met 1 à 3 stappen.
- Stappen, bezienswaardigheden en eilanden kan je bewerken, verwijderen en herschikken.

### Routines en schelpen (thuiseiland)
- Je ziet de routines van vandaag, rekening houdend met de dagen waarop ze gepland staan.
- Een tik vinkt een routine af: schelpen vliegen naar de teller, en de ring van je dagdoel vult zich.
- **Haal je je dagdoel**, dan krijgt je reisgezel een groeipunt en groeit er iets nieuws in de **tuin** op je thuiseiland (een bloem, struik of boompje).
- Extra schelpen spaar je op.
- Je kan zelf **routines maken, bewerken en verwijderen**: naam, emoji, 1 à 3 schelpen en de dagen van de week.

### Boot uitsturen (dagelijks)
- Bij de eerste keer dat je de app op een dag opent, vraagt hij: "Waar vaart je boot vandaag naartoe?"
  - Je kiest je **focuseiland**. Doe je niets, dan blijft de boot bij het eiland van gisteren.
- De boot vaart zichtbaar naar dat eiland.
- Zet je die dag een stap op je focuseiland, dan komt de boot terug met **buit** (bonusschelpen). Dat zie je de volgende keer dat je de app opent.

### Feestladder (het yay-moment)
Hoe groter wat je haalt, hoe groter het feest:

| Je haalt… | Je krijgt… |
|---|---|
| een stap of routine | een plopgeluid, kleine partikels, een licht schudeffect en een plank of plantje |
| een bezienswaardigheid | de mist die met een animatie optrekt, een wezentje dat groeit en een groter geluid |
| een volledig eiland | vuurwerk, fanfare, een dansend wezentje en een eiland dat oplicht |

- Bouw **variatie** in: meerdere geluiden, partikelvormen en teksten, willekeurig gekozen, zodat het na 200 keer nog leuk is.
- Animaties moeten "juicy" aanvoelen: squash and stretch, stuiteren en easing.

### Missen zonder schuldgevoel
- **Rustige-zee-dag:** met een knop zet je de zee op rustig, en dan volstaat 1 schelp als dagdoel. Dat kan maximaal 2 keer per week (maandag tot zondag).
- **Streak:** het aantal dagen op rij dat je je dagdoel haalt. Een rustige-zee-dag telt mee.
- **Streakschild:** je koopt het met schelpen. Mis je een dag, dan wordt er automatisch een schild gebruikt en blijft je streak heel.
- **De streak breekt toch:** je record blijft zichtbaar, en je nieuwe reeks start met een feestje ("Nieuwe reis, kapitein!"). Er komen nooit trieste berichten.
- **Slapende eilanden:** heb je 7 dagen niets gedaan op een eiland, dan valt het in slaap: het wezentje snurkt en de lichtjes gaan uit. Er gaat nooit iets verloren. Je eerste stap maakt het eiland wakker met een welkom-terug-animatie.

### Overige zaken in 1a
- Een **export- en importknop** (JSON-bestand) als backup.
- **Instellingen:** dagdoel, geluid aan of uit, routines beheren, de naam van je reisgezel.
- Een installeerbare PWA die offline werkt.

---

## 6. Fase 1b: afwerking

Bouw deze onderdelen in deze volgorde:

1. **Kisten**
   - Bij elke bezienswaardigheid krijg je een kist: gewoon (70%), zeldzaam (25%) of episch (5%).
   - Je mag hem meteen openen of **een nacht laten rijpen**, wat de kans op een betere kist verhoogt.
   - Inhoud: stickers (voor het jaarboek), hoedjes (voor je reisgezel en wezentjes) en decoratie (voor eilanden).
   - Een kist openen krijgt een spectaculaire animatie: schudden, openbarsten en lichtstralen.
   - **Nooit echt geld of aankopen.**
2. **Evolutie en verzamelboek**
   - Wezentjes hebben 3 à 4 evolutiestadia.
   - Een afgewerkt eiland brengt het wezentje naar een pagina in het **verzamelboek**.
   - Er bestaan zeldzame **shiny** varianten (via mysterie-uitdagingen).
3. **Polaroidmoment**
   - Na een bezienswaardigheid kan je, **optioneel**, een foto toevoegen (camera of galerij) of één zin schrijven ("Hoe voelt dit?").
   - Comprimeer de foto's. Ze komen in het jaarboek.
4. **Brieven**
   - Bij het aanmaken van een eiland kan je, optioneel, een brief aan je toekomstige zelf schrijven. Die opent met een animatie als je het eiland afwerkt.
   - Aan het einde van een seizoen schrijf je een **tijdcapsulebrief** die pas na het volgende seizoen opengaat.
5. **Flessenpost met mysterie-uitdagingen**
   - 1 à 2 keer per week, op een willekeurige dag, spoelt er een fles aan op het strand van je thuiseiland.
   - De uitdaging hoort bij een actief eiland of een routine. Gebruik een lijst van ongeveer 40 sjablonen.
   - Je kiest **aanvaarden of weigeren**. Weigeren kost niets ("De zee neemt de fles terug").
   - Aanvaard en gehaald binnen 3 dagen geeft een zeldzame kist en een kans op een shiny wezentje.
6. **Een eiland laten wegdrijven**
   - Je stelt één vraag: "Waarom laat je het gaan?" (met keuzes en een vrij tekstveld).
   - Er volgt een afscheidsanimatie: het wezentje zwaait.
   - Het eiland komt in het jaarboek als "verkend gebied", en je houdt alles wat je verzameld hebt.
7. **Comeback-bonus**
   - Na minstens 3 dagen zonder de app, of als je een slapend eiland wakker maakt, geeft je eerste actie dubbele schelpen en een comeback-sticker.
   - Maximaal 1 keer per week, en klein genoeg zodat je het niet bewust gaat uitlokken.
8. **Mini-vuurtoren** (in de Logboek-tab)
   - Je huidige streak, je streakrecord en een kalender waarop dagen met een gehaald dagdoel gekleurd zijn.
   - Geen ingewikkelde grafieken.
9. **Seizoenen en recap**
   - Een seizoen duurt 3 maanden.
   - Aan het einde volgt een geanimeerde recap in **verhaal-slides** zoals Spotify Wrapped: bezochte eilanden, bezienswaardigheden, schelpen, beste streak, polaroids en nieuwe wezentjes. Daarna schrijf je je tijdcapsulebrief.
   - Alle recaps samen vormen het **jaarboek**.
   - Een nieuw seizoen opent een nieuw "hoofdstuk" van de kaart, met een kleine visuele verandering.
10. **Online synchronisatie met Supabase**
    - Login via een e-maillink.
    - De app blijft **local-first**, en synchroniseert op de achtergrond.
    - Beveilig alles goed (Row Level Security).
11. **Meldingen via webpush**
    - Maximaal 1 à 2 per dag, op tijdstippen die ik kies.
    - In piratentoon en nooit schuldig makend, bv. "Uw boot ligt nog in de haven, kapitein. Geen stress, maar ja."
    - Je vraagt toestemming via een knop. Versturen gebeurt via een gratis geplande taak (bv. een Supabase Edge Function met een cron, of een Cloudflare Worker met een cron).
    - Leg me stap voor stap uit wat ik moet instellen.
12. **Scriptable-widget**
    - Scriptable is een gratis iPhone-app waarmee je zelf widgets in JavaScript maakt.
    - Schrijf een script dat **alleen leest**, met een geheime token, en dat ophaalt: de stemming en het uiterlijk van mijn reisgezel, de schelpen van vandaag tegenover mijn dagdoel, de volgende stap op mijn focuseiland en mijn streak.
    - Maak een kleine en een middelgrote widget-layout in de stijl van Horizon. Een tik opent de webapp.
    - Geef me een stap-voor-stap-installatiegids.

### Fase 1.5
- **Spookboot:** deze maand tegenover vorige maand (schelpen, stappen, bezienswaardigheden), getoond als een race tussen mijn boot en een doorzichtige spookboot.
  - Breng het altijd positief ("Bijna even goed als vorige maand!"), nooit als een nederlaag.

### Later (nu niet bouwen, maar de architectuur er wel op voorzien)
- Draaibare 3D-eilanden: de camera vrijgeven
- Duo-eilanden en de duo-brug: een eiland delen met iemand, waarbij elk vanaf zijn kant bouwt
- Een figuurtje op mijn computerscherm
- Een gezellige storm met een regenboog bij een comeback
- Een soundtrack die groeit met elk eiland
- Een AI-gids die routes voorstelt
- Echte beloningen koppelen aan eilanden
- Een blijvende wereld met bewoners
- Een echte iPhone-app, als ik later een Mac heb of wil betalen

---

## 7. Spelregels en startwaarden (alles in `config.ts`)

| Regel | Startwaarde |
|---|---|
| Schelpen per routine | 1 à 3 |
| Dagdoel | 5 schelpen (instelbaar) |
| Rustige-zee-dag | dagdoel = 1 schelp, max 2 keer per week |
| Streakschild | kost 15 schelpen, max 2 in voorraad |
| Groeipunt | 1 per gehaald dagdoel |
| Level van de reisgezel | +1 level per 7 groeipunten, met een nieuwe look op level 3, 6 en 10 |
| Bootbuit | +2 schelpen voor een stap op je focuseiland |
| Eiland valt in slaap | na 7 dagen zonder activiteit |
| Comeback-bonus | dubbele schelpen bij je eerste actie na ≥ 3 dagen pauze, max 1 keer per week |
| Mysterie-uitdaging | 1 à 2 per week, met een deadline van 3 dagen |
| Kist laten rijpen | hogere kans op de volgende zeldzaamheid |
| Dagwissel | om **04:00** lokale tijd (Europe/Brussels), zodat laat opblijven nog als "vandaag" telt |

### Standaardroutines

| Routine | Schelpen |
|---|---|
| 🏋️ Sporten of gym | 3 |
| 👟 10.000 stappen | 2 |
| 📚 Les gevolgd | 2 |
| 📝 45 min studeren | 2 |
| 📵 1 uur schermvrij voor het slapen | 2 |
| 📖 15 min lezen | 1 |
| 🗣️ 10 min een taal oefenen | 1 |
| 💧 2 liter water | 1 |
| 😴 Op tijd in bed | 1 |
| 🧹 Kamer opgeruimd | 1 |
| 💬 Contact met een vriend of familie | 1 |
| 🧘 5 min ademhalen of mediteren | 1 |

Schrijf **unit tests** voor: streak, schilden, rustige zee, de dagwissel om 04:00, slapende eilanden, de comeback-bonus, de kansen in kisten en de voortgang van een brug.

---

## 8. Visuele stijl en sfeer

- **2.5D low-poly diorama's** in schuin bovenaanzicht, met **Clash Royale-achtige** dikke, chunky vormen, warme en verzadigde kleuren, zachte schaduwen en stuiterende animaties.
- Het moet er **echt cool** uitzien, niet kinderachtig maar wel cute.
- De zee heeft zachte golfjes, de mist bestaat uit wolkjes die mooi wegtrekken, en er zit een licht dag-en-nachtgevoel in.
- **UI:** grote, ronde knoppen met een lichte 3D-look (zoals in Clash), duidelijke cijfers en schelpentellers.
- **Lettertypes:** een rond, dik lettertype voor titels (bv. *Fredoka* of *Baloo 2*, gratis via Google Fonts) en een goed leesbaar lettertype voor gewone tekst.
- **Geluid:** kort, zacht en speels, met variatie, en altijd uit te zetten.

### Toon van de teksten
- Nederlands, kort, **grappig en droog**, met een **piratentoets** ("Ahoy, kapitein!", "Land in zicht!") en af en toe een **Vlaams woordje** ("Allee", "Amai", "Goe bezig").
- **Verboden:** schuldgevoel en drama. Geen zinnen als "Je hebt gefaald", "Je wezentje is triest" of "Je streak is kapot 😢".
- Maak per situatie een lijst van meerdere teksten en kies er willekeurig één, zodat het fris blijft.

---

## 9. Absolute regels

- ❌ Geen reclame, geen betalingen, geen in-app-aankopen, geen tracking of analytics.
- ❌ Geen schuldgevoel, geen straffen, en nooit iets dat je kan verliezen.
- ❌ Maximaal 2 meldingen per dag.
- ❌ Geen menu-doolhof: maximaal 3 tabs, en dagelijkse acties in maximaal 2 tikken.
- ✅ Vlot op een iPhone: low-poly modellen, renderen op aanvraag (`frameloop="demand"`) als er niets beweegt om batterij te sparen, beperkte schaduwen, en zware onderdelen pas laden wanneer nodig.
- ✅ Werkt offline.
- ✅ Basistoegankelijkheid: genoeg contrast, leesbare tekstgrootte en labels op knoppen.

---

## 10. Datamodel (voorstel, verbeter waar nodig)

- **Player:** naam van de reisgezel, groeipunten, level, schelpensaldo, streak (huidig en record), schilden, rustige-zee-dagen gebruikt deze week, instellingen (dagdoel, geluid, meldingstijden), id van het focuseiland, seizoen-id.
- **Island:** id, naam, type (`pad` | `brug`), kleur of emoji, status (`actief` | `slapend` | `voltooid` | `weggedreven`), parentIslandId (voor side quests), wezentje (soort, stadium, shiny), brief, positie op de kaart, createdAt, lastActivityAt, doelgetal en eenheid (bij een brug).
- **Landmark** (bezienswaardigheid): id, islandId, titel, volgorde, status, polaroid (foto, zin), completedAt.
- **Step:** id, landmarkId of islandId, titel, hoeveelheid (bij een brug), done, doneAt.
- **Routine:** id, naam, emoji, schelpen, dagen, actief, volgorde.
- **DayLog:** datum (met dagwissel om 04:00), afgevinkte routines, verdiende schelpen, dagdoel, rustigeZee, focusIslandId, schildGebruikt.
- **Inventory:** stickers, hoedjes, decoratie, ongeopende kisten (met rijpingsdatum).
- **Collection:** wezentjes in het verzamelboek.
- **Season:** id, start, einde, recapdata, tijdcapsulebrief.
- **MysteryChallenge:** id, tekst, islandId of routineId, status, deadline, beloning.

---

## 11. Mijlpalen

### Fase 1a
- **M0 – Plan en opzet:** vragen stellen, `PLAN.md` schrijven, project opzetten (Vite, React, TypeScript, PWA), gratis hosting opzetten, en een "Hallo Horizon"-scherm dat ik als app op mijn iPhone-beginscherm kan zetten.
- **M1 – Data en routines:** datamodel en lokale opslag, routines met schelpen en dagdoel op een eenvoudig thuisscherm, eigen routines maken, de dagwissel om 04:00, en unit tests.
- **M2 – De kaart:** een 3D-zee met thuiseiland, eilanden en mist, verschuiven en inzoomen, en een eiland aantikken om het te openen.
- **M3 – Eilanden:** pad- en brug-eilanden aanmaken, bezienswaardigheden, stappen, "plan wat je ziet" en side quests.
- **M4 – Feestladder en wezentjes:** de drie niveaus van feest met geluid, partikels en schudeffect, wezentjes die uit een ei komen en groeien, en een reisgezel met groeipunten en een tuin die groeit.
- **M5 – Dagelijkse lus en vangnet:** de boot uitsturen met buit, rustige zee, streak met schild, slapende eilanden, export en import, en onboarding.
  - ➡️ **Einde van 1a: ik test 1 à 2 weken voor we verdergaan.**

### Fase 1b
- **M6 en verder:** de onderdelen van 1b, in de volgorde van §6.

### Fase 1.5
- **Daarna:** de spookboot.

---

## 12. Je eerste opdracht

1. Lees deze hele prompt.
2. Stel me **maximaal 5 vragen** over wat nog onduidelijk is.
3. Schrijf daarna `PLAN.md` met:
   - de mijlpalen,
   - je techkeuzes, telkens met in één zin waarom,
   - de mappenstructuur,
   - welke gratis assets je wil gebruiken.
4. Maak `CLAUDE.md` en `DECISIONS.md` aan.
5. **Wacht op mijn akkoord voor je code schrijft.**

Ahoy, kapitein. Volle kracht vooruit! 🏴‍☠️
