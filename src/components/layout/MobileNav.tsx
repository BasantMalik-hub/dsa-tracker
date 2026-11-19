import React from 'react';
import { Calendar, Target, Layers, FileText } from 'lucide-react';
import { ActiveTab } from '../../types';

interface MobileNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  activeTargetDayNumber: number;
  onJumpToActiveDay: (dayNum: number) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  activeTab,
  setActiveTab,
  activeTargetDayNumber,
  onJumpToActiveDay
}) => {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-stone-950/95 backdrop-blur-lg border-t border-stone-800 px-2 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] flex items-center justify-around">
      <button
        type="button"
        onClick={() => setActiveTab('DAILY_PLAN')}
        className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-xs font-bold ${
          activeTab === 'DAILY_PLAN' ? 'text-emerald-400' : 'text-stone-400'
        }`}
      >
        <Calendar className="w-4 h-4" />
        <span className="text-[10px]">Daily Plan</span>
      </button>
      <button
        type="button"
        onClick={() => {
          setActiveTab('DAILY_PLAN');
          onJumpToActiveDay(activeTargetDayNumber);
        }}
        className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-xs font-bold text-indigo-400"
      >
        <Target className="w-4 h-4" />
        <span className="text-[10px]">Active (D{activeTargetDayNumber})</span>
      </button>
      <button
        type="button"
        onClick={() => setActiveTab('SYLLABUS')}
        className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-xs font-bold ${
          activeTab === 'SYLLABUS' ? 'text-emerald-400' : 'text-stone-400'
        }`}
      >
        <Layers className="w-4 h-4" />
        <span className="text-[10px]">Syllabus</span>
      </button>
      <button
        type="button"
        onClick={() => setActiveTab('PRACTICE_NOTES')}
        className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-xs font-bold ${
          activeTab === 'PRACTICE_NOTES' ? 'text-purple-400' : 'text-stone-400'
        }`}
      >
        <FileText className="w-4 h-4" />
        <span className="text-[10px]">Notes</span>
      </button>
    </nav>
  );
};
