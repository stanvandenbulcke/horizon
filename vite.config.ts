import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vitest/config';

// Kleuren van het app-icoon en het opstartscherm (dezelfde als in src/styles/tokens.css)
const SEA_BLUE = '#1a8fc4';

export default defineConfig({
  resolve: {
    // Zo kan je overal `@/game/...` schrijven in plaats van `../../game/...`
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },

  plugins: [
    react(),
    VitePWA({
      // Nieuwe versie? Dan wordt die automatisch geladen.
      registerType: 'autoUpdate',
      // We registreren de service worker zelf in src/app/registerServiceWorker.ts
      injectRegister: false,
      manifest: {
        name: 'Horizon',
        short_name: 'Horizon',
        description: 'Elke stap brengt je horizon dichterbij.',
        lang: 'nl',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait',
        background_color: SEA_BLUE,
        theme_color: SEA_BLUE,
        icons: [
          { src: '/icons/pwa-64x64.png', sizes: '64x64', type: 'image/png' },
          { src: '/icons/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          {
            src: '/icons/maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      // De iconen zitten al in globPatterns hieronder, dus niet nog eens apart toevoegen
      includeManifestIcons: false,
      workbox: {
        // Alles wat de app nodig heeft wordt bewaard, zodat ze offline werkt
        // (het manifest voegt de plugin zelf toe)
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
      },
    }),
  ],

  test: {
    include: ['src/**/*.test.{ts,tsx}'],
  },
});
