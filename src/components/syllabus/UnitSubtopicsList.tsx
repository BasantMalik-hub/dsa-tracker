import React from 'react';
import { BookOpen, Check } from 'lucide-react';

interface UnitSubtopicsListProps {
  unitId: string;
  subtopics: string[];
  subDone: number;
  completedSubtopics: Record<string, boolean>;
  onToggleSubtopic: (key: string) => void;
}

export const UnitSubtopicsList: React.FC<UnitSubtopicsListProps> = ({
  unitId,
  subtopics,
  subDone,
  completedSubtopics,
  onToggleSubtopic
}) => {
  return (
    <div className="lg:col-span-7 space-y-2">
      <div className="text-xs font-bold text-stone-400 flex items-center gap-1.5">
        <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
        <span>
          Syllabus Subtopics ({subDone}/{subtopics.length})
        </span>
      </div>
      <div className="space-y-2">
        {subtopics.map((subText, idx) => {
          const sKey = `${unitId}_sub_${idx}`;
          const checked = !!completedSubtopics[sKey];
          return (
            <div
              key={sKey}
              onClick={() => onToggleSubtopic(sKey)}
              className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition ${
                checked
                  ? 'bg-emerald-950/25 border-emerald-500/35 text-stone-400 line-through'
                  : 'bg-stone-950/70 border-stone-800 hover:border-stone-700 text-stone-200'
              }`}
            >
              <div
                className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center border shrink-0 ${
                  checked ? 'bg-emerald-500 border-emerald-500 text-stone-950' : 'border-stone-600'
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
  );
};
