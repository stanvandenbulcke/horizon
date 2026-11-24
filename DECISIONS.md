# Beslissingen

Elke belangrijke keuze komt hier, met waarom. Nieuwste onderaan.
Verandert een keuze later, dan schrijven we een nieuwe regel en verwijzen we naar de oude.

---

### D1 – Project staat buiten OneDrive · 2026-11-24
**Keuze:** het project staat in `C:\Users\stanv\dev\horizon`.
**Waarom:** een webproject krijgt tienduizenden kleine bestanden (`node_modules`); OneDrive
wil die allemaal synchroniseren, wat traag is en fouten geeft. De backup van de code is
git + GitHub.

### D2 – PWA met Vite, React en TypeScript · 2026-11-24
**Keuze:** een Progressive Web App, gebouwd met Vite + React + TypeScript (strict).
**Waarom:** gratis te installeren op een iPhone zonder Mac of Apple-account, en de strenge
TypeScript-controle vangt fouten op voor ze op de iPhone opduiken.

### D3 – 3D met react-three-fiber, vaste orthografische camera · 2026-11-24
**Keuze:** echte low-poly 3D-modellen met react-three-fiber + drei, schuine vaste camera.
In versie 1: schuiven en zoomen, niet draaien.
**Waarom:** Stan heeft een iPhone 13 of nieuwer, die kan dit vlot aan. We kunnen Kenney-modellen
rechtstreeks gebruiken en later de camera vrijgeven om te draaien.
**Alternatief bekeken:** PixiJS met 2D-afbeeldingen. Lichter, maar dan moet elk model eerst
naar een afbeelding omgezet worden, en draaien kan later niet.

### D4 – Hosting op Cloudflare Pages via GitHub · 2026-11-24
**Keuze:** code op GitHub (privé), automatisch online via Cloudflare Pages.
**Waarom:** gratis, HTTPS (nodig voor een PWA), onbeperkt verkeer, 500 builds per maand,
en elke push naar GitHub zet de nieuwe versie vanzelf online.
**Alternatieven bekeken:** Netlify en Vercel; ook gratis, maar met krappere limieten op
verkeer of builds.

### D5 – Mappenstructuur per taak, met vaste regels · 2026-11-24
**Keuze:** `game/` (regels), `data/` (opslag), `actions/` (handelingen), `features/` (schermen),
`world/` (3D), `ui/` (bouwstenen), `content/` (teksten), `audio/`, `lib/`, `styles/`.
Wie wie mag gebruiken staat in PLAN.md §2 en wordt door ESLint gecontroleerd.
**Waarom:** Stan wil dat latere fixes makkelijk blijven. Elk mapje heeft één taak, dus je weet
meteen waar je moet zoeken, en de spelregels blijven los van React voor een latere iPhone-app.

### D6 – Code in het Engels, commentaar en teksten in het Nederlands · 2026-11-24
**Keuze:** namen van functies, bestanden en velden in het Engels; commentaar in het Nederlands;
alle schermteksten in `src/content/texts/`.
**Waarom:** Engels past bij alle bibliotheken en voorbeelden online, Nederlands commentaar maakt
de code begrijpelijk voor Stan, en teksten op één plek maakt aanpassen en variëren makkelijk.

### D7 – Dagwissel om 04:00 volgens de klok van het toestel · 2026-11-24
**Keuze:** een speldag loopt van 04:00 tot 04:00, volgens de lokale tijd van de iPhone
(normaal Europe/Brussels). Tests draaien vast in de tijdzone Europe/Brussels.
**Waarom:** simpel en betrouwbaar. Op reis volgt je speldag gewoon je eigen klok, wat logischer
voelt dan Belgische tijd in het buitenland.

### D8 – Afgeleide waarden uitrekenen, schelpen als kasboek · 2026-11-24
**Keuze:** streak, record, level en "slapend" worden uitgerekend in plaats van opgeslagen.
Schelpen worden bewaard als lijst van bij- en afschrijvingen (`ShellTransaction`).
**Waarom:** wat je uitrekent, kan niet uit sync raken. Een kasboek maakt ongedaan maken veilig
en geeft later alle cijfers voor de recap en de spookboot.

