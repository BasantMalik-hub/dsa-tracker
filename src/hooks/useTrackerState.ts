import { useState, useEffect, useCallback, useMemo } from 'react';
import { TrackerState, DayObject, Unit, CustomProblemDraft, DayProgress } from '../types';
import { VIDEO_ID_ALIASES, SUBTOPIC_SCHEMA, migrateSubtopicProgress } from '../data/syllabusData';
import { getTodayISO } from '../utils/dateUtils';
import { dayAnchor } from '../utils/scheduleGenerator';

export const STORAGE_KEY = 'cpp_dsa_master_tracker_v3';

export const DEFAULT_STATE: TrackerState = {
  completedSubtopics: {},
  watchedVideos: {},
  solvedProblems: {},
  unitNotes: {},
  customProblems: {},
  paceDays: 90,
  startDate: getTodayISO(),
  selectedDayNumber: 1,
  streakCount: 0,
  lastActiveDate: getTodayISO(),
  userName: '',
  dayNotes: {},
  fuzzyDays: {},
  subtopicSchema: SUBTOPIC_SCHEMA
};

// Carry saved ticks/notes over when a lecture's temporary id (ACnnn) is replaced by its real YouTube id
export const migrateVideoAliases = (obj: any): any => {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return obj || {};
  const pairs = Object.entries(VIDEO_ID_ALIASES);
  if (pairs.length === 0) return obj;
  const out: Record<string, any> = {};
  Object.entries(obj).forEach(([k, v]) => {
    let nk = k;
    pairs.forEach(([oldId, newId]) => {
      nk = nk.split(`_vid_${oldId}`).join(`_vid_${newId}`);
    });
    out[nk] = v;
  });
  return out;
};

export function loadPersistedState(): TrackerState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return DEFAULT_STATE;
    const isObj = (v: any) => v && typeof v === 'object' && !Array.isArray(v);
    return migrateSubtopicProgress({
      ...DEFAULT_STATE,
      ...parsed,
      completedSubtopics: isObj(parsed.completedSubtopics) ? parsed.completedSubtopics : {},
      watchedVideos: migrateVideoAliases(isObj(parsed.watchedVideos) ? parsed.watchedVideos : {}),
      solvedProblems: isObj(parsed.solvedProblems) ? parsed.solvedProblems : {},
      unitNotes: migrateVideoAliases(isObj(parsed.unitNotes) ? parsed.unitNotes : {}),
      customProblems: isObj(parsed.customProblems) ? parsed.customProblems : {},
      dayNotes: migrateVideoAliases(isObj(parsed.dayNotes) ? parsed.dayNotes : {}),
      fuzzyDays: migrateVideoAliases(isObj(parsed.fuzzyDays) ? parsed.fuzzyDays : {}),
      userName: typeof parsed.userName === 'string' ? parsed.userName : '',
      paceDays: [60, 90, 120].includes(Number(parsed.paceDays)) ? Number(parsed.paceDays) : 90,
      startDate: (typeof parsed.startDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(parsed.startDate)) ? parsed.startDate : getTodayISO(),
      selectedDayNumber: Number(parsed.selectedDayNumber) > 0 ? Number(parsed.selectedDayNumber) : 1,
      subtopicSchema: parsed.subtopicSchema
    });
  } catch (err) {
    console.warn('localStorage load fallback:', err);
    return DEFAULT_STATE;
  }
}

