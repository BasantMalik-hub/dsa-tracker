import { TrackerState, Problem } from '../types';
import { VIDEO_ID_ALIASES, SUBTOPIC_SCHEMA, migrateSubtopicProgress } from '../data/syllabusData';
import { getTodayISO } from './dateUtils';

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
export const migrateVideoAliases = <T extends Record<string, unknown>>(obj: T): T => {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return obj || ({} as T);
  const pairs = Object.entries(VIDEO_ID_ALIASES);
  if (pairs.length === 0) return obj;
  const out: Record<string, unknown> = {};
  Object.entries(obj).forEach(([k, v]) => {
    let nk = k;
    pairs.forEach(([oldId, newId]) => {
      nk = nk.split(`_vid_${oldId}`).join(`_vid_${newId}`);
    });
    out[nk] = v;
  });
  return out as T;
};

export function loadPersistedState(): TrackerState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return DEFAULT_STATE;
    const isObj = (v: unknown): v is Record<string, unknown> =>
      typeof v === 'object' && v !== null && !Array.isArray(v);

    return migrateSubtopicProgress({
      ...DEFAULT_STATE,
      ...parsed,
      completedSubtopics: isObj(parsed.completedSubtopics)
        ? (parsed.completedSubtopics as Record<string, boolean>)
        : {},
      watchedVideos: migrateVideoAliases(
        isObj(parsed.watchedVideos) ? (parsed.watchedVideos as Record<string, boolean>) : {}
      ),
      solvedProblems: isObj(parsed.solvedProblems)
        ? (parsed.solvedProblems as Record<string, boolean>)
        : {},
      unitNotes: migrateVideoAliases(
        isObj(parsed.unitNotes) ? (parsed.unitNotes as Record<string, string>) : {}
      ),
      customProblems: isObj(parsed.customProblems)
        ? (parsed.customProblems as Record<string, Problem[]>)
        : {},
      dayNotes: migrateVideoAliases(
        isObj(parsed.dayNotes) ? (parsed.dayNotes as Record<string, string>) : {}
      ),
      fuzzyDays: migrateVideoAliases(
        isObj(parsed.fuzzyDays) ? (parsed.fuzzyDays as Record<string, boolean>) : {}
      ),
      userName: typeof parsed.userName === 'string' ? parsed.userName : '',
      paceDays: [60, 90, 120].includes(Number(parsed.paceDays)) ? Number(parsed.paceDays) : 90,
      startDate:
        typeof parsed.startDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(parsed.startDate)
          ? parsed.startDate
          : getTodayISO(),
      selectedDayNumber:
        Number(parsed.selectedDayNumber) > 0 ? Number(parsed.selectedDayNumber) : 1,
      subtopicSchema: parsed.subtopicSchema
    });
  } catch (err) {
    console.warn('localStorage load fallback:', err);
    return DEFAULT_STATE;
  }
}

export function savePersistedState(state: TrackerState): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.warn('localStorage write warning:', err);
  }
}
