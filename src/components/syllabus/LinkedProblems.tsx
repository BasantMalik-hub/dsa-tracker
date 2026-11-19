import React from 'react';
import { Target, Check } from 'lucide-react';
import { Unit, Video } from '../../types';

interface LinkedProblemsProps {
  unit: Unit;
  video: Video;
  videoKey: string;
  watched: boolean;
  solvedProblems: Record<string, boolean>;
  onToggleProblem: (probId: string) => void;
}

export const LinkedProblems: React.FC<LinkedProblemsProps> = ({
  unit,
  video,
  watched,
  solvedProblems,
  onToggleProblem
}) => {
  const linked = unit.problems.filter((p) => (p.videoIds || []).includes(video.id));
  if (linked.length === 0) return null;

  const solvedCount = linked.filter((p) => !!solvedProblems[p.id]).length;

  return (
    <div
      className={`rounded-xl border p-3 space-y-2 ${
        watched ? 'border-emerald-500/40 bg-emerald-950/20' : 'border-stone-800 bg-stone-950/60'
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="text-[11px] font-bold text-emerald-400 flex items-center gap-1.5">
          <Target className="w-3.5 h-3.5" />
          <span>{watched ? 'Now practice this video' : 'After watching, practice'}</span>
        </div>
        <span className="text-[10px] font-mono text-stone-400">
          {solvedCount}/{linked.length} solved
        </span>
      </div>
      <div className="space-y-1.5">
        {linked.map((p) => {
          const done = !!solvedProblems[p.id];
          return (
            <div key={p.id} className="flex items-start gap-2">
              <button
                type="button"
                onClick={() => onToggleProblem(p.id)}
                aria-label={done ? 'Mark unsolved' : 'Mark solved'}
                className={`mt-0.5 w-3.5 h-3.5 rounded flex items-center justify-center border shrink-0 ${
                  done ? 'bg-emerald-500 border-emerald-500 text-stone-950' : 'border-stone-600'
                }`}
              >
                {done && <Check className="w-2.5 h-2.5 stroke-[3]" />}
              </button>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 text-xs leading-snug hover:underline ${
                  done ? 'line-through text-stone-500' : 'text-stone-200'
                }`}
              >
                {p.title}
              </a>
              <span className="text-[10px] font-mono text-stone-500 shrink-0">
                {p.platform} &bull; {p.difficulty}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
