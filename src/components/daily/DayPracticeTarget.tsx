import React from 'react';
import { Code2, ExternalLink } from 'lucide-react';
import { Problem, Unit } from '../../types';

interface DayPracticeTargetProps {
  unit: Unit;
  problem: Problem;
  problemKey: string;
  probDone: boolean;
  unitNotesText: string;
  onToggleProblem: (key: string) => void;
  onNoteChange: (unitId: string, text: string) => void;
}

export const DayPracticeTarget: React.FC<DayPracticeTargetProps> = ({
  unit,
  problem,
  problemKey,
  probDone,
  unitNotesText,
  onToggleProblem,
  onNoteChange
}) => {
  return (
    <div className="lg:col-span-3 space-y-2.5">
      <div className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
        <Code2 className="w-4 h-4" />
        <span>Practice</span>
      </div>
      <div className="p-4 rounded-xl bg-stone-950/90 border border-stone-800 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
            {problem.platform} &bull; {problem.difficulty}
          </span>
          <button
            type="button"
            onClick={() => onToggleProblem(problemKey)}
            className={`text-[11px] font-bold px-2 py-0.5 rounded border transition ${
              probDone
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-stone-900 text-stone-400 border-stone-700 hover:text-white'
            }`}
          >
            {probDone ? '✓ Solved' : 'Mark Solved'}
          </button>
        </div>

        <a
          href={problem.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-xs sm:text-sm font-bold hover:underline flex items-center justify-between gap-1.5 ${
            probDone ? 'line-through text-stone-500' : 'text-indigo-300'
          }`}
        >
          <span>{problem.title}</span>
          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
        </a>

        <div className="pt-1">
          <textarea
            rows={2}
            value={unitNotesText}
            onChange={(e) => onNoteChange(unit.id, e.target.value)}
            placeholder={`Notes for ${unit.courseCode} ${unit.unitTitle.split(':')[0]}...`}
            className="w-full bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-emerald-500 resize-none"
          />
        </div>
      </div>
    </div>
  );
};