### D9 – Data klaar voor synchronisatie · 2026-11-24
**Keuze:** elke rij krijgt een unieke id (UUID), `updatedAt` en `deletedAt`.
**Waarom:** zo kan de Supabase-sync in fase 1b werken zonder het datamodel om te bouwen.

### D10 – Data in Dexie, tijdelijke toestand in Zustand · 2026-11-24
**Keuze:** alles wat bewaard moet worden staat in IndexedDB via Dexie (schermen luisteren mee
via `useLiveQuery`). Tijdelijke dingen (welk feestje speelt, camerastand) in kleine Zustand-stores.
**Waarom:** één bron van waarheid voor data, en geen zware toestandsbibliotheek nodig.

### D11 – Lettertypes in de app zelf · 2026-11-24
**Keuze:** Fredoka (titels) en Nunito (tekst) via Fontsource, meegeleverd in de app.
**Waarom:** werkt offline, en er gaat geen verzoek naar Google (geen tracking).

### D12 – Geluid met Howler.js · 2026-11-24
**Keuze:** Howler.js in plaats van de Web Audio API rechtstreeks.
**Waarom:** Howler lost de geluidsbeperkingen van Safari op iPhone (geluid pas na eerste tik) op.

### D13 – Data op de iPhone beschermen · 2026-11-24
**Keuze:** de app vraagt "blijvende opslag" aan de browser, en de export-knop komt al in fase 1a.
**Waarom:** apps op het beginscherm worden goed beschermd, maar er is geen 100% garantie
tot de online sync van fase 1b er is.

### D14 – Supabase wakker houden (voorlopig, fase 1b) · 2026-11-24
**Keuze:** de meldingen worden verstuurd door een Cloudflare Worker met cron, die ook dagelijks
een klein verzoek naar Supabase stuurt.
**Waarom:** een gratis Supabase-project pauzeert na 1 week zonder activiteit; dan zouden widget
en meldingen stoppen. Wordt opnieuw bekeken bij M15/M16.

### D15 – Hosting op Cloudflare Workers in plaats van Pages (vervangt D4) · 2026-11-24
**Keuze:** de app staat op Cloudflare Workers (met "static assets"), gekoppeld aan GitHub.
De instellingen staan in `wrangler.jsonc`.
**Waarom:** Cloudflare raadt Workers nu aan voor nieuwe projecten en voegt daar nieuwe functies
toe. Het tonen van de app blijft gratis en onbeperkt. En in fase 1b hebben we toch een Worker
nodig voor de meldingen, dus alles staat op één plek.
**Wat blijft hetzelfde als D4:** gratis, HTTPS, GitHub als backup, automatisch online na elke push.

### D16 – Stijl met CSS Modules en CSS-variabelen · 2026-11-24
**Keuze:** elk scherm of blokje heeft zijn eigen `.module.css`-bestand ernaast. Kleuren,
lettertypes en maten staan als variabelen in `src/styles/tokens.css`.
**Waarom:** gewone CSS is het makkelijkst te lezen, de stijl staat naast de code die hem
gebruikt, en stijlen van verschillende schermen kunnen niet botsen. Geen extra bibliotheek nodig.
**Alternatief bekeken:** Tailwind. Snel om mee te werken, maar lange rijen klassenamen zijn
moeilijk te lezen voor een beginner.

### D17 – Nieuwe versies automatisch laden bij het openen · 2026-11-24
**Keuze:** telkens je de app opent (of terughaalt naar de voorgrond), kijkt ze of er een nieuwe
versie online staat, en laadt die meteen.
**Waarom:** zo hoef je nooit zelf iets te doen om de nieuwste versie te krijgen. Omdat dit alleen
bij het openen gebeurt, word je niet onderbroken terwijl je iets invult.

### D18 – Git-naam zonder echt e-mailadres · 2026-11-24
**Keuze:** commits staan op naam van "Stan <stan@horizon.local>" (alleen in dit project).
**Waarom:** zo komt je echte e-mailadres niet op GitHub.
