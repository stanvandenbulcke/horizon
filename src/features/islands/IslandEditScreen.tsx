import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { deleteIsland } from '@/actions/islands/manageIslands';
import { islandTexts } from '@/content/texts/islands';
import { navigationTexts } from '@/content/texts/navigation';
import { useIslandDetail } from '@/data/hooks/useIslands';
import { mapPaths } from '@/features/map';
import { Button } from '@/ui/Button';
import { Notice } from '@/ui/Notice';
import { Screen } from '@/ui/Screen';
import { ScreenHeader } from '@/ui/ScreenHeader';
import { useGoBack } from '@/ui/useGoBack';
import { IslandEditForm } from './components/IslandEditForm';
import { LandmarkEditor } from './components/LandmarkEditor';
import styles from './IslandEditScreen.module.css';

const texts = islandTexts.editScreen;

/** Een eiland aanpassen of verwijderen. */
export function IslandEditScreen() {
  const { islandId } = useParams();
  const navigate = useNavigate();
  const goBack = useGoBack();
  const detail = useIslandDetail(islandId);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const header = (
    <ScreenHeader title={texts.title} onBack={goBack} backLabel={navigationTexts.back} />
  );
  if (detail === undefined) return <Screen>{header}</Screen>;
  if (detail === null) {
    return (
      <Screen>
        {header}
        <Notice {...islandTexts.notFound} />
      </Screen>
    );
  }

  const { island, landmarks } = detail;
  const remove = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    await deleteIsland(island.id);
    void navigate(mapPaths.root, { replace: true });
  };

  return (
    <Screen>
      {header}
      <IslandEditForm key={island.id} island={island} onSaved={goBack} />
      {island.type === 'path' && island.parentIslandId === null && (
        <LandmarkEditor islandId={island.id} landmarks={landmarks} />
      )}
      <div className={styles.danger}>
        <Button variant="danger" fullWidth onClick={() => void remove()}>
          {confirmDelete ? texts.deleteConfirm : texts.delete}
        </Button>
        <p className={styles.hint}>{texts.deleteHint}</p>
      </div>
    </Screen>
  );
}
