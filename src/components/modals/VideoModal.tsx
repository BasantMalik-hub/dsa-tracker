import React, { useEffect } from 'react';
import { CheckCircle2, ExternalLink, X, Check } from 'lucide-react';
import { ActiveVideoModalData } from '../../types';
import { PLAYLIST_ID, PLAYLIST_NAME } from '../../data/syllabusData';
import { getPhaseBadgeStyle } from '../../utils/styles';
import { LinkedProblems } from '../syllabus/LinkedProblems';

interface VideoModalProps {
  modalData: ActiveVideoModalData | null;
  onClose: () => void;
  watchedVideos: Record<string, boolean>;
  completedSubtopics: Record<string, boolean>;
  solvedProblems: Record<string, boolean>;
  unitNotes: Record<string, string>;
  onToggleVideo: (key: string, linkedCount?: number) => void;
  onToggleSubtopic: (key: string) => void;
  onToggleProblem: (probId: string) => void;
  onNoteChange: (unitId: string, text: string) => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  modalData,
  onClose,
  watchedVideos,
  completedSubtopics,
  solvedProblems,
  unitNotes,
  onToggleVideo,
  onToggleSubtopic,
  onToggleProblem,
  onNoteChange
}) => {
  // ESC key to close
  useEffect(() => {
    if (!modalData) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalData, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (!modalData) return;
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = origOverflow;
    };
  }, [modalData]);

  if (!modalData) return null;

  const { unit, video } = modalData;
  const videoKey = `${unit.id}_vid_${video.id}`;
  const isWatched = !!watchedVideos[videoKey];
  const linkedProblems = unit.problems.filter((p) => (p.videoIds || []).includes(video.id));

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
      className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      <div className="bg-stone-900 border border-stone-700 rounded-2xl max-w-6xl w-full overflow-hidden shadow-2xl my-auto">
        {/* Modal Header */}
        <div className="px-4 sm:px-6 py-3.5 bg-stone-950 border-b border-stone-800 flex items-center justify-between gap-3">
          <div className="truncate">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${getPhaseBadgeStyle(unit.phase)}`}>
                {unit.courseCode}
              </span>
              <span className="text-xs font-bold text-stone-400 truncate">
                {unit.unitTitle}
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-white truncate mt-0.5">
              {video.title}
            </h3>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onToggleVideo(videoKey, linkedProblems.length)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition ${
                isWatched
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-stone-800 text-stone-200 border-stone-700 hover:bg-emerald-500 hover:text-stone-950'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isWatched ? 'Watched' : 'Mark Watched'}</span>
            </button>

            <a
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1"
            >
              <span>Open YT</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="p-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Video Player + Side-by-Side Checklist & Notes */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Responsive 16:9 YouTube Embed */}
          <div className="lg:col-span-8 bg-black flex items-center justify-center">
            <div className="w-full aspect-video">
              <iframe
                src={
                  video.playlistOnly && video.playlistIndex
                    ? `https://www.youtube.com/embed/videoseries?list=${PLAYLIST_ID}&index=${video.playlistIndex - 1}&rel=0`
                    : `https://www.youtube.com/embed/${video.id}?rel=0`
                }
                title={video.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          {/* Side-by-Side Unit Subtopics & Live Scratchpad */}
          <div className="lg:col-span-4 p-4 sm:p-5 bg-stone-900 border-t lg:border-t-0 lg:border-l border-stone-800 flex flex-col justify-between gap-4 max-h-[75vh] overflow-y-auto">
            {video.playlistOnly && video.playlistIndex && (
              <div className="text-[11px] leading-relaxed text-stone-400 bg-stone-950 border border-stone-800 rounded-lg p-2.5">
                This is lecture <span className="text-white font-bold">#{video.playlistIndex}</span> of the{' '}
                {PLAYLIST_NAME} playlist. If the player starts on a different lecture, pick #{video.playlistIndex} from the playlist menu inside the player, or{' '}
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-300 underline"
                >
                  open it on YouTube
                </a>
                .
              </div>
            )}

            <div className="space-y-3">
              <div className="text-xs font-bold text-emerald-400">
                Unit Subtopics Checklist
              </div>
              <div className="space-y-1.5">
                {unit.subtopics.map((sub, idx) => {
                  const sKey = `${unit.id}_sub_${idx}`;
                  const checked = !!completedSubtopics[sKey];
                  return (
                    <div
                      key={sKey}
                      onClick={() => onToggleSubtopic(sKey)}
                      className={`p-2.5 rounded-xl border text-xs flex items-start gap-2 cursor-pointer transition ${
                        checked
                          ? 'bg-emerald-950/30 border-emerald-500/40 text-stone-400 line-through'
                          : 'bg-stone-950 border-stone-800 text-stone-200'
                      }`}
                    >
                      <div
                        className={`mt-0.5 w-3.5 h-3.5 rounded flex items-center justify-center border shrink-0 ${
                          checked
                            ? 'bg-emerald-500 border-emerald-500 text-stone-950'
                            : 'border-stone-600'
                        }`}
                      >
                        {checked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>
                      <span className="leading-snug">{sub}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <LinkedProblems
              unit={unit}
              video={video}
              videoKey={videoKey}
              watched={isWatched}
              solvedProblems={solvedProblems}
              onToggleProblem={onToggleProblem}
            />

            <div className="space-y-2 pt-2 border-t border-stone-800">
              <div className="text-xs font-bold text-indigo-400">
                Live Lecture Notes (Auto-Saved)
              </div>
              <textarea
                rows={6}
                value={unitNotes[unit.id] || ''}
                onChange={(e) => onNoteChange(unit.id, e.target.value)}
                placeholder="Jot down C++ dry-runs, time complexity proofs, or pointers while watching..."
                className="w-full bg-stone-950 border border-stone-800 focus:border-emerald-500 rounded-xl p-3 text-xs text-stone-100 placeholder-stone-500 focus:outline-none font-mono"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
