import type { CreatureSpecies } from '@/game/creatures/creature';
import type { IslandType, MapPosition } from '@/game/model';

/** Je reisgezel en zijn tuin, zoals de wereld ze moet tekenen. */
export interface HomeView {
  /** 0 tot 3: de look die je reisgezel vrijspeelde */
  companionLook: number;
  /** Aantal plantjes in de tuin */
  gardenSize: number;
}

/**
 * Wat de 3D-wereld van een eiland moet weten om het te tekenen.
 * Het kaartscherm zet de opgeslagen eilanden om naar deze vorm.
 */
export interface MapIsland {
  id: string;
  name: string;
  emoji: string;
  color: string;
  type: IslandType;
  position: MapPosition;
  sideQuest: boolean;
  /** 0 = geen mist meer, 1 = helemaal in de mist */
  fog: number;
  /** Van 0 tot 1: hoe ver je bent (bij een brug: hoeveel planken er liggen) */
  progress: number;
  sleeping: boolean;
  completed: boolean;
  /** Het wezentje dat op dit eiland woont (side quests hebben er geen) */
  creature: { species: CreatureSpecies; stage: number } | null;
}
