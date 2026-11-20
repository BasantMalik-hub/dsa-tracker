import React from 'react';
import { Award } from 'lucide-react';
import { GlobalStats, PhaseFilter, ActiveTab } from '../../types';
import { getPhaseBadgeStyle } from '../../utils/styles';

interface KpiOverviewProps {
  globalStats: GlobalStats;
  completedDaysCount: number;
  totalScheduleDays: number;
  onSelectPhase: (phase: PhaseFilter) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const KpiOverview: React.FC<KpiOverviewProps> = ({
  globalStats,
  completedDaysCount,
  totalScheduleDays,
  onSelectPhase,
  setActiveTab
}) => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      {/* Overall Mastery Card */}
      <div className="lg:col-span-5 bg-stone-900/90 border border-stone-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between gap-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-[11px] font-mono text-emerald-400 font-semibold">
              Overall progress
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-3xl sm:text-4xl font-bold text-white">
                {globalStats.overallPct}%
              </span>
              <span className="text-xs text-stone-400 font-mono">
                ({globalStats.grandDone} of {globalStats.grandTotal} things done)
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-xl text-xs text-emerald-300 font-semibold">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>
              {completedDaysCount}/{totalScheduleDays} Days
            </span>
          </div>
        </div>

        <div className="w-full h-2.5 bg-stone-950 rounded-full overflow-hidden border border-stone-800">
          <div
            className="h-full bg-emerald-500 transition-all duration-500"
            style={{ width: `${globalStats.overallPct}%` }}
          />
        </div>

        <div className="grid grid-cols-3 gap-2 pt-1 text-center">
          <div className="bg-stone-950/80 border border-stone-800/80 rounded-xl p-2">
            <div className="text-[10px] text-stone-400 font-semibold">Subtopics</div>
            <div className="text-xs sm:text-sm font-bold text-white font-mono mt-0.5">
              {globalStats.doneSubs}/{globalStats.totalSubs}
            </div>
          </div>
          <div className="bg-stone-950/80 border border-stone-800/80 rounded-xl p-2">
            <div className="text-[10px] text-stone-400 font-semibold">Lectures</div>
            <div className="text-xs sm:text-sm font-bold text-rose-300 font-mono mt-0.5">
              {globalStats.doneVids}/{globalStats.totalVids}
            </div>
          </div>
          <div className="bg-stone-950/80 border border-stone-800/80 rounded-xl p-2">
            <div className="text-[10px] text-stone-400 font-semibold">Problems</div>
            <div className="text-xs sm:text-sm font-bold text-indigo-300 font-mono mt-0.5">
              {globalStats.doneProbs}/{globalStats.totalProbs}
            </div>
          </div>
        </div>
      </div>

      {/* Phase Progress Cards */}
      <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        {([1, 2, 3, 4] as const).map((phaseNum) => {
          const pInfo = globalStats.phaseBreakdown[phaseNum];
          const accentBar =
            phaseNum === 1
              ? 'bg-blue-400'
              : phaseNum === 2
                ? 'bg-teal-400'
                : phaseNum === 4
                  ? 'bg-amber-400'
                  : 'bg-purple-400';

          return (
            <button
              key={phaseNum}
              type="button"
              onClick={() => {
                onSelectPhase(phaseNum);
                setActiveTab('SYLLABUS');
              }}
              className="text-left bg-stone-900/90 hover:bg-stone-900 border border-stone-800 hover:border-stone-700 rounded-2xl p-4 flex flex-col justify-between transition group"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${getPhaseBadgeStyle(phaseNum)}`}
                  >
                    {pInfo.code}
                  </span>
                  <span className="text-xs font-mono text-stone-400">{pInfo.hours} Hrs</span>
                </div>
                <h3 className="text-sm font-bold text-white mt-2.5 group-hover:text-emerald-300 transition">
                  {pInfo.title}
                </h3>
              </div>

              <div className="mt-4 space-y-1.5">
                <div className="flex items-baseline justify-between">
                  <span className="text-xl font-semibold text-white">{pInfo.pct}%</span>
                  <span className="text-[11px] font-mono text-stone-400">
                    {pInfo.done}/{pInfo.total} done
                  </span>
                </div>
                <div className="w-full h-2 bg-stone-950 rounded-full overflow-hidden border border-stone-800">
                  <div
                    className={`h-full ${accentBar} transition-all duration-500`}
                    style={{ width: `${pInfo.pct}%` }}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
