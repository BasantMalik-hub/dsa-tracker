import React from 'react';
import { Check, ExternalLink, Trash2 } from 'lucide-react';
import { Problem, Unit } from '../../types';

interface ProblemRowProps {
  prob: Problem;
  unit: Unit;
  solved: boolean;
  onToggleProblem: (probId: string) => void;
  onDeleteCustomProblem?: (unitId: string, probId: string) => void;
}

export const ProblemRow: React.FC<ProblemRowProps> = ({
  prob,
  unit,
  solved,
  onToggleProblem,
  onDeleteCustomProblem
}) => {
  const followUpVideo = (prob.videoIds || []).length > 0
    ? unit.videos.find((v) => v.id === prob.videoIds![0])
    : null;

  return (
    <div className="p-3 rounded-xl bg-stone-950 border border-stone-800/90 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
      <div
        onClick={() => onToggleProblem(prob.id)}
        className="flex items-start gap-2.5 cursor-pointer min-w-0 flex-1"
      >
        <div
          className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center border shrink-0 transition ${
            solved
              ? 'bg-emerald-500 border-emerald-500 text-stone-950'
              : 'border-stone-600 bg-stone-900'
          }`}
        >
          {solved && <Check className="w-2.5 h-2.5 stroke-[3]" />}
        </div>
        <div className="min-w-0 flex-1">
          <span
            className={`text-xs sm:text-sm font-semibold block break-words ${
              solved ? 'line-through text-stone-500' : 'text-stone-100 hover:text-emerald-300'
            }`}
          >
            {prob.title}
          </span>
          <div className="flex flex-wrap items-center gap-1.5 mt-1">
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-900 text-stone-400 border border-stone-800">
              {prob.platform}
            </span>
            <span
              className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                prob.difficulty === 'Easy'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  : prob.difficulty === 'Medium'
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
              }`}
            >
              {prob.difficulty}
            </span>
            {followUpVideo && (
              <span className="text-[10px] font-mono text-stone-500 truncate max-w-[200px]">
                &bull; after: {followUpVideo.title.replace(/^Lec \d+:\s*/i, '')}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-auto shrink-0 pt-1 sm:pt-0">
        <a
          href={prob.url}
          target="_blank"
          rel="noopener noreferrer"
          className="py-1 px-2.5 rounded-lg bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-300 border border-indigo-500/30 text-xs font-semibold flex items-center gap-1 transition"
        >
          <span>Solve</span>
          <ExternalLink className="w-3 h-3" />
        </a>
        {prob.isCustom && onDeleteCustomProblem && (
          <button
            type="button"
            onClick={() => onDeleteCustomProblem(unit.id, prob.id)}
            className="p-1 rounded-lg text-rose-400 hover:bg-rose-500/20 transition"
            title="Delete Custom Problem"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
