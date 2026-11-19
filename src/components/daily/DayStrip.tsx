import React, { useRef, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { DayObject, DayProgress } from '../../types';

interface DayStripProps {
  dailySchedule: DayObject[];
  safeSelectedDayNumber: number;
  calendarDayNumber: number;
  getDayProgress: (d: DayObject) => DayProgress;
  onSelectDay: (dayNum: number) => void;
}

export const DayStrip: React.FC<DayStripProps> = ({
  dailySchedule,
  safeSelectedDayNumber,
  calendarDayNumber,
  getDayProgress,
  onSelectDay
}) => {
  const selectedDayPillRef = useRef<HTMLButtonElement | null>(null);

  // Auto-scroll selected day into view on day change
  useEffect(() => {
    if (selectedDayPillRef.current) {
      selectedDayPillRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [safeSelectedDayNumber]);

  return (
    <section className="bg-stone-900/90 border border-stone-800 rounded-2xl p-4 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-indigo-400" />
          <h3 className="text-xs font-bold text-stone-300">All days (tap to jump)</h3>
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
          const isToday = d.dayNumber === calendarDayNumber;

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
              ref={isSelected ? selectedDayPillRef : null}
              type="button"
              onClick={() => onSelectDay(d.dayNumber)}
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
  );
};
