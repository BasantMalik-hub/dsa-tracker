import React from 'react';
import { Play, ExternalLink, Check } from 'lucide-react';
import { Unit, Video } from '../../types';
import { LinkedProblems } from './LinkedProblems';
import { Youtube } from '../common/Icons';

interface UnitVideosListProps {
  unit: Unit;
  vidDone: number;
  watchedVideos: Record<string, boolean>;
  solvedProblems: Record<string, boolean>;
  onToggleVideo: (key: string, linkedCount?: number) => void;
  onToggleProblem: (probId: string) => void;
  onOpenVideoModal: (data: { unit: Unit; video: Video }) => void;
}

export const UnitVideosList: React.FC<UnitVideosListProps> = ({
  unit,
  vidDone,
  watchedVideos,
  solvedProblems,
  onToggleVideo,
  onToggleProblem,
  onOpenVideoModal
}) => {
  return (
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
              className="p-3 rounded-xl bg-stone-950/70 border border-stone-800/80 space-y-2.5"
            >
              <div
                onClick={() => onToggleVideo(vKey, linkedProblems.length)}
                className="flex items-start gap-2.5 cursor-pointer"
              >
                <div
                  className={`mt-0.5 w-3.5 h-3.5 rounded flex items-center justify-center border shrink-0 ${
                    watched
                      ? 'bg-emerald-500 border-emerald-500 text-stone-950'
                      : 'border-stone-600'
                  }`}
                >
                  {watched && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/15 text-rose-300 border border-rose-500/30">
                      {vid.type}
                    </span>
                    {vid.playlistIndex ? (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-900 text-stone-400 border border-stone-800">
                        #{vid.playlistIndex}
                      </span>
                    ) : null}
                    {vid.minutes ? (
                      <span className="text-[10px] font-mono text-stone-500">
                        ~{vid.minutes} min
                      </span>
                    ) : null}
                  </div>
                  <span
                    className={`text-xs font-medium block mt-1 leading-snug ${
                      watched ? 'line-through text-stone-500' : 'text-stone-200'
                    }`}
                  >
                    {vid.title}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onOpenVideoModal({ unit, video: vid })}
                  className="flex-1 py-1 px-2.5 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold flex items-center justify-center gap-1"
                >
                  <Play className="w-3 h-3 fill-indigo-300" />
                  <span>Watch in App</span>
                </button>
                <a
                  href={vid.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-1 px-2.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-rose-300 border border-stone-800 text-xs font-medium flex items-center gap-1"
                >
                  <span>YouTube</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <LinkedProblems
                unit={unit}
                video={vid}
                videoKey={vKey}
                watched={watched}
                solvedProblems={solvedProblems}
                onToggleProblem={onToggleProblem}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
