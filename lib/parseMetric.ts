export function parseMetricNumber(v: string): number | null {
  const match = v.match(/[\d,]+(\.\d+)?/);
  if (!match) return null;
  const n = Number(match[0].replace(/,/g, ""));
  return Number.isFinite(n) ? n : null;
}
