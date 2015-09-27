'use strict';

exports.__esModule = true;
exports.clip = clip;
exports.isRetina = isRetina;
exports.getOffset = getOffset;

function clip(n, min, max) {
  return Math.min(Math.max(n, min), max);
}

function isRetina() {
  return global.matchMedia('(-webkit-device-pixel-ratio: 2)').matches;
}

function getOffset(elem) {
  // from the jquery source
  var rect = elem.getBoundingClientRect();
  var doc = elem.ownerDocument;
  var docElem = doc.documentElement;
  return {
    top: rect.top + global.pageYOffset - docElem.clientTop,
    left: rect.left + global.pageXOffset - docElem.clientLeft
  };
}