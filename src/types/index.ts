export interface Video {
  id: string; // YouTube video id, or ACnnn for playlist-only lectures
  title: string;
  url: string;
  type: string;
  playlistIndex?: number;
  playlistOnly?: boolean;
  minutes?: number;
}

export interface Problem {
  id: string;
  title: string;
  url: string;
  platform: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | string;
  videoIds?: string[];
  isCustom?: boolean;
}

export interface Unit {
  id: string;
  phase: 1 | 2 | 3 | 4;
  phaseName: string;
  courseCode: string;
  unitTitle: string;
  hours: number;
  subtopics: string[];
  videos: Video[];
  problems: Problem[];
}

export interface DaySubtopic {
  idx: number;
  key: string;
  text: string;
}

export interface DayVideo {
  video: Video;
  key: string;
}

export interface DayObject {
  dayNumber: number;
  weekNumber: number;
  dateISO: string;
  formattedDate: string;
  unit: Unit;
  unitDayIndex: number;
  unitTotalDays: number;
  title: string;
  estMinutes: number;
  subtopics: DaySubtopic[];
  videos: DayVideo[];
  problem: Problem;
  problemKey: string;
}

export type DayStatus = 'UPCOMING' | 'IN_PROGRESS' | 'COMPLETED';

export interface DayProgress {
  doneCount: number;
  totalCount: number;
  pct: number;
  status: DayStatus;
  subDone: number;
  subCount: number;
  vidDone: boolean;
  vidDoneCount: number;
  vidCount: number;
  probDone: boolean;
}

export interface PhaseBreakdown {
  done: number;
  total: number;
  pct: number;
  title: string;
  code: string;
  hours: number;
}

export interface GlobalStats {
  totalSubs: number;
  doneSubs: number;
  totalVids: number;
  doneVids: number;
  totalProbs: number;
  doneProbs: number;
  grandTotal: number;
  grandDone: number;
  overallPct: number;
  phaseBreakdown: Record<number, PhaseBreakdown>;
}

export interface ScheduleMeta {
  todayISO: string;
  calendarDayNumber: number;
  activeTargetDayNumber: number;
  completedDaysCount: number;
  delta: number;
  badgeText: string;
  badgeTone: 'emerald' | 'amber' | 'blue';
}

export interface CustomProblemDraft {
  title: string;
  url: string;
  platform: string;
  difficulty: string;
}

export interface TrackerState {
  completedSubtopics: Record<string, boolean>;
  watchedVideos: Record<string, boolean>;
  solvedProblems: Record<string, boolean>;
  unitNotes: Record<string, string>;
  customProblems: Record<string, Problem[]>;
  paceDays: number;
  startDate: string;
  selectedDayNumber: number;
  streakCount: number;
  lastActiveDate: string;
  userName: string;
  dayNotes: Record<string, string>;
  fuzzyDays: Record<string, boolean>;
}

export type ActiveTab = 'DAILY_PLAN' | 'SYLLABUS' | 'PRACTICE_NOTES';
export type StatusFilter = 'ALL' | 'REMAINING' | 'COMPLETED';
export type PhaseFilter = 'ALL' | 1 | 2 | 3 | 4;

export interface ActiveVideoModalData {
  unit: Unit;
  video: Video;
}
