import React from 'react';
import { DayObject, DayProgress, ScheduleMeta, ActiveVideoModalData } from '../../types';
import { PaceControlBar } from './PaceControlBar';
import { TodayHeroCard } from './TodayHeroCard';
import { DayStrip } from './DayStrip';
import { WeeklyAccordion } from './WeeklyAccordion';

interface DailyPlanTabProps {
  greeting: string;
  userName: string;
  statusLine: string;
  scheduleMeta: ScheduleMeta;
  fuzzyList: DayObject[];
  paceDays: number;
  paceHours: Record<number, string>;
  startDate: string;
  dailySchedule: DayObject[];
  safeSelectedDayNumber: number;
  selectedDayObj: DayObject | undefined;
  expandedWeeks: Record<number, boolean>;
  completedSubtopics: Record<string, boolean>;
  watchedVideos: Record<string, boolean>;
  solvedProblems: Record<string, boolean>;
  unitNotes: Record<string, string>;
  dayNotes: Record<string, string>;
  fuzzyDays: Record<string, boolean>;
  getDayProgress: (d: DayObject) => DayProgress;
  onSaveName: (name: string) => void;
  onSelectDay: (dayNum: number) => void;
  onUpdatePace: (pace: number) => void;
  onUpdateStartDate: (startDate: string) => void;
  onRecalibrateToToday: () => void;
  onToggleCompleteEntireDay: (dayObj: DayObject) => void;
  onToggleSubtopic: (subKey: string) => void;
  onToggleVideo: (videoKey: string, linkedCount?: number) => void;
  onToggleProblem: (probId: string) => void;
  onOpenVideoModal: (modal: ActiveVideoModalData) => void;
  onNoteChange: (unitId: string, text: string) => void;
  onDayNoteChange: (dayObj: DayObject, value: string) => void;
  onToggleFuzzy: (dayObj: DayObject) => void;
  onToggleWeek: (weekNum: number) => void;
}

export const DailyPlanTab: React.FC<DailyPlanTabProps> = ({
  greeting,
  userName,
  statusLine,
  scheduleMeta,
  fuzzyList,
  paceDays,
  paceHours,
  startDate,
  dailySchedule,
  safeSelectedDayNumber,
  selectedDayObj,
  expandedWeeks,
  completedSubtopics,
  watchedVideos,
  solvedProblems,
  unitNotes,
  dayNotes,
  fuzzyDays,
  getDayProgress,
  onSaveName,
  onSelectDay,
  onUpdatePace,
  onUpdateStartDate,
  onRecalibrateToToday,
  onToggleCompleteEntireDay,
  onToggleSubtopic,
  onToggleVideo,
  onToggleProblem,
  onOpenVideoModal,
  onNoteChange,
  onDayNoteChange,
  onToggleFuzzy,
  onToggleWeek
}) => {
  return (
    <div className="space-y-6">
      <PaceControlBar
        greeting={greeting}
        userName={userName}
        statusLine={statusLine}
        scheduleMeta={scheduleMeta}
        fuzzyList={fuzzyList}
        paceDays={paceDays}
        paceHours={paceHours}
        startDate={startDate}
        onSaveName={onSaveName}
        onSelectDay={onSelectDay}
        onUpdatePace={onUpdatePace}
        onUpdateStartDate={onUpdateStartDate}
        onRecalibrateToToday={onRecalibrateToToday}
      />

      {selectedDayObj && (
        <TodayHeroCard
          selectedDayObj={selectedDayObj}
          dayProg={getDayProgress(selectedDayObj)}
          isCalendarToday={selectedDayObj.dayNumber === scheduleMeta.calendarDayNumber}
          totalScheduleDays={dailySchedule.length}
          activeTargetDayNumber={scheduleMeta.activeTargetDayNumber}
          completedSubtopics={completedSubtopics}
          watchedVideos={watchedVideos}
          solvedProblems={solvedProblems}
          unitNotes={unitNotes}
          dayNotes={dayNotes}
          fuzzyDays={fuzzyDays}
          onSelectDay={onSelectDay}
          onToggleCompleteEntireDay={onToggleCompleteEntireDay}
          onToggleSubtopic={onToggleSubtopic}
          onToggleVideo={onToggleVideo}
          onToggleProblem={onToggleProblem}
          onOpenVideoModal={onOpenVideoModal}
          onNoteChange={onNoteChange}
          onDayNoteChange={onDayNoteChange}
          onToggleFuzzy={onToggleFuzzy}
        />
      )}

      <DayStrip
        dailySchedule={dailySchedule}
        safeSelectedDayNumber={safeSelectedDayNumber}
        calendarDayNumber={scheduleMeta.calendarDayNumber}
        getDayProgress={getDayProgress}
        onSelectDay={onSelectDay}
      />

      <WeeklyAccordion
        dailySchedule={dailySchedule}
        calendarDayNumber={scheduleMeta.calendarDayNumber}
        expandedWeeks={expandedWeeks}
        completedSubtopics={completedSubtopics}
        watchedVideos={watchedVideos}
        onToggleWeek={onToggleWeek}
        getDayProgress={getDayProgress}
        onToggleSubtopic={onToggleSubtopic}
        onToggleVideo={onToggleVideo}
        onToggleProblem={onToggleProblem}
        onOpenVideoModal={onOpenVideoModal}
        onToggleCompleteEntireDay={onToggleCompleteEntireDay}
      />
    </div>
  );
};
