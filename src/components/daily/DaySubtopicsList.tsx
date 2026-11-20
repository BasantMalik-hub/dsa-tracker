import React from 'react';
import { ListChecks, Check } from 'lucide-react';
import { DaySubtopic } from '../../types';

interface DaySubtopicsListProps {
  subtopics: DaySubtopic[];
  subDone: number;
  subCount: number;
  completedSubtopics: Record<string, boolean>;
  onToggleSubtopic: (key: string) => void;
}

export const DaySubtopicsList: React.FC<DaySubtopicsListProps> = ({
  subtopics,
  subDone,
  subCount,
  completedSubtopics,
  onToggleSubtopic
}) => {
  return (
    <div className="lg:col-span-5 space-y-2.5">
      <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
        <ListChecks className="w-4 h-4" />
        <span>
          What to learn ({subDone}/{subCount})
        </span>
      </div>
      <div className="space-y-2">
        {subtopics.map((s) => {
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
                  checked ? 'bg-emerald-500 border-emerald-500 text-stone-950' : 'border-stone-600'
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
  );
};
