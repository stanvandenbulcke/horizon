import { MapControls } from '@react-three/drei';
import { type ComponentRef, useEffect, useRef } from 'react';
import { worldConfig } from '@/world/worldConfig';

interface CameraRigProps {
  /** Hoe ver (vanaf het midden) je mag schuiven */
  limit: number;
}

/**
 * De bediening van de kaart: met één vinger schuiven, met twee vingers knijpen om te zoomen.
 * Draaien kan (nog) niet: de camera blijft schuin van boven kijken.
 */
export function CameraRig({ limit }: CameraRigProps) {
  const controls = useRef<ComponentRef<typeof MapControls>>(null);

  useEffect(() => {
    const instance = controls.current;
    if (!instance) return;
    // Houd het kijkpunt binnen een cirkel, zodat je niet de lege zee in schuift
    const keepInside = () => {
      const { target, object } = instance;
      const distance = Math.hypot(target.x, target.z);
      if (distance <= limit) return;
      const factor = limit / distance;
      const dx = target.x * factor - target.x;
      const dz = target.z * factor - target.z;
      target.x += dx;
      target.z += dz;
      object.position.x += dx;
      object.position.z += dz;
    };
    instance.addEventListener('change', keepInside);
    return () => instance.removeEventListener('change', keepInside);
  }, [limit]);

  const { minZoom, maxZoom } = worldConfig.camera;
  return (
    <MapControls
      ref={controls}
      makeDefault
      enableRotate={false}
      enableDamping
      dampingFactor={0.15}
      screenSpacePanning={false}
      zoomToCursor
      minZoom={minZoom}
      maxZoom={maxZoom}
    />
  );
}
