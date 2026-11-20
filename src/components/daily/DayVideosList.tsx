import React from 'react';
import { Play, ExternalLink, Check } from 'lucide-react';
import { DayVideo, Unit, Video } from '../../types';
import { LinkedProblems } from '../syllabus/LinkedProblems';
import { Youtube } from '../common/Icons';

interface DayVideosListProps {
  unit: Unit;
  videos: DayVideo[];
  vidDoneCount: number;
  watchedVideos: Record<string, boolean>;
  solvedProblems: Record<string, boolean>;
  onToggleVideo: (key: string, linkedCount?: number) => void;
  onToggleProblem: (key: string) => void;
  onOpenVideoModal: (data: { unit: Unit; video: Video }) => void;
}

export const DayVideosList: React.FC<DayVideosListProps> = ({
  unit,
  videos,
  vidDoneCount,
  watchedVideos,
  solvedProblems,
  onToggleVideo,
  onToggleProblem,
  onOpenVideoModal
}) => {
  return (
    <div className="lg:col-span-4 space-y-2.5">
      <div className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
        <Youtube className="w-4 h-4" />
        <span>
          Watch
          {videos.length > 0 ? ` (${vidDoneCount}/${videos.length})` : ''}
        </span>
      </div>
      {videos.length === 0 ? (
        <div className="p-4 rounded-xl bg-stone-950/90 border border-stone-800 text-xs text-stone-400 leading-relaxed">
          No new lecture today: this is a practice and revision day. Re-watch a lecture from this
          unit if something is unclear, then solve today&apos;s problem.
        </div>
      ) : (
        <div className="space-y-3">
          {videos.map(({ video, key }) => {
            const watched = !!watchedVideos[key];
            const linkedProblems = unit.problems.filter((p) =>
              (p.videoIds || []).includes(video.id)
            );
            return (
              <div
                key={key}
                className="p-3.5 rounded-xl bg-stone-950/90 border border-stone-800 space-y-3"
              >
                <div
                  onClick={() => onToggleVideo(key, linkedProblems.length)}
                  className="flex items-start gap-3 cursor-pointer"
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
                  <div className="space-y-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/15 text-rose-300 border border-rose-500/30">
                        {video.type}
                      </span>
                      {video.playlistIndex ? (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-900 text-stone-400 border border-stone-800">
                          #{video.playlistIndex}
                        </span>
                      ) : null}
                      {video.minutes ? (
                        <span className="text-[10px] font-mono text-stone-500">
                          ~{video.minutes} min
                        </span>
                      ) : null}
                    </div>
                    <div
                      className={`text-sm font-semibold leading-snug ${
                        watched ? 'line-through text-stone-500' : 'text-white'
                      }`}
                    >
                      {video.title}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onOpenVideoModal({ unit, video })}
                    className="flex-1 py-1.5 px-3 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/30 text-xs font-bold flex items-center justify-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-indigo-300" />
                    <span>Watch in App</span>
                  </button>
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-1.5 px-3 rounded-lg bg-stone-900 hover:bg-stone-800 text-rose-300 border border-stone-800 text-xs font-medium flex items-center gap-1.5"
                  >
                    <span>YouTube</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <LinkedProblems
                  unit={unit}
                  video={video}
                  videoKey={key}
                  watched={watched}
                  solvedProblems={solvedProblems}
                  onToggleProblem={onToggleProblem}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
