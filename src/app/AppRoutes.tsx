import { Navigate, Route, Routes } from 'react-router';
import { HomeScreen, homePaths } from '@/features/home';
import { LogbookScreen, logbookPaths } from '@/features/logbook';
import { MapScreen, mapPaths } from '@/features/map';
import {
  RoutineEditScreen,
  RoutinePickerScreen,
  RoutinesScreen,
  routinesPaths,
} from '@/features/routines';
import { SettingsScreen, settingsPaths } from '@/features/settings';
import { TabLayout } from './TabLayout';

/** Welk scherm hoort bij welk adres? */
export function AppRoutes() {
  return (
    <Routes>
      {/* De 3 tabs onderaan */}
      <Route element={<TabLayout />}>
        <Route path={homePaths.root} element={<HomeScreen />} />
        <Route path={mapPaths.root} element={<MapScreen />} />
        <Route path={logbookPaths.root} element={<LogbookScreen />} />
      </Route>

      {/* Schermen zonder tabs, met een terugknop */}
      <Route path={settingsPaths.root} element={<SettingsScreen />} />
      <Route path={routinesPaths.list} element={<RoutinesScreen />} />
      <Route path={routinesPaths.add} element={<RoutinePickerScreen />} />
      <Route path={routinesPaths.create} element={<RoutineEditScreen />} />
      <Route path={routinesPaths.editPattern} element={<RoutineEditScreen />} />

      {/* Onbekend adres? Gewoon naar huis. */}
      <Route path="*" element={<Navigate to={homePaths.root} replace />} />
    </Routes>
  );
}
