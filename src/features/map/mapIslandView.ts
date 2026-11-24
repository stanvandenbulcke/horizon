import { fogLevel } from '@/game/islands/fog';
import type { Island } from '@/game/model';
import type { MapIsland } from '@/world/types';

/** Zet een opgeslagen eiland om naar wat de 3D-wereld nodig heeft om het te tekenen. */
export function toMapIsland(island: Island, progress: number): MapIsland {
  return {
    id: island.id,
    name: island.name,
    emoji: island.emoji,
    color: island.color,
    type: island.type,
    position: island.position,
    sideQuest: island.parentIslandId !== null,
    fog: fogLevel(progress),
    sleeping: false,
    completed: island.status === 'completed',
  };
}
