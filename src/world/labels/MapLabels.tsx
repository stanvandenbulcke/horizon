import type { RefObject } from 'react';
import { cx } from '@/lib/classNames';
import type { LabelAnchor, LabelElements } from './labelTypes';
import styles from './MapLabels.module.css';

interface MapLabelsProps {
  labels: readonly LabelAnchor[];
  elements: RefObject<LabelElements>;
}

/**
 * De naambordjes van de eilanden, als gewone tekst bovenop de 3D-wereld (dus altijd scherp).
 * Ze vangen geen tikken op, zodat je er gewoon overheen kan schuiven.
 * `LabelTracker` (in de 3D-wereld) schuift ze naar de juiste plek.
 */
export function MapLabels({ labels, elements }: MapLabelsProps) {
  return (
    <div className={styles.layer} aria-hidden="true">
      {labels.map((label) => (
        <div
          key={label.id}
          ref={(element) => {
            if (element) elements.current.set(label.id, element);
            else elements.current.delete(label.id);
          }}
          className={cx(styles.label, label.small && styles.small)}
        >
          <span>{label.emoji}</span>
          <span className={styles.name}>{label.name}</span>
        </div>
      ))}
    </div>
  );
}
