import { useLocation, useNavigate } from 'react-router';

/**
 * Geeft een functie die terugkeert naar het vorige scherm, net als de terugknop van een browser.
 * Is er geen vorig scherm (bv. als de app net opende), dan gaan we naar `fallback`:
 * standaard één niveau omhoog in het adres (van /settings/routines naar /settings).
 */
export function useGoBack(fallback = '..'): () => void {
  const navigate = useNavigate();
  const location = useLocation();
  return () => {
    if (location.key !== 'default') {
      void navigate(-1);
    } else {
      void navigate(fallback, { replace: true, relative: 'path' });
    }
  };
}
