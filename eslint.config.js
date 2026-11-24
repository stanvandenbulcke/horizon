import { readdirSync } from 'node:fs';
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';
import reactHooks from 'eslint-plugin-react-hooks';
import { reactRefresh } from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

// ─────────────────────────────────────────────────────────────────────────────
// Mapregels: wie mag wie gebruiken? (zelfde tabel als in CLAUDE.md)
// Gebruikt een bestand een map die niet mag, dan geeft `npm run lint` een fout.
// ─────────────────────────────────────────────────────────────────────────────
const LAYERS = [
  'app',
  'game',
  'data',
  'actions',
  'world',
  'features',
  'ui',
  'content',
  'audio',
  'lib',
  'styles',
];

const ALLOWED = {
  app: LAYERS,
  game: ['lib'],
  data: ['game', 'lib'],
  actions: ['game', 'data', 'content', 'lib'],
  world: ['game', 'content', 'audio', 'lib'],
  features: ['game', 'data', 'actions', 'world', 'features', 'ui', 'content', 'audio', 'lib'],
  ui: ['lib', 'styles'],
  content: ['game', 'lib'],
  audio: ['lib'],
  lib: [],
  styles: [],
};

// Deze mappen bevatten puur rekenwerk of tekst: geen React, 3D of database
const PURE_LAYERS = ['game', 'content', 'lib'];
const FRAMEWORK_PACKAGES =
  '^(react|react-dom|three|@react-three/[^/]+|dexie|dexie-react-hooks|zustand|motion|howler|canvas-confetti)(/.*)?$';

const NO_PARENT_IMPORTS = {
  regex: '^\\.\\./',
  message: 'Gebruik @/… in plaats van ../ (zie CLAUDE.md).',
};

function importRulesFor(layer, extraPatterns = []) {
  const forbidden = LAYERS.filter((other) => other !== layer && !ALLOWED[layer].includes(other));
  const patterns = [NO_PARENT_IMPORTS, ...extraPatterns];
  if (forbidden.length > 0) {
    patterns.push({
      regex: `^@/(${forbidden.join('|')})(/|$)`,
      message: `src/${layer}/ mag deze map niet gebruiken (zie de mapregels in CLAUDE.md).`,
    });
  }
  if (PURE_LAYERS.includes(layer)) {
    patterns.push({
      regex: FRAMEWORK_PACKAGES,
      message: `src/${layer}/ is puur rekenwerk of tekst: geen React, 3D of database.`,
    });
  }
  return { 'no-restricted-imports': ['error', { patterns }] };
}

// Elke feature mag een andere feature alleen via haar voordeur (index.ts) gebruiken
function featureFolders() {
  try {
    return readdirSync('src/features', { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);
  } catch {
    return [];
  }
}

const boundaryConfigs = [
  { files: ['src/**/*.{ts,tsx}'], rules: importRulesFor('app') },
  ...LAYERS.filter((layer) => layer !== 'app').map((layer) => ({
    files: [`src/${layer}/**/*.{ts,tsx}`],
    rules: importRulesFor(layer),
  })),
  ...featureFolders().map((feature) => ({
    files: [`src/features/${feature}/**/*.{ts,tsx}`],
    rules: importRulesFor('features', [
      {
        regex: `^@/features/(?!${feature}/)[^/]+/`,
        message: 'Gebruik een andere feature alleen via haar index.ts (bv. @/features/home).',
      },
    ]),
  })),
];

export default defineConfig([
  globalIgnores(['dist', 'dev-dist', 'coverage', 'public']),

  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite(),
    ],
    languageOptions: { globals: globals.browser },
    rules: {
      // Grote bestanden splitsen we op (zie CLAUDE.md)
      'max-lines': ['warn', { max: 250, skipBlankLines: true, skipComments: true }],
    },
  },

  // Instellingenbestanden draaien in Node, niet in de browser
  {
    files: ['*.{js,ts}'],
    languageOptions: { globals: globals.node },
  },

  ...boundaryConfigs,

  // Laat Prettier over de opmaak beslissen
  prettier,
]);
