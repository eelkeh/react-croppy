'use strict';

exports.__esModule = true;

var _index = require('./index');

Object.keys(_index).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _index[key];
    }
  });
});