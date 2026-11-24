import type { IsoWeekday, SyncFields } from './common';

/** Een routine: iets kleins dat je op bepaalde dagen doet en dat schelpen oplevert. */
export interface Routine extends SyncFields {
  name: string;
  emoji: string;
  /** 1 tot 3 schelpen */
  shells: number;
  weekdays: IsoWeekday[];
  /** Een gepauzeerde routine verschijnt niet bij "Vandaag", maar blijft bewaard. */
  active: boolean;
  /** Plaats in de lijst (klein = bovenaan). */
  order: number;
}
