import { defineConfig, minimal2023Preset } from '@vite-pwa/assets-generator/config';

// Maakt alle app-iconen (ook het iPhone-icoon) uit één tekening: public/icons/icon.svg
// Opnieuw maken na een aanpassing: `npm run icons`
export default defineConfig({
  headLinkOptions: { preset: '2023' },
  preset: {
    ...minimal2023Preset,
    // De tekening vult zelf het hele vierkant, dus geen extra witte rand
    transparent: { ...minimal2023Preset.transparent, padding: 0 },
    maskable: { ...minimal2023Preset.maskable, padding: 0 },
    apple: { ...minimal2023Preset.apple, padding: 0 },
  },
  images: ['public/icons/icon.svg'],
});
