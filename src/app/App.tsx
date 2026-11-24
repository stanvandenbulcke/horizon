import { BrowserRouter } from 'react-router';
import { AppRoutes } from './AppRoutes';
import { useStartup } from './useStartup';

/** Het hoofdcomponent: zet de schermwissels klaar en doet wat nodig is bij het opstarten. */
export function App() {
  useStartup();
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
