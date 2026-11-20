import React, { useCallback, useMemo } from 'react';
import { TrackerState, DayObject, Unit, CustomProblemDraft, DayProgress } from '../types';
import { getTodayISO } from '../utils/dateUtils';
import { dayAnchor } from '../utils/scheduleGenerator';

interface UseTrackerProgressProps {
  state: TrackerState;
  updateTracker: (
    updater: React.SetStateAction<TrackerState> | ((prev: TrackerState) => TrackerState),
    opts?: { streak?: boolean }
  ) => void;
  showToast: (msg: string) => void;
  newProblemDrafts: Record<string, CustomProblemDraft>;
  setNewProblemDrafts: React.Dispatch<React.SetStateAction<Record<string, CustomProblemDraft>>>;
}

export function useTrackerProgress({
  state,
  updateTracker,
  showToast,
  newProblemDrafts,
  setNewProblemDrafts
}: UseTrackerProgressProps) {
  // Streak shown in the UI: reset to 0 if you haven't studied today or yesterday
  const displayStreak = useMemo(() => {
    const yest = new Date();
    yest.setDate(yest.getDate() - 1);
    const yestISO = `${yest.getFullYear()}-${String(yest.getMonth() + 1).padStart(2, '0')}-${String(
      yest.getDate()
    ).padStart(2, '0')}`;
    const t = getTodayISO();
    return state.lastActiveDate === t || state.lastActiveDate === yestISO
      ? state.streakCount || 0
      : 0;
  }, [state.lastActiveDate, state.streakCount]);

  const selectDay = useCallback(
    (
      dayNum: number,
      totalDays: number,
      setExpandedWeeks?: React.Dispatch<React.SetStateAction<Record<number, boolean>>>
    ) => {
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
    (
      dayObj: DayObject,
      dailySchedule: DayObject[],
      getDayProgress: (d: DayObject) => DayProgress
    ) => {
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
      const allSubsDone = unit.subtopics.every(
        (_, i) => !!state.completedSubtopics[`${unit.id}_sub_${i}`]
      );
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
    [
      state.completedSubtopics,
      state.watchedVideos,
      state.customProblems,
      state.solvedProblems,
      showToast,
      updateTracker
    ]
  );

  const handleRecalibrateToToday = useCallback(
    (dailySchedule: DayObject[], getDayProgress: (d: DayObject) => DayProgress) => {
      const firstIncompleteIdx = dailySchedule.findIndex(
        (d) => getDayProgress(d).status !== 'COMPLETED'
      );
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
      updateTracker((prev) => ({
        ...prev,
        dayNotes: { ...prev.dayNotes, [dayAnchor(dayObj)]: value }
      }));
    },
    [updateTracker]
  );

  const toggleFuzzy = useCallback(
    (dayObj: DayObject) => {
      const k = dayAnchor(dayObj);
      const was = !!state.fuzzyDays[k];
      updateTracker((prev) => ({ ...prev, fuzzyDays: { ...prev.fuzzyDays, [k]: !was } }), {
        streak: false
      });
      showToast(
        was
          ? 'Cleared. Glad it clicked.'
          : 'Marked as fuzzy. It will show up at the top so you can revisit it.'
      );
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
    [newProblemDrafts, setNewProblemDrafts, showToast, updateTracker]
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

  return {
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
    handleDeleteCustomProblem
  };
}
