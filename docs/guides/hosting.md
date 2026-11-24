# Gids: Horizon online zetten (gratis)

We zetten de app online met twee gratis diensten:

- **GitHub** bewaart de code online. Het is ook je backup.
- **Cloudflare** bouwt de app en zet ze op een eigen webadres met HTTPS (een beveiligde
  verbinding, nodig om de app op je iPhone te installeren).

Daarna gaat alles vanzelf: elke keer Claude een nieuwe versie naar GitHub stuurt, zet
Cloudflare die binnen een paar minuten online.

Tijd: ongeveer 15 minuten. Je hebt geen creditcard nodig.

---

## Deel 1 – GitHub

### 1. Account maken
1. Ga naar **github.com** en klik op **Sign up**.
2. Vul je e-mailadres in, kies een wachtwoord en een gebruikersnaam.
3. Bevestig je e-mailadres met de code die je krijgt.
4. Kies het gratis plan (**Free**) als dat gevraagd wordt.

### 2. Een lege repository maken
Een *repository* (kort: repo) is een projectmap op GitHub.

1. Klik rechtsboven op het **+**-teken en dan op **New repository**.
2. **Repository name:** `horizon`
3. Kies **Private** (alleen jij kan het zien).
4. Vink **niets** aan bij "Add a README", ".gitignore" of "license". De repo moet leeg zijn.
5. Klik op **Create repository**.
6. Kopieer het adres dat je ziet, iets als `https://github.com/jouwnaam/horizon.git`,
   en geef het aan Claude.

### 3. De code versturen
Claude stuurt de code naar GitHub. De eerste keer opent er een venster van
**Git Credential Manager** om in te loggen bij GitHub. **Log daar zelf in**: Claude typt nooit
je wachtwoord. Windows onthoudt dit daarna.

> Je commits staan op naam van "Stan <stan@horizon.local>". Zo komt je echte e-mailadres
> niet op GitHub.

---

## Deel 2 – Cloudflare

### 4. Account maken
1. Ga naar **dash.cloudflare.com/sign-up**.
2. Vul je e-mailadres en een wachtwoord in, en bevestig je e-mailadres.
3. Krijg je vragen over een website of domein? Die mag je overslaan: we hebben geen eigen
   domein nodig.

### 5. De app koppelen aan GitHub
1. Kies in het menu links **Compute (Workers)** (soms heet het **Workers & Pages**).
2. Klik op **Create application** (of **Create**).
3. Kies **Import a repository** (of **Connect to Git**).
4. Kies **GitHub** en klik op **Connect**. GitHub vraagt welke repo's Cloudflare mag zien:
   kies **Only select repositories** en dan alleen **horizon**. Klik op **Install & Authorize**.
5. Kies de repo **horizon**.
6. Controleer de instellingen:
   - **Project name:** `horizon`
   - **Build command:** `npm run build`
   - **Deploy command:** `npx wrangler deploy`
7. Klik op **Create and deploy** (of **Deploy**).

Cloudflare bouwt nu de app. Dat duurt 1 à 3 minuten. Als het klaar is, zie je een adres zoals
`https://horizon.jouwnaam.workers.dev`. **Geef dat adres aan Claude**, dan zetten we het in de
README.

### Lukt iets niet?
- Zien de knoppen er anders uit? Cloudflare past zijn website soms aan. Maak een schermafbeelding
  en geef die aan Claude.
- Is de bouw mislukt (rode melding)? Klik op de mislukte bouw, kopieer de tekst van het logboek
  en geef die aan Claude.

---

## Wat is gratis, en tot hoever?

| Dienst | Gratis | Genoeg voor Horizon? |
|---|---|---|
| GitHub | onbeperkt privé-repo's | Ja |
| Cloudflare Workers | het tonen van de app (statische bestanden) is gratis en onbeperkt | Ja |
| Cloudflare-builds | een beperkt aantal bouwminuten per maand; één bouw duurt ongeveer 1 minuut | Ja, ruim |

Volgende stap: [de app op je iPhone zetten](iphone.md).
