import { useState } from 'react';
import { renameCompanion } from '@/actions/profile/profile';
import { settingsTexts } from '@/content/texts/settings';
import { config } from '@/game/config';
import { TextField } from '@/ui/TextField';

interface CompanionNameFieldProps {
  initialName: string;
}

/** De naam van je reisgezel. Wordt bewaard zodra je het veld verlaat. */
export function CompanionNameField({ initialName }: CompanionNameFieldProps) {
  const [name, setName] = useState(initialName);

  const save = () => {
    if (name.trim() === '') {
      // Een lege naam bewaren we niet: dan komt de oude naam terug
      setName(initialName);
      return;
    }
    if (name !== initialName) {
      void renameCompanion(name);
    }
  };

  return (
    <TextField
      label={settingsTexts.companion.label}
      value={name}
      onChange={setName}
      onBlur={save}
      maxLength={config.companion.maxNameLength}
    />
  );
}
