#!/usr/bin/env python3
"""
scripts/apply_syllabus_patch.py - makes every topic of the three syllabi (25CS101, 25CS201, 25CS303) a subtopic.

Reads from and writes to public/data/syllabus.json.
"""
import argparse, json, os, shutil, sys

MIGRATION_TEMPLATE = '''

// ==========================================
// SYLLABUS UPDATE: subtopic progress migration
// Progress is stored per subtopic POSITION (`<unitId>_sub_<index>`). When a unit's subtopic list
// changes, SUBTOPIC_MIGRATION maps NEW index -> OLD index (null = brand-new topic) so ticks made
// before the update are carried over once. `subtopicSchema` in the saved state records that it ran.
// ==========================================
export const SUBTOPIC_SCHEMA = %(schema)d;
export const SUBTOPIC_MIGRATION: Record<string, (number | null)[]> = %(migration)s;

export function migrateSubtopicProgress<
  T extends { completedSubtopics?: Record<string, boolean>; subtopicSchema?: number }
>(st: T): T {
  if (!st || st.subtopicSchema === SUBTOPIC_SCHEMA) return st;
  const old = st.completedSubtopics || {};
  const next = { ...old };
  Object.entries(SUBTOPIC_MIGRATION).forEach(([unitId, newToOld]) => {
    Object.keys(old).forEach((k) => {
      if (k.startsWith(unitId + '_sub_') && /^\\d+$/.test(k.slice((unitId + '_sub_').length)))
        delete next[k];
    });
    newToOld.forEach((oldIdx, newIdx) => {
      if (oldIdx !== null && old[`${unitId}_sub_${oldIdx}`]) next[`${unitId}_sub_${newIdx}`] = true;
    });
  });
  return { ...st, completedSubtopics: next, subtopicSchema: SUBTOPIC_SCHEMA };
}
'''

def main():
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    default_target = os.path.join(root, "public", "data", "syllabus.json")
    default_patch = os.path.join(root, "scripts", "syllabus_patch.json")

    ap = argparse.ArgumentParser()
    ap.add_argument("target", nargs="?", default=default_target)
    ap.add_argument("--print-block", action="store_true", help="print TypeScript migration block")
    ap.add_argument("--patch", default=default_patch)
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()

    patch = json.load(open(a.patch, encoding="utf-8"))
    if a.print_block:
        mig = {uid: [r["from"] for r in rows] for uid, rows in patch["units"].items()}
        print(MIGRATION_TEMPLATE % {"schema": patch["schemaVersion"], "migration": json.dumps(mig)})
        return

    with open(a.target, encoding="utf-8") as f:
        data = json.load(f)

    by_id = {u["id"]: u for u in data}
    before, after, orphan = 0, 0, []

    for uid, rows in patch["units"].items():
        if uid not in by_id:
            sys.exit(f"ABORTED: unit {uid} not in syllabus data")
        u = by_id[uid]
        old_n = len(u["subtopics"])
        used = {r["from"] for r in rows if r["from"] is not None}
        orphan += [(uid, i, u["subtopics"][i]) for i in range(old_n) if i not in used]
        before += old_n
        after += len(rows)
        u["subtopics"] = [r["text"] for r in rows]

    total_subtopics = sum(len(u["subtopics"]) for u in data)
    print(f"Units updated: {len(patch['units'])} | Subtopics in patched units: {before} -> {after} (+{after - before})")
    print(f"Total subtopics across all {len(data)} units: {total_subtopics}")

    if a.dry_run:
        print("(dry run - nothing written)")
        return

    shutil.copy(a.target, a.target + ".bak")
    with open(a.target, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"Written. Backup: {a.target}.bak")

if __name__ == "__main__":
    main()
