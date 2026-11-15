// @ts-nocheck  (UI is still loosely typed; data lives in ./syllabusData.ts with real types)
import React, { useState, useEffect, useMemo } from 'react';
import {
  CheckCircle2,
  Circle,
  Play,
  ExternalLink,
  Calendar,
  Flame,
  BookOpen,
  Award,
  Download,
  Upload,
  RotateCcw,
  ChevronRight,
  ChevronDown,
  Code2,
  FileText,
  Check,
  Plus,
  Trash2,
  Search,
  Filter,
  Clock,
  Target,
  X,
  Sparkles,
  Layers,
  ListChecks
} from 'lucide-react';

import { SYLLABUS_DATA, PLAYLIST_ID, PLAYLIST_NAME, PLAYLIST_URL } from './syllabusData';

const Youtube = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);


// ==========================================
// 2. DYNAMIC DAY-BY-DAY SCHEDULE GENERATOR
// ==========================================
const PLAYLIST_LECTURE_COUNT = new Set(
  SYLLABUS_DATA.flatMap((u) => u.videos)
    .map((v) => v.playlistIndex)
    .filter(Boolean)
).size;

// A day is identified by its first lecture (or first subtopic), so notes survive pace/date changes
const dayAnchor = (dayObj) =>
  dayObj.videos.length > 0 ? dayObj.videos[0].key : dayObj.subtopics[0].key;

const unitVideoMinutes = (u) => u.videos.reduce((sum, v) => sum + (v.minutes || 30), 0);
const difficultyRank = { Easy: 0, Medium: 1, Hard: 2 };

