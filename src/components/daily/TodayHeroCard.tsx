import React from 'react';
import { CheckCircle2, Clock } from 'lucide-react';
import { DayObject, DayProgress, Unit, Video } from '../../types';
import { getPhaseBadgeStyle } from '../../utils/styles';
import { dayAnchor } from '../../utils/scheduleGenerator';
import { DaySubtopicsList } from './DaySubtopicsList';
import { DayVideosList } from './DayVideosList';
import { DayPracticeTarget } from './DayPracticeTarget';

interface TodayHeroCardProps {
  selectedDayObj: DayObject;
  dayProg: DayProgress;
  isCalendarToday: boolean;
  totalScheduleDays: number;
  activeTargetDayNumber: number;
  completedSubtopics: Record<string, boolean>;
  watchedVideos: Record<string, boolean>;
  solvedProblems: Record<string, boolean>;
  unitNotes: Record<string, string>;
  dayNotes: Record<string, string>;
  fuzzyDays: Record<string, boolean>;
  onSelectDay: (dayNum: number) => void;
  onToggleCompleteEntireDay: (dayObj: DayObject) => void;
  onToggleSubtopic: (key: string) => void;
  onToggleVideo: (key: string, linkedCount?: number) => void;
  onToggleProblem: (key: string) => void;
  onOpenVideoModal: (data: { unit: Unit; video: Video }) => void;
  onNoteChange: (unitId: string, text: string) => void;
  onDayNoteChange: (dayObj: DayObject, text: string) => void;
  onToggleFuzzy: (dayObj: DayObject) => void;
}

export const TodayHeroCard: React.FC<TodayHeroCardProps> = ({
  selectedDayObj,
  dayProg,
  isCalendarToday,
  totalScheduleDays,
  activeTargetDayNumber,
  completedSubtopics,
  watchedVideos,
  solvedProblems,
  unitNotes,
  dayNotes,
  fuzzyDays,
  onSelectDay,
  onToggleCompleteEntireDay,
  onToggleSubtopic,
  onToggleVideo,
  onToggleProblem,
  onOpenVideoModal,
  onNoteChange,
  onDayNoteChange,
  onToggleFuzzy
}) => {
  return (
    <section className="bg-stone-900 border border-stone-700/80 rounded-2xl p-5 sm:p-6">
      {/* Header Info & Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-stone-800/80">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              {isCalendarToday ? 'Today' : `Day ${selectedDayObj.dayNumber}`}
            </span>
            <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-stone-950 border border-stone-800 text-stone-300">
              Day {selectedDayObj.dayNumber} of {totalScheduleDays} &bull;{' '}
              {selectedDayObj.formattedDate}
            </span>
            <span
              className={`text-xs font-mono px-2.5 py-0.5 rounded-md border ${getPhaseBadgeStyle(selectedDayObj.unit.phase)}`}
            >
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
            {selectedDayObj.unit.phaseName} &bull; Week {selectedDayObj.weekNumber} &bull;{' '}
            {dayProg.doneCount} of {dayProg.totalCount} things done today
          </p>
        </div>

        {/* Day Navigation & Complete Day Button */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center bg-stone-950 rounded-xl border border-stone-800 p-1">
            <button
              type="button"
              onClick={() => onSelectDay(selectedDayObj.dayNumber - 1)}
              disabled={selectedDayObj.dayNumber <= 1}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold text-stone-400 hover:text-white disabled:opacity-30"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={() => onSelectDay(activeTargetDayNumber)}
              className="px-2.5 py-1 text-xs font-bold text-emerald-400 hover:underline border-x border-stone-800"
            >
              Where I left off (D{activeTargetDayNumber})
            </button>
            <button
              type="button"
              onClick={() => onSelectDay(selectedDayObj.dayNumber + 1)}
              disabled={selectedDayObj.dayNumber >= totalScheduleDays}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold text-stone-400 hover:text-white disabled:opacity-30"
            >
              Next
            </button>
          </div>

          <button
            type="button"
            onClick={() => onToggleCompleteEntireDay(selectedDayObj)}
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

      {/* 3-Column Daily Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-5">
        <DaySubtopicsList
          subtopics={selectedDayObj.subtopics}
          subDone={dayProg.subDone}
          subCount={dayProg.subCount}
          completedSubtopics={completedSubtopics}
          onToggleSubtopic={onToggleSubtopic}
        />

        <DayVideosList
          unit={selectedDayObj.unit}
          videos={selectedDayObj.videos}
          vidDoneCount={dayProg.vidDoneCount}
          watchedVideos={watchedVideos}
          solvedProblems={solvedProblems}
          onToggleVideo={onToggleVideo}
          onToggleProblem={onToggleProblem}
          onOpenVideoModal={onOpenVideoModal}
        />

        <DayPracticeTarget
          unit={selectedDayObj.unit}
          problem={selectedDayObj.problem}
          problemKey={selectedDayObj.problemKey}
          probDone={dayProg.probDone}
          unitNotesText={unitNotes[selectedDayObj.unit.id] || ''}
          onToggleProblem={onToggleProblem}
          onNoteChange={onNoteChange}
        />
      </div>

      {/* Note to self & fuzzy flag */}
      <div className="mt-5 pt-5 border-t border-stone-800 grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-9 space-y-1.5">
          <label className="text-xs font-semibold text-stone-300">Note to self</label>
          <textarea
            rows={3}
            value={dayNotes[dayAnchor(selectedDayObj)] || ''}
            onChange={(e) => onDayNoteChange(selectedDayObj, e.target.value)}
            placeholder="What clicked today? What is still fuzzy? How would you explain it to a friend?"
            className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-sm text-stone-200 placeholder-stone-600 focus:outline-none focus:border-emerald-500 resize-y leading-relaxed"
          />
        </div>
        <div className="lg:col-span-3 flex flex-col justify-end gap-2">
          <button
            type="button"
            onClick={() => onToggleFuzzy(selectedDayObj)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold border transition ${
              fuzzyDays[dayAnchor(selectedDayObj)]
                ? 'bg-amber-500/15 text-amber-300 border-amber-500/40'
                : 'bg-stone-950 text-stone-300 border-stone-700 hover:border-stone-600'
            }`}
          >
            {fuzzyDays[dayAnchor(selectedDayObj)]
              ? 'Marked as still fuzzy'
              : 'Still fuzzy? Mark to revisit'}
          </button>
        </div>
      </div>
    </section>
  );
};
