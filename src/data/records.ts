import type { SyncFields, Timestamp } from '@/game/model';
import { createId } from '@/lib/id';

/** De vaste velden voor een nieuwe rij: een nieuwe id en de tijdstippen. */
export function newRecordFields(now: Timestamp): SyncFields {
  return { id: createId(), createdAt: now, updatedAt: now, deletedAt: null };
}

/** Markeert een rij als verwijderd (we wissen nooit echt, zodat synchroniseren later kan). */
export function markDeleted<T extends SyncFields>(record: T, now: Timestamp): T {
  return { ...record, deletedAt: now, updatedAt: now };
}
