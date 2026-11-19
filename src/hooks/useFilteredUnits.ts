import { useState, useMemo } from 'react';
import { Unit, PhaseFilter, StatusFilter, TrackerState } from '../types';
import { SYLLABUS_DATA } from '../data/syllabusData';

export function useFilteredUnits(state: TrackerState) {
  const [selectedPhaseFilter, setSelectedPhaseFilter] = useState<PhaseFilter>('ALL');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUnits = useMemo<Unit[]>(() => {
    return SYLLABUS_DATA.filter((u: Unit) => {
      if (selectedPhaseFilter !== 'ALL' && u.phase !== Number(selectedPhaseFilter)) return false;

      const uSubsDone = u.subtopics.filter((_, idx) => !!state.completedSubtopics[`${u.id}_sub_${idx}`]).length;
      const uVidsDone = u.videos.filter((v) => !!state.watchedVideos[`${u.id}_vid_${v.id}`]).length;
      const isComplete = uSubsDone === u.subtopics.length && uVidsDone === u.videos.length;

      if (statusFilter === 'COMPLETED' && !isComplete) return false;
      if (statusFilter === 'REMAINING' && isComplete) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = u.unitTitle.toLowerCase().includes(q) || u.courseCode.toLowerCase().includes(q);
        const inSubs = u.subtopics.some((s) => s.toLowerCase().includes(q));
        const inVids = u.videos.some((v) => v.title.toLowerCase().includes(q));
        const inProbs = u.problems.some((p) => p.title.toLowerCase().includes(q));
        if (!inTitle && !inSubs && !inVids && !inProbs) return false;
      }

      return true;
    });
  }, [selectedPhaseFilter, statusFilter, searchQuery, state.completedSubtopics, state.watchedVideos]);

  return {
    selectedPhaseFilter,
    setSelectedPhaseFilter,
    statusFilter,
    setStatusFilter,
    searchQuery,
    setSearchQuery,
    filteredUnits
  };
}
