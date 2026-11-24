import type { ThreeEvent } from '@react-three/fiber';
import { worldConfig } from '@/world/worldConfig';

/**
 * Maakt een tik-handler voor iets in de 3D-wereld. Een tik telt alleen als je vinger bijna
 * niet bewoog: wie over de kaart schuift en daarbij over een eiland komt, opent het niet.
 */
export function onTap(handler: () => void) {
  return (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    if (event.delta > worldConfig.tapTolerance) return;
    handler();
  };
}
