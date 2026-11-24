# src/styles – de stijl van de hele app

**Hoort hier:**

- `tokens.css` – alle kleuren, lettertypes, afstanden en afrondingen als variabelen
  (bv. `--color-sea`). Wil je een kleur aanpassen? Dan doe je dat hier, één keer.
- `fonts.css` – de lettertypes Fredoka en Nunito (zitten in de app zelf, voor offline)
- `global.css` – basisregels voor de hele pagina (achtergrond, safe areas, geen zoom bij dubbeltik)
- `index.css` – laadt de drie bestanden hierboven

**Hoort hier niet:** de stijl van één scherm of blokje. Die staat in een `.module.css`-bestand
naast dat scherm of blokje.
