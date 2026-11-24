import { CylinderGeometry } from 'three';
import { seededRandom } from '@/lib/random';

/**
 * Een cilinder met een onregelmatige rand, zodat een eiland er natuurlijk uitziet in plaats van
 * als een perfect rond taartje. Hetzelfde zaadje geeft altijd dezelfde vorm.
 */
export function organicCylinder(
  radiusTop: number,
  radiusBottom: number,
  height: number,
  segments: number,
  seed: string,
): CylinderGeometry {
  const geometry = new CylinderGeometry(radiusTop, radiusBottom, height, segments, 1);
  const random = seededRandom(seed);
  // Elke hoek krijgt één vaste uitstulping; punten op dezelfde hoek (boven, onder, deksel)
  // krijgen dezelfde, zodat er geen gaatjes ontstaan
  const bulgeByAngle = new Map<number, number>();
  const positions = geometry.attributes.position;
  if (!positions) return geometry;

  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const z = positions.getZ(i);
    if (Math.hypot(x, z) < 0.001) continue; // het middelpunt van een deksel blijft staan
    const angleKey = Math.round(Math.atan2(z, x) * 1000) || 0;
    let bulge = bulgeByAngle.get(angleKey);
    if (bulge === undefined) {
      bulge = 1 + (random() - 0.5) * 0.28;
      bulgeByAngle.set(angleKey, bulge);
    }
    positions.setX(i, x * bulge);
    positions.setZ(i, z * bulge);
  }
  geometry.computeVertexNormals();
  return geometry;
}
