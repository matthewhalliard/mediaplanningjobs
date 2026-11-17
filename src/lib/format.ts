export const FUNCTION_LABELS: Record<string, string> = {
  planning: "Planning",
  buying: "Buying",
  "ad-ops": "Ad ops",
  programmatic: "Programmatic",
  analytics: "Analytics",
  strategy: "Strategy",
  leadership: "Leadership",
};

export const LEVEL_LABELS: Record<string, string> = {
  entry: "Entry",
  mid: "Mid",
  senior: "Senior",
  manager: "Manager",
  director: "Director",
  vp: "VP",
};

const k = (n: number) => `$${Math.round(n / 1000)}K`;

/** "$97K–$118K", "$117K", "$80K+" or null. */
export function formatSalary(min?: number, max?: number): string | null {
  if (!min && !max) return null;
  if (min && max) {
    return Math.round(min / 1000) === Math.round(max / 1000) ? k(min) : `${k(min)}–${k(max)}`;
  }
  if (min) return `${k(min)}+`;
  return k(max!);
}

export function postedAgo(d: Date): string {
  const days = Math.floor((Date.now() - d.getTime()) / 86400000);
  return days <= 0 ? "today" : days === 1 ? "1d ago" : `${days}d ago`;
}
