import React, { useState } from 'react';
import { Calendar, RotateCcw } from 'lucide-react';
import { DayObject, ScheduleMeta } from '../../types';

interface PaceControlBarProps {
  greeting: string;
  userName: string;
  statusLine: string;
  scheduleMeta: ScheduleMeta;
  fuzzyList: DayObject[];
  paceDays: number;
  paceHours: Record<number, string>;
  startDate: string;
  onSaveName: (name: string) => void;
  onSelectDay: (dayNumber: number) => void;
  onUpdatePace: (pace: number) => void;
  onUpdateStartDate: (date: string) => void;
  onRecalibrateToToday: () => void;
}

export const PaceControlBar: React.FC<PaceControlBarProps> = ({
  greeting,
  userName,
  statusLine,
  scheduleMeta,
  fuzzyList,
  paceDays,
  paceHours,
  startDate,
  onSaveName,
  onSelectDay,
  onUpdatePace,
  onUpdateStartDate,
  onRecalibrateToToday
}) => {
  const [editingName, setEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState('');

  const handleSave = () => {
    onSaveName(nameDraft);
    setEditingName(false);
  };

  return (
    <section className="bg-stone-900/95 border border-stone-800 rounded-2xl p-4 sm:p-5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
      <div className="space-y-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <h2 className="font-display text-xl sm:text-2xl text-white">
            {greeting}
            {userName ? `, ${userName}` : ''}.
          </h2>
          <span
            className={`text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full border ${
              scheduleMeta.badgeTone === 'emerald'
                ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                : scheduleMeta.badgeTone === 'amber'
                  ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                  : 'bg-blue-500/15 text-blue-300 border-blue-500/30'
            }`}
          >
            {scheduleMeta.badgeText}
          </span>
          {editingName ? (
            <input
              autoFocus
              value={nameDraft}
              onChange={(e) => setNameDraft(e.target.value)}
              onBlur={handleSave}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave();
                if (e.key === 'Escape') setEditingName(false);
              }}
              maxLength={24}
              placeholder="your name"
              className="w-32 bg-stone-950 border border-stone-700 rounded-md px-2 py-0.5 text-xs text-stone-100 focus:outline-none focus:border-emerald-500"
            />
          ) : (
            <button
              type="button"
              onClick={() => {
                setNameDraft(userName || '');
                setEditingName(true);
              }}
              className="text-[11px] text-stone-500 hover:text-stone-300 underline underline-offset-2"
            >
              {userName ? 'change name' : 'add your name'}
            </button>
          )}
        </div>
        <p className="text-sm text-stone-400 leading-relaxed max-w-2xl">{statusLine}</p>
        {fuzzyList.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs text-stone-400">
            <span>Still fuzzy, revisit:</span>
            {fuzzyList.slice(0, 8).map((d) => (
              <button
                key={d.dayNumber}
                type="button"
                onClick={() => onSelectDay(d.dayNumber)}
                className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/25 hover:bg-amber-500/20"
              >
                Day {d.dayNumber}
              </button>
            ))}
            {fuzzyList.length > 8 && <span>+{fuzzyList.length - 8} more</span>}
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* Pace Selector Buttons */}
        <div className="flex items-center bg-stone-950 p-1 rounded-xl border border-stone-800">
          {[
            { days: 60, label: '60-day sprint', sub: paceHours[60] },
            { days: 90, label: '90 days, balanced', sub: paceHours[90] },
            { days: 120, label: '120 days, steady', sub: paceHours[120] }
          ].map((opt) => {
            const active = paceDays === opt.days;
            return (
              <button
                key={opt.days}
                type="button"
                onClick={() => onUpdatePace(opt.days)}
                className={`px-3 py-1.5 rounded-lg text-left transition ${
                  active
                    ? 'bg-emerald-500 text-stone-950 font-bold shadow'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <div className="text-xs leading-tight">{opt.label}</div>
                <div
                  className={`text-[10px] ${active ? 'text-stone-900 font-medium' : 'text-stone-500'}`}
                >
                  {opt.sub}
                </div>
              </button>
            );
          })}
        </div>

        {/* Start Date Picker */}
        <div className="flex items-center gap-2 bg-stone-950 border border-stone-800 px-3 py-1.5 rounded-xl">
          <Calendar className="w-3.5 h-3.5 text-indigo-400" />
          <div className="text-[11px]">
            <span className="text-stone-400 block leading-none">Start Date</span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => {
                if (e.target.value) {
                  onUpdateStartDate(e.target.value);
                }
              }}
              className="bg-transparent text-white font-mono text-xs focus:outline-none cursor-pointer"
            />
          </div>
        </div>

        {/* Recalibrate Schedule to Today */}
        <button
          type="button"
          onClick={onRecalibrateToToday}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 transition"
          title="Align your first incomplete day with Today's date"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Recalibrate to today</span>
        </button>
      </div>
    </section>
  );
};
