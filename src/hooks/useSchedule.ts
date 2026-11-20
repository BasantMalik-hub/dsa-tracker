import { useMemo } from 'react';
import { TrackerState, DayObject, ScheduleMeta, DayProgress, Unit } from '../types';
import { buildDailyTargetSchedule, dayAnchor } from '../utils/scheduleGenerator';
import { getTodayISO, getUtcDiffDays } from '../utils/dateUtils';

interface UseScheduleProps {
  units: Unit[];
  state: TrackerState;
  getDayProgress: (dayObj: DayObject | null | undefined) => DayProgress;
}

export function useSchedule({ units, state, getDayProgress }: UseScheduleProps) {
  // Build dynamic schedule
  const dailySchedule = useMemo(() => {
    return buildDailyTargetSchedule(state.paceDays, state.startDate, units);
  }, [state.paceDays, state.startDate, units]);

  // Schedule meta (Active target day, calendar day, ahead/behind status)
  const scheduleMeta = useMemo<ScheduleMeta>(() => {
    const todayISO = getTodayISO();
    const startISO = state.startDate || todayISO;
    const diffDays = getUtcDiffDays(startISO, todayISO);
    const calendarDayNumber = Math.max(1, Math.min(dailySchedule.length, diffDays + 1));

    const firstIncomplete = dailySchedule.find((d) => getDayProgress(d).status !== 'COMPLETED');
    const activeTargetDayNumber = firstIncomplete
      ? firstIncomplete.dayNumber
      : dailySchedule.length;

    const completedDaysCount = dailySchedule.filter(
      (d) => getDayProgress(d).status === 'COMPLETED'
    ).length;
    const expectedByYesterday = Math.max(0, calendarDayNumber - 1);
    const delta = completedDaysCount - expectedByYesterday;

    let badgeText = 'On schedule';
    let badgeTone: ScheduleMeta['badgeTone'] = 'blue';
    if (delta > 0) {
      badgeText = `${delta} ${delta === 1 ? 'day' : 'days'} ahead`;
      badgeTone = 'emerald';
    } else if (delta < 0) {
      badgeText = `${Math.abs(delta)} ${Math.abs(delta) === 1 ? 'day' : 'days'} behind`;
      badgeTone = 'amber';
    }

    return {
      todayISO,
      calendarDayNumber,
      activeTargetDayNumber,
      completedDaysCount,
      delta,
      badgeText,
      badgeTone
    };
  }, [dailySchedule, state.startDate, getDayProgress]);

  // Greeting
  const greeting = useMemo(() => {
    const h = new Date().getHours();
    if (h >= 5 && h < 12) return 'Good morning';
    if (h >= 12 && h < 17) return 'Good afternoon';
    if (h >= 17 && h < 22) return 'Good evening';
    return 'Late night';
  }, []);

  // Status line
  const statusLine = useMemo(() => {
    const total = dailySchedule.length;
    const calDay = dailySchedule[scheduleMeta.calendarDayNumber - 1];
    const todayDone = calDay && getDayProgress(calDay).status === 'COMPLETED';
    const { delta, completedDaysCount } = scheduleMeta;
    if (completedDaysCount >= total)
      return 'You have finished the whole plan. That is a lot of hours. Well done.';
    if (completedDaysCount === 0)
      return 'Day 1 is a gentle start: setup and the first lecture. No need to rush it.';
    if (todayDone)
      return "Today's work is done. Anything extra is a bonus, and resting is fine too.";
    if (delta < 0) {
      const n = Math.abs(delta);
      return `You are ${n} ${n === 1 ? 'day' : 'days'} behind, which happens to everyone. You do not have to catch up all at once. Add one extra lecture a day this week, or press "Recalibrate to today" to reset the calendar.`;
    }
    if (delta > 0)
      return `You are ${delta} ${delta === 1 ? 'day' : 'days'} ahead. That is a nice cushion; spend some of it revisiting the fuzzy bits.`;
    return 'Right on schedule. One day at a time.';
  }, [dailySchedule, scheduleMeta, getDayProgress]);

  // Days marked "still fuzzy"
  const fuzzyList = useMemo(() => {
    return dailySchedule.filter((d) => !!state.fuzzyDays[dayAnchor(d)]);
  }, [dailySchedule, state.fuzzyDays]);

  // Rough hours per day for each pace, from real lecture lengths
  const paceHours = useMemo(() => {
    const out: Record<number, string> = {};
    [60, 90, 120].forEach((p) => {
      const sc = buildDailyTargetSchedule(p, '2026-01-01');
      const avg = sc.reduce((a, d) => a + d.estMinutes, 0) / sc.length;
      out[p] = `~${(Math.round(avg / 6) / 10).toFixed(1)} hrs/day`;
    });
    return out;
  }, []);

  // Selected Day Object
  const safeSelectedDayNumber = Math.max(
    1,
    Math.min(dailySchedule.length, state.selectedDayNumber || scheduleMeta.activeTargetDayNumber)
  );
  const selectedDayObj =
    dailySchedule.find((d) => d.dayNumber === safeSelectedDayNumber) || dailySchedule[0];

  return {
    dailySchedule,
    scheduleMeta,
    greeting,
    statusLine,
    fuzzyList,
    paceHours,
    safeSelectedDayNumber,
    selectedDayObj
  };
}
