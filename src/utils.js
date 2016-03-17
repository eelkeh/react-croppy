
export function clip(n, min, max) {
  return Math.min(Math.max(n, min), max);
}

export function multiply(obj, n) {
  for (let key in obj) {
    obj[key] = n * obj[key];
  }
  return obj;
}

export function isRetina() {
  return global.matchMedia('(-webkit-device-pixel-ratio: 2)').matches;
}

export function getOffset(elem) {
  // taken from the jquery source
  let rect = elem.getBoundingClientRect();
  let doc = elem.ownerDocument;
  let docElem = doc.documentElement;
  return {
    top: rect.top + global.pageYOffset - docElem.clientTop,
    left: rect.left + global.pageXOffset - docElem.clientLeft
  };
}
