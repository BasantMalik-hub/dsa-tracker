import React from 'react';
import { Plus } from 'lucide-react';
import { CustomProblemDraft } from '../../types';

interface AddProblemFormProps {
  unitId: string;
  draft: CustomProblemDraft;
  onChangeDraft: (unitId: string, updated: CustomProblemDraft) => void;
  onAddCustomProblem: (unitId: string) => void;
}

export const AddProblemForm: React.FC<AddProblemFormProps> = ({
  unitId,
  draft,
  onChangeDraft,
  onAddCustomProblem
}) => {
  return (
    <div className="p-3 rounded-xl bg-stone-950/90 border border-stone-800/90 space-y-2">
      <div className="text-[11px] font-bold text-stone-400">+ Log Custom Solved Problem</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <input
          type="text"
          value={draft.title}
          onChange={(e) => onChangeDraft(unitId, { ...draft, title: e.target.value })}
          placeholder="Problem Title (e.g. LRU Cache)"
          className="bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500"
        />
        <input
          type="url"
          value={draft.url}
          onChange={(e) => onChangeDraft(unitId, { ...draft, url: e.target.value })}
          placeholder="URL (https://leetcode.com/...)"
          className="bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500"
        />
      </div>
      <div className="flex items-center gap-2">
        <select
          value={draft.platform}
          onChange={(e) => onChangeDraft(unitId, { ...draft, platform: e.target.value })}
          className="bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-stone-200"
        >
          <option value="LeetCode">LeetCode</option>
          <option value="CodeChef">CodeChef</option>
          <option value="GFG">GeeksforGeeks</option>
          <option value="Codeforces">Codeforces</option>
          <option value="CSES">CSES</option>
        </select>
        <select
          value={draft.difficulty}
          onChange={(e) => onChangeDraft(unitId, { ...draft, difficulty: e.target.value })}
          className="bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-stone-200"
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        <button
          type="button"
          onClick={() => onAddCustomProblem(unitId)}
          className="ml-auto px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs flex items-center gap-1 transition"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add</span>
        </button>
      </div>
    </div>
  );
};
