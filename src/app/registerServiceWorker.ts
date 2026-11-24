import { registerSW } from 'virtual:pwa-register';

/**
 * Zet de service worker aan: het stukje dat de app offline laat werken.
 * Telkens je de app opnieuw opent, kijkt hij of er een nieuwe versie online staat.
 * Is er een, dan laadt hij die meteen.
 */
export function registerServiceWorker(): void {
  registerSW({
    immediate: true,
    onRegisteredSW(_url, registration) {
      if (!registration) return;
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
          void registration.update();
        }
      });
    },
  });
}
