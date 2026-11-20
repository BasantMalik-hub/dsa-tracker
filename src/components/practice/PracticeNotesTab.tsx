import React from 'react';
import { FileText } from 'lucide-react';
import { Unit, Problem, CustomProblemDraft } from '../../types';
import { getPhaseBadgeStyle } from '../../utils/styles';
import { ProblemRow } from './ProblemRow';
import { AddProblemForm } from './AddProblemForm';

interface PracticeNotesTabProps {
  units: Unit[];
  doneProbs: number;
  totalProbs: number;
  solvedProblems: Record<string, boolean>;
  customProblems: Record<string, Problem[]>;
  unitNotes: Record<string, string>;
  newProblemDrafts: Record<string, CustomProblemDraft>;
  onToggleProblem: (probId: string) => void;
  onDeleteCustomProblem: (unitId: string, probId: string) => void;
  onChangeDraft: (unitId: string, draft: CustomProblemDraft) => void;
  onAddCustomProblem: (unitId: string) => void;
  onNoteChange: (unitId: string, text: string) => void;
}

export const PracticeNotesTab: React.FC<PracticeNotesTabProps> = ({
  units,
  doneProbs,
  totalProbs,
  solvedProblems,
  customProblems,
  unitNotes,
  newProblemDrafts,
  onToggleProblem,
  onDeleteCustomProblem,
  onChangeDraft,
  onAddCustomProblem,
  onNoteChange
}) => {
  return (
    <div className="space-y-5">
      <section className="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-400" />
            <span>Practice Problem Logger &amp; Unit Notes</span>
          </h2>
          <p className="text-xs text-stone-400 mt-0.5">
            Log custom LeetCode, CodeChef, or GeeksforGeeks problems and write persistent revision
            notes for every unit.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono bg-stone-950 border border-stone-800 px-3.5 py-2 rounded-xl">
          <span className="text-stone-400">Solved Problems:</span>
          <span className="text-emerald-400 font-bold">
            {doneProbs} / {totalProbs}
          </span>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5">
        {units.map((unit: Unit) => {
          const customList = customProblems[unit.id] || [];
          const allProbs = [...unit.problems, ...customList];
          const draft = newProblemDrafts[unit.id] || {
            title: '',
            url: '',
            platform: 'LeetCode',
            difficulty: 'Medium'
          };

          return (
            <div
              key={unit.id}
              className="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-800">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${getPhaseBadgeStyle(unit.phase)}`}
                  >
                    {unit.courseCode}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white">{unit.unitTitle}</h3>
                </div>
                <span className="text-xs font-mono text-stone-400">
                  {allProbs.filter((p) => !!solvedProblems[p.id]).length}/{allProbs.length} Solved
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Left: Problems List + Add Custom Problem Form */}
                <div className="lg:col-span-6 space-y-3">
                  <div className="text-xs font-bold text-indigo-400">
                    Curated &amp; Custom Coding Problems
                  </div>

                  <div className="space-y-2">
                    {allProbs.map((prob) => (
                      <ProblemRow
                        key={prob.id}
                        prob={prob}
                        unit={unit}
                        solved={!!solvedProblems[prob.id]}
                        onToggleProblem={onToggleProblem}
                        onDeleteCustomProblem={onDeleteCustomProblem}
                      />
                    ))}
                  </div>

                  {/* Add Custom Problem Inputs */}
                  <AddProblemForm
                    unitId={unit.id}
                    draft={draft}
                    onChangeDraft={onChangeDraft}
                    onAddCustomProblem={onAddCustomProblem}
                  />
                </div>

                {/* Right: Persistent Unit Revision Scratchpad */}
                <div className="lg:col-span-6 flex flex-col space-y-2">
                  <div className="text-xs font-bold text-purple-400">
                    Key Formulas, Complexity &amp; Revision Notes
                  </div>
                  <textarea
                    rows={6}
                    value={unitNotes[unit.id] || ''}
                    onChange={(e) => onNoteChange(unit.id, e.target.value)}
                    placeholder={`Write key C++ templates, recurrence relations, or corner cases for ${unit.unitTitle}...`}
                    className="w-full flex-1 bg-stone-950 border border-stone-800 focus:border-purple-500 rounded-xl p-3 text-xs sm:text-sm text-stone-200 placeholder-stone-600 focus:outline-none resize-y font-mono"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};
