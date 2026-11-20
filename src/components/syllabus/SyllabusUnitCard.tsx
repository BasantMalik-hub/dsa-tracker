import React from 'react';
import { Code2, CheckCircle2, Check, ExternalLink } from 'lucide-react';
import { Unit, Video, Problem } from '../../types';
import { getPhaseBadgeStyle } from '../../utils/styles';
import { UnitSubtopicsList } from './UnitSubtopicsList';
import { UnitVideosList } from './UnitVideosList';

interface SyllabusUnitCardProps {
  unit: Unit;
  completedSubtopics: Record<string, boolean>;
  watchedVideos: Record<string, boolean>;
  solvedProblems: Record<string, boolean>;
  customProblems?: Record<string, Problem[]>;
  onToggleSubtopic: (key: string) => void;
  onToggleVideo: (key: string, linkedCount?: number) => void;
  onToggleProblem: (probId: string) => void;
  onToggleCompleteEntireUnit: (unit: Unit) => void;
  onOpenVideoModal: (data: { unit: Unit; video: Video }) => void;
}

export const SyllabusUnitCard: React.FC<SyllabusUnitCardProps> = ({
  unit,
  completedSubtopics,
  watchedVideos,
  solvedProblems,
  customProblems = {},
  onToggleSubtopic,
  onToggleVideo,
  onToggleProblem,
  onToggleCompleteEntireUnit,
  onOpenVideoModal
}) => {
  const subDone = unit.subtopics.filter(
    (_, i) => !!completedSubtopics[`${unit.id}_sub_${i}`]
  ).length;
  const vidDone = unit.videos.filter((v) => !!watchedVideos[`${unit.id}_vid_${v.id}`]).length;
  const customList = customProblems[unit.id] || [];
  const allProbs = [...unit.problems, ...customList];
  const probDone = allProbs.filter((p) => !!solvedProblems[p.id]).length;

  const totalItems = unit.subtopics.length + unit.videos.length + allProbs.length;
  const doneItems = subDone + vidDone + probDone;
  const unitPct = totalItems > 0 ? Math.round((doneItems / totalItems) * 100) : 0;

  return (
    <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 space-y-4">
      {/* Unit Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-stone-800/80">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded border ${getPhaseBadgeStyle(unit.phase)}`}
            >
              {unit.courseCode}
            </span>
            <span className="text-xs font-mono text-stone-400 bg-stone-950 px-2.5 py-0.5 rounded border border-stone-800">
              {unit.hours} CI Hours
            </span>
            <span className="text-xs font-mono text-emerald-400 font-bold">
              {unitPct}% Complete
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-white">{unit.unitTitle}</h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onToggleCompleteEntireUnit(unit)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
              unitPct === 100
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-stone-800 hover:bg-emerald-500 hover:text-stone-950 text-stone-200'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{unitPct === 100 ? 'Unit Completed' : 'Mark Unit Complete'}</span>
          </button>
        </div>
      </div>

      {/* 2-Column Content: Subtopics & Videos */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <UnitSubtopicsList
          unitId={unit.id}
          subtopics={unit.subtopics}
          subDone={subDone}
          completedSubtopics={completedSubtopics}
          onToggleSubtopic={onToggleSubtopic}
        />

        {/* Right: Videos & Unit Practice Problems */}
        <div className="lg:col-span-5 space-y-4">
          <UnitVideosList
            unit={unit}
            vidDone={vidDone}
            watchedVideos={watchedVideos}
            solvedProblems={solvedProblems}
            onToggleVideo={onToggleVideo}
            onToggleProblem={onToggleProblem}
            onOpenVideoModal={onOpenVideoModal}
          />

          {/* Unit Practice Problems Overview */}
          {allProbs.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-stone-800/80">
              <div className="text-xs font-bold text-stone-400 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>
                  Practice Problems ({probDone}/{allProbs.length})
                </span>
              </div>
              <div className="space-y-1.5">
                {allProbs.slice(0, 4).map((p) => {
                  const done = !!solvedProblems[p.id];
                  return (
                    <div
                      key={p.id}
                      className="flex items-center justify-between gap-2 p-2 rounded-lg bg-stone-950/50 border border-stone-800/60 text-xs"
                    >
                      <div
                        onClick={() => onToggleProblem(p.id)}
                        className="flex items-center gap-2 min-w-0 flex-1 cursor-pointer"
                      >
                        <div
                          className={`w-3.5 h-3.5 rounded flex items-center justify-center border shrink-0 ${
                            done
                              ? 'bg-emerald-500 border-emerald-500 text-stone-950'
                              : 'border-stone-600'
                          }`}
                        >
                          {done && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </div>
                        <span
                          className={`truncate ${done ? 'line-through text-stone-500' : 'text-stone-300'}`}
                        >
                          {p.title}
                        </span>
                      </div>
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-stone-500 hover:text-emerald-400 shrink-0"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
