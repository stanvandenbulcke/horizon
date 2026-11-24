import { useState } from 'react';
import { welcomeTexts } from '@/content/texts/welcome';
import { pickDifferent, pickRandom } from '@/lib/random';
import { Button } from '@/ui/Button';
import styles from './HomeScreen.module.css';

/**
 * Het "Hallo Horizon"-scherm van M0.
 * In M1 wordt dit het echte thuiseiland met je routines en schelpen.
 */
export function HomeScreen() {
  const [greeting, setGreeting] = useState(() => pickRandom(welcomeTexts.greetings));

  const showAnotherGreeting = () => {
    setGreeting((current) => pickDifferent(welcomeTexts.greetings, current));
  };

  return (
    <main className={styles.screen}>
      <div className={styles.sun} aria-hidden="true" />
      <div className={styles.sea} aria-hidden="true" />

      <header className={styles.header}>
        <h1 className={styles.title}>{welcomeTexts.title}</h1>
        <p className={styles.tagline}>{welcomeTexts.tagline}</p>
      </header>

      {/* De key zorgt dat de ballon bij elke nieuwe groet opnieuw stuitert */}
      <p key={greeting} className={styles.bubble} aria-live="polite">
        {greeting}
      </p>

      <footer className={styles.footer}>
        <Button onClick={showAnotherGreeting}>{welcomeTexts.anotherGreeting}</Button>
        <p className={styles.note}>{welcomeTexts.comingSoon}</p>
      </footer>
    </main>
  );
}
