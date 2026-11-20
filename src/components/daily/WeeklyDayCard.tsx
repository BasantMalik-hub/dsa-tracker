import React from 'react';
import { Play, ExternalLink, CheckCircle2, Check } from 'lucide-react';
import { DayObject, DayProgress, Unit, Video } from '../../types';
import { getPhaseBadgeStyle } from '../../utils/styles';

interface WeeklyDayCardProps {
  dayObj: DayObject;
  calendarDayNumber: number;
  prog: DayProgress;
  completedSubtopics: Record<string, boolean>;
  watchedVideos: Record<string, boolean>;
  onToggleSubtopic: (key: string) => void;
  onToggleVideo: (key: string, linkedCount?: number) => void;
  onToggleProblem: (key: string) => void;
  onOpenVideoModal: (data: { unit: Unit; video: Video }) => void;
  onToggleCompleteEntireDay: (dayObj: DayObject) => void;
}

export const WeeklyDayCard: React.FC<WeeklyDayCardProps> = ({
  dayObj,
  calendarDayNumber,
  prog,
  completedSubtopics,
  watchedVideos,
  onToggleSubtopic,
  onToggleVideo,
  onToggleProblem,
  onOpenVideoModal,
  onToggleCompleteEntireDay
}) => {
  const isToday = dayObj.dayNumber === calendarDayNumber;

  return (
    <div
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
            <span className="text-[11px] font-mono text-stone-400">{dayObj.formattedDate}</span>
          </div>
          <span
            className={`text-[10px] font-mono px-2 py-0.5 rounded border ${getPhaseBadgeStyle(dayObj.unit.phase)}`}
          >
            {dayObj.unit.courseCode}
          </span>
        </div>

        <h4 className="text-sm font-bold text-white leading-snug">{dayObj.title}</h4>

        {/* Subtopics */}
        <div className="space-y-1.5">
          {dayObj.subtopics.map((s) => {
            const subChecked = !!completedSubtopics[s.key];
            return (
              <div
                key={s.key}
                onClick={() => onToggleSubtopic(s.key)}
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
              const watched = !!watchedVideos[key];
              const linkedProblems = dayObj.unit.problems.filter((p) =>
                (p.videoIds || []).includes(video.id)
              );
              return (
                <div key={key} className="flex items-start gap-2">
                  <div
                    onClick={() => onToggleVideo(key, linkedProblems.length)}
                    className={`mt-0.5 w-3.5 h-3.5 rounded flex items-center justify-center border shrink-0 cursor-pointer ${
                      watched
                        ? 'bg-emerald-500 border-emerald-500 text-stone-950'
                        : 'border-stone-600'
                    }`}
                  >
                    {watched && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>
                  <span
                    className={`text-xs flex-1 leading-tight ${watched ? 'line-through text-stone-500' : 'text-stone-300'}`}
                  >
                    {video.title}
                  </span>
                  <button
                    type="button"
                    onClick={() => onOpenVideoModal({ unit: dayObj.unit, video })}
                    className="shrink-0 p-1 rounded-md bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/30"
                    aria-label="Watch"
                  >
                    <Play className="w-3 h-3 fill-indigo-300" />
                  </button>
                </div>
              );
            })
          )}

          <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <button
                type="button"
                onClick={() => onToggleProblem(dayObj.problemKey)}
                aria-label={prog.probDone ? 'Mark unsolved' : 'Mark solved'}
                className={`w-3.5 h-3.5 rounded flex items-center justify-center border shrink-0 ${
                  prog.probDone
                    ? 'bg-emerald-500 border-emerald-500 text-stone-950'
                    : 'border-stone-600 bg-stone-950'
                }`}
              >
                {prog.probDone && <Check className="w-2.5 h-2.5 stroke-[3]" />}
              </button>
              <div className="min-w-0 flex-1">
                <span
                  className={`text-xs block truncate ${prog.probDone ? 'line-through text-stone-500' : 'text-stone-200'}`}
                >
                  {dayObj.problem.title}
                </span>
                <span className="text-[10px] font-mono text-stone-500 block">
                  {dayObj.problem.platform} &bull; {dayObj.problem.difficulty}
                </span>
              </div>
            </div>
            <a
              href={dayObj.problem.url}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 py-1 px-2.5 rounded-lg bg-stone-950 hover:bg-stone-800 text-emerald-400 border border-stone-800 text-xs font-semibold flex items-center gap-1"
            >
              <span>Solve</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onToggleCompleteEntireDay(dayObj)}
        className={`w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
          prog.status === 'COMPLETED'
            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
            : 'bg-stone-900 hover:bg-emerald-500 hover:text-stone-950 text-stone-300 border border-stone-800'
        }`}
      >
        <CheckCircle2 className="w-3.5 h-3.5" />
        <span>
          {prog.status === 'COMPLETED' ? 'Reopen Day' : `Complete Day ${dayObj.dayNumber}`}
        </span>
      </button>
    </div>
  );
};
