import React, { useCallback } from 'react';
import { TrackerState } from '../types';
import { DEFAULT_STATE, migrateVideoAliases } from '../utils/storage';
import { migrateSubtopicProgress } from '../data/syllabusData';
import { getTodayISO } from '../utils/dateUtils';

interface UseBackupSyncProps {
  state: TrackerState;
  setState: React.Dispatch<React.SetStateAction<TrackerState>>;
  showToast: (msg: string) => void;
}

export function useBackupSync({ state, setState, showToast }: UseBackupSyncProps) {
  const handleExportJson = useCallback(() => {
    try {
      const dataStr = JSON.stringify(state, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `cpp_dsa_backup_${getTodayISO()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Backup downloaded. Keep it somewhere safe.');
    } catch (_e) {
      showToast('Failed to export JSON.');
    }
  }, [state, showToast]);

  const handleCopyJson = useCallback(async () => {
    try {
      const dataStr = JSON.stringify(state, null, 2);
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(dataStr);
      } else {
        const ta = document.createElement('textarea');
        ta.value = dataStr;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      showToast('Backup JSON copied to clipboard!');
    } catch (_e) {
      showToast('Could not copy to clipboard. Try downloading instead.');
    }
  }, [state, showToast]);

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, onSuccess?: () => void) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const content = event.target?.result;
          if (typeof content !== 'string') throw new Error('File read error');
          const parsed = JSON.parse(content);
          if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
            showToast('Invalid backup file: expected a JSON object.');
            return;
          }
          setState((prev) => {
            const merged = {
              ...DEFAULT_STATE,
              ...prev,
              ...parsed,
              completedSubtopics: parsed.completedSubtopics || prev.completedSubtopics,
              watchedVideos: migrateVideoAliases(parsed.watchedVideos || prev.watchedVideos),
              solvedProblems: parsed.solvedProblems || prev.solvedProblems,
              unitNotes: migrateVideoAliases(parsed.unitNotes || prev.unitNotes),
              customProblems: parsed.customProblems || prev.customProblems,
              dayNotes: migrateVideoAliases(parsed.dayNotes || prev.dayNotes),
              fuzzyDays: migrateVideoAliases(parsed.fuzzyDays || prev.fuzzyDays)
            };
            return migrateSubtopicProgress({ ...merged, subtopicSchema: parsed.subtopicSchema });
          });
          if (onSuccess) onSuccess();
          showToast('Progress restored from uploaded file!');
        } catch (_err) {
          showToast('Failed to parse file. Please upload a valid JSON backup.');
        }
      };
      reader.readAsText(file);
      e.target.value = '';
    },
    [setState, showToast]
  );

  const handleImportJson = useCallback(
    (importJsonText: string, onSuccess?: () => void) => {
      if (!importJsonText.trim()) return;
      try {
        const parsed = JSON.parse(importJsonText);
        if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
          showToast("That doesn't look like a valid backup. Check the text and try again.");
          return;
        }
        setState((prev) => {
          const merged = {
            ...DEFAULT_STATE,
            ...prev,
            ...parsed,
            completedSubtopics: parsed.completedSubtopics || prev.completedSubtopics,
            watchedVideos: migrateVideoAliases(parsed.watchedVideos || prev.watchedVideos),
            solvedProblems: parsed.solvedProblems || prev.solvedProblems,
            unitNotes: migrateVideoAliases(parsed.unitNotes || prev.unitNotes),
            customProblems: parsed.customProblems || prev.customProblems,
            dayNotes: migrateVideoAliases(parsed.dayNotes || prev.dayNotes),
            fuzzyDays: migrateVideoAliases(parsed.fuzzyDays || prev.fuzzyDays)
          };
          return migrateSubtopicProgress({ ...merged, subtopicSchema: parsed.subtopicSchema });
        });
        if (onSuccess) onSuccess();
        showToast('Progress restored from your backup.');
      } catch (_e) {
        showToast("That doesn't look like a valid backup. Check the text and try again.");
      }
    },
    [setState, showToast]
  );

  const handleResetAllProgress = useCallback(
    (onSuccess?: () => void) => {
      const fresh = {
        ...DEFAULT_STATE,
        startDate: getTodayISO()
      };
      setState(fresh);
      if (onSuccess) onSuccess();
      showToast('All progress reset to Day 1.');
    },
    [setState, showToast]
  );

  return {
    handleExportJson,
    handleCopyJson,
    handleFileUpload,
    handleImportJson,
    handleResetAllProgress
  };
}
