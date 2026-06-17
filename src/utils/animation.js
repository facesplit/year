export function clamp01(value) {
  return Math.min(1, Math.max(0, Number.isFinite(value) ? value : 0));
}

export function lerp(from, to, progress) {
  return from + (to - from) * clamp01(progress);
}

export function mapRange(value, inMin, inMax, outMin, outMax) {
  if (inMax === inMin) return outMin;
  return lerp(outMin, outMax, (value - inMin) / (inMax - inMin));
}

export function rangeProgress(value, start, end) {
  if (end === start) return value >= end ? 1 : 0;
  return clamp01((value - start) / (end - start));
}

export function smoothstep(edge0, edge1, value) {
  const t = rangeProgress(value, edge0, edge1);
  return t * t * (3 - 2 * t);
}
