import { config } from '@/game/config';
import { materials, tintMaterial } from '@/world/materials';
import { worldConfig } from '@/world/worldConfig';
import { shapes } from './shapes';

interface BridgeSpanProps {
  /** Van 0 tot 1: hoeveel van de brug er al ligt */
  progress: number;
  color: string;
  /** Waar de brug begint, ten opzichte van het eiland */
  position: [number, number, number];
  /** Draaiing zodat de brug naar het eiland wijst */
  rotationY: number;
}

/**
 * Een brug die vanaf een steigertje naar het eiland toe groeit. Elke plank is een stukje van je
 * doel; de pijlers verschijnen bij 25, 50, 75 en 100%.
 */
export function BridgeSpan({ progress, color, position, rotationY }: BridgeSpanProps) {
  const { length, planks } = worldConfig.bridge;
  const laid = Math.floor(progress * planks + 1e-9);
  const spacing = length / planks;

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Het steigertje waar de brug begint */}
      <mesh
        geometry={shapes.box}
        material={materials.woodDark}
        position={[-0.45, 0.28, 0]}
        scale={[0.9, 0.16, 1.3]}
      />
      {Array.from({ length: laid }, (_, i) => (
        <mesh
          key={i}
          geometry={shapes.box}
          material={i % 2 === 0 ? materials.wood : materials.woodDark}
          position={[(i + 0.5) * spacing, 0.32, 0]}
          scale={[spacing * 0.85, 0.08, 0.9]}
        />
      ))}
      {config.islands.bridgeThresholds
        .filter((threshold) => progress >= threshold)
        .map((threshold) =>
          [-0.5, 0.5].map((side) => (
            <group
              key={`${threshold}-${side}`}
              position={[threshold * length - spacing / 2, 0, side]}
            >
              <mesh
                geometry={shapes.cylinder}
                material={materials.woodDark}
                position={[0, 0.35, 0]}
                scale={[0.14, 0.9, 0.14]}
              />
              <mesh
                geometry={shapes.box}
                material={tintMaterial(color)}
                position={[0, 0.85, 0]}
                scale={[0.2, 0.14, 0.2]}
              />
            </group>
          )),
        )}
    </group>
  );
}
