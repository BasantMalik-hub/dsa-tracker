import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { DayObject, DayProgress, Unit, Video } from '../../types';
import { WeeklyDayCard } from './WeeklyDayCard';

interface WeeklyAccordionProps {
  dailySchedule: DayObject[];
  calendarDayNumber: number;
  expandedWeeks: Record<number, boolean>;
  completedSubtopics: Record<string, boolean>;
  watchedVideos: Record<string, boolean>;
  onToggleWeek: (weekNum: number) => void;
  getDayProgress: (d: DayObject) => DayProgress;
  onToggleSubtopic: (key: string) => void;
  onToggleVideo: (key: string, linkedCount?: number) => void;
  onToggleProblem: (key: string) => void;
  onOpenVideoModal: (data: { unit: Unit; video: Video }) => void;
  onToggleCompleteEntireDay: (dayObj: DayObject) => void;
}

export const WeeklyAccordion: React.FC<WeeklyAccordionProps> = ({
  dailySchedule,
  calendarDayNumber,
  expandedWeeks,
  completedSubtopics,
  watchedVideos,
  onToggleWeek,
  getDayProgress,
  onToggleSubtopic,
  onToggleVideo,
  onToggleProblem,
  onOpenVideoModal,
  onToggleCompleteEntireDay
}) => {
  const totalWeeks = Math.ceil(dailySchedule.length / 7);

  return (
    <section className="space-y-4">
      {Array.from({ length: totalWeeks }, (_, i) => i + 1).map((weekNum) => {
        const weekDays = dailySchedule.filter((d) => d.weekNumber === weekNum);
        const weekCompleted = weekDays.filter(
          (d) => getDayProgress(d).status === 'COMPLETED'
        ).length;
        const isExpanded = !!expandedWeeks[weekNum];

        return (
          <div
            key={weekNum}
            className="bg-stone-900/80 border border-stone-800 rounded-2xl overflow-hidden"
          >
            <button
              type="button"
              onClick={() => onToggleWeek(weekNum)}
              className="w-full px-3.5 sm:px-5 py-3 flex items-center justify-between gap-2 bg-stone-900 hover:bg-stone-800/70 transition text-left"
            >
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-stone-400 shrink-0" />
                )}
                <div className="min-w-0 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <span className="text-sm font-semibold text-white whitespace-nowrap">
                    Week {weekNum}
                  </span>
                  <span className="text-[11px] sm:text-xs font-mono text-stone-400">
                    (Days {weekDays[0]?.dayNumber}–{weekDays[weekDays.length - 1]?.dayNumber} &bull;{' '}
                    {weekDays[0]?.formattedDate} to {weekDays[weekDays.length - 1]?.formattedDate})
                  </span>
                </div>
              </div>

              <span
                className={`shrink-0 text-[10px] sm:text-xs font-mono px-2 sm:px-2.5 py-0.5 rounded-full border ${
                  weekCompleted === weekDays.length
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-stone-950 text-stone-400 border-stone-800'
                }`}
              >
                {weekCompleted}/{weekDays.length} Done
              </span>
            </button>

            {isExpanded && (
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border-t border-stone-800/80">
                {weekDays.map((dayObj) => (
                  <WeeklyDayCard
                    key={dayObj.dayNumber}
                    dayObj={dayObj}
                    calendarDayNumber={calendarDayNumber}
                    prog={getDayProgress(dayObj)}
                    completedSubtopics={completedSubtopics}
                    watchedVideos={watchedVideos}
                    onToggleSubtopic={onToggleSubtopic}
                    onToggleVideo={onToggleVideo}
                    onToggleProblem={onToggleProblem}
                    onOpenVideoModal={onOpenVideoModal}
                    onToggleCompleteEntireDay={onToggleCompleteEntireDay}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
};
