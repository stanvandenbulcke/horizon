# src/ui – de bouwstenen

**Hoort hier:** herbruikbare blokjes die er overal hetzelfde uitzien: knoppen, kaartjes,
een onderblad (sheet), de schelpenteller, de voortgangsring. Elk blokje is één bestand
met zijn eigen stijl ernaast (`Button.tsx` + `Button.module.css`).

**Regel:** een bouwsteen weet niets van het spel. Een knop weet niet wat een schelp is;
hij krijgt gewoon een tekst en een actie.

**Mag gebruiken:** `lib/` en `styles/`.
