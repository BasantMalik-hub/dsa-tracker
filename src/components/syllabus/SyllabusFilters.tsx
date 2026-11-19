import React from 'react';
import { Search, X } from 'lucide-react';
import { PhaseFilter, StatusFilter } from '../../types';

interface SyllabusFiltersProps {
  selectedPhaseFilter: PhaseFilter;
  setSelectedPhaseFilter: (phase: PhaseFilter) => void;
  statusFilter: StatusFilter;
  setStatusFilter: (status: StatusFilter) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const SyllabusFilters: React.FC<SyllabusFiltersProps> = ({
  selectedPhaseFilter,
  setSelectedPhaseFilter,
  statusFilter,
  setStatusFilter,
  searchQuery,
  setSearchQuery
}) => {
  return (
    <section className="bg-stone-900/90 border border-stone-800 rounded-2xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
        {[
          { id: 'ALL' as const, label: 'Everything (23 units)' },
          { id: 1 as const, label: 'Phase 1: C++ (25CS101)' },
          { id: 2 as const, label: 'Phase 2: Core DSA (25CS201)' },
          { id: 3 as const, label: 'Phase 3: Advanced (25CS303)' },
          { id: 4 as const, label: 'Phase 4: Extras (Playlist)' }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setSelectedPhaseFilter(tab.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              selectedPhaseFilter === tab.id
                ? 'bg-emerald-500 text-stone-950 shadow'
                : 'bg-stone-950 text-stone-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
        <div className="flex items-center bg-stone-950 p-1 rounded-xl border border-stone-800">
          {[
            { id: 'ALL' as const, label: 'All' },
            { id: 'REMAINING' as const, label: 'In Progress' },
            { id: 'COMPLETED' as const, label: 'Completed' }
          ].map((st) => (
            <button
              key={st.id}
              type="button"
              onClick={() => setStatusFilter(st.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                statusFilter === st.id
                  ? 'bg-stone-800 text-white'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>

        <div className="relative flex-1 sm:w-64">
          <Search className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Pointers, Kahn's, AVL, Trie..."
            className="w-full bg-stone-950 border border-stone-800 focus:border-emerald-500 rounded-xl pl-9 pr-8 py-1.5 text-xs text-stone-100 placeholder-stone-500 focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