export function useTrackerState() {
  const [state, setState] = useState<TrackerState>(loadPersistedState);
  const [toast, setToast] = useState<string | null>(null);
  const [newProblemDrafts, setNewProblemDrafts] = useState<Record<string, CustomProblemDraft>>({});

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }, []);

  // Save to localStorage safely on every state update
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      console.warn('localStorage write warning:', err);
    }
  }, [state]);

  // Helper to update state. Pass { streak: false } for non-study actions
  const updateTracker = useCallback(
    (updater: React.SetStateAction<TrackerState> | ((prev: TrackerState) => TrackerState), opts: { streak?: boolean } = {}) => {
      const today = getTodayISO();
      setState((prev) => {
        const next = typeof updater === 'function' ? (updater as (prev: TrackerState) => TrackerState)(prev) : updater;
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

  // Streak shown in the UI: reset to 0 if you haven't studied today or yesterday
  const displayStreak = useMemo(() => {
    const yest = new Date();
    yest.setDate(yest.getDate() - 1);
    const yestISO = `${yest.getFullYear()}-${String(yest.getMonth() + 1).padStart(2, '0')}-${String(
      yest.getDate()
    ).padStart(2, '0')}`;
    const t = getTodayISO();
    return state.lastActiveDate === t || state.lastActiveDate === yestISO ? state.streakCount || 0 : 0;
  }, [state.lastActiveDate, state.streakCount]);

  const selectDay = useCallback(
    (dayNum: number, totalDays: number, setExpandedWeeks?: React.Dispatch<React.SetStateAction<Record<number, boolean>>>) => {
      const clamped = Math.max(1, Math.min(totalDays, dayNum));
      const weekNum = Math.ceil(clamped / 7);
      if (setExpandedWeeks) {
        setExpandedWeeks((prev) => ({ ...prev, [weekNum]: true }));
      }
      updateTracker((prev) => ({ ...prev, selectedDayNumber: clamped }), { streak: false });
    },
    [updateTracker]
  );

  const toggleSubtopic = useCallback(
    (subKey: string) => {
      updateTracker((prev) => ({
        ...prev,
        completedSubtopics: {
          ...prev.completedSubtopics,
          [subKey]: !prev.completedSubtopics[subKey]
        }
      }));
    },
    [updateTracker]
  );

  const toggleVideo = useCallback(
    (videoKey: string, linkedCount = 0) => {
      if (!state.watchedVideos[videoKey] && linkedCount > 0) {
        showToast(
          `Video done! Now solve ${linkedCount === 1 ? 'the practice problem' : `the ${linkedCount} practice problems`} for it to lock it in.`
        );
      }
      updateTracker((prev) => ({
        ...prev,
        watchedVideos: {
          ...prev.watchedVideos,
          [videoKey]: !prev.watchedVideos[videoKey]
        }
      }));
    },
    [state.watchedVideos, showToast, updateTracker]
  );

  const toggleProblem = useCallback(
    (probId: string) => {
      updateTracker((prev) => ({
        ...prev,
        solvedProblems: {
          ...prev.solvedProblems,
          [probId]: !prev.solvedProblems[probId]
        }
      }));
    },
    [updateTracker]
  );

  const toggleCompleteEntireDay = useCallback(
    (dayObj: DayObject, dailySchedule: DayObject[], getDayProgress: (d: DayObject) => DayProgress) => {
      const prog = getDayProgress(dayObj);
      const shouldComplete = prog.status !== 'COMPLETED';

      updateTracker((prev) => {
        const nextSubs = { ...prev.completedSubtopics };
        dayObj.subtopics.forEach((s) => {
          nextSubs[s.key] = shouldComplete;
        });
        const nextVids = { ...prev.watchedVideos };
        dayObj.videos.forEach((v) => {
          nextVids[v.key] = shouldComplete;
        });
        const nextProbs = {
          ...prev.solvedProblems,
          [dayObj.problemKey]: shouldComplete
        };

        const nextSelected =
          shouldComplete && dayObj.dayNumber < dailySchedule.length
            ? dayObj.dayNumber + 1
            : prev.selectedDayNumber;

        return {
          ...prev,
          completedSubtopics: nextSubs,
          watchedVideos: nextVids,
          solvedProblems: nextProbs,
          selectedDayNumber: nextSelected
        };
      });

      if (shouldComplete) {
        const lines = [
          `Day ${dayObj.dayNumber} done. Nice work.`,
          `Day ${dayObj.dayNumber} done. One more behind you.`,
          `Day ${dayObj.dayNumber} wrapped up. Go rest your eyes.`,
          `Day ${dayObj.dayNumber} done. Steady wins.`
        ];
        showToast(
          dayObj.unitDayIndex === dayObj.unitTotalDays
            ? `Day ${dayObj.dayNumber} done, and that wraps up this unit.`
            : lines[dayObj.dayNumber % lines.length]
        );
      } else {
        showToast(`Day ${dayObj.dayNumber} reopened.`);
      }
    },
    [showToast, updateTracker]
  );

  const toggleCompleteEntireUnit = useCallback(
    (unit: Unit) => {
      const allSubsDone = unit.subtopics.every((_, i) => !!state.completedSubtopics[`${unit.id}_sub_${i}`]);
      const allVidsDone = unit.videos.every((v) => !!state.watchedVideos[`${unit.id}_vid_${v.id}`]);
      const customList = state.customProblems[unit.id] || [];
      const allProbs = [...unit.problems, ...customList];
      const allProbsDone = allProbs.every((p) => !!state.solvedProblems[p.id]);
      const targetVal = !(allSubsDone && allVidsDone && allProbsDone);

      updateTracker((prev) => {
        const nextSubs = { ...prev.completedSubtopics };
        unit.subtopics.forEach((_, i) => {
          nextSubs[`${unit.id}_sub_${i}`] = targetVal;
        });
        const nextVids = { ...prev.watchedVideos };
        unit.videos.forEach((v) => {
          nextVids[`${unit.id}_vid_${v.id}`] = targetVal;
        });
        const nextProbs = { ...prev.solvedProblems };
        allProbs.forEach((p) => {
          nextProbs[p.id] = targetVal;
        });

        return {
          ...prev,
          completedSubtopics: nextSubs,
          watchedVideos: nextVids,
          solvedProblems: nextProbs
        };
      });

      showToast(targetVal ? `${unit.unitTitle} marked 100% complete!` : `${unit.unitTitle} reset.`);
    },
    [state.completedSubtopics, state.watchedVideos, state.customProblems, state.solvedProblems, showToast, updateTracker]
  );

  const handleRecalibrateToToday = useCallback(
    (dailySchedule: DayObject[], getDayProgress: (d: DayObject) => DayProgress) => {
      const firstIncompleteIdx = dailySchedule.findIndex((d) => getDayProgress(d).status !== 'COMPLETED');
      const offset = firstIncompleteIdx >= 0 ? firstIncompleteIdx : 0;
      const d = new Date();
      d.setDate(d.getDate() - offset);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      const newStartISO = `${yyyy}-${mm}-${dd}`;

      updateTracker(
        (prev) => ({
          ...prev,
          startDate: newStartISO,
          selectedDayNumber: offset + 1
        }),
        { streak: false }
      );
      showToast(`Done. Day ${offset + 1} is now today.`);
    },
    [showToast, updateTracker]
  );

  const handleNoteChange = useCallback(
    (unitId: string, text: string) => {
      updateTracker((prev) => ({
        ...prev,
        unitNotes: {
          ...prev.unitNotes,
          [unitId]: text
        }
      }));
    },
    [updateTracker]
  );

  const handleDayNoteChange = useCallback(
    (dayObj: DayObject, value: string) => {
      updateTracker((prev) => ({ ...prev, dayNotes: { ...prev.dayNotes, [dayAnchor(dayObj)]: value } }));
    },
    [updateTracker]
  );

  const toggleFuzzy = useCallback(
    (dayObj: DayObject) => {
      const k = dayAnchor(dayObj);
      const was = !!state.fuzzyDays[k];
      updateTracker((prev) => ({ ...prev, fuzzyDays: { ...prev.fuzzyDays, [k]: !was } }), { streak: false });
      showToast(was ? 'Cleared. Glad it clicked.' : 'Marked as fuzzy. It will show up at the top so you can revisit it.');
    },
    [state.fuzzyDays, showToast, updateTracker]
  );

  const saveName = useCallback(
    (name: string) => {
      updateTracker((prev) => ({ ...prev, userName: name.trim().slice(0, 24) }), { streak: false });
    },
    [updateTracker]
  );

  const handleAddCustomProblem = useCallback(
    (unitId: string) => {
      const draft = newProblemDrafts[unitId];
      if (!draft || !draft.title || !draft.title.trim()) {
        showToast('Please enter a problem title.');
        return;
      }
      const newProb = {
        id: `${unitId}_CUST_${Date.now()}`,
        title: draft.title.trim(),
        url: draft.url && draft.url.trim() ? draft.url.trim() : 'https://leetcode.com/problemset/',
        platform: draft.platform || 'LeetCode',
        difficulty: draft.difficulty || 'Medium',
        isCustom: true
      };

      updateTracker((prev) => ({
        ...prev,
        customProblems: {
          ...prev.customProblems,
          [unitId]: [...(prev.customProblems[unitId] || []), newProb]
        },
        solvedProblems: {
          ...prev.solvedProblems,
          [newProb.id]: true
        }
      }));

      setNewProblemDrafts((prev) => ({
        ...prev,
        [unitId]: { title: '', url: '', platform: 'LeetCode', difficulty: 'Medium' }
      }));
      showToast('Added to your list and marked solved.');
    },
    [newProblemDrafts, showToast, updateTracker]
  );

  const handleDeleteCustomProblem = useCallback(
    (unitId: string, probId: string) => {
      updateTracker((prev) => {
        const updatedList = (prev.customProblems[unitId] || []).filter((p) => p.id !== probId);
        const nextSolved = { ...prev.solvedProblems };
        delete nextSolved[probId];
        return {
          ...prev,
          customProblems: {
            ...prev.customProblems,
            [unitId]: updatedList
          },
          solvedProblems: nextSolved
        };
      });
      showToast('Custom problem removed.');
    },
    [showToast, updateTracker]
  );

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
    } catch (e) {
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
    } catch (e) {
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
        } catch (err) {
          showToast('Failed to parse file. Please upload a valid JSON backup.');
        }
      };
      reader.readAsText(file);
      e.target.value = '';
    },
    [showToast]
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
      } catch (e) {
        showToast("That doesn't look like a valid backup. Check the text and try again.");
      }
    },
    [showToast]
  );

  const handleResetAllProgress = useCallback(
    (onSuccess?: () => void) => {
      const fresh = {
        ...DEFAULT_STATE,
        startDate: getTodayISO()
      };
      setState(fresh);
      if (onSuccess) onSuccess();
      showToast('Everything has been reset. Fresh start.');
    },
    [showToast]
  );

  return {
    state,
    setState,
    toast,
    showToast,
    newProblemDrafts,
    setNewProblemDrafts,
    updateTracker,
    displayStreak,
    selectDay,
    toggleSubtopic,
    toggleVideo,
    toggleProblem,
    toggleCompleteEntireDay,
    toggleCompleteEntireUnit,
    handleRecalibrateToToday,
    handleNoteChange,
    handleDayNoteChange,
    toggleFuzzy,
    saveName,
    handleAddCustomProblem,
    handleDeleteCustomProblem,
    handleExportJson,
    handleCopyJson,
    handleFileUpload,
    handleImportJson,
    handleResetAllProgress
  };
}
