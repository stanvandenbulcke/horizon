# src/ui – de bouwstenen

**Hoort hier:** herbruikbare blokjes die er overal hetzelfde uitzien: knoppen, kaartjes,
een onderblad (sheet), de schelpenteller, de voortgangsring. Elk blokje is één bestand
met zijn eigen stijl ernaast (`Button.tsx` + `Button.module.css`).

Ook kleine hulpjes voor de bediening horen hier, zoals `useGoBack` (de terugknop die altijd
terugkeert naar waar je vandaan kwam).

**Regel:** een bouwsteen weet niets van het spel. Een knop weet niet wat een schelp is;
hij krijgt gewoon een tekst en een actie. Ook teksten voor schermlezers krijgt een bouwsteen
binnen via zijn props, want `ui/` mag `content/` niet gebruiken.

**Mag gebruiken:** `lib/` en `styles/`.
