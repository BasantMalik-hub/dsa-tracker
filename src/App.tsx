import React, { useState, useCallback } from 'react';
import { Filter } from 'lucide-react';
import { ActiveTab, ActiveVideoModalData, CustomProblemDraft } from './types';
import { useTrackerState } from './hooks/useTrackerState';
import { useGlobalStats } from './hooks/useGlobalStats';
import { useSchedule } from './hooks/useSchedule';
import { useFilteredUnits } from './hooks/useFilteredUnits';

import { Toast } from './components/common/Toast';
import { Header } from './components/layout/Header';
import { KpiOverview } from './components/layout/KpiOverview';
import { MobileNav } from './components/layout/MobileNav';

import { PaceControlBar } from './components/daily/PaceControlBar';
import { TodayHeroCard } from './components/daily/TodayHeroCard';
import { DayStrip } from './components/daily/DayStrip';
import { WeeklyAccordion } from './components/daily/WeeklyAccordion';

import { SyllabusFilters } from './components/syllabus/SyllabusFilters';
import { SyllabusUnitCard } from './components/syllabus/SyllabusUnitCard';

import { PracticeNotesTab } from './components/practice/PracticeNotesTab';

import { VideoModal } from './components/modals/VideoModal';
import { BackupModal } from './components/modals/BackupModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('DAILY_PLAN');
  const [expandedWeeks, setExpandedWeeks] = useState<Record<number, boolean>>({ 1: true, 2: true });
  const [activeVideoModal, setActiveVideoModal] = useState<ActiveVideoModalData | null>(null);
  const [backupModalOpen, setBackupModalOpen] = useState(false);

  // Custom Hooks
  const {
    state,
    toast,
    newProblemDrafts,
    setNewProblemDrafts,
    updateTracker,
    displayStreak,
    selectDay,
    toggleSubtopic,
    toggleVideo,
    toggleProblem,
    toggleCompleteEntireDay,
    toggleCompleteEntireUnit,
    handleRecalibrateToToday,
    handleNoteChange,
    handleDayNoteChange,
    toggleFuzzy,
    saveName,
    handleAddCustomProblem,
    handleDeleteCustomProblem,
    handleExportJson,
    handleCopyJson,
    handleFileUpload,
    handleImportJson,
    handleResetAllProgress
  } = useTrackerState();

  const { getDayProgress, globalStats } = useGlobalStats(state);

  const {
    dailySchedule,
    scheduleMeta,
    greeting,
    statusLine,
    fuzzyList,
    paceHours,
    safeSelectedDayNumber,
    selectedDayObj
  } = useSchedule({ state, getDayProgress });

  const {
    selectedPhaseFilter,
    setSelectedPhaseFilter,
    statusFilter,
    setStatusFilter,
    searchQuery,
    setSearchQuery,
    filteredUnits
  } = useFilteredUnits(state);

  // Handlers wrapped for child components
  const handleSelectDay = useCallback(
    (dayNum: number) => {
      selectDay(dayNum, dailySchedule.length, setExpandedWeeks);
    },
    [selectDay, dailySchedule.length]
  );

  const handleToggleWeek = useCallback((weekNum: number) => {
    setExpandedWeeks((prev) => ({ ...prev, [weekNum]: !prev[weekNum] }));
  }, []);

  const handleUpdatePace = useCallback(
    (pace: number) => {
      updateTracker((prev) => ({ ...prev, paceDays: pace, selectedDayNumber: 1 }), { streak: false });
    },
    [updateTracker]
  );

  const handleUpdateStartDate = useCallback(
    (startDate: string) => {
      updateTracker((prev) => ({ ...prev, startDate }), { streak: false });
    },
    [updateTracker]
  );

  const handleRecalibrate = useCallback(() => {
    handleRecalibrateToToday(dailySchedule, getDayProgress);
  }, [handleRecalibrateToToday, dailySchedule, getDayProgress]);

  const handleToggleCompleteDay = useCallback(
    (dayObj: any) => {
      toggleCompleteEntireDay(dayObj, dailySchedule, getDayProgress);
    },
    [toggleCompleteEntireDay, dailySchedule, getDayProgress]
  );

  const handleChangeDraft = useCallback(
    (unitId: string, updated: CustomProblemDraft) => {
      setNewProblemDrafts((prev) => ({ ...prev, [unitId]: updated }));
    },
    [setNewProblemDrafts]
  );

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 pb-[calc(6rem+env(safe-area-inset-bottom,0px))] md:pb-14 selection:bg-emerald-500/30 selection:text-emerald-200">
      <style>{`
        .font-display { font-family: "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, "Times New Roman", serif; letter-spacing: -0.01em; }
        textarea::placeholder, input::placeholder { font-style: italic; }
      `}</style>

      {/* Toast Notification */}
      <Toast message={toast} />

      {/* Sticky Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        displayStreak={displayStreak}
        globalStats={globalStats}
        onOpenBackupModal={() => setBackupModalOpen(true)}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 space-y-6">
        {/* Top KPI Overview Strip */}
        <KpiOverview
          globalStats={globalStats}
          completedDaysCount={scheduleMeta.completedDaysCount}
          totalScheduleDays={dailySchedule.length}
          onSelectPhase={setSelectedPhaseFilter}
          setActiveTab={setActiveTab}
        />

        {/* TAB 1: DAILY PLAN */}
        {activeTab === 'DAILY_PLAN' && (
          <div className="space-y-6">
            <PaceControlBar
              greeting={greeting}
              userName={state.userName}
              statusLine={statusLine}
              scheduleMeta={scheduleMeta}
              fuzzyList={fuzzyList}
              paceDays={state.paceDays}
              paceHours={paceHours}
              startDate={state.startDate}
              onSaveName={saveName}
              onSelectDay={handleSelectDay}
              onUpdatePace={handleUpdatePace}
              onUpdateStartDate={handleUpdateStartDate}
              onRecalibrateToToday={handleRecalibrate}
            />

            {selectedDayObj && (
              <TodayHeroCard
                selectedDayObj={selectedDayObj}
                dayProg={getDayProgress(selectedDayObj)}
                isCalendarToday={selectedDayObj.dayNumber === scheduleMeta.calendarDayNumber}
                totalScheduleDays={dailySchedule.length}
                activeTargetDayNumber={scheduleMeta.activeTargetDayNumber}
                completedSubtopics={state.completedSubtopics}
                watchedVideos={state.watchedVideos}
                solvedProblems={state.solvedProblems}
                unitNotes={state.unitNotes}
                dayNotes={state.dayNotes}
                fuzzyDays={state.fuzzyDays}
                onSelectDay={handleSelectDay}
                onToggleCompleteEntireDay={handleToggleCompleteDay}
                onToggleSubtopic={toggleSubtopic}
                onToggleVideo={toggleVideo}
                onToggleProblem={toggleProblem}
                onOpenVideoModal={setActiveVideoModal}
                onNoteChange={handleNoteChange}
                onDayNoteChange={handleDayNoteChange}
                onToggleFuzzy={toggleFuzzy}
              />
            )}

            <DayStrip
              dailySchedule={dailySchedule}
              safeSelectedDayNumber={safeSelectedDayNumber}
              calendarDayNumber={scheduleMeta.calendarDayNumber}
              getDayProgress={getDayProgress}
              onSelectDay={handleSelectDay}
            />

            <WeeklyAccordion
              dailySchedule={dailySchedule}
              calendarDayNumber={scheduleMeta.calendarDayNumber}
              expandedWeeks={expandedWeeks}
              completedSubtopics={state.completedSubtopics}
              watchedVideos={state.watchedVideos}
              onToggleWeek={handleToggleWeek}
              getDayProgress={getDayProgress}
              onToggleSubtopic={toggleSubtopic}
              onToggleVideo={toggleVideo}
              onToggleProblem={toggleProblem}
              onOpenVideoModal={setActiveVideoModal}
              onToggleCompleteEntireDay={handleToggleCompleteDay}
            />
          </div>
        )}

        {/* TAB 2: SYLLABUS EXPLORER */}
        {activeTab === 'SYLLABUS' && (
          <div className="space-y-5">
            <SyllabusFilters
              selectedPhaseFilter={selectedPhaseFilter}
              setSelectedPhaseFilter={setSelectedPhaseFilter}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />

            <section className="space-y-4">
              {filteredUnits.length === 0 ? (
                <div className="bg-stone-900 border border-stone-800 rounded-2xl p-10 text-center space-y-2">
                  <Filter className="w-8 h-8 text-stone-600 mx-auto" />
                  <p className="text-sm font-bold text-stone-300">No matching syllabus units found.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPhaseFilter('ALL');
                      setStatusFilter('ALL');
                      setSearchQuery('');
                    }}
                    className="text-xs font-semibold text-emerald-400 hover:underline"
                  >
                    Reset all filters
                  </button>
                </div>
              ) : (
                filteredUnits.map((unit) => (
                  <SyllabusUnitCard
                    key={unit.id}
                    unit={unit}
                    completedSubtopics={state.completedSubtopics}
                    watchedVideos={state.watchedVideos}
                    solvedProblems={state.solvedProblems}
                    customProblems={state.customProblems}
                    onToggleSubtopic={toggleSubtopic}
                    onToggleVideo={toggleVideo}
                    onToggleProblem={toggleProblem}
                    onToggleCompleteEntireUnit={toggleCompleteEntireUnit}
                    onOpenVideoModal={setActiveVideoModal}
                  />
                ))
              )}
            </section>
          </div>
        )}

        {/* TAB 3: PRACTICE & NOTES */}
        {activeTab === 'PRACTICE_NOTES' && (
          <PracticeNotesTab
            doneProbs={globalStats.doneProbs}
            totalProbs={globalStats.totalProbs}
            solvedProblems={state.solvedProblems}
            customProblems={state.customProblems}
            unitNotes={state.unitNotes}
            newProblemDrafts={newProblemDrafts}
            onToggleProblem={toggleProblem}
            onDeleteCustomProblem={handleDeleteCustomProblem}
            onChangeDraft={handleChangeDraft}
            onAddCustomProblem={handleAddCustomProblem}
            onNoteChange={handleNoteChange}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeTargetDayNumber={scheduleMeta.activeTargetDayNumber}
        onJumpToActiveDay={handleSelectDay}
      />

      {/* In-App Video Modal */}
      <VideoModal
        modalData={activeVideoModal}
        onClose={() => setActiveVideoModal(null)}
        watchedVideos={state.watchedVideos}
        completedSubtopics={state.completedSubtopics}
        solvedProblems={state.solvedProblems}
        unitNotes={state.unitNotes}
        onToggleVideo={toggleVideo}
        onToggleSubtopic={toggleSubtopic}
        onToggleProblem={toggleProblem}
        onNoteChange={handleNoteChange}
      />

      {/* Backup & Restore Modal */}
      <BackupModal
        isOpen={backupModalOpen}
        onClose={() => setBackupModalOpen(false)}
        onExportJson={handleExportJson}
        onCopyJson={handleCopyJson}
        onFileUpload={(e) => handleFileUpload(e, () => setBackupModalOpen(false))}
        onImportJson={(text) => handleImportJson(text, () => setBackupModalOpen(false))}
        onResetAllProgress={() => handleResetAllProgress(() => setBackupModalOpen(false))}
      />
    </div>
  );
}
