
export function clip(n, min, max) {
  return Math.min(Math.max(n, min), max);
}

export function isRetina() {
  return global.matchMedia('(-webkit-device-pixel-ratio: 2)').matches;
}