function buildDailyTargetSchedule(paceDays, startDateStr) {
  const totalDays = [60, 90, 120].includes(Number(paceDays)) ? Number(paceDays) : 90;

  // Days per unit are proportional to the real lecture time in that unit (at least 2 days per unit)
  const weights = SYLLABUS_DATA.map((u) => Math.max(60, unitVideoMinutes(u)));
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

  // Parse startDate safely
  let baseDate = new Date();
  if (startDateStr && /^\d{4}-\d{2}-\d{2}$/.test(startDateStr)) {
    const [yyyy, mm, dd] = startDateStr.split('-').map(Number);
    baseDate = new Date(yyyy, mm - 1, dd);
  }

  const schedule = [];
  let currentDayNumber = 1;

  SYLLABUS_DATA.forEach((unit, uIdx) => {
    const unitDays = allocations[uIdx];
    const subs = unit.subtopics;
    const vids = unit.videos;
    const probs = [...unit.problems].sort(
      (a, b) => difficultyRank[a.difficulty] - difficultyRank[b.difficulty]
    );

    // Split the unit's lectures into consecutive days, balanced by running time.
    // Every lecture lands on exactly one day, so nothing in the playlist is skipped.
    const dayVideoLists = Array.from({ length: unitDays }, () => []);
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
    const usedProblems = new Set();

    for (let d = 0; d < unitDays; d++) {
      // Map subtopics for this day
      const daySubtopics = [];
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
      const dayVideos = dayVids.map((v) => ({ video: v, key: `${unit.id}_vid_${v.id}` }));

      // Practice problem: prefer one that follows up on today's lectures (Easy -> Hard)
      const candidates = [];
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
      const problemKey = usedProblems.has(dayProblem.id) ? `${dayProblem.id}_rev${d}` : dayProblem.id;
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

// ==========================================
// 3. LOCALSTORAGE PERSISTENCE ENGINE
// ==========================================
const STORAGE_KEY = 'cpp_dsa_master_tracker_v3';

function getTodayISO() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

const DEFAULT_STATE = {
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
  fuzzyDays: {}
};

function loadPersistedState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_STATE,
      ...parsed,
      completedSubtopics: parsed.completedSubtopics || {},
      watchedVideos: parsed.watchedVideos || {},
      solvedProblems: parsed.solvedProblems || {},
      unitNotes: parsed.unitNotes || {},
      customProblems: parsed.customProblems || {},
      dayNotes: parsed.dayNotes || {},
      fuzzyDays: parsed.fuzzyDays || {},
      userName: typeof parsed.userName === 'string' ? parsed.userName : '',
      paceDays: [60, 90, 120].includes(Number(parsed.paceDays)) ? Number(parsed.paceDays) : 90,
      startDate: parsed.startDate || getTodayISO(),
      selectedDayNumber: Number(parsed.selectedDayNumber) || 1
    };
  } catch (err) {
    console.warn('localStorage load fallback:', err);
    return DEFAULT_STATE;
  }
}

export default function App() {
  const [state, setState] = useState(loadPersistedState);
  const [activeTab, setActiveTab] = useState('DAILY_PLAN'); // 'DAILY_PLAN' | 'SYLLABUS' | 'PRACTICE_NOTES'
  const [selectedPhaseFilter, setSelectedPhaseFilter] = useState('ALL');
  const [editingName, setEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedWeeks, setExpandedWeeks] = useState({ 1: true, 2: true });
  const [expandedUnits, setExpandedUnits] = useState({});
  const [activeVideoModal, setActiveVideoModal] = useState(null); // { unit, video }
  const [backupModalOpen, setBackupModalOpen] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [newProblemDrafts, setNewProblemDrafts] = useState({});

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Save to localStorage safely on every state update
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      console.warn('localStorage write warning:', err);
    }
  }, [state]);

  // Helper to update state. Pass { streak: false } for non-study actions
  // (navigating days, changing pace/start date) so they don't count as activity.
  const updateTracker = (updater, opts = {}) => {
    const today = getTodayISO();
    setState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
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
  };

  // Streak shown in the UI: reset to 0 if you haven't studied today or yesterday
  const displayStreak = (() => {
    const yest = new Date();
    yest.setDate(yest.getDate() - 1);
    const yestISO = `${yest.getFullYear()}-${String(yest.getMonth() + 1).padStart(2, '0')}-${String(
      yest.getDate()
    ).padStart(2, '0')}`;
    const t = getTodayISO();
    return state.lastActiveDate === t || state.lastActiveDate === yestISO ? state.streakCount || 0 : 0;
  })();

  // Build dynamic schedule
  const dailySchedule = useMemo(() => {
    return buildDailyTargetSchedule(state.paceDays, state.startDate);
  }, [state.paceDays, state.startDate]);

  // Evaluate day completion status
  const getDayProgress = (dayObj) => {
    if (!dayObj) return { doneCount: 0, totalCount: 1, pct: 0, status: 'UPCOMING' };
    const subCount = dayObj.subtopics.length;
    const subDone = dayObj.subtopics.filter((s) => !!state.completedSubtopics[s.key]).length;
    const vidCount = dayObj.videos.length;
    const vidDoneCount = dayObj.videos.filter((v) => !!state.watchedVideos[v.key]).length;
    const vidDone = vidCount === 0 || vidDoneCount === vidCount ? 1 : 0;
    const probDone = state.solvedProblems[dayObj.problemKey] ? 1 : 0;

    const totalCount = subCount + vidCount + 1; // subtopics + today's lectures + 1 practice problem
    const doneCount = subDone + vidDoneCount + probDone;
    const pct = Math.round((doneCount / totalCount) * 100);

    let status = 'UPCOMING';
    if (doneCount === totalCount) status = 'COMPLETED';
    else if (doneCount > 0) status = 'IN_PROGRESS';

    return { doneCount, totalCount, pct, status, subDone, subCount, vidDone: !!vidDone, vidDoneCount, vidCount, probDone: !!probDone };
  };

  // Global & Phase statistics
  const globalStats = useMemo(() => {
    let totalSubs = 0;
    let doneSubs = 0;
    let totalVids = 0;
    let doneVids = 0;
    let totalProbs = 0;
    let doneProbs = 0;

    const phaseBreakdown = {
      1: { done: 0, total: 0, pct: 0, title: 'Phase 1: C++ Basics', code: '25CS101', hours: 50 },
      2: { done: 0, total: 0, pct: 0, title: 'Phase 2: Core DSA', code: '25CS201', hours: 40 },
      3: { done: 0, total: 0, pct: 0, title: 'Phase 3: Advanced DSA', code: '25CS303', hours: 36 },
      4: { done: 0, total: 0, pct: 0, title: 'Phase 4: Beyond the Syllabus', code: 'EXTRA', hours: 14 }
    };

    SYLLABUS_DATA.forEach((unit) => {
      const uSubs = unit.subtopics.length;
      const uSubsDone = unit.subtopics.filter((_, idx) => !!state.completedSubtopics[`${unit.id}_sub_${idx}`]).length;

      const uVids = unit.videos.length;
      const uVidsDone = unit.videos.filter((v) => !!state.watchedVideos[`${unit.id}_vid_${v.id}`]).length;

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
  }, [state.completedSubtopics, state.watchedVideos, state.solvedProblems, state.customProblems]);

  // Schedule meta (Active target day, calendar day, ahead/behind status)
  const scheduleMeta = useMemo(() => {
    const todayISO = getTodayISO();
    const startISO = state.startDate || todayISO;
    const startMs = new Date(startISO + 'T00:00:00').getTime();
    const todayMs = new Date(todayISO + 'T00:00:00').getTime();
    const diffDays = Math.floor((todayMs - startMs) / 86400000);
    const calendarDayNumber = Math.max(1, Math.min(dailySchedule.length, diffDays + 1));

    const firstIncomplete = dailySchedule.find((d) => getDayProgress(d).status !== 'COMPLETED');
    const activeTargetDayNumber = firstIncomplete ? firstIncomplete.dayNumber : dailySchedule.length;

    const completedDaysCount = dailySchedule.filter((d) => getDayProgress(d).status === 'COMPLETED').length;
    const expectedByYesterday = Math.max(0, calendarDayNumber - 1);
    const delta = completedDaysCount - expectedByYesterday;

    let badgeText = 'On schedule';
    let badgeTone = 'blue';
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
  }, [dailySchedule, state]);

  // Greeting, an honest one-line status, and the days marked "still fuzzy"
  const greeting = (() => {
    const h = new Date().getHours();
    if (h >= 5 && h < 12) return 'Good morning';
    if (h >= 12 && h < 17) return 'Good afternoon';
    if (h >= 17 && h < 22) return 'Good evening';
    return 'Late night';
  })();

  const statusLine = (() => {
    const total = dailySchedule.length;
    const calDay = dailySchedule[scheduleMeta.calendarDayNumber - 1];
    const todayDone = calDay && getDayProgress(calDay).status === 'COMPLETED';
    const { delta, completedDaysCount } = scheduleMeta;
    if (completedDaysCount >= total) return 'You have finished the whole plan. That is a lot of hours. Well done.';
    if (completedDaysCount === 0) return 'Day 1 is a gentle start: setup and the first lecture. No need to rush it.';
    if (todayDone) return "Today's work is done. Anything extra is a bonus, and resting is fine too.";
    if (delta < 0) {
      const n = Math.abs(delta);
      return `You are ${n} ${n === 1 ? 'day' : 'days'} behind, which happens to everyone. You do not have to catch up all at once. Add one extra lecture a day this week, or press "Recalibrate to today" to reset the calendar.`;
    }
    if (delta > 0) return `You are ${delta} ${delta === 1 ? 'day' : 'days'} ahead. That is a nice cushion; spend some of it revisiting the fuzzy bits.`;
    return 'Right on schedule. One day at a time.';
  })();

  const fuzzyList = dailySchedule.filter((d) => !!state.fuzzyDays[dayAnchor(d)]);

  const saveName = () => {
    updateTracker((prev) => ({ ...prev, userName: nameDraft.trim().slice(0, 24) }), { streak: false });
    setEditingName(false);
  };

  const toggleFuzzy = (dayObj) => {
    const k = dayAnchor(dayObj);
    const was = !!state.fuzzyDays[k];
    updateTracker((prev) => ({ ...prev, fuzzyDays: { ...prev.fuzzyDays, [k]: !was } }), { streak: false });
    showToast(was ? 'Cleared. Glad it clicked.' : 'Marked as fuzzy. It will show up at the top so you can revisit it.');
  };

  const handleDayNoteChange = (dayObj, value) => {
    updateTracker((prev) => ({ ...prev, dayNotes: { ...prev.dayNotes, [dayAnchor(dayObj)]: value } }));
  };

  // Rough hours per day for each pace, from the real lecture lengths
  const paceHours = useMemo(() => {
    const out = {};
    [60, 90, 120].forEach((p) => {
      const sc = buildDailyTargetSchedule(p, '2026-01-01');
      const avg = sc.reduce((a, d) => a + d.estMinutes, 0) / sc.length;
      out[p] = `~${(Math.round(avg / 6) / 10).toFixed(1)} hrs/day`;
    });
    return out;
  }, []);

  // Ensure selectedDayNumber is always valid
  const safeSelectedDayNumber = Math.max(
    1,
    Math.min(dailySchedule.length, state.selectedDayNumber || scheduleMeta.activeTargetDayNumber)
  );
  const selectedDayObj =
    dailySchedule.find((d) => d.dayNumber === safeSelectedDayNumber) || dailySchedule[0];

  // Problems that follow up on a specific lecture video
  const getLinkedProblems = (unit, video) =>
    unit.problems.filter((p) => (p.videoIds || []).includes(video.id));

  // "After this video - practice" panel (used on the daily card, in the player and in the syllabus)
  const renderLinkedProblems = (unit, video, videoKey) => {
    const linked = getLinkedProblems(unit, video);
    if (linked.length === 0) return null;
    const watched = !!state.watchedVideos[videoKey];
    const solvedCount = linked.filter((p) => !!state.solvedProblems[p.id]).length;
    return (
      <div
        className={`rounded-xl border p-3 space-y-2 ${
          watched ? 'border-emerald-500/40 bg-emerald-950/20' : 'border-stone-800 bg-stone-950/60'
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="text-[11px] font-bold text-emerald-400 flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5" />
            <span>{watched ? 'Now practice this video' : 'After watching, practice'}</span>
          </div>
          <span className="text-[10px] font-mono text-stone-400">
            {solvedCount}/{linked.length} solved
          </span>
        </div>
        <div className="space-y-1.5">
          {linked.map((p) => {
            const done = !!state.solvedProblems[p.id];
            return (
              <div key={p.id} className="flex items-start gap-2">
                <button
                  type="button"
                  onClick={() => toggleProblem(p.id)}
                  aria-label={done ? 'Mark unsolved' : 'Mark solved'}
                  className={`mt-0.5 w-3.5 h-3.5 rounded flex items-center justify-center border shrink-0 ${
                    done ? 'bg-emerald-500 border-emerald-500 text-stone-950' : 'border-stone-600'
                  }`}
                >
                  {done && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                </button>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 text-xs leading-snug hover:underline ${
                    done ? 'line-through text-stone-500' : 'text-stone-200'
                  }`}
                >
                  {p.title}
                </a>
                <span className="text-[10px] font-mono text-stone-500 shrink-0">
                  {p.platform} &bull; {p.difficulty}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ==========================================
  // 4. USER ACTION HANDLERS
  // ==========================================
  const selectDay = (dayNum) => {
    const clamped = Math.max(1, Math.min(dailySchedule.length, dayNum));
    const weekNum = Math.ceil(clamped / 7);
    setExpandedWeeks((prev) => ({ ...prev, [weekNum]: true }));
    updateTracker((prev) => ({ ...prev, selectedDayNumber: clamped }), { streak: false });
  };

  const toggleSubtopic = (subKey) => {
    updateTracker((prev) => ({
      ...prev,
      completedSubtopics: {
        ...prev.completedSubtopics,
        [subKey]: !prev.completedSubtopics[subKey]
      }
    }));
  };

  const toggleVideo = (videoKey, linkedCount = 0) => {
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
  };

  const toggleProblem = (probId) => {
    updateTracker((prev) => ({
      ...prev,
      solvedProblems: {
        ...prev.solvedProblems,
        [probId]: !prev.solvedProblems[probId]
      }
    }));
  };

  const toggleCompleteEntireDay = (dayObj) => {
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
  };

  const toggleCompleteEntireUnit = (unit) => {
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
  };

  const handleRecalibrateToToday = () => {
    const firstIncompleteIdx = dailySchedule.findIndex((d) => getDayProgress(d).status !== 'COMPLETED');
    const offset = firstIncompleteIdx >= 0 ? firstIncompleteIdx : 0;
    const d = new Date();
    d.setDate(d.getDate() - offset);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const newStartISO = `${yyyy}-${mm}-${dd}`;

    updateTracker((prev) => ({
      ...prev,
      startDate: newStartISO,
      selectedDayNumber: offset + 1
    }), { streak: false });
    showToast(`Done. Day ${offset + 1} is now today.`);
  };

  const handleNoteChange = (unitId, text) => {
    updateTracker((prev) => ({
      ...prev,
      unitNotes: {
        ...prev.unitNotes,
        [unitId]: text
      }
    }));
  };

  const handleAddCustomProblem = (unitId) => {
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
  };

  const handleDeleteCustomProblem = (unitId, probId) => {
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
  };

  const handleExportJson = () => {
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
  };

  const handleImportJson = () => {
    if (!importJsonText.trim()) return;
    try {
      const parsed = JSON.parse(importJsonText);
      setState((prev) => ({
        ...DEFAULT_STATE,
        ...prev,
        ...parsed
      }));
      setImportJsonText('');
      setBackupModalOpen(false);
      showToast('Progress restored from your backup.');
    } catch (e) {
      showToast("That doesn't look like a valid backup. Check the text and try again.");
    }
  };

  const handleResetAllProgress = () => {
    const fresh = {
      ...DEFAULT_STATE,
      startDate: getTodayISO()
    };
    setState(fresh);
    setConfirmResetOpen(false);
    setBackupModalOpen(false);
    showToast('Everything has been reset. Fresh start.');
  };

  // Filtered units for Syllabus Explorer & Practice/Notes views
  const filteredUnits = useMemo(() => {
    return SYLLABUS_DATA.filter((u) => {
      if (selectedPhaseFilter !== 'ALL' && u.phase !== Number(selectedPhaseFilter)) return false;

      const uSubsDone = u.subtopics.filter((_, idx) => !!state.completedSubtopics[`${u.id}_sub_${idx}`]).length;
      const uVidsDone = u.videos.filter((v) => !!state.watchedVideos[`${u.id}_vid_${v.id}`]).length;
      const isComplete = uSubsDone === u.subtopics.length && uVidsDone === u.videos.length;

      if (statusFilter === 'COMPLETED' && !isComplete) return false;
      if (statusFilter === 'REMAINING' && isComplete) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = u.unitTitle.toLowerCase().includes(q) || u.courseCode.toLowerCase().includes(q);
        const inSubs = u.subtopics.some((s) => s.toLowerCase().includes(q));
        const inVids = u.videos.some((v) => v.title.toLowerCase().includes(q));
        const inProbs = u.problems.some((p) => p.title.toLowerCase().includes(q));
        if (!inTitle && !inSubs && !inVids && !inProbs) return false;
      }

      return true;
    });
  }, [selectedPhaseFilter, statusFilter, searchQuery, state.completedSubtopics, state.watchedVideos]);

  const getPhaseBadgeStyle = (phase) => {
    if (phase === 1) return 'bg-blue-500/15 text-blue-300 border-blue-500/30';
    if (phase === 2) return 'bg-teal-500/15 text-teal-300 border-teal-500/30';
    if (phase === 4) return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
    return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 pb-24 md:pb-14 selection:bg-emerald-500/30 selection:text-emerald-200">
      <style>{`
        .font-display { font-family: "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, "Times New Roman", serif; letter-spacing: -0.01em; }
        textarea::placeholder, input::placeholder { font-style: italic; }
      `}</style>

      {/* TOAST NOTIFICATION */}
      {toast && (
        <div className="fixed bottom-20 md:bottom-6 right-4 z-50 bg-stone-900 border border-emerald-500/50 text-emerald-300 px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-xs sm:text-sm font-medium">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* STICKY HEADER */}
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-stone-950/90 border-b border-stone-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Brand Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg border border-stone-700 bg-stone-900 flex items-center justify-center font-display text-base text-emerald-300">
              C++
            </div>
            <div>
              <h1 className="font-display text-lg sm:text-xl text-white leading-tight">My DSA Notebook</h1>
              <p className="text-[11px] text-stone-400 hidden sm:block">
                {SYLLABUS_DATA.length} units &middot; {globalStats.totalSubs} topics &middot; {PLAYLIST_LECTURE_COUNT} playlist lectures &middot; {globalStats.totalProbs} problems
              </p>
            </div>
          </div>

          {/* Primary Navigation Tabs (Desktop) */}
          <div className="hidden md:flex items-center bg-stone-900 p-1 rounded-xl border border-stone-800">
            <button
              type="button"
              onClick={() => setActiveTab('DAILY_PLAN')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTab === 'DAILY_PLAN'
                  ? 'bg-emerald-500 text-stone-950'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Daily plan</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('SYLLABUS')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTab === 'SYLLABUS'
                  ? 'bg-emerald-500 text-stone-950'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All units</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('PRACTICE_NOTES')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTab === 'PRACTICE_NOTES'
                  ? 'bg-emerald-500 text-stone-950'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Practice &amp; Notes ({globalStats.doneProbs}/{globalStats.totalProbs})</span>
            </button>
          </div>

          {/* Right Controls: Streak + Backup + Playlist */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-stone-900 border border-stone-800 px-2.5 py-1.5 rounded-xl text-xs">
              <Flame className="w-4 h-4 text-amber-400" />
              <span className="font-bold text-white">{displayStreak}d</span>
              <span className="text-stone-700">|</span>
              <span className="text-emerald-400 font-mono font-semibold">
                {globalStats.overallPct}%
              </span>
            </div>

            <button
              type="button"
              onClick={() => setBackupModalOpen(true)}
              className="flex items-center gap-1.5 text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-800 px-3 py-1.5 rounded-xl transition"
              title="Backup or Restore Progress"
            >
              <Download className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Backup</span>
            </button>

            <a
              href="https://www.youtube.com/playlist?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white px-3 py-1.5 rounded-xl transition"
            >
              <Youtube className="w-4 h-4" />
              <span className="hidden lg:inline">Playlist</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 space-y-6">
        {/* TOP KPI OVERVIEW STRIP */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Overall Mastery Card */}
          <div className="lg:col-span-5 bg-stone-900/90 border border-stone-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between gap-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                  Overall progress
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-3xl sm:text-4xl font-bold text-white">
                    {globalStats.overallPct}%
                  </span>
                  <span className="text-xs text-stone-400 font-mono">
                    ({globalStats.grandDone} of {globalStats.grandTotal} things done)
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-xl text-xs text-emerald-300 font-semibold">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>
                  {scheduleMeta.completedDaysCount}/{dailySchedule.length} Days
                </span>
              </div>
            </div>

            <div className="w-full h-2.5 bg-stone-950 rounded-full overflow-hidden border border-stone-800">
              <div
                className="h-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${globalStats.overallPct}%` }}
              />
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1 text-center">
              <div className="bg-stone-950/80 border border-stone-800/80 rounded-xl p-2">
                <div className="text-[10px] text-stone-400 font-semibold">Subtopics</div>
                <div className="text-xs sm:text-sm font-bold text-white font-mono mt-0.5">
                  {globalStats.doneSubs}/{globalStats.totalSubs}
                </div>
              </div>
              <div className="bg-stone-950/80 border border-stone-800/80 rounded-xl p-2">
                <div className="text-[10px] text-stone-400 font-semibold">Lectures</div>
                <div className="text-xs sm:text-sm font-bold text-rose-300 font-mono mt-0.5">
                  {globalStats.doneVids}/{globalStats.totalVids}
                </div>
              </div>
              <div className="bg-stone-950/80 border border-stone-800/80 rounded-xl p-2">
                <div className="text-[10px] text-stone-400 font-semibold">Problems</div>
                <div className="text-xs sm:text-sm font-bold text-indigo-300 font-mono mt-0.5">
                  {globalStats.doneProbs}/{globalStats.totalProbs}
                </div>
              </div>
            </div>
          </div>

          {/* Phase Progress Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((phaseNum) => {
              const pInfo = globalStats.phaseBreakdown[phaseNum];
              const accentBar =
                phaseNum === 1
                  ? 'bg-blue-400'
                  : phaseNum === 2
                  ? 'bg-teal-400'
                  : phaseNum === 4
                  ? 'bg-amber-400'
                  : 'bg-purple-400';

              return (
                <button
                  key={phaseNum}
                  type="button"
                  onClick={() => {
                    setSelectedPhaseFilter(phaseNum);
                    setActiveTab('SYLLABUS');
                  }}
                  className="text-left bg-stone-900/90 hover:bg-stone-900 border border-stone-800 hover:border-stone-700 rounded-2xl p-4 flex flex-col justify-between transition group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${getPhaseBadgeStyle(phaseNum)}`}>
                        {pInfo.code}
                      </span>
                      <span className="text-xs font-mono text-stone-400">{pInfo.hours} Hrs</span>
                    </div>
                    <h3 className="text-sm font-bold text-white mt-2.5 group-hover:text-emerald-300 transition">
                      {pInfo.title}
                    </h3>
                  </div>

                  <div className="mt-4 space-y-1.5">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xl font-semibold text-white">{pInfo.pct}%</span>
                      <span className="text-[11px] font-mono text-stone-400">
                        {pInfo.done}/{pInfo.total} done
                      </span>
                    </div>
                    <div className="w-full h-2 bg-stone-950 rounded-full overflow-hidden border border-stone-800">
                      <div
                        className={`h-full ${accentBar} transition-all duration-500`}
                        style={{ width: `${pInfo.pct}%` }}
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* =========================================================
            TAB 1: DAY-BY-DAY TARGET SYSTEM
           ========================================================= */}
        {activeTab === 'DAILY_PLAN' && (
          <div className="space-y-6">
            {/* PACE & START DATE CONTROL BAR */}
            <section className="bg-stone-900/95 border border-stone-800 rounded-2xl p-4 sm:p-5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <h2 className="font-display text-xl sm:text-2xl text-white">
                    {greeting}
                    {state.userName ? `, ${state.userName}` : ''}.
                  </h2>
                  <span
                    className={`text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full border ${
                      scheduleMeta.badgeTone === 'emerald'
                        ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                        : scheduleMeta.badgeTone === 'amber'
                        ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                        : 'bg-blue-500/15 text-blue-300 border-blue-500/30'
                    }`}
                  >
                    {scheduleMeta.badgeText}
                  </span>
                  {editingName ? (
                    <input
                      autoFocus
                      value={nameDraft}
                      onChange={(e) => setNameDraft(e.target.value)}
                      onBlur={saveName}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') saveName();
                        if (e.key === 'Escape') setEditingName(false);
                      }}
                      maxLength={24}
                      placeholder="your name"
                      className="w-32 bg-stone-950 border border-stone-700 rounded-md px-2 py-0.5 text-xs text-stone-100 focus:outline-none focus:border-emerald-500"
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setNameDraft(state.userName || '');
                        setEditingName(true);
                      }}
                      className="text-[11px] text-stone-500 hover:text-stone-300 underline underline-offset-2"
                    >
                      {state.userName ? 'change name' : 'add your name'}
                    </button>
                  )}
                </div>
                <p className="text-sm text-stone-400 leading-relaxed max-w-2xl">{statusLine}</p>
                {fuzzyList.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs text-stone-400">
                    <span>Still fuzzy, revisit:</span>
                    {fuzzyList.slice(0, 8).map((d) => (
                      <button
                        key={d.dayNumber}
                        type="button"
                        onClick={() => selectDay(d.dayNumber)}
                        className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/25 hover:bg-amber-500/20"
                      >
                        Day {d.dayNumber}
                      </button>
                    ))}
                    {fuzzyList.length > 8 && <span>+{fuzzyList.length - 8} more</span>}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* Pace Selector Buttons */}
                <div className="flex items-center bg-stone-950 p-1 rounded-xl border border-stone-800">
                  {[
                    { days: 60, label: '60-day sprint', sub: paceHours[60] },
                    { days: 90, label: '90 days, balanced', sub: paceHours[90] },
                    { days: 120, label: '120 days, steady', sub: paceHours[120] }
                  ].map((opt) => {
                    const active = state.paceDays === opt.days;
                    return (
                      <button
                        key={opt.days}
                        type="button"
                        onClick={() => {
                          updateTracker((prev) => ({
                            ...prev,
                            paceDays: opt.days,
                            selectedDayNumber: 1
                          }), { streak: false });
                          showToast(`Switched to ${opt.days} days.`);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-left transition ${
                          active
                            ? 'bg-emerald-500 text-stone-950 font-bold shadow'
                            : 'text-stone-400 hover:text-stone-200'
                        }`}
                      >
                        <div className="text-xs leading-tight">{opt.label}</div>
                        <div className={`text-[10px] ${active ? 'text-stone-900 font-medium' : 'text-stone-500'}`}>
                          {opt.sub}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Start Date Picker */}
                <div className="flex items-center gap-2 bg-stone-950 border border-stone-800 px-3 py-1.5 rounded-xl">
                  <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                  <div className="text-[11px]">
                    <span className="text-stone-400 block leading-none">Start Date</span>
                    <input
                      type="date"
                      value={state.startDate}
                      onChange={(e) => {
                        if (e.target.value) {
                          updateTracker((prev) => ({ ...prev, startDate: e.target.value }), { streak: false });
                          showToast('Start date updated.');
                        }
                      }}
                      className="bg-transparent text-white font-mono text-xs focus:outline-none cursor-pointer"
                    />
                  </div>
                </div>

                {/* Recalibrate Schedule to Today */}
                <button
                  type="button"
                  onClick={handleRecalibrateToToday}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 transition"
                  title="Align your first incomplete day with Today's date"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Recalibrate to today</span>
                </button>
              </div>
            </section>

            {/* TODAY'S HERO CARD */}
            {selectedDayObj && (() => {
              const dayProg = getDayProgress(selectedDayObj);
              const isCalendarToday = selectedDayObj.dayNumber === scheduleMeta.calendarDayNumber;

              return (
                <section className="bg-stone-900 border border-stone-700/80 rounded-2xl p-5 sm:p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-stone-800/80">
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                          {isCalendarToday ? 'Today' : `Day ${selectedDayObj.dayNumber}`}
                        </span>
                        <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-stone-950 border border-stone-800 text-stone-300">
                          Day {selectedDayObj.dayNumber} of {dailySchedule.length} &bull; {selectedDayObj.formattedDate}
                        </span>
                        <span className={`text-xs font-mono px-2.5 py-0.5 rounded-md border ${getPhaseBadgeStyle(selectedDayObj.unit.phase)}`}>
                          {selectedDayObj.unit.courseCode}
                        </span>
                        <span className="text-xs font-mono text-stone-400 bg-stone-950 px-2.5 py-0.5 rounded-md border border-stone-800 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-indigo-400" /> ~{selectedDayObj.estMinutes} mins
                        </span>
                      </div>
                      <h3 className="font-display text-xl sm:text-2xl text-white leading-snug">
                        {selectedDayObj.title}
                      </h3>
                      <p className="text-xs text-stone-400">
                        {selectedDayObj.unit.phaseName} &bull; Week {selectedDayObj.weekNumber} &bull; {dayProg.doneCount} of {dayProg.totalCount} things done today
                      </p>
                    </div>

                    {/* Day Navigation & Complete All Day Targets Button */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      <div className="flex items-center bg-stone-950 rounded-xl border border-stone-800 p-1">
                        <button
                          type="button"
                          onClick={() => selectDay(selectedDayObj.dayNumber - 1)}
                          disabled={selectedDayObj.dayNumber <= 1}
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold text-stone-400 hover:text-white disabled:opacity-30"
                        >
                          Prev
                        </button>
                        <button
                          type="button"
                          onClick={() => selectDay(scheduleMeta.activeTargetDayNumber)}
                          className="px-2.5 py-1 text-xs font-bold text-emerald-400 hover:underline border-x border-stone-800"
                        >
                          Where I left off (D{scheduleMeta.activeTargetDayNumber})
                        </button>
                        <button
                          type="button"
                          onClick={() => selectDay(selectedDayObj.dayNumber + 1)}
                          disabled={selectedDayObj.dayNumber >= dailySchedule.length}
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold text-stone-400 hover:text-white disabled:opacity-30"
                        >
                          Next
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleCompleteEntireDay(selectedDayObj)}
                        className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition ${
                          dayProg.status === 'COMPLETED'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 hover:bg-emerald-500/30'
                            : 'bg-emerald-500 hover:bg-emerald-400 text-stone-950'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>
                          {dayProg.status === 'COMPLETED'
                            ? `Day ${selectedDayObj.dayNumber} done`
                            : `Mark day ${selectedDayObj.dayNumber} done`}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* 3-COLUMN DAILY BREAKDOWN */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-5">
                    {/* Column 1: Subtopics to Master */}
                    <div className="lg:col-span-5 space-y-2.5">
                      <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                        <ListChecks className="w-4 h-4" />
                        <span>What to learn ({dayProg.subDone}/{dayProg.subCount})</span>
                      </div>
                      <div className="space-y-2">
                        {selectedDayObj.subtopics.map((s) => {
                          const checked = !!state.completedSubtopics[s.key];
                          return (
                            <div
                              key={s.key}
                              onClick={() => toggleSubtopic(s.key)}
                              className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition ${
                                checked
                                  ? 'bg-emerald-950/30 border-emerald-500/40 text-stone-400 line-through'
                                  : 'bg-stone-950/80 border-stone-800 hover:border-emerald-500/50 text-stone-100'
                              }`}
                            >
                              <div
                                className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center border shrink-0 ${
                                  checked
                                    ? 'bg-emerald-500 border-emerald-500 text-stone-950'
                                    : 'border-stone-600'
                                }`}
                              >
                                {checked && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                              <span className="text-xs sm:text-sm font-medium leading-snug">{s.text}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Column 2: Assigned Video Lectures */}
                    <div className="lg:col-span-4 space-y-2.5">
                      <div className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                        <Youtube className="w-4 h-4" />
                        <span>
                          Watch
                          {selectedDayObj.videos.length > 0 ? ` (${dayProg.vidDoneCount}/${selectedDayObj.videos.length})` : ''}
                        </span>
                      </div>
                      {selectedDayObj.videos.length === 0 ? (
                        <div className="p-4 rounded-xl bg-stone-950/90 border border-stone-800 text-xs text-stone-400 leading-relaxed">
                          No new lecture today: this is a practice and revision day. Re-watch a lecture from
                          this unit if something is unclear, then solve today&apos;s problem.
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {selectedDayObj.videos.map(({ video, key }) => {
                            const watched = !!state.watchedVideos[key];
                            return (
                              <div key={key} className="p-3.5 rounded-xl bg-stone-950/90 border border-stone-800 space-y-3">
                                <div
                                  onClick={() =>
                                    toggleVideo(key, getLinkedProblems(selectedDayObj.unit, video).length)
                                  }
                                  className="flex items-start gap-3 cursor-pointer"
                                >
                                  <div
                                    className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center border shrink-0 ${
                                      watched
                                        ? 'bg-emerald-500 border-emerald-500 text-stone-950'
                                        : 'border-stone-600'
                                    }`}
                                  >
                                    {watched && <Check className="w-3 h-3 stroke-[3]" />}
                                  </div>
                                  <div className="space-y-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-1.5">
                                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/15 text-rose-300 border border-rose-500/30">
                                        {video.type}
                                      </span>
                                      {video.playlistIndex ? (
                                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-900 text-stone-400 border border-stone-800">
                                          #{video.playlistIndex}
                                        </span>
                                      ) : null}
                                      {video.minutes ? (
                                        <span className="text-[10px] font-mono text-stone-500">~{video.minutes} min</span>
                                      ) : null}
                                    </div>
                                    <div
                                      className={`text-sm font-semibold leading-snug ${
                                        watched ? 'line-through text-stone-500' : 'text-white'
                                      }`}
                                    >
                                      {video.title}
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => setActiveVideoModal({ unit: selectedDayObj.unit, video })}
                                    className="flex-1 py-1.5 px-3 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/30 text-xs font-bold flex items-center justify-center gap-1.5"
                                  >
                                    <Play className="w-3.5 h-3.5 fill-indigo-300" />
                                    <span>Watch in App</span>
                                  </button>
                                  <a
                                    href={video.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="py-1.5 px-3 rounded-lg bg-stone-900 hover:bg-stone-800 text-rose-300 border border-stone-800 text-xs font-medium flex items-center gap-1.5"
                                  >
                                    <span>YouTube</span>
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                </div>

                                {renderLinkedProblems(selectedDayObj.unit, video, key)}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Column 3: Daily Coding Practice Target */}
                    <div className="lg:col-span-3 space-y-2.5">
                      <div className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
                        <Code2 className="w-4 h-4" />
                        <span>Practice</span>
                      </div>
                      <div className="p-4 rounded-xl bg-stone-950/90 border border-stone-800 space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                            {selectedDayObj.problem.platform} &bull; {selectedDayObj.problem.difficulty}
                          </span>
                          <button
                            type="button"
                            onClick={() => toggleProblem(selectedDayObj.problemKey)}
                            className={`text-[11px] font-bold px-2 py-0.5 rounded border transition ${
                              dayProg.probDone
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                : 'bg-stone-900 text-stone-400 border-stone-700 hover:text-white'
                            }`}
                          >
                            {dayProg.probDone ? '✓ Solved' : 'Mark Solved'}
                          </button>
                        </div>

                        <a
                          href={selectedDayObj.problem.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-xs sm:text-sm font-bold hover:underline flex items-center justify-between gap-1.5 ${
                            dayProg.probDone ? 'line-through text-stone-500' : 'text-indigo-300'
                          }`}
                        >
                          <span>{selectedDayObj.problem.title}</span>
                          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                        </a>

                        <div className="pt-1">
                          <textarea
                            rows={2}
                            value={state.unitNotes[selectedDayObj.unit.id] || ''}
                            onChange={(e) => handleNoteChange(selectedDayObj.unit.id, e.target.value)}
                            placeholder={`Notes for ${selectedDayObj.unit.courseCode} ${selectedDayObj.unit.unitTitle.split(':')[0]}...`}
                            className="w-full bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-emerald-500 resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Note to self + fuzzy flag */}
                  <div className="mt-5 pt-5 border-t border-stone-800 grid grid-cols-1 lg:grid-cols-12 gap-4">
                    <div className="lg:col-span-9 space-y-1.5">
                      <label className="text-xs font-semibold text-stone-300">Note to self</label>
                      <textarea
                        rows={3}
                        value={state.dayNotes[dayAnchor(selectedDayObj)] || ''}
                        onChange={(e) => handleDayNoteChange(selectedDayObj, e.target.value)}
                        placeholder="What clicked today? What is still fuzzy? How would you explain it to a friend?"
                        className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-sm text-stone-200 placeholder-stone-600 focus:outline-none focus:border-emerald-500 resize-y leading-relaxed"
                      />
                    </div>
                    <div className="lg:col-span-3 flex flex-col justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => toggleFuzzy(selectedDayObj)}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold border transition ${
                          state.fuzzyDays[dayAnchor(selectedDayObj)]
                            ? 'bg-amber-500/15 text-amber-300 border-amber-500/40'
                            : 'bg-stone-950 text-stone-300 border-stone-700 hover:border-stone-600'
                        }`}
                      >
                        {state.fuzzyDays[dayAnchor(selectedDayObj)] ? 'Marked as still fuzzy' : 'Still fuzzy? Mark to revisit'}
                      </button>
                      <p className="text-[11px] text-stone-500 leading-snug">
                        Marked days are listed at the top so you can come back to them.
                      </p>
                    </div>
                  </div>
                </section>
              );
            })()}

            {/* HORIZONTAL SCROLLABLE DAY STRIP */}
            <section className="bg-stone-900/90 border border-stone-800 rounded-2xl p-4 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-400" />
                  <h3 className="text-xs font-bold text-stone-300">
                    All days (tap to jump)
                  </h3>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-stone-400">
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Done
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" /> Started
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" /> Today
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-stone-700 inline-block" /> Upcoming
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 pt-1">
                {dailySchedule.map((d) => {
                  const prog = getDayProgress(d);
                  const isSelected = d.dayNumber === safeSelectedDayNumber;
                  const isToday = d.dayNumber === scheduleMeta.calendarDayNumber;

                  let pillClasses = 'bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700';
                  let dotColor = 'bg-stone-700';

                  if (prog.status === 'COMPLETED') {
                    pillClasses = 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300';
                    dotColor = 'bg-emerald-400';
                  } else if (prog.status === 'IN_PROGRESS') {
                    pillClasses = 'bg-amber-500/15 border-amber-500/40 text-amber-300';
                    dotColor = 'bg-amber-400';
                  } else if (isToday) {
                    pillClasses = 'bg-blue-500/20 border-blue-400 text-blue-200 font-bold';
                    dotColor = 'bg-blue-400';
                  }

                  if (isSelected) {
                    pillClasses = 'ring-2 ring-white border-transparent bg-indigo-600 text-white font-bold';
                  }

                  return (
                    <button
                      key={d.dayNumber}
                      type="button"
                      onClick={() => selectDay(d.dayNumber)}
                      className={`shrink-0 w-12 py-2 rounded-xl border text-center transition flex flex-col items-center justify-center gap-1 ${pillClasses}`}
                      title={`Day ${d.dayNumber} (${d.formattedDate}): ${d.title}`}
                    >
                      <span className="text-[10px]">D{d.dayNumber}</span>
                      <span className={`w-2 h-2 rounded-full ${dotColor}`} />
                    </button>
                  );
                })}
              </div>
            </section>

            {/* WEEKLY ACCORDION DAY CARDS */}
            <section className="space-y-4">
              {Array.from({ length: Math.ceil(dailySchedule.length / 7) }, (_, i) => i + 1).map((weekNum) => {
                const weekDays = dailySchedule.filter((d) => d.weekNumber === weekNum);
                const weekCompleted = weekDays.filter((d) => getDayProgress(d).status === 'COMPLETED').length;
                const isExpanded = !!expandedWeeks[weekNum];

                return (
                  <div
                    key={weekNum}
                    className="bg-stone-900/80 border border-stone-800 rounded-2xl overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedWeeks((prev) => ({ ...prev, [weekNum]: !prev[weekNum] }))
                      }
                      className="w-full px-5 py-3.5 flex items-center justify-between bg-stone-900 hover:bg-stone-800/70 transition text-left"
                    >
                      <div className="flex items-center gap-3">
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-stone-400" />
                        )}
                        <span className="text-sm font-semibold text-white">
                          Week {weekNum}
                        </span>
                        <span className="text-xs font-mono text-stone-400">
                          (Days {weekDays[0]?.dayNumber}–{weekDays[weekDays.length - 1]?.dayNumber} &bull;{' '}
                          {weekDays[0]?.formattedDate} to {weekDays[weekDays.length - 1]?.formattedDate})
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className={`text-xs font-mono px-2.5 py-0.5 rounded-full border ${
                            weekCompleted === weekDays.length
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                              : 'bg-stone-950 text-stone-400 border-stone-800'
                          }`}
                        >
                          {weekCompleted}/{weekDays.length} Days Done
                        </span>
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border-t border-stone-800/80">
                        {weekDays.map((dayObj) => {
                          const prog = getDayProgress(dayObj);
                          const isToday = dayObj.dayNumber === scheduleMeta.calendarDayNumber;

                          return (
                            <div
                              key={dayObj.dayNumber}
                              className={`rounded-2xl border p-4 flex flex-col justify-between gap-3 transition ${
                                prog.status === 'COMPLETED'
                                  ? 'bg-stone-900 border-emerald-500/40'
                                  : prog.status === 'IN_PROGRESS'
                                  ? 'bg-stone-900 border-amber-500/40'
                                  : isToday
                                  ? 'bg-stone-900 border-blue-500 ring-1 ring-blue-500/30'
                                  : 'bg-stone-950/70 border-stone-800/90 hover:border-stone-700'
                              }`}
                            >
                              <div className="space-y-2.5">
                                {/* Top Badges */}
                                <div className="flex items-center justify-between gap-2">
                                  <div className="flex items-center gap-1.5">
                                    <span
                                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                                        prog.status === 'COMPLETED'
                                          ? 'bg-emerald-500 text-stone-950'
                                          : prog.status === 'IN_PROGRESS'
                                          ? 'bg-amber-400 text-stone-950'
                                          : isToday
                                          ? 'bg-blue-500 text-white'
                                          : 'bg-stone-800 text-stone-200'
                                      }`}
                                    >
                                      Day {dayObj.dayNumber}
                                    </span>
                                    <span className="text-[11px] font-mono text-stone-400">
                                      {dayObj.formattedDate}
                                    </span>
                                  </div>
                                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${getPhaseBadgeStyle(dayObj.unit.phase)}`}>
                                    {dayObj.unit.courseCode}
                                  </span>
                                </div>

                                <h4 className="text-sm font-bold text-white leading-snug">
                                  {dayObj.title}
                                </h4>

                                {/* Subtopics */}
                                <div className="space-y-1.5">
                                  {dayObj.subtopics.map((s) => {
                                    const subChecked = !!state.completedSubtopics[s.key];
                                    return (
                                      <div
                                        key={s.key}
                                        onClick={() => toggleSubtopic(s.key)}
                                        className={`p-2 rounded-lg border text-xs flex items-start gap-2 cursor-pointer transition ${
                                          subChecked
                                            ? 'bg-emerald-950/20 border-emerald-500/30 text-stone-500 line-through'
                                            : 'bg-stone-900/90 border-stone-800 text-stone-200 hover:border-stone-700'
                                        }`}
                                      >
                                        <div
                                          className={`mt-0.5 w-3.5 h-3.5 rounded flex items-center justify-center border shrink-0 ${
                                            subChecked
                                              ? 'bg-emerald-500 border-emerald-500 text-stone-950'
                                              : 'border-stone-600'
                                          }`}
                                        >
                                          {subChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                                        </div>
                                        <span className="leading-tight">{s.text}</span>
                                      </div>
                                    );
                                  })}
                                </div>

                                {/* Video & Problem Row */}
                                <div className="p-2.5 rounded-xl bg-stone-900 border border-stone-800 space-y-2">
                                  {dayObj.videos.length === 0 ? (
                                    <div className="text-[11px] text-stone-500">Revision day: no new lecture</div>
                                  ) : (
                                    dayObj.videos.map(({ video, key }) => {
                                      const watched = !!state.watchedVideos[key];
                                      return (
                                        <div key={key} className="flex items-start gap-2">
                                          <div
                                            onClick={() =>
                                              toggleVideo(key, getLinkedProblems(dayObj.unit, video).length)
                                            }
                                            className={`mt-0.5 w-3.5 h-3.5 rounded flex items-center justify-center border shrink-0 cursor-pointer ${
                                              watched
                                                ? 'bg-emerald-500 border-emerald-500 text-stone-950'
                                                : 'border-stone-600'
                                            }`}
                                          >
                                            {watched && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                                          </div>
                                          <span
                                            className={`flex-1 text-xs font-medium leading-tight ${
                                              watched ? 'line-through text-stone-500' : 'text-rose-200'
                                            }`}
                                          >
                                            {video.playlistIndex ? `#${video.playlistIndex} ` : ''}
                                            {video.title}
                                          </span>
                                          <button
                                            type="button"
                                            onClick={() => setActiveVideoModal({ unit: dayObj.unit, video })}
                                            className="shrink-0 p-1 rounded-md bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/30"
                                            aria-label="Watch"
                                          >
                                            <Play className="w-3 h-3 fill-indigo-300" />
                                          </button>
                                        </div>
                                      );
                                    })
                                  )}

                                  <div className="flex items-center gap-1.5 pt-2 border-t border-stone-800">
                                    <button
                                      type="button"
                                      onClick={() => toggleProblem(dayObj.problemKey)}
                                      className={`py-1 px-2 rounded-lg border text-[11px] font-semibold ${
                                        prog.probDone
                                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                          : 'bg-stone-950 text-stone-400 border-stone-800'
                                      }`}
                                      title={dayObj.problem.title}
                                    >
                                      {prog.probDone ? '✓ Prob' : '○ Prob'}
                                    </button>
                                    <a
                                      href={dayObj.problem.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex-1 py-1 px-2 rounded-lg bg-stone-950 hover:bg-stone-800 text-emerald-300 border border-stone-800 text-[11px] font-medium flex items-center justify-center gap-1"
                                      title={dayObj.problem.title}
                                    >
                                      <span>Solve</span>
                                      <ExternalLink className="w-2.5 h-2.5" />
                                    </a>
                                  </div>
                                </div>
                              </div>

                              {/* Card Footer */}
                              <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between gap-2">
                                <button
                                  type="button"
                                  onClick={() => toggleCompleteEntireDay(dayObj)}
                                  className={`w-full py-1.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                                    prog.status === 'COMPLETED'
                                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25'
                                      : 'bg-stone-800 hover:bg-emerald-500 hover:text-stone-950 text-stone-200'
                                  }`}
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>
                                    {prog.status === 'COMPLETED'
                                      ? 'Day Completed'
                                      : `Complete Day ${dayObj.dayNumber}`}
                                  </span>
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </section>
          </div>
        )}

        {/* =========================================================
            TAB 2: FULL SYLLABUS EXPLORER (21 UNITS)
           ========================================================= */}
        {activeTab === 'SYLLABUS' && (
          <div className="space-y-5">
            {/* FILTER & SEARCH BAR */}
            <section className="bg-stone-900/90 border border-stone-800 rounded-2xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
                {[
                  { id: 'ALL', label: 'Everything (23 units)' },
                  { id: 1, label: 'Phase 1: C++ (25CS101)' },
                  { id: 2, label: 'Phase 2: Core DSA (25CS201)' },
                  { id: 3, label: 'Phase 3: Advanced (25CS303)' },
                  { id: 4, label: 'Phase 4: Extras (Playlist)' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSelectedPhaseFilter(tab.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                      selectedPhaseFilter === tab.id
                        ? 'bg-emerald-500 text-stone-950 shadow'
                        : 'bg-stone-950 text-stone-400 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                <div className="flex items-center bg-stone-950 p-1 rounded-xl border border-stone-800">
                  {[
                    { id: 'ALL', label: 'All' },
                    { id: 'REMAINING', label: 'In Progress' },
                    { id: 'COMPLETED', label: 'Completed' }
                  ].map((st) => (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => setStatusFilter(st.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                        statusFilter === st.id
                          ? 'bg-stone-800 text-white'
                          : 'text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>

                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -transtone-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Pointers, Kahn's, AVL, Trie..."
                    className="w-full bg-stone-950 border border-stone-800 focus:border-emerald-500 rounded-xl pl-9 pr-8 py-1.5 text-xs text-stone-100 placeholder-stone-500 focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -transtone-y-1/2 text-stone-500 hover:text-stone-300"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </section>

            {/* UNITS LIST */}
            <section className="space-y-4">
              {filteredUnits.length === 0 ? (
                <div className="bg-stone-900 border border-stone-800 rounded-2xl p-10 text-center space-y-2">
                  <Filter className="w-8 h-8 text-stone-600 mx-auto" />
                  <p className="text-sm font-bold text-stone-300">No matching syllabus units found.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPhaseFilter('ALL');
                      setStatusFilter('ALL');
                      setSearchQuery('');
                    }}
                    className="text-xs font-semibold text-emerald-400 hover:underline"
                  >
                    Reset all filters
                  </button>
                </div>
              ) : (
                filteredUnits.map((unit) => {
                  const subDone = unit.subtopics.filter(
                    (_, i) => !!state.completedSubtopics[`${unit.id}_sub_${i}`]
                  ).length;
                  const vidDone = unit.videos.filter(
                    (v) => !!state.watchedVideos[`${unit.id}_vid_${v.id}`]
                  ).length;
                  const customList = state.customProblems[unit.id] || [];
                  const allProbs = [...unit.problems, ...customList];
                  const probDone = allProbs.filter((p) => !!state.solvedProblems[p.id]).length;

                  const totalItems = unit.subtopics.length + unit.videos.length + allProbs.length;
                  const doneItems = subDone + vidDone + probDone;
                  const unitPct = totalItems > 0 ? Math.round((doneItems / totalItems) * 100) : 0;

                  return (
                    <div
                      key={unit.id}
                      className="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 space-y-4"
                    >
                      {/* Unit Header */}
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-stone-800/80">
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded border ${getPhaseBadgeStyle(unit.phase)}`}>
                              {unit.courseCode}
                            </span>
                            <span className="text-xs font-mono text-stone-400 bg-stone-950 px-2.5 py-0.5 rounded border border-stone-800">
                              {unit.hours} CI Hours
                            </span>
                            <span className="text-xs font-mono text-emerald-400 font-bold">
                              {unitPct}% Complete
                            </span>
                          </div>
                          <h3 className="text-base sm:text-lg font-semibold text-white">
                            {unit.unitTitle}
                          </h3>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => toggleCompleteEntireUnit(unit)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                              unitPct === 100
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                : 'bg-stone-800 hover:bg-emerald-500 hover:text-stone-950 text-stone-200'
                            }`}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{unitPct === 100 ? 'Unit Completed' : 'Mark Unit Complete'}</span>
                          </button>
                        </div>
                      </div>

                      {/* 2-Column Content: Subtopics & Videos */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                        {/* Left: Subtopics */}
                        <div className="lg:col-span-7 space-y-2">
                          <div className="text-xs font-bold text-stone-400 flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                            <span>
                              Syllabus Subtopics ({subDone}/{unit.subtopics.length})
                            </span>
                          </div>
                          <div className="space-y-2">
                            {unit.subtopics.map((subText, idx) => {
                              const sKey = `${unit.id}_sub_${idx}`;
                              const checked = !!state.completedSubtopics[sKey];
                              return (
                                <div
                                  key={sKey}
                                  onClick={() => toggleSubtopic(sKey)}
                                  className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition ${
                                    checked
                                      ? 'bg-emerald-950/25 border-emerald-500/35 text-stone-400 line-through'
                                      : 'bg-stone-950/70 border-stone-800 hover:border-stone-700 text-stone-200'
                                  }`}
                                >
                                  <div
                                    className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center border shrink-0 ${
                                      checked
                                        ? 'bg-emerald-500 border-emerald-500 text-stone-950'
                                        : 'border-stone-600'
                                    }`}
                                  >
                                    {checked && <Check className="w-3 h-3 stroke-[3]" />}
                                  </div>
                                  <span className="text-xs sm:text-sm leading-snug">{subText}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Right: Mapped Video Lectures & Practice Problems */}
                        <div className="lg:col-span-5 space-y-4">
                          <div className="space-y-2">
                            <div className="text-xs font-bold text-stone-400 flex items-center gap-1.5">
                              <Youtube className="w-3.5 h-3.5 text-rose-400" />
                              <span>
                                Playlist Lectures ({vidDone}/{unit.videos.length})
                              </span>
                            </div>
                            <div className="space-y-2">
                              {unit.videos.map((vid) => {
                                const vKey = `${unit.id}_vid_${vid.id}`;
                                const watched = !!state.watchedVideos[vKey];
                                return (
                                  <div
                                    key={vKey}
                                    className="p-3 rounded-xl bg-stone-950/80 border border-stone-800 space-y-2.5"
                                  >
                                    <div
                                      onClick={() => toggleVideo(vKey, getLinkedProblems(unit, vid).length)}
                                      className="flex items-start gap-2.5 cursor-pointer"
                                    >
                                      <div
                                        className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center border shrink-0 ${
                                          watched
                                            ? 'bg-emerald-500 border-emerald-500 text-stone-950'
                                            : 'border-stone-600'
                                        }`}
                                      >
                                        {watched && <Check className="w-3 h-3 stroke-[3]" />}
                                      </div>
                                      <div className="text-xs sm:text-sm font-semibold leading-snug">
                                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/15 text-rose-300 border border-rose-500/30 mr-1.5">
                                          {vid.type}
                                        </span>
                                        {vid.playlistIndex ? (
                                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-900 text-stone-400 border border-stone-800">
                                            #{vid.playlistIndex}
                                          </span>
                                        ) : null}
                                        {vid.minutes ? (
                                          <span className="text-[10px] font-mono text-stone-500">~{vid.minutes}m</span>
                                        ) : null}
                                        <span className={watched ? 'line-through text-stone-500' : 'text-white'}>
                                          {vid.title}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2 pl-6">
                                      <button
                                        type="button"
                                        onClick={() => setActiveVideoModal({ unit, video: vid })}
                                        className="flex-1 py-1.5 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition"
                                      >
                                        <Play className="w-3 h-3 fill-white" />
                                        <span>Watch in App</span>
                                      </button>
                                      <a
                                        href={vid.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="py-1.5 px-2.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-700 text-xs font-semibold flex items-center gap-1"
                                      >
                                        <span>YT</span>
                                        <ExternalLink className="w-3 h-3" />
                                      </a>
                                    </div>
                                    <div className="pl-6">
                                      {renderLinkedProblems(unit, vid, `${unit.id}_vid_${vid.id}`)}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Curated Practice Problems for this Unit */}
                          <div className="space-y-2">
                            <div className="text-xs font-bold text-stone-400 flex items-center gap-1.5">
                              <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                              <span>
                                Practice Problems ({probDone}/{allProbs.length})
                              </span>
                            </div>
                            <div className="space-y-1.5">
                              {allProbs.map((prob) => {
                                const solved = !!state.solvedProblems[prob.id];
                                return (
                                  <div
                                    key={prob.id}
                                    className="p-2.5 rounded-xl bg-stone-950/70 border border-stone-800 flex items-center justify-between gap-2"
                                  >
                                    <div
                                      onClick={() => toggleProblem(prob.id)}
                                      className="flex items-center gap-2.5 cursor-pointer truncate"
                                    >
                                      <div
                                        className={`w-4 h-4 rounded flex items-center justify-center border shrink-0 ${
                                          solved
                                            ? 'bg-emerald-500 border-emerald-500 text-stone-950'
                                            : 'border-stone-600'
                                        }`}
                                      >
                                        {solved && <Check className="w-3 h-3 stroke-[3]" />}
                                      </div>
                                      <span
                                        className={`text-xs font-semibold truncate ${
                                          solved ? 'line-through text-stone-500' : 'text-indigo-200'
                                        }`}
                                      >
                                        {prob.title}
                                      </span>
                                    </div>
                                    <a
                                      href={prob.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-[11px] font-mono text-emerald-400 hover:underline shrink-0 flex items-center gap-1"
                                    >
                                      <span>{prob.platform}</span>
                                      <ExternalLink className="w-3 h-3" />
                                    </a>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </section>
          </div>
        )}

        {/* =========================================================
            TAB 3: PRACTICE PROBLEMS & LECTURE NOTES HUB
           ========================================================= */}
        {activeTab === 'PRACTICE_NOTES' && (
          <div className="space-y-5">
            <section className="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-400" />
                  <span>Practice Problem Logger &amp; Unit Notes</span>
                </h2>
                <p className="text-xs text-stone-400 mt-0.5">
                  Log custom LeetCode, CodeChef, or GeeksforGeeks problems and write persistent revision notes for every unit.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono bg-stone-950 border border-stone-800 px-3.5 py-2 rounded-xl">
                <span className="text-stone-400">Solved Problems:</span>
                <span className="text-emerald-400 font-bold">
                  {globalStats.doneProbs} / {globalStats.totalProbs}
                </span>
              </div>
            </section>

            <section className="grid grid-cols-1 gap-5">
              {SYLLABUS_DATA.map((unit) => {
                const customList = state.customProblems[unit.id] || [];
                const allProbs = [...unit.problems, ...customList];
                const draft = newProblemDrafts[unit.id] || {
                  title: '',
                  url: '',
                  platform: 'LeetCode',
                  difficulty: 'Medium'
                };

                return (
                  <div
                    key={unit.id}
                    className="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 space-y-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-800">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${getPhaseBadgeStyle(unit.phase)}`}>
                          {unit.courseCode}
                        </span>
                        <h3 className="text-sm sm:text-base font-bold text-white">
                          {unit.unitTitle}
                        </h3>
                      </div>
                      <span className="text-xs font-mono text-stone-400">
                        {allProbs.filter((p) => !!state.solvedProblems[p.id]).length}/{allProbs.length} Solved
                      </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                      {/* Left: Problems List + Add Custom Problem Form */}
                      <div className="lg:col-span-6 space-y-3">
                        <div className="text-xs font-bold text-indigo-400">
                          Curated &amp; Custom Coding Problems
                        </div>

                        <div className="space-y-2">
                          {allProbs.map((prob) => {
                            const solved = !!state.solvedProblems[prob.id];
                            return (
                              <div
                                key={prob.id}
                                className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-between gap-2"
                              >
                                <div
                                  onClick={() => toggleProblem(prob.id)}
                                  className="flex items-center gap-2.5 cursor-pointer truncate"
                                >
                                  <div
                                    className={`w-4 h-4 rounded flex items-center justify-center border shrink-0 ${
                                      solved
                                        ? 'bg-emerald-500 border-emerald-500 text-stone-950'
                                        : 'border-stone-600'
                                    }`}
                                  >
                                    {solved && <Check className="w-3 h-3 stroke-[3]" />}
                                  </div>
                                  <span
                                    className={`text-xs font-semibold truncate ${
                                      solved ? 'line-through text-stone-500' : 'text-stone-100'
                                    }`}
                                  >
                                    {prob.title}
                                  </span>
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-900 text-stone-400 border border-stone-800">
                                    {prob.platform} &bull; {prob.difficulty}
                                    {(prob.videoIds || []).length > 0 && unit.videos.find((v) => v.id === prob.videoIds[0])
                                      ? ` \u2022 after: ${unit.videos.find((v) => v.id === prob.videoIds[0]).title.replace(/^Lec \d+:\s*/i, '').slice(0, 28)}`
                                      : ''}
                                  </span>
                                  <a
                                    href={prob.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-indigo-400 hover:text-indigo-300"
                                  >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                  </a>
                                  {prob.isCustom && (
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteCustomProblem(unit.id, prob.id)}
                                      className="text-rose-400 hover:text-rose-300"
                                      title="Delete Custom Problem"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Add Custom Problem Inputs */}
                        <div className="p-3 rounded-xl bg-stone-950/90 border border-stone-800/90 space-y-2">
                          <div className="text-[11px] font-bold text-stone-400">
                            + Log Custom Solved Problem
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={draft.title}
                              onChange={(e) =>
                                setNewProblemDrafts((prev) => ({
                                  ...prev,
                                  [unit.id]: { ...draft, title: e.target.value }
                                }))
                              }
                              placeholder="Problem Title (e.g. LRU Cache)"
                              className="bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500"
                            />
                            <input
                              type="url"
                              value={draft.url}
                              onChange={(e) =>
                                setNewProblemDrafts((prev) => ({
                                  ...prev,
                                  [unit.id]: { ...draft, url: e.target.value }
                                }))
                              }
                              placeholder="URL (https://leetcode.com/...)"
                              className="bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <select
                              value={draft.platform}
                              onChange={(e) =>
                                setNewProblemDrafts((prev) => ({
                                  ...prev,
                                  [unit.id]: { ...draft, platform: e.target.value }
                                }))
                              }
                              className="bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-stone-200"
                            >
                              <option value="LeetCode">LeetCode</option>
                              <option value="CodeChef">CodeChef</option>
                              <option value="GFG">GeeksforGeeks</option>
                              <option value="Codeforces">Codeforces</option>
                              <option value="CSES">CSES</option>
                            </select>
                            <select
                              value={draft.difficulty}
                              onChange={(e) =>
                                setNewProblemDrafts((prev) => ({
                                  ...prev,
                                  [unit.id]: { ...draft, difficulty: e.target.value }
                                }))
                              }
                              className="bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-stone-200"
                            >
                              <option value="Easy">Easy</option>
                              <option value="Medium">Medium</option>
                              <option value="Hard">Hard</option>
                            </select>
                            <button
                              type="button"
                              onClick={() => handleAddCustomProblem(unit.id)}
                              className="ml-auto px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs flex items-center gap-1 transition"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Right: Persistent Unit Revision Scratchpad */}
                      <div className="lg:col-span-6 flex flex-col space-y-2">
                        <div className="text-xs font-bold text-purple-400">
                          Key Formulas, Complexity &amp; Revision Notes
                        </div>
                        <textarea
                          rows={6}
                          value={state.unitNotes[unit.id] || ''}
                          onChange={(e) => handleNoteChange(unit.id, e.target.value)}
                          placeholder={`Write key C++ templates, recurrence relations, or corner cases for ${unit.unitTitle}...`}
                          className="w-full flex-1 bg-stone-950 border border-stone-800 focus:border-purple-500 rounded-xl p-3 text-xs sm:text-sm text-stone-200 placeholder-stone-600 focus:outline-none resize-y font-mono"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </section>
          </div>
        )}
      </main>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-stone-950/95 backdrop-blur-lg border-t border-stone-800 px-2 py-2 flex items-center justify-around">
        <button
          type="button"
          onClick={() => setActiveTab('DAILY_PLAN')}
          className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-xs font-bold ${
            activeTab === 'DAILY_PLAN' ? 'text-emerald-400' : 'text-stone-400'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span className="text-[10px]">Daily Plan</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab('DAILY_PLAN');
            selectDay(scheduleMeta.activeTargetDayNumber);
          }}
          className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-xs font-bold text-indigo-400"
        >
          <Target className="w-4 h-4" />
          <span className="text-[10px]">Active (D{scheduleMeta.activeTargetDayNumber})</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('SYLLABUS')}
          className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-xs font-bold ${
            activeTab === 'SYLLABUS' ? 'text-emerald-400' : 'text-stone-400'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span className="text-[10px]">Syllabus</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('PRACTICE_NOTES')}
          className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-xs font-bold ${
            activeTab === 'PRACTICE_NOTES' ? 'text-purple-400' : 'text-stone-400'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span className="text-[10px]">Notes</span>
        </button>
      </nav>

      {/* =========================================================
          IN-APP YOUTUBE LECTURE THEATRE MODAL
         ========================================================= */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-stone-900 border border-stone-700 rounded-2xl max-w-6xl w-full overflow-hidden shadow-2xl my-auto">
            {/* Modal Header */}
            <div className="px-4 sm:px-6 py-3.5 bg-stone-950 border-b border-stone-800 flex items-center justify-between gap-3">
              <div className="truncate">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${getPhaseBadgeStyle(activeVideoModal.unit.phase)}`}>
                    {activeVideoModal.unit.courseCode}
                  </span>
                  <span className="text-xs font-bold text-stone-400 truncate">
                    {activeVideoModal.unit.unitTitle}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-white truncate mt-0.5">
                  {activeVideoModal.video.title}
                </h3>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    toggleVideo(
                      `${activeVideoModal.unit.id}_vid_${activeVideoModal.video.id}`,
                      getLinkedProblems(activeVideoModal.unit, activeVideoModal.video).length
                    )
                  }
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition ${
                    state.watchedVideos[
                      `${activeVideoModal.unit.id}_vid_${activeVideoModal.video.id}`
                    ]
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-stone-800 text-stone-200 border-stone-700 hover:bg-emerald-500 hover:text-stone-950'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>
                    {state.watchedVideos[
                      `${activeVideoModal.unit.id}_vid_${activeVideoModal.video.id}`
                    ]
                      ? 'Watched'
                      : 'Mark Watched'}
                  </span>
                </button>

                <a
                  href={activeVideoModal.video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1"
                >
                  <span>Open YT</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <button
                  type="button"
                  onClick={() => setActiveVideoModal(null)}
                  className="p-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: Video Player + Side-by-Side Checklist & Notes */}
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Responsive 16:9 YouTube Embed */}
              <div className="lg:col-span-8 bg-black flex items-center justify-center">
                <div className="w-full aspect-video">
                  <iframe
                    src={
                      activeVideoModal.video.playlistOnly
                        ? `https://www.youtube.com/embed/videoseries?list=${PLAYLIST_ID}&index=${activeVideoModal.video.playlistIndex - 1}&rel=0`
                        : `https://www.youtube.com/embed/${activeVideoModal.video.id}?rel=0`
                    }
                    title={activeVideoModal.video.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>

              {/* Side-by-Side Unit Subtopics & Live Scratchpad */}
              <div className="lg:col-span-4 p-4 sm:p-5 bg-stone-900 border-t lg:border-t-0 lg:border-l border-stone-800 flex flex-col justify-between gap-4 max-h-[75vh] overflow-y-auto">
                {activeVideoModal.video.playlistOnly && (
                  <div className="text-[11px] leading-relaxed text-stone-400 bg-stone-950 border border-stone-800 rounded-lg p-2.5">
                    This is lecture <span className="text-white font-bold">#{activeVideoModal.video.playlistIndex}</span> of the{' '}
                    {PLAYLIST_NAME} playlist. If the player starts on a different lecture, pick #
                    {activeVideoModal.video.playlistIndex} from the playlist menu inside the player, or{' '}
                    <a
                      href={activeVideoModal.video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-300 underline"
                    >
                      open it on YouTube
                    </a>
                    .
                  </div>
                )}

                <div className="space-y-3">
                  <div className="text-xs font-bold text-emerald-400">
                    Unit Subtopics Checklist
                  </div>
                  <div className="space-y-1.5">
                    {activeVideoModal.unit.subtopics.map((sub, idx) => {
                      const sKey = `${activeVideoModal.unit.id}_sub_${idx}`;
                      const checked = !!state.completedSubtopics[sKey];
                      return (
                        <div
                          key={sKey}
                          onClick={() => toggleSubtopic(sKey)}
                          className={`p-2.5 rounded-xl border text-xs flex items-start gap-2 cursor-pointer transition ${
                            checked
                              ? 'bg-emerald-950/30 border-emerald-500/40 text-stone-400 line-through'
                              : 'bg-stone-950 border-stone-800 text-stone-200'
                          }`}
                        >
                          <div
                            className={`mt-0.5 w-3.5 h-3.5 rounded flex items-center justify-center border shrink-0 ${
                              checked
                                ? 'bg-emerald-500 border-emerald-500 text-stone-950'
                                : 'border-stone-600'
                            }`}
                          >
                            {checked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                          </div>
                          <span className="leading-snug">{sub}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {renderLinkedProblems(
                  activeVideoModal.unit,
                  activeVideoModal.video,
                  `${activeVideoModal.unit.id}_vid_${activeVideoModal.video.id}`
                )}

                <div className="space-y-2 pt-2 border-t border-stone-800">
                  <div className="text-xs font-bold text-indigo-400">
                    Live Lecture Notes (Auto-Saved)
                  </div>
                  <textarea
                    rows={6}
                    value={state.unitNotes[activeVideoModal.unit.id] || ''}
                    onChange={(e) => handleNoteChange(activeVideoModal.unit.id, e.target.value)}
                    placeholder="Jot down C++ dry-runs, time complexity proofs, or pointers while watching..."
                    className="w-full bg-stone-950 border border-stone-800 focus:border-emerald-500 rounded-xl p-3 text-xs text-stone-100 placeholder-stone-500 focus:outline-none font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          BACKUP (EXPORT / IMPORT JSON) & RESET MODAL
         ========================================================= */}
      {backupModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-700 rounded-2xl max-w-lg w-full p-5 sm:p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <Download className="w-4 h-4 text-indigo-400" />
                <span>Backup, Sync &amp; Restore Progress</span>
              </h3>
              <button
                type="button"
                onClick={() => {
                  setBackupModalOpen(false);
                  setConfirmResetOpen(false);
                }}
                className="p-1 rounded-lg bg-stone-800 text-stone-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-stone-300">
                Your progress is automatically saved in your browser&apos;s <code className="text-emerald-400">localStorage</code>. Export a JSON file anytime to transfer your progress between your laptop and phone.
              </p>
              <button
                type="button"
                onClick={handleExportJson}
                className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow transition"
              >
                <Download className="w-4 h-4" />
                <span>Download JSON Backup File</span>
              </button>
            </div>

            <div className="space-y-2 pt-3 border-t border-stone-800">
              <label className="text-xs font-bold text-stone-300 block">
                Restore from JSON Backup Paste:
              </label>
              <textarea
                rows={4}
                value={importJsonText}
                onChange={(e) => setImportJsonText(e.target.value)}
                placeholder='Paste exported JSON content here...'
                className="w-full bg-stone-950 border border-stone-800 rounded-xl p-2.5 text-xs text-stone-200 font-mono focus:outline-none focus:border-emerald-500"
              />
              <button
                type="button"
                onClick={handleImportJson}
                className="w-full py-2 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 transition"
              >
                <Upload className="w-4 h-4" />
                <span>Restore Progress from JSON</span>
              </button>
            </div>

            <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
              {!confirmResetOpen ? (
                <button
                  type="button"
                  onClick={() => setConfirmResetOpen(true)}
                  className="text-xs font-semibold text-rose-400 hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Progress</span>
                </button>
              ) : (
                <div className="flex items-center gap-2 w-full justify-between bg-rose-950/30 border border-rose-500/40 px-3 py-2 rounded-xl">
                  <span className="text-xs text-rose-200 font-semibold">Are you sure?</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleResetAllProgress}
                      className="px-2.5 py-1 rounded-lg bg-rose-600 text-white text-xs font-bold"
                    >
                      Yes, Reset Everything
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmResetOpen(false)}
                      className="px-2.5 py-1 rounded-lg bg-stone-800 text-stone-300 text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}