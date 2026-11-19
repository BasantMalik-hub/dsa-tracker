import React from 'react';
import { BookOpen, Play, ExternalLink, Code2, CheckCircle2, Check } from 'lucide-react';
import { Unit, Video, Problem } from '../../types';
import { getPhaseBadgeStyle } from '../../utils/styles';
import { LinkedProblems } from './LinkedProblems';
import { Youtube } from '../common/Icons';

interface SyllabusUnitCardProps {
  unit: Unit;
  completedSubtopics: Record<string, boolean>;
  watchedVideos: Record<string, boolean>;
  solvedProblems: Record<string, boolean>;
  customProblems: Record<string, Problem[]>;
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
  customProblems,
  onToggleSubtopic,
  onToggleVideo,
  onToggleProblem,
  onToggleCompleteEntireUnit,
  onOpenVideoModal
}) => {
  const subDone = unit.subtopics.filter(
    (_, i) => !!completedSubtopics[`${unit.id}_sub_${i}`]
  ).length;
  const vidDone = unit.videos.filter(
    (v) => !!watchedVideos[`${unit.id}_vid_${v.id}`]
  ).length;
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
            <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded border ${getPhaseBadgeStyle(unit.phase)}`}>
              {unit.courseCode}
            </span>
            <span className="text-xs font-mono text-stone-400 bg-stone-950 px-2.5 py-0.5 rounded border border-stone-800">
              {unit.hours} CI Hours
            </span>
            <span className="text-xs font-mono text-emerald-400 font-bold">
              {unitPct}% Complete
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-white">
            {unit.unitTitle}
          </h3>
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
        {/* Left: Subtopics */}
        <div className="lg:col-span-7 space-y-2">
          <div className="text-xs font-bold text-stone-400 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              Syllabus Subtopics ({subDone}/{unit.subtopics.length})
            </span>
          </div>
          <div className="space-y-2">
            {unit.subtopics.map((subText, idx) => {
              const sKey = `${unit.id}_sub_${idx}`;
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
                      checked
                        ? 'bg-emerald-500 border-emerald-500 text-stone-950'
                        : 'border-stone-600'
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

        {/* Right: Mapped Video Lectures & Practice Problems */}
        <div className="lg:col-span-5 space-y-4">
          <div className="space-y-2">
            <div className="text-xs font-bold text-stone-400 flex items-center gap-1.5">
              <Youtube className="w-3.5 h-3.5 text-rose-400" />
              <span>
                Playlist Lectures ({vidDone}/{unit.videos.length})
              </span>
            </div>
            <div className="space-y-2">
              {unit.videos.map((vid) => {
                const vKey = `${unit.id}_vid_${vid.id}`;
                const watched = !!watchedVideos[vKey];
                const linkedProblems = unit.problems.filter((p) => (p.videoIds || []).includes(vid.id));
                return (
                  <div
                    key={vKey}
                    className="p-3 rounded-xl bg-stone-950/80 border border-stone-800 space-y-2.5"
                  >
                    <div
                      onClick={() => onToggleVideo(vKey, linkedProblems.length)}
                      className="flex items-start gap-2.5 cursor-pointer"
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
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5 mb-1">
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/15 text-rose-300 border border-rose-500/30">
                            {vid.type}
                          </span>
                          {vid.playlistIndex ? (
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-900 text-stone-400 border border-stone-800">
                              #{vid.playlistIndex}
                            </span>
                          ) : null}
                          {vid.minutes ? (
                            <span className="text-[10px] font-mono text-stone-400">~{vid.minutes}m</span>
                          ) : null}
                        </div>
                        <div
                          className={`text-xs sm:text-sm font-semibold leading-snug break-words ${
                            watched ? 'line-through text-stone-500' : 'text-white'
                          }`}
                        >
                          {vid.title}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pl-6">
                      <button
                        type="button"
                        onClick={() => onOpenVideoModal({ unit, video: vid })}
                        className="flex-1 py-1.5 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition"
                      >
                        <Play className="w-3 h-3 fill-white" />
                        <span>Watch in App</span>
                      </button>
                      <a
                        href={vid.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-1.5 px-2.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-700 text-xs font-semibold flex items-center gap-1"
                      >
                        <span>YT</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <div className="pl-6">
                      <LinkedProblems
                        unit={unit}
                        video={vid}
                        videoKey={vKey}
                        watched={watched}
                        solvedProblems={solvedProblems}
                        onToggleProblem={onToggleProblem}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Curated Practice Problems for this Unit */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-stone-400 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>
                Practice Problems ({probDone}/{allProbs.length})
              </span>
            </div>
            <div className="space-y-1.5">
              {allProbs.map((prob) => {
                const solved = !!solvedProblems[prob.id];
                return (
                  <div
                    key={prob.id}
                    className="p-2.5 rounded-xl bg-stone-950/70 border border-stone-800 flex items-center justify-between gap-2"
                  >
                    <div
                      onClick={() => onToggleProblem(prob.id)}
                      className="flex items-center gap-2.5 cursor-pointer truncate"
                    >
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center border shrink-0 ${
                          solved
                            ? 'bg-emerald-500 border-emerald-500 text-stone-950'
                            : 'border-stone-600'
                        }`}
                      >
                        {solved && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span
                        className={`text-xs font-semibold truncate ${
                          solved ? 'line-through text-stone-500' : 'text-indigo-200'
                        }`}
                      >
                        {prob.title}
                      </span>
                    </div>
                    <a
                      href={prob.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-mono text-emerald-400 hover:underline shrink-0 flex items-center gap-1"
                    >
                      <span>{prob.platform}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
