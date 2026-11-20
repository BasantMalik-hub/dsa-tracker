import React from 'react';
import { Filter } from 'lucide-react';
import { Unit, PhaseFilter, StatusFilter, ActiveVideoModalData } from '../../types';
import { SyllabusFilters } from './SyllabusFilters';
import { SyllabusUnitCard } from './SyllabusUnitCard';

interface SyllabusTabProps {
  filteredUnits: Unit[];
  selectedPhaseFilter: PhaseFilter;
  setSelectedPhaseFilter: (phase: PhaseFilter) => void;
  statusFilter: StatusFilter;
  setStatusFilter: (status: StatusFilter) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  completedSubtopics: Record<string, boolean>;
  watchedVideos: Record<string, boolean>;
  solvedProblems: Record<string, boolean>;
  onToggleSubtopic: (subKey: string) => void;
  onToggleVideo: (videoKey: string, linkedCount?: number) => void;
  onToggleProblem: (probId: string) => void;
  onToggleCompleteEntireUnit: (unit: Unit) => void;
  onOpenVideoModal: (modal: ActiveVideoModalData) => void;
}

export const SyllabusTab: React.FC<SyllabusTabProps> = ({
  filteredUnits,
  selectedPhaseFilter,
  setSelectedPhaseFilter,
  statusFilter,
  setStatusFilter,
  searchQuery,
  setSearchQuery,
  completedSubtopics,
  watchedVideos,
  solvedProblems,
  onToggleSubtopic,
  onToggleVideo,
  onToggleProblem,
  onToggleCompleteEntireUnit,
  onOpenVideoModal
}) => {
  return (
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
              className="text-xs text-emerald-400 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredUnits.map((unit) => (
            <SyllabusUnitCard
              key={unit.id}
              unit={unit}
              completedSubtopics={completedSubtopics}
              watchedVideos={watchedVideos}
              solvedProblems={solvedProblems}
              onToggleSubtopic={onToggleSubtopic}
              onToggleVideo={onToggleVideo}
              onToggleProblem={onToggleProblem}
              onToggleCompleteEntireUnit={onToggleCompleteEntireUnit}
              onOpenVideoModal={onOpenVideoModal}
            />
          ))
        )}
      </section>
    </div>
  );
};
