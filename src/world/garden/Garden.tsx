import { useMemo } from 'react';
import { gardenLayout } from './gardenLayout';
import { Plant } from './Plant';

interface GardenProps {
  /** Aantal plantjes: één per dag dat je je dagdoel haalde */
  count: number;
}

/** De tuin op je thuiseiland: elke dag dat je je dagdoel haalt, groeit er iets nieuws. */
export function Garden({ count }: GardenProps) {
  const plants = useMemo(() => gardenLayout(count), [count]);
  return (
    <group>
      {plants.map((plant, index) => (
        <Plant key={index} plant={plant} />
      ))}
    </group>
  );
}
