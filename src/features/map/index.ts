import { lazy } from 'react';

// Voordeur van de Kaart-feature: alleen wat hier staat, mag de rest van de app gebruiken.
// Het kaartscherm (met alle 3D) wordt pas geladen als je het opent, zodat de app snel start.
export const MapScreen = lazy(() => import('./MapScreen'));
export { mapPaths } from './paths';
