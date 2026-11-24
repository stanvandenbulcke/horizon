# Horizon

> *Elke stap brengt je horizon dichterbij.*

Een doelen-app die aanvoelt als een spel: je leven is een levenskaart vol mist met eilanden.
Elk doel is een eiland, en met elke stap trekt de mist verder op.

- **Online:** https://horizon.stanvandenbulck.workers.dev (elke push naar `main` komt hier vanzelf)
- **Plan en mijlpalen:** [PLAN.md](PLAN.md)
- **Keuzes en waarom:** [DECISIONS.md](DECISIONS.md)
- **Regels voor Claude:** [CLAUDE.md](CLAUDE.md)
- **Gidsen:** [online zetten](docs/guides/hosting.md) · [op je iPhone zetten](docs/guides/iphone.md)

## Op je pc starten

Je hebt [Node.js](https://nodejs.org) (LTS) nodig.

```bash
npm install
```

```bash
npm run dev
```

Open daarna het adres dat je ziet (meestal http://localhost:5173).

## Commando's

| Commando | Wat het doet |
|---|---|
| `npm run dev` | De app starten op je pc; ververst vanzelf als de code verandert |
| `npm run dev:phone` | Zelfde, maar ook bereikbaar vanaf je iPhone op hetzelfde wifi-netwerk |
| `npm run test` | Alle tests draaien |
| `npm run check` | Alles controleren: types, mapregels, opmaak en tests |
| `npm run format` | Alle code netjes in dezelfde vorm zetten |
| `npm run build` | De echte versie bouwen (in de map `dist`) |
| `npm run preview` | De gebouwde versie bekijken op je pc |
| `npm run icons` | De app-iconen opnieuw maken uit `public/icons/icon.svg` |

## Waar staat wat?

Zie [PLAN.md §2](PLAN.md#2-mappenstructuur-alles-op-zijn-vaste-plek). Elk hoofdmapje in `src/`
heeft ook een eigen `README.md` met uitleg.
