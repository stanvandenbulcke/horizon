import { db } from '@/data/db';
import { markDeleted, newRecordFields } from '@/data/records';
import { dayLogRepository } from '@/data/repositories/dayLogRepository';
import { profileRepository } from '@/data/repositories/profileRepository';
import { routineRepository } from '@/data/repositories/routineRepository';
import { shellRepository } from '@/data/repositories/shellRepository';
import type { DayLog, GameDay, Id } from '@/game/model';
import { withCompletion } from '@/game/routines/completion';
import { goalJustReached, shellsEarnedOn } from '@/game/shells/shells';

export interface ToggleRoutineResult {
  /** true = net afgevinkt, false = vinkje weggehaald */
  completed: boolean;
  /** Hoeveel schelpen erbij kwamen (of eraf gingen bij ongedaan maken). */
  shells: number;
  /** true als je dagdoel door deze tik net gehaald werd (tijd voor een feestje). */
  goalReached: boolean;
}

/**
 * Vinkt een routine af, of haalt het vinkje weg als ze al gedaan was.
 * Afvinken geeft schelpen; het vinkje weghalen neemt ze weer terug.
 */
export async function toggleRoutine(
  routineId: Id,
  day: GameDay,
  now: number = Date.now(),
): Promise<ToggleRoutineResult> {
  return db.transaction(
    'rw',
    [db.profile, db.routines, db.dayLogs, db.shellTransactions],
    async () => {
      const routine = await routineRepository.get(routineId);
      const profile = await profileRepository.get();
      if (!routine || !profile) {
        throw new Error('Routine of profiel niet gevonden');
      }

      const log: DayLog = (await dayLogRepository.get(day)) ?? {
        ...newRecordFields(now),
        id: day,
        day,
        completedRoutineIds: [],
        dailyGoal: profile.dailyGoal,
      };
      const transactions = await shellRepository.listByDay(day);
      const earnedBefore = shellsEarnedOn(transactions, day);
      const completed = !log.completedRoutineIds.includes(routineId);

      if (completed) {
        await shellRepository.put({
          ...newRecordFields(now),
          day,
          amount: routine.shells,
          reason: 'routine',
          refId: routineId,
        });
      } else {
        const earned = transactions.find(
          (t) => t.reason === 'routine' && t.refId === routineId && t.deletedAt === null,
        );
        if (earned) {
          await shellRepository.put(markDeleted(earned, now));
        }
      }

      await dayLogRepository.put({
        ...log,
        completedRoutineIds: withCompletion(log.completedRoutineIds, routineId, completed),
        updatedAt: now,
      });

      const earnedAfter = shellsEarnedOn(await shellRepository.listByDay(day), day);
      return {
        completed,
        shells: completed ? routine.shells : -(earnedBefore - earnedAfter),
        goalReached: goalJustReached(earnedBefore, earnedAfter, log.dailyGoal),
      };
    },
  );
}
