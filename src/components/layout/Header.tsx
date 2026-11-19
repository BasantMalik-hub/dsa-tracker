import React from 'react';
import { Calendar, Layers, FileText, Flame, Download, ExternalLink } from 'lucide-react';
import { ActiveTab, GlobalStats } from '../../types';
import { PLAYLIST_URL, PLAYLIST_LECTURE_COUNT, SYLLABUS_DATA } from '../../data/syllabusData';
import { Youtube } from '../common/Icons';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  displayStreak: number;
  globalStats: GlobalStats;
  onOpenBackupModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  displayStreak,
  globalStats,
  onOpenBackupModal
}) => {
  return (
    <header className="sticky top-0 z-30 backdrop-blur-xl bg-stone-950/95 border-b border-stone-800/80">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-3">
        {/* Brand Title */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg border border-stone-700 bg-stone-900 flex items-center justify-center font-display text-sm sm:text-base text-emerald-300 shrink-0">
            C++
          </div>
          <div className="min-w-0">
            <h1 className="font-display text-base sm:text-xl text-white leading-tight truncate">
              My DSA Notebook
            </h1>
            <p className="text-[11px] text-stone-400 hidden sm:block">
              {SYLLABUS_DATA.length} units &middot; {globalStats.totalSubs} topics &middot; {PLAYLIST_LECTURE_COUNT} playlist lectures &middot; {globalStats.totalProbs} problems
            </p>
          </div>
        </div>

        {/* Primary Navigation Tabs (Desktop) */}
        <div className="hidden md:flex items-center bg-stone-900 p-1 rounded-xl border border-stone-800">
          <button
            type="button"
            onClick={() => setActiveTab('DAILY_PLAN')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === 'DAILY_PLAN'
                ? 'bg-emerald-500 text-stone-950'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Daily plan</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('SYLLABUS')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === 'SYLLABUS'
                ? 'bg-emerald-500 text-stone-950'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>All units</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('PRACTICE_NOTES')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === 'PRACTICE_NOTES'
                ? 'bg-emerald-500 text-stone-950'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Practice &amp; Notes ({globalStats.doneProbs}/{globalStats.totalProbs})</span>
          </button>
        </div>

        {/* Right Controls: Streak + Backup + Playlist */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <div className="flex items-center gap-1 sm:gap-1.5 bg-stone-900 border border-stone-800 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-xl text-xs">
            <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
            <span className="font-bold text-white text-[11px] sm:text-xs">{displayStreak}d</span>
            <span className="text-stone-700">|</span>
            <span className="text-emerald-400 font-mono font-semibold text-[11px] sm:text-xs">
              {globalStats.overallPct}%
            </span>
          </div>

          <button
            type="button"
            onClick={onOpenBackupModal}
            className="flex items-center gap-1 sm:gap-1.5 text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-800 p-1.5 sm:px-3 sm:py-1.5 rounded-xl transition"
            title="Backup or Restore Progress"
          >
            <Download className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Backup</span>
          </button>

          <a
            href={PLAYLIST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 sm:gap-1.5 text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white p-1.5 sm:px-3 sm:py-1.5 rounded-xl transition"
            title="Open Apna College Playlist on YouTube"
          >
            <Youtube className="w-3.5 h-3.5 fill-white" />
            <span className="hidden lg:inline">Playlist</span>
            <ExternalLink className="w-3 h-3 hidden sm:inline" />
          </a>
        </div>
      </div>
    </header>
  );
};
