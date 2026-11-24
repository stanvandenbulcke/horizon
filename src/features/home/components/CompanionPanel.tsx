import { lazy, Suspense } from 'react';
import { homeTexts } from '@/content/texts/home';
import type { CompanionStatus } from '@/data/hooks/useCompanion';
import { celebrate } from '@/features/celebrations';
import styles from './CompanionPanel.module.css';

// De 3D-close-up laadt pas als de rest van het scherm er al staat
const HomeCanvas = lazy(() =>
  import('@/world/scene/HomeCanvas').then((module) => ({ default: module.HomeCanvas })),
);

interface CompanionPanelProps {
  name: string;
  companion: CompanionStatus;
}

/** Je thuiseiland in 3D met je reisgezel en zijn tuin, plus zijn level. */
export function CompanionPanel({ name, companion }: CompanionPanelProps) {
  const texts = homeTexts.companion;
  return (
    <section className={styles.panel}>
      <div className={styles.scene} role="img" aria-label={texts.sceneLabel(name)}>
        <Suspense fallback={null}>
          <HomeCanvas
            home={{ companionLook: companion.look, gardenSize: companion.points }}
            onCompanionTap={() => celebrate('small')}
          />
        </Suspense>
      </div>
      <p className={styles.caption}>
        <strong>{name}</strong> · {texts.level(companion.level)} ·{' '}
        {texts.toNext(companion.toNextLevel)}
      </p>
    </section>
  );
}
