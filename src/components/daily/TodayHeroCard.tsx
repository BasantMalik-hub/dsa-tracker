import React from 'react';
import {
  CheckCircle2,
  Clock,
  ListChecks,
  Play,
  ExternalLink,
  Code2,
  Check
} from 'lucide-react';
import { DayObject, DayProgress, Unit, Video } from '../../types';
import { getPhaseBadgeStyle } from '../../utils/styles';
import { dayAnchor } from '../../utils/scheduleGenerator';
import { LinkedProblems } from '../syllabus/LinkedProblems';
import { Youtube } from '../common/Icons';

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
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-stone-800/80">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              {isCalendarToday ? 'Today' : `Day ${selectedDayObj.dayNumber}`}
            </span>
            <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-stone-950 border border-stone-800 text-stone-300">
              Day {selectedDayObj.dayNumber} of {totalScheduleDays} &bull; {selectedDayObj.formattedDate}
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
              const checked = !!completedSubtopics[s.key];
              return (
                <div
                  key={s.key}
                  onClick={() => onToggleSubtopic(s.key)}
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
                const watched = !!watchedVideos[key];
                const linkedProblems = selectedDayObj.unit.problems.filter((p) => (p.videoIds || []).includes(video.id));
                return (
                  <div key={key} className="p-3.5 rounded-xl bg-stone-950/90 border border-stone-800 space-y-3">
                    <div
                      onClick={() => onToggleVideo(key, linkedProblems.length)}
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
                        onClick={() => onOpenVideoModal({ unit: selectedDayObj.unit, video })}
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

                    <LinkedProblems
                      unit={selectedDayObj.unit}
                      video={video}
                      videoKey={key}
                      watched={watched}
                      solvedProblems={solvedProblems}
                      onToggleProblem={onToggleProblem}
                    />
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
                onClick={() => onToggleProblem(selectedDayObj.problemKey)}
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
                value={unitNotes[selectedDayObj.unit.id] || ''}
                onChange={(e) => onNoteChange(selectedDayObj.unit.id, e.target.value)}
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
            {fuzzyDays[dayAnchor(selectedDayObj)] ? 'Marked as still fuzzy' : 'Still fuzzy? Mark to revisit'}
          </button>
          <p className="text-[11px] text-stone-500 leading-snug">
            Marked days are listed at the top so you can come back to them.
          </p>
        </div>
      </div>
    </section>
  );
};
