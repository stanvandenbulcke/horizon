import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@/app/App';
import { registerServiceWorker } from '@/app/registerServiceWorker';
import '@/styles/index.css';

// Startpunt van de app: hier wordt alles op het scherm gezet
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Het #root-element ontbreekt in index.html');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

registerServiceWorker();
