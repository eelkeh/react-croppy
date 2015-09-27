'use strict';

exports.__esModule = true;
exports.clip = clip;
exports.isRetina = isRetina;

function clip(n, min, max) {
  return Math.min(Math.max(n, min), max);
}

function isRetina() {
  return global.matchMedia('(-webkit-device-pixel-ratio: 2)').matches;
}