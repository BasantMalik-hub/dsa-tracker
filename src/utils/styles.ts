export function getPhaseBadgeStyle(phase: number): string {
  if (phase === 1) return 'bg-blue-500/15 text-blue-300 border-blue-500/30';
  if (phase === 2) return 'bg-teal-500/15 text-teal-300 border-teal-500/30';
  if (phase === 4) return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
  return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
}
