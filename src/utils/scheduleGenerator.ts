import { Unit, Video, DayObject, DaySubtopic, DayVideo, Problem } from '../types';
import { parseISODate } from './dateUtils';

export const dayAnchor = (dayObj: DayObject): string =>
  dayObj.videos.length > 0 ? dayObj.videos[0].key : dayObj.subtopics[0].key;

export const unitVideoMinutes = (u: Unit): number =>
  u.videos.reduce((sum, v) => sum + (v.minutes || 30), 0);

export const difficultyRank: Record<string, number> = { Easy: 0, Medium: 1, Hard: 2 };

export function buildDailyTargetSchedule(
  paceDays: number,
  startDateStr: string,
  units: Unit[] = []
): DayObject[] {
  if (!units || units.length === 0) return [];

  const totalDays = [60, 90, 120].includes(Number(paceDays)) ? Number(paceDays) : 90;

  // Days per unit are proportional to the real lecture time in that unit (at least 2 days per unit)
  const weights = units.map((u) => Math.max(60, unitVideoMinutes(u)));
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  const allocations = weights.map((w) => Math.max(2, Math.round((w / totalWeight) * totalDays)));
  let allocatedSum = allocations.reduce((a, b) => a + b, 0);

  // Balance exact day count to match totalDays (60, 90, or 120)
  while (allocatedSum !== totalDays) {
    if (allocatedSum < totalDays) {
      let bestIdx = 0;
      let bestRatio = -1;
      weights.forEach((w, idx) => {
        const ratio = w / allocations[idx];
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestIdx = idx;
        }
      });
      allocations[bestIdx] += 1;
      allocatedSum += 1;
    } else {
      let minIdx = -1;
      let minRatio = Infinity;
      weights.forEach((w, idx) => {
        if (allocations[idx] > 2) {
          const ratio = w / allocations[idx];
          if (ratio < minRatio) {
            minRatio = ratio;
            minIdx = idx;
          }
        }
      });
      if (minIdx === -1) break;
      allocations[minIdx] -= 1;
      allocatedSum -= 1;
    }
  }

  const baseDate = parseISODate(startDateStr);
  const schedule: DayObject[] = [];
  let currentDayNumber = 1;

  units.forEach((unit, uIdx) => {
    const unitDays = allocations[uIdx];
    const subs = unit.subtopics;
    const vids = unit.videos;
    const probs = [...unit.problems].sort(
      (a, b) => (difficultyRank[a.difficulty] ?? 1) - (difficultyRank[b.difficulty] ?? 1)
    );

    // Split the unit's lectures into consecutive days, balanced by running time.
    // Every lecture lands on exactly one day, so nothing in the playlist is skipped.
    const dayVideoLists: Video[][] = Array.from({ length: unitDays }, () => []);
    if (vids.length <= unitDays) {
      vids.forEach((v, i) => dayVideoLists[Math.floor((i * unitDays) / vids.length)].push(v));
    } else {
      const target = unitVideoMinutes(unit) / unitDays;
      let day = 0;
      let acc = 0;
      vids.forEach((v, i) => {
        dayVideoLists[day].push(v);
        acc += v.minutes || 30;
        const remainingVids = vids.length - i - 1;
        const remainingDays = unitDays - day - 1;
        if (
          day < unitDays - 1 &&
          remainingVids > 0 &&
          (remainingVids === remainingDays || (acc >= target && remainingVids >= remainingDays))
        ) {
          day++;
          acc = 0;
        }
      });
    }

    // A problem's ORIGINAL key is used only the first time it is planned; repeats get a
    // day-specific key so ticking one day never silently ticks/unticks another.
    const usedProblems = new Set<string>();

    for (let d = 0; d < unitDays; d++) {
      // Map subtopics for this day
      const daySubtopics: DaySubtopic[] = [];
      subs.forEach((subText, sIdx) => {
        if (Math.floor((sIdx * unitDays) / subs.length) === d) {
          daySubtopics.push({
            idx: sIdx,
            key: `${unit.id}_sub_${sIdx}`,
            text: subText
          });
        }
      });

      // Fallback if this day is a consolidation/revision day
      if (daySubtopics.length === 0) {
        const fallbackIdx = Math.min(subs.length - 1, Math.floor((d * subs.length) / unitDays));
        daySubtopics.push({
          idx: fallbackIdx,
          key: `${unit.id}_sub_${fallbackIdx}_rev${d}`,
          text: `Revise and re-solve: ${subs[fallbackIdx]}`
        });
      }

      // Lectures for this day
      const dayVids = dayVideoLists[d];
      const dayVideos: DayVideo[] = dayVids.map((v) => ({
        video: v,
        key: `${unit.id}_vid_${v.id}`
      }));

      // Practice problem: prefer one that follows up on today's lectures (Easy -> Hard)
      const candidates: Problem[] = [];
      dayVids.forEach((v) =>
        probs.forEach((p) => {
          if ((p.videoIds || []).includes(v.id) && !candidates.includes(p)) candidates.push(p);
        })
      );
      const dayProblem =
        candidates.find((p) => !usedProblems.has(p.id)) ||
        probs.find((p) => !usedProblems.has(p.id)) ||
        candidates[0] ||
        probs[d % probs.length];
      const problemKey = usedProblems.has(dayProblem.id)
        ? `${dayProblem.id}_rev${d}`
        : dayProblem.id;
      usedProblems.add(dayProblem.id);

      // Compute calendar date
      const targetDate = new Date(baseDate);
      targetDate.setDate(baseDate.getDate() + (currentDayNumber - 1));
      const yyyy = targetDate.getFullYear();
      const mm = String(targetDate.getMonth() + 1).padStart(2, '0');
      const dd = String(targetDate.getDate()).padStart(2, '0');
      const dateISO = `${yyyy}-${mm}-${dd}`;
      const formattedDate = targetDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });

      const lectureMinutes = dayVids.reduce((sum, v) => sum + (v.minutes || 30), 0);
      const estMinutes = lectureMinutes + 25; // lectures + about 25 min for the practice problem
      const cleanUnitName = unit.unitTitle.replace(/^Unit\s+\d+[A-Z]?:\s*/i, '');

      schedule.push({
        dayNumber: currentDayNumber,
        weekNumber: Math.ceil(currentDayNumber / 7),
        dateISO,
        formattedDate,
        unit,
        unitDayIndex: d + 1,
        unitTotalDays: unitDays,
        title: `${cleanUnitName} (Day ${d + 1}/${unitDays})`,
        estMinutes,
        subtopics: daySubtopics,
        videos: dayVideos,
        problem: dayProblem,
        problemKey
      });

      currentDayNumber++;
    }
  });

  return schedule;
}
