import React, { useState, useEffect, useCallback } from 'react';
import { TrackerState, CustomProblemDraft } from '../types';
import { getTodayISO } from '../utils/dateUtils';
import {
  STORAGE_KEY,
  DEFAULT_STATE,
  loadPersistedState,
  savePersistedState,
  migrateVideoAliases
} from '../utils/storage';
import { useBackupSync } from './useBackupSync';
import { useTrackerProgress } from './useTrackerProgress';

export { STORAGE_KEY, DEFAULT_STATE, loadPersistedState, migrateVideoAliases };

export function useTrackerState() {
  const [state, setState] = useState<TrackerState>(loadPersistedState);
  const [toast, setToast] = useState<string | null>(null);
  const [newProblemDrafts, setNewProblemDrafts] = useState<Record<string, CustomProblemDraft>>({});

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }, []);

  // Save to localStorage safely on state change
  useEffect(() => {
    savePersistedState(state);
  }, [state]);

  // Helper to update state. Pass { streak: false } for non-study actions
  const updateTracker = useCallback(
    (
      updater: React.SetStateAction<TrackerState> | ((prev: TrackerState) => TrackerState),
      opts: { streak?: boolean } = {}
    ) => {
      const today = getTodayISO();
      setState((prev) => {
        const next =
          typeof updater === 'function'
            ? (updater as (prev: TrackerState) => TrackerState)(prev)
            : updater;
        if (opts.streak === false) return next;

        let streak = prev.streakCount || 0;
        if (prev.lastActiveDate === today) {
          streak = Math.max(streak, 1);
        } else {
          const yest = new Date();
          yest.setDate(yest.getDate() - 1);
          const yestISO = `${yest.getFullYear()}-${String(yest.getMonth() + 1).padStart(2, '0')}-${String(
            yest.getDate()
          ).padStart(2, '0')}`;
          streak = prev.lastActiveDate === yestISO ? streak + 1 : 1;
        }
        return { ...next, streakCount: streak, lastActiveDate: today };
      });
    },
    []
  );

  const progressHandlers = useTrackerProgress({
    state,
    updateTracker,
    showToast,
    newProblemDrafts,
    setNewProblemDrafts
  });

  const backupHandlers = useBackupSync({
    state,
    setState,
    showToast
  });

  return {
    state,
    setState,
    toast,
    showToast,
    newProblemDrafts,
    setNewProblemDrafts,
    updateTracker,
    ...progressHandlers,
    ...backupHandlers
  };
}
