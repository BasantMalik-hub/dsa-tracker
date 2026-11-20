import { useMemo, useCallback } from 'react';
import { Unit, DayObject, DayProgress, GlobalStats, TrackerState, PhaseBreakdown } from '../types';

export function useGlobalStats(state: TrackerState, units: Unit[] = []) {
  // Evaluate day completion status
  const getDayProgress = useCallback(
    (dayObj: DayObject | null | undefined): DayProgress => {
      if (!dayObj) {
        return {
          doneCount: 0,
          totalCount: 1,
          pct: 0,
          status: 'UPCOMING',
          subDone: 0,
          subCount: 0,
          vidDone: false,
          vidDoneCount: 0,
          vidCount: 0,
          probDone: false
        };
      }

      const subCount = dayObj.subtopics.length;
      const subDone = dayObj.subtopics.filter((s) => !!state.completedSubtopics[s.key]).length;
      const vidCount = dayObj.videos.length;
      const vidDoneCount = dayObj.videos.filter((v) => !!state.watchedVideos[v.key]).length;
      const vidDone = vidCount === 0 || vidDoneCount === vidCount;
      const probDone = !!state.solvedProblems[dayObj.problemKey];

      const totalCount = subCount + vidCount + 1; // subtopics + today's lectures + 1 practice problem
      const doneCount = subDone + vidDoneCount + (probDone ? 1 : 0);
      const pct = Math.round((doneCount / totalCount) * 100);

      let status: DayProgress['status'] = 'UPCOMING';
      if (doneCount === totalCount) status = 'COMPLETED';
      else if (doneCount > 0) status = 'IN_PROGRESS';

      return {
        doneCount,
        totalCount,
        pct,
        status,
        subDone,
        subCount,
        vidDone,
        vidDoneCount,
        vidCount,
        probDone
      };
    },
    [state.completedSubtopics, state.watchedVideos, state.solvedProblems]
  );

  // Global & Phase statistics
  const globalStats = useMemo<GlobalStats>(() => {
    let totalSubs = 0;
    let doneSubs = 0;
    let totalVids = 0;
    let doneVids = 0;
    let totalProbs = 0;
    let doneProbs = 0;

    const phaseBreakdown: Record<number, PhaseBreakdown> = {
      1: { done: 0, total: 0, pct: 0, title: 'Phase 1: C++ Basics', code: '25CS101', hours: 50 },
      2: { done: 0, total: 0, pct: 0, title: 'Phase 2: Core DSA', code: '25CS201', hours: 40 },
      3: { done: 0, total: 0, pct: 0, title: 'Phase 3: Advanced DSA', code: '25CS303', hours: 36 },
      4: {
        done: 0,
        total: 0,
        pct: 0,
        title: 'Phase 4: Beyond the Syllabus',
        code: 'EXTRA',
        hours: 14
      }
    };

    units.forEach((unit: Unit) => {
      const uSubs = unit.subtopics.length;
      const uSubsDone = unit.subtopics.filter(
        (_, idx) => !!state.completedSubtopics[`${unit.id}_sub_${idx}`]
      ).length;

      const uVids = unit.videos.length;
      const uVidsDone = unit.videos.filter(
        (v) => !!state.watchedVideos[`${unit.id}_vid_${v.id}`]
      ).length;

      const customList = state.customProblems[unit.id] || [];
      const allUnitProbs = [...unit.problems, ...customList];
      const uProbs = allUnitProbs.length;
      const uProbsDone = allUnitProbs.filter((p) => !!state.solvedProblems[p.id]).length;

      totalSubs += uSubs;
      doneSubs += uSubsDone;
      totalVids += uVids;
      doneVids += uVidsDone;
      totalProbs += uProbs;
      doneProbs += uProbsDone;

      const pTotal = uSubs + uVids + uProbs;
      const pDone = uSubsDone + uVidsDone + uProbsDone;
      phaseBreakdown[unit.phase].total += pTotal;
      phaseBreakdown[unit.phase].done += pDone;
    });

    [1, 2, 3, 4].forEach((p) => {
      const pb = phaseBreakdown[p];
      pb.pct = pb.total > 0 ? Math.round((pb.done / pb.total) * 100) : 0;
    });

    const grandTotal = totalSubs + totalVids + totalProbs;
    const grandDone = doneSubs + doneVids + doneProbs;
    const overallPct = grandTotal > 0 ? Math.round((grandDone / grandTotal) * 100) : 0;

    return {
      totalSubs,
      doneSubs,
      totalVids,
      doneVids,
      totalProbs,
      doneProbs,
      grandTotal,
      grandDone,
      overallPct,
      phaseBreakdown
    };
  }, [
    units,
    state.completedSubtopics,
    state.watchedVideos,
    state.solvedProblems,
    state.customProblems
  ]);

  return { getDayProgress, globalStats };
}
