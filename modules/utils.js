'use strict';

exports.__esModule = true;
exports.clip = clip;
exports.isRetina = isRetina;
exports.recursiveOffset = recursiveOffset;

function clip(n, min, max) {
  return Math.min(Math.max(n, min), max);
}

function isRetina() {
  return global.matchMedia('(-webkit-device-pixel-ratio: 2)').matches;
}

function recursiveOffset(node) {
  var currOffset = {
    x: 0,
    y: 0
  };
  var newOffset = {
    x: 0,
    y: 0
  };
  if (node !== null) {
    if (node.scrollLeft) {
      currOffset.x = node.scrollLeft;
    }

    if (node.scrollTop) {
      currOffset.y = node.scrollTop;
    }

    if (node.offsetLeft) {
      currOffset.x -= node.offsetLeft;
    }

    if (node.offsetTop) {
      currOffset.y -= node.offsetTop;
    }

    if (node.parentNode !== undefined) {
      newOffset = recursiveOffset(node.parentNode);
    }
    currOffset.x = currOffset.x + newOffset.x;
    currOffset.y = currOffset.y + newOffset.y;
  }
  return currOffset;
}