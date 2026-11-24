import { useEffect } from 'react';
import { ensureProfile } from '@/actions/profile/profile';
import { requestPersistentStorage } from '@/data/persistentStorage';

/** Wat er één keer moet gebeuren als de app opstart. */
export function useStartup(): void {
  useEffect(() => {
    // Bij de allereerste start: je profiel aanmaken
    void ensureProfile();
    // De browser vragen om je gegevens niet zomaar te wissen
    void requestPersistentStorage();
  }, []);
}
