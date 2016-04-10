'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _inputStyle;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Cropper = require('../src/components/Cropper');

var _Cropper2 = _interopRequireDefault(_Cropper);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }return obj;
}

var inputStyle = (_inputStyle = {
  width: '100%',
  //color: '#FF4136',
  color: 'rgba(0, 0, 0, 0.7)',
  fontSize: 16,
  border: 'none',
  padding: 16,
  margin: 0
}, _defineProperty(_inputStyle, 'width', '70%'), _defineProperty(_inputStyle, 'outline', 'none'), _defineProperty(_inputStyle, 'background', 'rgba(0, 0, 0, 0.03)'), _defineProperty(_inputStyle, 'boxShadow', 'inset 0 0 1px rgba(0,0,0,0.2)'), _inputStyle);

var labelStyle = {
  display: 'block',
  fontSize: 16,
  color: 'rgba(0, 0, 0, 0.4)',
  margin: '12px 0 6px 0'
};

var statStyle = {
  fontSize: 16,
  color: '#F012BE',
  fontWeight: 500
};

var h1Style = {
  fontSize: 31,
  fontWeight: 700,
  // color: '#B50366',
  color: '#333',
  marginTop: '1em',
  marginBottom: '.3em'
};

var h3Style = {
  fontSize: 20,
  fontWeight: 300,
  color: '#444',
  // color: '#333',
  margin: '1em 0'
};

var introStyle = {
  fontSize: 20,
  marginBottom: '1em',
  color: 'rgba(0,0,0,.5)'
};

var Input = function Input(props) {
  return _react2.default.createElement('div', null, _react2.default.createElement('label', { style: labelStyle }, props.label), _react2.default.createElement('input', {
    value: props.value,
    onChange: props.onChange,
    style: inputStyle,
    placeholder: props.label }));
};

var Code = function Code(_ref) {
  var children = _ref.children;
  return _react2.default.createElement('span', { style: { background: '#f5f2f0', padding: 3, fontWeight: 500 } }, children);
};

var Demo = function (_Component) {
  _inherits(Demo, _Component);

  function Demo(props) {
    _classCallCheck(this, Demo);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Demo).call(this, props));

    _this.updateCropInfo = function (crop) {
      _this.setState(_extends({}, crop));
    };

    _this.onCropEnd = function (crop) {
      _this.updateCropInfo(crop);
      console.debug('%cCROP END', 'color: green');
      console.debug(crop);
    };

    _this.state = {
      color: '#FFDC00',
      aspectRatio: 16 / 9,
      crop: {}
    };
    return _this;
  }

  _createClass(Demo, [{
    key: 'handleChange',
    value: function handleChange(key, e) {
      var keyVal = {};
      keyVal[key] = e.target.value;
      this.setState(keyVal);
    }
  }, {
    key: 'genCodeSample',
    value: function genCodeSample() {
      return '<Cropper\n      src="https://i.imgur.com/2Byd6ef.jpg"\n      borderColor="#FO12BE"\n      aspectRatio={16/9}\n      onCropEnd={crop => console.debug(crop)}\n/>'.replace(/ {2,}/g, '  ');
    }
  }, {
    key: 'genResult',
    value: function genResult() {
      var _state = this.state;
      var x = _state.x;
      var y = _state.y;
      var width = _state.width;
      var height = _state.height;

      return ('{\n      width: ' + Math.round(width) + ',\n      height: ' + Math.round(height) + ',\n      x: ' + Math.round(x) + ',\n      y: ' + Math.round(y) + ',\n}').replace(/ {2,}/g, '  ');
    }
  }, {
    key: 'render',
    value: function render() {
      var _state2 = this.state;
      var color = _state2.color;
      var aspectRatio = _state2.aspectRatio;

      return _react2.default.createElement('div', { style: {
          margin: 'auto',
          maxWidth: '700px'
        } }, _react2.default.createElement('div', null, _react2.default.createElement('h1', { style: h1Style }, 'React Croppy'), _react2.default.createElement('p', { style: introStyle }, 'A fully responsive zero-dependency image cropper'), _react2.default.createElement('h3', { style: h3Style }, 'Install instructions'), _react2.default.createElement('pre', null, _react2.default.createElement('code', { className: 'language-shell' }, 'npm install react-croppy')), _react2.default.createElement('h3', { style: h3Style }, 'Include in your project'), _react2.default.createElement('pre', null, _react2.default.createElement('code', { className: 'language-js' }, 'import Cropper from react-croppy')), _react2.default.createElement('h3', { style: h3Style }, 'Demo'), _react2.default.createElement('div', { style: { display: 'flex' } }, _react2.default.createElement('pre', { style: { flexBasis: '70%' } }, _react2.default.createElement('code', { className: 'language-jsx' }, this.genCodeSample())), _react2.default.createElement('pre', { style: { flexBasis: '30%', marginLeft: '.5em' } }, _react2.default.createElement('code', { className: 'language-js' }, this.genResult()))), _react2.default.createElement(_Cropper2.default, {
        onCrop: this.updateCropInfo,
        onCropEnd: this.onCropEnd,
        src: 'https://i.imgur.com/2Byd6ef.jpg',
        borderColor: color,
        start: [100, 100, 320, 180]
      }), _react2.default.createElement('h3', { style: h3Style }, 'API'), _react2.default.createElement('ul', { style: { listStyle: 'circle inside' } }, _react2.default.createElement('li', null, _react2.default.createElement(Code, null, 'src: string'), ' is the source of the image'), _react2.default.createElement('li', null, _react2.default.createElement(Code, null, 'borderColor: string'), ' is the CSS color of the border of the crop rectangle'), _react2.default.createElement('li', null, _react2.default.createElement(Code, null, 'aspectRatio: decimal'), ' optional aspect ratio (width / height) that will be enforced for the crop'), _react2.default.createElement('li', null, _react2.default.createElement(Code, null, 'onCrop()'), ' is a callback that\'s called on every crop'), _react2.default.createElement('li', null, _react2.default.createElement(Code, null, 'onCropStart(crop)'), ' is a callback that\'s called when the crop starts'), _react2.default.createElement('li', null, _react2.default.createElement(Code, null, 'onCropEnd(crop)'), ' is a callback that\'s called when the crop ends'))));
    }
  }]);

  return Demo;
}(_react.Component);

_reactDom2.default.render(_react2.default.createElement(Demo, null)
// <div style={{width: '700px', margin: '0 auto', position: 'fixed', height: '50%', overflow: 'auto', top: '12px' }}>
, document.getElementById('root'));
//minCropWidth={100}
//
"use strict";

/* http://prismjs.com/download.html?themes=prism&languages=markup+css+clike+javascript+jsx */
var _self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {},
    Prism = function () {
  var e = /\blang(?:uage)?-(\w+)\b/i,
      t = 0,
      n = _self.Prism = { util: { encode: function encode(e) {
        return e instanceof a ? new a(e.type, n.util.encode(e.content), e.alias) : "Array" === n.util.type(e) ? e.map(n.util.encode) : e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
      }, type: function type(e) {
        return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1];
      }, objId: function objId(e) {
        return e.__id || Object.defineProperty(e, "__id", { value: ++t }), e.__id;
      }, clone: function clone(e) {
        var t = n.util.type(e);switch (t) {case "Object":
            var a = {};for (var r in e) {
              e.hasOwnProperty(r) && (a[r] = n.util.clone(e[r]));
            }return a;case "Array":
            return e.map && e.map(function (e) {
              return n.util.clone(e);
            });}return e;
      } }, languages: { extend: function extend(e, t) {
        var a = n.util.clone(n.languages[e]);for (var r in t) {
          a[r] = t[r];
        }return a;
      }, insertBefore: function insertBefore(e, t, a, r) {
        r = r || n.languages;var l = r[e];if (2 == arguments.length) {
          a = arguments[1];for (var i in a) {
            a.hasOwnProperty(i) && (l[i] = a[i]);
          }return l;
        }var o = {};for (var s in l) {
          if (l.hasOwnProperty(s)) {
            if (s == t) for (var i in a) {
              a.hasOwnProperty(i) && (o[i] = a[i]);
            }o[s] = l[s];
          }
        }return n.languages.DFS(n.languages, function (t, n) {
          n === r[e] && t != e && (this[t] = o);
        }), r[e] = o;
      }, DFS: function DFS(e, t, a, r) {
        r = r || {};for (var l in e) {
          e.hasOwnProperty(l) && (t.call(e, l, e[l], a || l), "Object" !== n.util.type(e[l]) || r[n.util.objId(e[l])] ? "Array" !== n.util.type(e[l]) || r[n.util.objId(e[l])] || (r[n.util.objId(e[l])] = !0, n.languages.DFS(e[l], t, l, r)) : (r[n.util.objId(e[l])] = !0, n.languages.DFS(e[l], t, null, r)));
        }
      } }, plugins: {}, highlightAll: function highlightAll(e, t) {
      var a = { callback: t, selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code' };n.hooks.run("before-highlightall", a);for (var r, l = a.elements || document.querySelectorAll(a.selector), i = 0; r = l[i++];) {
        n.highlightElement(r, e === !0, a.callback);
      }
    }, highlightElement: function highlightElement(t, a, r) {
      for (var l, i, o = t; o && !e.test(o.className);) {
        o = o.parentNode;
      }o && (l = (o.className.match(e) || [, ""])[1], i = n.languages[l]), t.className = t.className.replace(e, "").replace(/\s+/g, " ") + " language-" + l, o = t.parentNode, /pre/i.test(o.nodeName) && (o.className = o.className.replace(e, "").replace(/\s+/g, " ") + " language-" + l);var s = t.textContent,
          u = { element: t, language: l, grammar: i, code: s };if (!s || !i) return n.hooks.run("complete", u), void 0;if (n.hooks.run("before-highlight", u), a && _self.Worker) {
        var c = new Worker(n.filename);c.onmessage = function (e) {
          u.highlightedCode = e.data, n.hooks.run("before-insert", u), u.element.innerHTML = u.highlightedCode, r && r.call(u.element), n.hooks.run("after-highlight", u), n.hooks.run("complete", u);
        }, c.postMessage(JSON.stringify({ language: u.language, code: u.code, immediateClose: !0 }));
      } else u.highlightedCode = n.highlight(u.code, u.grammar, u.language), n.hooks.run("before-insert", u), u.element.innerHTML = u.highlightedCode, r && r.call(t), n.hooks.run("after-highlight", u), n.hooks.run("complete", u);
    }, highlight: function highlight(e, t, r) {
      var l = n.tokenize(e, t);return a.stringify(n.util.encode(l), r);
    }, tokenize: function tokenize(e, t) {
      var a = n.Token,
          r = [e],
          l = t.rest;if (l) {
        for (var i in l) {
          t[i] = l[i];
        }delete t.rest;
      }e: for (var i in t) {
        if (t.hasOwnProperty(i) && t[i]) {
          var o = t[i];o = "Array" === n.util.type(o) ? o : [o];for (var s = 0; s < o.length; ++s) {
            var u = o[s],
                c = u.inside,
                g = !!u.lookbehind,
                h = !!u.greedy,
                f = 0,
                d = u.alias;u = u.pattern || u;for (var p = 0; p < r.length; p++) {
              var m = r[p];if (r.length > e.length) break e;if (!(m instanceof a)) {
                u.lastIndex = 0;var y = u.exec(m),
                    v = 1;if (!y && h && p != r.length - 1) {
                  var b = r[p + 1].matchedStr || r[p + 1],
                      k = m + b;if (p < r.length - 2 && (k += r[p + 2].matchedStr || r[p + 2]), u.lastIndex = 0, y = u.exec(k), !y) continue;var w = y.index + (g ? y[1].length : 0);if (w >= m.length) continue;var _ = y.index + y[0].length,
                      P = m.length + b.length;if (v = 3, P >= _) {
                    if (r[p + 1].greedy) continue;v = 2, k = k.slice(0, P);
                  }m = k;
                }if (y) {
                  g && (f = y[1].length);var w = y.index + f,
                      y = y[0].slice(f),
                      _ = w + y.length,
                      S = m.slice(0, w),
                      O = m.slice(_),
                      j = [p, v];S && j.push(S);var A = new a(i, c ? n.tokenize(y, c) : y, d, y, h);j.push(A), O && j.push(O), Array.prototype.splice.apply(r, j);
                }
              }
            }
          }
        }
      }return r;
    }, hooks: { all: {}, add: function add(e, t) {
        var a = n.hooks.all;a[e] = a[e] || [], a[e].push(t);
      }, run: function run(e, t) {
        var a = n.hooks.all[e];if (a && a.length) for (var r, l = 0; r = a[l++];) {
          r(t);
        }
      } } },
      a = n.Token = function (e, t, n, a, r) {
    this.type = e, this.content = t, this.alias = n, this.matchedStr = a || null, this.greedy = !!r;
  };if (a.stringify = function (e, t, r) {
    if ("string" == typeof e) return e;if ("Array" === n.util.type(e)) return e.map(function (n) {
      return a.stringify(n, t, e);
    }).join("");var l = { type: e.type, content: a.stringify(e.content, t, r), tag: "span", classes: ["token", e.type], attributes: {}, language: t, parent: r };if ("comment" == l.type && (l.attributes.spellcheck = "true"), e.alias) {
      var i = "Array" === n.util.type(e.alias) ? e.alias : [e.alias];Array.prototype.push.apply(l.classes, i);
    }n.hooks.run("wrap", l);var o = "";for (var s in l.attributes) {
      o += (o ? " " : "") + s + '="' + (l.attributes[s] || "") + '"';
    }return "<" + l.tag + ' class="' + l.classes.join(" ") + '" ' + o + ">" + l.content + "</" + l.tag + ">";
  }, !_self.document) return _self.addEventListener ? (_self.addEventListener("message", function (e) {
    var t = JSON.parse(e.data),
        a = t.language,
        r = t.code,
        l = t.immediateClose;_self.postMessage(n.highlight(r, n.languages[a], a)), l && _self.close();
  }, !1), _self.Prism) : _self.Prism;var r = document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop();return r && (n.filename = r.src, document.addEventListener && !r.hasAttribute("data-manual") && document.addEventListener("DOMContentLoaded", n.highlightAll)), _self.Prism;
}();"undefined" != typeof module && module.exports && (module.exports = Prism), "undefined" != typeof global && (global.Prism = Prism);
Prism.languages.markup = { comment: /<!--[\w\W]*?-->/, prolog: /<\?[\w\W]+?\?>/, doctype: /<!DOCTYPE[\w\W]+?>/, cdata: /<!\[CDATA\[[\w\W]*?]]>/i, tag: { pattern: /<\/?(?!\d)[^\s>\/=.$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i, inside: { tag: { pattern: /^<\/?[^\s>\/]+/i, inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ } }, "attr-value": { pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i, inside: { punctuation: /[=>"']/ } }, punctuation: /\/?>/, "attr-name": { pattern: /[^\s>\/]+/, inside: { namespace: /^[^\s>\/:]+:/ } } } }, entity: /&#?[\da-z]{1,8};/i }, Prism.hooks.add("wrap", function (a) {
  "entity" === a.type && (a.attributes.title = a.content.replace(/&amp;/, "&"));
}), Prism.languages.xml = Prism.languages.markup, Prism.languages.html = Prism.languages.markup, Prism.languages.mathml = Prism.languages.markup, Prism.languages.svg = Prism.languages.markup;
Prism.languages.css = { comment: /\/\*[\w\W]*?\*\//, atrule: { pattern: /@[\w-]+?.*?(;|(?=\s*\{))/i, inside: { rule: /@[\w-]+/ } }, url: /url\((?:(["'])(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1|.*?)\)/i, selector: /[^\{\}\s][^\{\};]*?(?=\s*\{)/, string: /("|')(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1/, property: /(\b|\B)[\w-]+(?=\s*:)/i, important: /\B!important\b/i, "function": /[-a-z0-9]+(?=\()/i, punctuation: /[(){};:]/ }, Prism.languages.css.atrule.inside.rest = Prism.util.clone(Prism.languages.css), Prism.languages.markup && (Prism.languages.insertBefore("markup", "tag", { style: { pattern: /(<style[\w\W]*?>)[\w\W]*?(?=<\/style>)/i, lookbehind: !0, inside: Prism.languages.css, alias: "language-css" } }), Prism.languages.insertBefore("inside", "attr-value", { "style-attr": { pattern: /\s*style=("|').*?\1/i, inside: { "attr-name": { pattern: /^\s*style/i, inside: Prism.languages.markup.tag.inside }, punctuation: /^\s*=\s*['"]|['"]\s*$/, "attr-value": { pattern: /.+/i, inside: Prism.languages.css } }, alias: "language-css" } }, Prism.languages.markup.tag));
Prism.languages.clike = { comment: [{ pattern: /(^|[^\\])\/\*[\w\W]*?\*\//, lookbehind: !0 }, { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0 }], string: { pattern: /(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, greedy: !0 }, "class-name": { pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i, lookbehind: !0, inside: { punctuation: /(\.|\\)/ } }, keyword: /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/, "boolean": /\b(true|false)\b/, "function": /[a-z0-9_]+(?=\()/i, number: /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i, operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/, punctuation: /[{}[\];(),.:]/ };
Prism.languages.javascript = Prism.languages.extend("clike", { keyword: /\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/, number: /\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/, "function": /[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\()/i }), Prism.languages.insertBefore("javascript", "keyword", { regex: { pattern: /(^|[^\/])\/(?!\/)(\[.+?]|\\.|[^\/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/, lookbehind: !0, greedy: !0 } }), Prism.languages.insertBefore("javascript", "class-name", { "template-string": { pattern: /`(?:\\\\|\\?[^\\])*?`/, greedy: !0, inside: { interpolation: { pattern: /\$\{[^}]+\}/, inside: { "interpolation-punctuation": { pattern: /^\$\{|\}$/, alias: "punctuation" }, rest: Prism.languages.javascript } }, string: /[\s\S]+/ } } }), Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", { script: { pattern: /(<script[\w\W]*?>)[\w\W]*?(?=<\/script>)/i, lookbehind: !0, inside: Prism.languages.javascript, alias: "language-javascript" } }), Prism.languages.js = Prism.languages.javascript;
!function (a) {
  var e = a.util.clone(a.languages.javascript);a.languages.jsx = a.languages.extend("markup", e), a.languages.jsx.tag.pattern = /<\/?[\w\.:-]+\s*(?:\s+[\w\.:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+|(\{[\w\W]*?\})))?\s*)*\/?>/i, a.languages.jsx.tag.inside["attr-value"].pattern = /=[^\{](?:('|")[\w\W]*?(\1)|[^\s>]+)/i;var s = a.util.clone(a.languages.jsx);delete s.punctuation, s = a.languages.insertBefore("jsx", "operator", { punctuation: /=(?={)|[{}[\];(),.:]/ }, { jsx: s }), a.languages.insertBefore("inside", "attr-value", { script: { pattern: /=(\{(?:\{[^}]*\}|[^}])+\})/i, inside: s, alias: "language-javascript" } }, a.languages.jsx.tag);
}(Prism);
'use strict';

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _inputStyle;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Cropper = require('../src/components/Cropper');

var _Cropper2 = _interopRequireDefault(_Cropper);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof2(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }return obj;
}

var inputStyle = (_inputStyle = {
  width: '100%',
  //color: '#FF4136',
  color: 'rgba(0, 0, 0, 0.7)',
  fontSize: 16,
  border: 'none',
  padding: 16,
  margin: 0
}, _defineProperty(_inputStyle, 'width', '70%'), _defineProperty(_inputStyle, 'outline', 'none'), _defineProperty(_inputStyle, 'background', 'rgba(0, 0, 0, 0.03)'), _defineProperty(_inputStyle, 'boxShadow', 'inset 0 0 1px rgba(0,0,0,0.2)'), _inputStyle);

var labelStyle = {
  display: 'block',
  fontSize: 16,
  color: 'rgba(0, 0, 0, 0.4)',
  margin: '12px 0 6px 0'
};

var statStyle = {
  fontSize: 16,
  color: '#F012BE',
  fontWeight: 500
};

var h1Style = {
  fontSize: 31,
  fontWeight: 700,
  // color: '#B50366',
  color: '#333',
  marginTop: '1em',
  marginBottom: '.3em'
};

var h3Style = {
  fontSize: 20,
  fontWeight: 300,
  color: '#444',
  // color: '#333',
  margin: '1em 0'
};

var introStyle = {
  fontSize: 20,
  marginBottom: '1em',
  color: 'rgba(0,0,0,.5)'
};

var Input = function Input(props) {
  return _react2.default.createElement('div', null, _react2.default.createElement('label', { style: labelStyle }, props.label), _react2.default.createElement('input', {
    value: props.value,
    onChange: props.onChange,
    style: inputStyle,
    placeholder: props.label }));
};

var Code = function Code(_ref) {
  var children = _ref.children;
  return _react2.default.createElement('span', { style: { background: '#f5f2f0', padding: 3, fontWeight: 500 } }, children);
};

var Demo = function (_Component) {
  _inherits(Demo, _Component);

  function Demo(props) {
    _classCallCheck(this, Demo);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Demo).call(this, props));

    _this.updateCropInfo = function (crop) {
      _this.setState(_extends({}, crop));
    };

    _this.onCropEnd = function (crop) {
      _this.updateCropInfo(crop);
      console.debug('%cCROP END', 'color: green');
      console.debug(crop);
    };

    _this.state = {
      color: '#FFDC00',
      aspectRatio: 16 / 9,
      crop: {}
    };
    return _this;
  }

  _createClass(Demo, [{
    key: 'handleChange',
    value: function handleChange(key, e) {
      var keyVal = {};
      keyVal[key] = e.target.value;
      this.setState(keyVal);
    }
  }, {
    key: 'genCodeSample',
    value: function genCodeSample() {
      return '<Cropper\n      src="https://i.imgur.com/2Byd6ef.jpg"\n      borderColor="#FO12BE"\n      aspectRatio={16/9}\n      onCropEnd={crop => console.debug(crop)}\n/>'.replace(/ {2,}/g, '  ');
    }
  }, {
    key: 'genResult',
    value: function genResult() {
      var _state = this.state;
      var x = _state.x;
      var y = _state.y;
      var width = _state.width;
      var height = _state.height;

      return ('{\n      width: ' + Math.round(width) + ',\n      height: ' + Math.round(height) + ',\n      x: ' + Math.round(x) + ',\n      y: ' + Math.round(y) + ',\n}').replace(/ {2,}/g, '  ');
    }
  }, {
    key: 'render',
    value: function render() {
      var _state2 = this.state;
      var color = _state2.color;
      var aspectRatio = _state2.aspectRatio;

      return _react2.default.createElement('div', { style: {
          margin: 'auto',
          maxWidth: '700px'
        } }, _react2.default.createElement('div', null, _react2.default.createElement('h1', { style: h1Style }, 'React Croppy'), _react2.default.createElement('p', { style: introStyle }, 'A fully responsive zero-dependency image cropper'), _react2.default.createElement('h3', { style: h3Style }, 'Install instructions'), _react2.default.createElement('pre', null, _react2.default.createElement('code', { className: 'language-shell' }, 'npm install react-croppy')), _react2.default.createElement('h3', { style: h3Style }, 'Include in your project'), _react2.default.createElement('pre', null, _react2.default.createElement('code', { className: 'language-js' }, 'import Cropper from react-croppy')), _react2.default.createElement('h3', { style: h3Style }, 'Demo'), _react2.default.createElement('div', { style: { display: 'flex' } }, _react2.default.createElement('pre', { style: { flexBasis: '70%' } }, _react2.default.createElement('code', { className: 'language-jsx' }, this.genCodeSample())), _react2.default.createElement('pre', { style: { flexBasis: '30%', marginLeft: '.5em' } }, _react2.default.createElement('code', { className: 'language-js' }, this.genResult()))), _react2.default.createElement(_Cropper2.default, {
        onCrop: this.updateCropInfo,
        onCropEnd: this.onCropEnd,
        src: 'https://i.imgur.com/2Byd6ef.jpg',
        borderColor: color,
        start: [100, 100, 320, 180]
      }), _react2.default.createElement('h3', { style: h3Style }, 'API'), _react2.default.createElement('ul', { style: { listStyle: 'circle inside' } }, _react2.default.createElement('li', null, _react2.default.createElement(Code, null, 'src: string'), ' is the source of the image'), _react2.default.createElement('li', null, _react2.default.createElement(Code, null, 'borderColor: string'), ' is the CSS color of the border of the crop rectangle'), _react2.default.createElement('li', null, _react2.default.createElement(Code, null, 'aspectRatio: decimal'), ' optional aspect ratio (width / height) that will be enforced for the crop'), _react2.default.createElement('li', null, _react2.default.createElement(Code, null, 'onCrop()'), ' is a callback that\'s called on every crop'), _react2.default.createElement('li', null, _react2.default.createElement(Code, null, 'onCropStart(crop)'), ' is a callback that\'s called when the crop starts'), _react2.default.createElement('li', null, _react2.default.createElement(Code, null, 'onCropEnd(crop)'), ' is a callback that\'s called when the crop ends'))));
    }
  }]);

  return Demo;
}(_react.Component);

_reactDom2.default.render(_react2.default.createElement(Demo, null)
// <div style={{width: '700px', margin: '0 auto', position: 'fixed', height: '50%', overflow: 'auto', top: '12px' }}>
, document.getElementById('root'));
//minCropWidth={100}
//
"use strict";

/* http://prismjs.com/download.html?themes=prism&languages=markup+css+clike+javascript+jsx */
var _self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {},
    Prism = function () {
  var e = /\blang(?:uage)?-(\w+)\b/i,
      t = 0,
      n = _self.Prism = { util: { encode: function encode(e) {
        return e instanceof a ? new a(e.type, n.util.encode(e.content), e.alias) : "Array" === n.util.type(e) ? e.map(n.util.encode) : e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
      }, type: function type(e) {
        return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1];
      }, objId: function objId(e) {
        return e.__id || Object.defineProperty(e, "__id", { value: ++t }), e.__id;
      }, clone: function clone(e) {
        var t = n.util.type(e);switch (t) {case "Object":
            var a = {};for (var r in e) {
              e.hasOwnProperty(r) && (a[r] = n.util.clone(e[r]));
            }return a;case "Array":
            return e.map && e.map(function (e) {
              return n.util.clone(e);
            });}return e;
      } }, languages: { extend: function extend(e, t) {
        var a = n.util.clone(n.languages[e]);for (var r in t) {
          a[r] = t[r];
        }return a;
      }, insertBefore: function insertBefore(e, t, a, r) {
        r = r || n.languages;var l = r[e];if (2 == arguments.length) {
          a = arguments[1];for (var i in a) {
            a.hasOwnProperty(i) && (l[i] = a[i]);
          }return l;
        }var o = {};for (var s in l) {
          if (l.hasOwnProperty(s)) {
            if (s == t) for (var i in a) {
              a.hasOwnProperty(i) && (o[i] = a[i]);
            }o[s] = l[s];
          }
        }return n.languages.DFS(n.languages, function (t, n) {
          n === r[e] && t != e && (this[t] = o);
        }), r[e] = o;
      }, DFS: function DFS(e, t, a, r) {
        r = r || {};for (var l in e) {
          e.hasOwnProperty(l) && (t.call(e, l, e[l], a || l), "Object" !== n.util.type(e[l]) || r[n.util.objId(e[l])] ? "Array" !== n.util.type(e[l]) || r[n.util.objId(e[l])] || (r[n.util.objId(e[l])] = !0, n.languages.DFS(e[l], t, l, r)) : (r[n.util.objId(e[l])] = !0, n.languages.DFS(e[l], t, null, r)));
        }
      } }, plugins: {}, highlightAll: function highlightAll(e, t) {
      var a = { callback: t, selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code' };n.hooks.run("before-highlightall", a);for (var r, l = a.elements || document.querySelectorAll(a.selector), i = 0; r = l[i++];) {
        n.highlightElement(r, e === !0, a.callback);
      }
    }, highlightElement: function highlightElement(t, a, r) {
      for (var l, i, o = t; o && !e.test(o.className);) {
        o = o.parentNode;
      }o && (l = (o.className.match(e) || [, ""])[1], i = n.languages[l]), t.className = t.className.replace(e, "").replace(/\s+/g, " ") + " language-" + l, o = t.parentNode, /pre/i.test(o.nodeName) && (o.className = o.className.replace(e, "").replace(/\s+/g, " ") + " language-" + l);var s = t.textContent,
          u = { element: t, language: l, grammar: i, code: s };if (!s || !i) return n.hooks.run("complete", u), void 0;if (n.hooks.run("before-highlight", u), a && _self.Worker) {
        var c = new Worker(n.filename);c.onmessage = function (e) {
          u.highlightedCode = e.data, n.hooks.run("before-insert", u), u.element.innerHTML = u.highlightedCode, r && r.call(u.element), n.hooks.run("after-highlight", u), n.hooks.run("complete", u);
        }, c.postMessage(JSON.stringify({ language: u.language, code: u.code, immediateClose: !0 }));
      } else u.highlightedCode = n.highlight(u.code, u.grammar, u.language), n.hooks.run("before-insert", u), u.element.innerHTML = u.highlightedCode, r && r.call(t), n.hooks.run("after-highlight", u), n.hooks.run("complete", u);
    }, highlight: function highlight(e, t, r) {
      var l = n.tokenize(e, t);return a.stringify(n.util.encode(l), r);
    }, tokenize: function tokenize(e, t) {
      var a = n.Token,
          r = [e],
          l = t.rest;if (l) {
        for (var i in l) {
          t[i] = l[i];
        }delete t.rest;
      }e: for (var i in t) {
        if (t.hasOwnProperty(i) && t[i]) {
          var o = t[i];o = "Array" === n.util.type(o) ? o : [o];for (var s = 0; s < o.length; ++s) {
            var u = o[s],
                c = u.inside,
                g = !!u.lookbehind,
                h = !!u.greedy,
                f = 0,
                d = u.alias;u = u.pattern || u;for (var p = 0; p < r.length; p++) {
              var m = r[p];if (r.length > e.length) break e;if (!(m instanceof a)) {
                u.lastIndex = 0;var y = u.exec(m),
                    v = 1;if (!y && h && p != r.length - 1) {
                  var b = r[p + 1].matchedStr || r[p + 1],
                      k = m + b;if (p < r.length - 2 && (k += r[p + 2].matchedStr || r[p + 2]), u.lastIndex = 0, y = u.exec(k), !y) continue;var w = y.index + (g ? y[1].length : 0);if (w >= m.length) continue;var _ = y.index + y[0].length,
                      P = m.length + b.length;if (v = 3, P >= _) {
                    if (r[p + 1].greedy) continue;v = 2, k = k.slice(0, P);
                  }m = k;
                }if (y) {
                  g && (f = y[1].length);var w = y.index + f,
                      y = y[0].slice(f),
                      _ = w + y.length,
                      S = m.slice(0, w),
                      O = m.slice(_),
                      j = [p, v];S && j.push(S);var A = new a(i, c ? n.tokenize(y, c) : y, d, y, h);j.push(A), O && j.push(O), Array.prototype.splice.apply(r, j);
                }
              }
            }
          }
        }
      }return r;
    }, hooks: { all: {}, add: function add(e, t) {
        var a = n.hooks.all;a[e] = a[e] || [], a[e].push(t);
      }, run: function run(e, t) {
        var a = n.hooks.all[e];if (a && a.length) for (var r, l = 0; r = a[l++];) {
          r(t);
        }
      } } },
      a = n.Token = function (e, t, n, a, r) {
    this.type = e, this.content = t, this.alias = n, this.matchedStr = a || null, this.greedy = !!r;
  };if (a.stringify = function (e, t, r) {
    if ("string" == typeof e) return e;if ("Array" === n.util.type(e)) return e.map(function (n) {
      return a.stringify(n, t, e);
    }).join("");var l = { type: e.type, content: a.stringify(e.content, t, r), tag: "span", classes: ["token", e.type], attributes: {}, language: t, parent: r };if ("comment" == l.type && (l.attributes.spellcheck = "true"), e.alias) {
      var i = "Array" === n.util.type(e.alias) ? e.alias : [e.alias];Array.prototype.push.apply(l.classes, i);
    }n.hooks.run("wrap", l);var o = "";for (var s in l.attributes) {
      o += (o ? " " : "") + s + '="' + (l.attributes[s] || "") + '"';
    }return "<" + l.tag + ' class="' + l.classes.join(" ") + '" ' + o + ">" + l.content + "</" + l.tag + ">";
  }, !_self.document) return _self.addEventListener ? (_self.addEventListener("message", function (e) {
    var t = JSON.parse(e.data),
        a = t.language,
        r = t.code,
        l = t.immediateClose;_self.postMessage(n.highlight(r, n.languages[a], a)), l && _self.close();
  }, !1), _self.Prism) : _self.Prism;var r = document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop();return r && (n.filename = r.src, document.addEventListener && !r.hasAttribute("data-manual") && document.addEventListener("DOMContentLoaded", n.highlightAll)), _self.Prism;
}();"undefined" != typeof module && module.exports && (module.exports = Prism), "undefined" != typeof global && (global.Prism = Prism);
Prism.languages.markup = { comment: /<!--[\w\W]*?-->/, prolog: /<\?[\w\W]+?\?>/, doctype: /<!DOCTYPE[\w\W]+?>/, cdata: /<!\[CDATA\[[\w\W]*?]]>/i, tag: { pattern: /<\/?(?!\d)[^\s>\/=.$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i, inside: { tag: { pattern: /^<\/?[^\s>\/]+/i, inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ } }, "attr-value": { pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i, inside: { punctuation: /[=>"']/ } }, punctuation: /\/?>/, "attr-name": { pattern: /[^\s>\/]+/, inside: { namespace: /^[^\s>\/:]+:/ } } } }, entity: /&#?[\da-z]{1,8};/i }, Prism.hooks.add("wrap", function (a) {
  "entity" === a.type && (a.attributes.title = a.content.replace(/&amp;/, "&"));
}), Prism.languages.xml = Prism.languages.markup, Prism.languages.html = Prism.languages.markup, Prism.languages.mathml = Prism.languages.markup, Prism.languages.svg = Prism.languages.markup;
Prism.languages.css = { comment: /\/\*[\w\W]*?\*\//, atrule: { pattern: /@[\w-]+?.*?(;|(?=\s*\{))/i, inside: { rule: /@[\w-]+/ } }, url: /url\((?:(["'])(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1|.*?)\)/i, selector: /[^\{\}\s][^\{\};]*?(?=\s*\{)/, string: /("|')(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1/, property: /(\b|\B)[\w-]+(?=\s*:)/i, important: /\B!important\b/i, "function": /[-a-z0-9]+(?=\()/i, punctuation: /[(){};:]/ }, Prism.languages.css.atrule.inside.rest = Prism.util.clone(Prism.languages.css), Prism.languages.markup && (Prism.languages.insertBefore("markup", "tag", { style: { pattern: /(<style[\w\W]*?>)[\w\W]*?(?=<\/style>)/i, lookbehind: !0, inside: Prism.languages.css, alias: "language-css" } }), Prism.languages.insertBefore("inside", "attr-value", { "style-attr": { pattern: /\s*style=("|').*?\1/i, inside: { "attr-name": { pattern: /^\s*style/i, inside: Prism.languages.markup.tag.inside }, punctuation: /^\s*=\s*['"]|['"]\s*$/, "attr-value": { pattern: /.+/i, inside: Prism.languages.css } }, alias: "language-css" } }, Prism.languages.markup.tag));
Prism.languages.clike = { comment: [{ pattern: /(^|[^\\])\/\*[\w\W]*?\*\//, lookbehind: !0 }, { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0 }], string: { pattern: /(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, greedy: !0 }, "class-name": { pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i, lookbehind: !0, inside: { punctuation: /(\.|\\)/ } }, keyword: /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/, "boolean": /\b(true|false)\b/, "function": /[a-z0-9_]+(?=\()/i, number: /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i, operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/, punctuation: /[{}[\];(),.:]/ };
Prism.languages.javascript = Prism.languages.extend("clike", { keyword: /\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/, number: /\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/, "function": /[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\()/i }), Prism.languages.insertBefore("javascript", "keyword", { regex: { pattern: /(^|[^\/])\/(?!\/)(\[.+?]|\\.|[^\/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/, lookbehind: !0, greedy: !0 } }), Prism.languages.insertBefore("javascript", "class-name", { "template-string": { pattern: /`(?:\\\\|\\?[^\\])*?`/, greedy: !0, inside: { interpolation: { pattern: /\$\{[^}]+\}/, inside: { "interpolation-punctuation": { pattern: /^\$\{|\}$/, alias: "punctuation" }, rest: Prism.languages.javascript } }, string: /[\s\S]+/ } } }), Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", { script: { pattern: /(<script[\w\W]*?>)[\w\W]*?(?=<\/script>)/i, lookbehind: !0, inside: Prism.languages.javascript, alias: "language-javascript" } }), Prism.languages.js = Prism.languages.javascript;
!function (a) {
  var e = a.util.clone(a.languages.javascript);a.languages.jsx = a.languages.extend("markup", e), a.languages.jsx.tag.pattern = /<\/?[\w\.:-]+\s*(?:\s+[\w\.:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+|(\{[\w\W]*?\})))?\s*)*\/?>/i, a.languages.jsx.tag.inside["attr-value"].pattern = /=[^\{](?:('|")[\w\W]*?(\1)|[^\s>]+)/i;var s = a.util.clone(a.languages.jsx);delete s.punctuation, s = a.languages.insertBefore("jsx", "operator", { punctuation: /=(?={)|[{}[\];(),.:]/ }, { jsx: s }), a.languages.insertBefore("inside", "attr-value", { script: { pattern: /=(\{(?:\{[^}]*\}|[^}])+\})/i, inside: s, alias: "language-javascript" } }, a.languages.jsx.tag);
}(Prism);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _inputStyle;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Cropper = require('../src/components/Cropper');

var _Cropper2 = _interopRequireDefault(_Cropper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var inputStyle = (_inputStyle = {
  width: '100%',
  //color: '#FF4136',
  color: 'rgba(0, 0, 0, 0.7)',
  fontSize: 16,
  border: 'none',
  padding: 16,
  margin: 0
}, _defineProperty(_inputStyle, 'width', '70%'), _defineProperty(_inputStyle, 'outline', 'none'), _defineProperty(_inputStyle, 'background', 'rgba(0, 0, 0, 0.03)'), _defineProperty(_inputStyle, 'boxShadow', 'inset 0 0 1px rgba(0,0,0,0.2)'), _inputStyle);

var labelStyle = {
  display: 'block',
  fontSize: 16,
  color: 'rgba(0, 0, 0, 0.4)',
  margin: '12px 0 6px 0'
};

var statStyle = {
  fontSize: 16,
  color: '#F012BE',
  fontWeight: 500
};

var h1Style = {
  fontSize: 31,
  fontWeight: 700,
  // color: '#B50366',
  color: '#333',
  marginTop: '1em',
  marginBottom: '.3em'
};

var h3Style = {
  fontSize: 20,
  fontWeight: 300,
  color: '#444',
  // color: '#333',
  margin: '1em 0'
};

var introStyle = {
  fontSize: 20,
  marginBottom: '1em',
  color: 'rgba(0,0,0,.5)'
};

var Input = function Input(props) {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'label',
      { style: labelStyle },
      props.label
    ),
    _react2.default.createElement('input', {
      value: props.value,
      onChange: props.onChange,
      style: inputStyle,
      placeholder: props.label })
  );
};

var Code = function Code(_ref) {
  var children = _ref.children;
  return _react2.default.createElement(
    'span',
    { style: { background: '#f5f2f0', padding: 3, fontWeight: 500 } },
    children
  );
};

var Demo = function (_Component) {
  _inherits(Demo, _Component);

  function Demo(props) {
    _classCallCheck(this, Demo);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Demo).call(this, props));

    _this.updateCropInfo = function (crop) {
      _this.setState(_extends({}, crop));
    };

    _this.onCropEnd = function (crop) {
      _this.updateCropInfo(crop);
      console.debug('%cCROP END', 'color: green');
      console.debug(crop);
    };

    _this.state = {
      color: '#FFDC00',
      aspectRatio: 16 / 9,
      crop: {}
    };
    return _this;
  }

  _createClass(Demo, [{
    key: 'handleChange',
    value: function handleChange(key, e) {
      var keyVal = {};
      keyVal[key] = e.target.value;
      this.setState(keyVal);
    }
  }, {
    key: 'genCodeSample',
    value: function genCodeSample() {
      return '<Cropper\n      src="https://i.imgur.com/2Byd6ef.jpg"\n      borderColor="#FO12BE"\n      aspectRatio={16/9}\n      onCropEnd={crop => console.debug(crop)}\n/>'.replace(/ {2,}/g, '  ');
    }
  }, {
    key: 'genResult',
    value: function genResult() {
      var _state = this.state;
      var x = _state.x;
      var y = _state.y;
      var width = _state.width;
      var height = _state.height;

      return ('{\n      width: ' + Math.round(width) + ',\n      height: ' + Math.round(height) + ',\n      x: ' + Math.round(x) + ',\n      y: ' + Math.round(y) + ',\n}').replace(/ {2,}/g, '  ');
    }
  }, {
    key: 'render',
    value: function render() {
      var _state2 = this.state;
      var color = _state2.color;
      var aspectRatio = _state2.aspectRatio;

      return _react2.default.createElement(
        'div',
        { style: {
            margin: 'auto',
            maxWidth: '700px'
          } },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h1',
            { style: h1Style },
            'React Croppy'
          ),
          _react2.default.createElement(
            'p',
            { style: introStyle },
            'A fully responsive zero-dependency image cropper'
          ),
          _react2.default.createElement(
            'h3',
            { style: h3Style },
            'Install instructions'
          ),
          _react2.default.createElement(
            'pre',
            null,
            _react2.default.createElement(
              'code',
              { className: 'language-shell' },
              'npm install react-croppy'
            )
          ),
          _react2.default.createElement(
            'h3',
            { style: h3Style },
            'Include in your project'
          ),
          _react2.default.createElement(
            'pre',
            null,
            _react2.default.createElement(
              'code',
              { className: 'language-js' },
              'import Cropper from react-croppy'
            )
          ),
          _react2.default.createElement(
            'h3',
            { style: h3Style },
            'Demo'
          ),
          _react2.default.createElement(
            'div',
            { style: { display: 'flex' } },
            _react2.default.createElement(
              'pre',
              { style: { flexBasis: '70%' } },
              _react2.default.createElement(
                'code',
                { className: 'language-jsx' },
                this.genCodeSample()
              )
            ),
            _react2.default.createElement(
              'pre',
              { style: { flexBasis: '30%', marginLeft: '.5em' } },
              _react2.default.createElement(
                'code',
                { className: 'language-js' },
                this.genResult()
              )
            )
          ),
          _react2.default.createElement(_Cropper2.default, {
            onCrop: this.updateCropInfo,
            onCropEnd: this.onCropEnd,
            src: 'https://i.imgur.com/2Byd6ef.jpg',
            borderColor: color,
            start: [100, 100, 320, 180]
          }),
          _react2.default.createElement(
            'h3',
            { style: h3Style },
            'API'
          ),
          _react2.default.createElement(
            'ul',
            { style: { listStyle: 'circle inside' } },
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                Code,
                null,
                'src: string'
              ),
              ' is the source of the image'
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                Code,
                null,
                'borderColor: string'
              ),
              ' is the CSS color of the border of the crop rectangle'
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                Code,
                null,
                'aspectRatio: decimal'
              ),
              ' optional aspect ratio (width / height) that will be enforced for the crop'
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                Code,
                null,
                'onCrop()'
              ),
              ' is a callback that\'s called on every crop'
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                Code,
                null,
                'onCropStart(crop)'
              ),
              ' is a callback that\'s called when the crop starts'
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                Code,
                null,
                'onCropEnd(crop)'
              ),
              ' is a callback that\'s called when the crop ends'
            )
          )
        )
      );
    }
  }]);

  return Demo;
}(_react.Component);

_reactDom2.default.render(_react2.default.createElement(Demo, null)
// <div style={{width: '700px', margin: '0 auto', position: 'fixed', height: '50%', overflow: 'auto', top: '12px' }}>
, document.getElementById('root'));
//minCropWidth={100}
//
"use strict";

/* http://prismjs.com/download.html?themes=prism&languages=markup+css+clike+javascript+jsx */
var _self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {},
    Prism = function () {
  var e = /\blang(?:uage)?-(\w+)\b/i,
      t = 0,
      n = _self.Prism = { util: { encode: function encode(e) {
        return e instanceof a ? new a(e.type, n.util.encode(e.content), e.alias) : "Array" === n.util.type(e) ? e.map(n.util.encode) : e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
      }, type: function type(e) {
        return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1];
      }, objId: function objId(e) {
        return e.__id || Object.defineProperty(e, "__id", { value: ++t }), e.__id;
      }, clone: function clone(e) {
        var t = n.util.type(e);switch (t) {case "Object":
            var a = {};for (var r in e) {
              e.hasOwnProperty(r) && (a[r] = n.util.clone(e[r]));
            }return a;case "Array":
            return e.map && e.map(function (e) {
              return n.util.clone(e);
            });}return e;
      } }, languages: { extend: function extend(e, t) {
        var a = n.util.clone(n.languages[e]);for (var r in t) {
          a[r] = t[r];
        }return a;
      }, insertBefore: function insertBefore(e, t, a, r) {
        r = r || n.languages;var l = r[e];if (2 == arguments.length) {
          a = arguments[1];for (var i in a) {
            a.hasOwnProperty(i) && (l[i] = a[i]);
          }return l;
        }var o = {};for (var s in l) {
          if (l.hasOwnProperty(s)) {
            if (s == t) for (var i in a) {
              a.hasOwnProperty(i) && (o[i] = a[i]);
            }o[s] = l[s];
          }
        }return n.languages.DFS(n.languages, function (t, n) {
          n === r[e] && t != e && (this[t] = o);
        }), r[e] = o;
      }, DFS: function DFS(e, t, a, r) {
        r = r || {};for (var l in e) {
          e.hasOwnProperty(l) && (t.call(e, l, e[l], a || l), "Object" !== n.util.type(e[l]) || r[n.util.objId(e[l])] ? "Array" !== n.util.type(e[l]) || r[n.util.objId(e[l])] || (r[n.util.objId(e[l])] = !0, n.languages.DFS(e[l], t, l, r)) : (r[n.util.objId(e[l])] = !0, n.languages.DFS(e[l], t, null, r)));
        }
      } }, plugins: {}, highlightAll: function highlightAll(e, t) {
      var a = { callback: t, selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code' };n.hooks.run("before-highlightall", a);for (var r, l = a.elements || document.querySelectorAll(a.selector), i = 0; r = l[i++];) {
        n.highlightElement(r, e === !0, a.callback);
      }
    }, highlightElement: function highlightElement(t, a, r) {
      for (var l, i, o = t; o && !e.test(o.className);) {
        o = o.parentNode;
      }o && (l = (o.className.match(e) || [, ""])[1], i = n.languages[l]), t.className = t.className.replace(e, "").replace(/\s+/g, " ") + " language-" + l, o = t.parentNode, /pre/i.test(o.nodeName) && (o.className = o.className.replace(e, "").replace(/\s+/g, " ") + " language-" + l);var s = t.textContent,
          u = { element: t, language: l, grammar: i, code: s };if (!s || !i) return n.hooks.run("complete", u), void 0;if (n.hooks.run("before-highlight", u), a && _self.Worker) {
        var c = new Worker(n.filename);c.onmessage = function (e) {
          u.highlightedCode = e.data, n.hooks.run("before-insert", u), u.element.innerHTML = u.highlightedCode, r && r.call(u.element), n.hooks.run("after-highlight", u), n.hooks.run("complete", u);
        }, c.postMessage(JSON.stringify({ language: u.language, code: u.code, immediateClose: !0 }));
      } else u.highlightedCode = n.highlight(u.code, u.grammar, u.language), n.hooks.run("before-insert", u), u.element.innerHTML = u.highlightedCode, r && r.call(t), n.hooks.run("after-highlight", u), n.hooks.run("complete", u);
    }, highlight: function highlight(e, t, r) {
      var l = n.tokenize(e, t);return a.stringify(n.util.encode(l), r);
    }, tokenize: function tokenize(e, t) {
      var a = n.Token,
          r = [e],
          l = t.rest;if (l) {
        for (var i in l) {
          t[i] = l[i];
        }delete t.rest;
      }e: for (var i in t) {
        if (t.hasOwnProperty(i) && t[i]) {
          var o = t[i];o = "Array" === n.util.type(o) ? o : [o];for (var s = 0; s < o.length; ++s) {
            var u = o[s],
                c = u.inside,
                g = !!u.lookbehind,
                h = !!u.greedy,
                f = 0,
                d = u.alias;u = u.pattern || u;for (var p = 0; p < r.length; p++) {
              var m = r[p];if (r.length > e.length) break e;if (!(m instanceof a)) {
                u.lastIndex = 0;var y = u.exec(m),
                    v = 1;if (!y && h && p != r.length - 1) {
                  var b = r[p + 1].matchedStr || r[p + 1],
                      k = m + b;if (p < r.length - 2 && (k += r[p + 2].matchedStr || r[p + 2]), u.lastIndex = 0, y = u.exec(k), !y) continue;var w = y.index + (g ? y[1].length : 0);if (w >= m.length) continue;var _ = y.index + y[0].length,
                      P = m.length + b.length;if (v = 3, P >= _) {
                    if (r[p + 1].greedy) continue;v = 2, k = k.slice(0, P);
                  }m = k;
                }if (y) {
                  g && (f = y[1].length);var w = y.index + f,
                      y = y[0].slice(f),
                      _ = w + y.length,
                      S = m.slice(0, w),
                      O = m.slice(_),
                      j = [p, v];S && j.push(S);var A = new a(i, c ? n.tokenize(y, c) : y, d, y, h);j.push(A), O && j.push(O), Array.prototype.splice.apply(r, j);
                }
              }
            }
          }
        }
      }return r;
    }, hooks: { all: {}, add: function add(e, t) {
        var a = n.hooks.all;a[e] = a[e] || [], a[e].push(t);
      }, run: function run(e, t) {
        var a = n.hooks.all[e];if (a && a.length) for (var r, l = 0; r = a[l++];) {
          r(t);
        }
      } } },
      a = n.Token = function (e, t, n, a, r) {
    this.type = e, this.content = t, this.alias = n, this.matchedStr = a || null, this.greedy = !!r;
  };if (a.stringify = function (e, t, r) {
    if ("string" == typeof e) return e;if ("Array" === n.util.type(e)) return e.map(function (n) {
      return a.stringify(n, t, e);
    }).join("");var l = { type: e.type, content: a.stringify(e.content, t, r), tag: "span", classes: ["token", e.type], attributes: {}, language: t, parent: r };if ("comment" == l.type && (l.attributes.spellcheck = "true"), e.alias) {
      var i = "Array" === n.util.type(e.alias) ? e.alias : [e.alias];Array.prototype.push.apply(l.classes, i);
    }n.hooks.run("wrap", l);var o = "";for (var s in l.attributes) {
      o += (o ? " " : "") + s + '="' + (l.attributes[s] || "") + '"';
    }return "<" + l.tag + ' class="' + l.classes.join(" ") + '" ' + o + ">" + l.content + "</" + l.tag + ">";
  }, !_self.document) return _self.addEventListener ? (_self.addEventListener("message", function (e) {
    var t = JSON.parse(e.data),
        a = t.language,
        r = t.code,
        l = t.immediateClose;_self.postMessage(n.highlight(r, n.languages[a], a)), l && _self.close();
  }, !1), _self.Prism) : _self.Prism;var r = document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop();return r && (n.filename = r.src, document.addEventListener && !r.hasAttribute("data-manual") && document.addEventListener("DOMContentLoaded", n.highlightAll)), _self.Prism;
}();"undefined" != typeof module && module.exports && (module.exports = Prism), "undefined" != typeof global && (global.Prism = Prism);
Prism.languages.markup = { comment: /<!--[\w\W]*?-->/, prolog: /<\?[\w\W]+?\?>/, doctype: /<!DOCTYPE[\w\W]+?>/, cdata: /<!\[CDATA\[[\w\W]*?]]>/i, tag: { pattern: /<\/?(?!\d)[^\s>\/=.$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i, inside: { tag: { pattern: /^<\/?[^\s>\/]+/i, inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ } }, "attr-value": { pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i, inside: { punctuation: /[=>"']/ } }, punctuation: /\/?>/, "attr-name": { pattern: /[^\s>\/]+/, inside: { namespace: /^[^\s>\/:]+:/ } } } }, entity: /&#?[\da-z]{1,8};/i }, Prism.hooks.add("wrap", function (a) {
  "entity" === a.type && (a.attributes.title = a.content.replace(/&amp;/, "&"));
}), Prism.languages.xml = Prism.languages.markup, Prism.languages.html = Prism.languages.markup, Prism.languages.mathml = Prism.languages.markup, Prism.languages.svg = Prism.languages.markup;
Prism.languages.css = { comment: /\/\*[\w\W]*?\*\//, atrule: { pattern: /@[\w-]+?.*?(;|(?=\s*\{))/i, inside: { rule: /@[\w-]+/ } }, url: /url\((?:(["'])(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1|.*?)\)/i, selector: /[^\{\}\s][^\{\};]*?(?=\s*\{)/, string: /("|')(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1/, property: /(\b|\B)[\w-]+(?=\s*:)/i, important: /\B!important\b/i, "function": /[-a-z0-9]+(?=\()/i, punctuation: /[(){};:]/ }, Prism.languages.css.atrule.inside.rest = Prism.util.clone(Prism.languages.css), Prism.languages.markup && (Prism.languages.insertBefore("markup", "tag", { style: { pattern: /(<style[\w\W]*?>)[\w\W]*?(?=<\/style>)/i, lookbehind: !0, inside: Prism.languages.css, alias: "language-css" } }), Prism.languages.insertBefore("inside", "attr-value", { "style-attr": { pattern: /\s*style=("|').*?\1/i, inside: { "attr-name": { pattern: /^\s*style/i, inside: Prism.languages.markup.tag.inside }, punctuation: /^\s*=\s*['"]|['"]\s*$/, "attr-value": { pattern: /.+/i, inside: Prism.languages.css } }, alias: "language-css" } }, Prism.languages.markup.tag));
Prism.languages.clike = { comment: [{ pattern: /(^|[^\\])\/\*[\w\W]*?\*\//, lookbehind: !0 }, { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0 }], string: { pattern: /(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, greedy: !0 }, "class-name": { pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i, lookbehind: !0, inside: { punctuation: /(\.|\\)/ } }, keyword: /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/, "boolean": /\b(true|false)\b/, "function": /[a-z0-9_]+(?=\()/i, number: /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i, operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/, punctuation: /[{}[\];(),.:]/ };
Prism.languages.javascript = Prism.languages.extend("clike", { keyword: /\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/, number: /\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/, "function": /[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\()/i }), Prism.languages.insertBefore("javascript", "keyword", { regex: { pattern: /(^|[^\/])\/(?!\/)(\[.+?]|\\.|[^\/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/, lookbehind: !0, greedy: !0 } }), Prism.languages.insertBefore("javascript", "class-name", { "template-string": { pattern: /`(?:\\\\|\\?[^\\])*?`/, greedy: !0, inside: { interpolation: { pattern: /\$\{[^}]+\}/, inside: { "interpolation-punctuation": { pattern: /^\$\{|\}$/, alias: "punctuation" }, rest: Prism.languages.javascript } }, string: /[\s\S]+/ } } }), Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", { script: { pattern: /(<script[\w\W]*?>)[\w\W]*?(?=<\/script>)/i, lookbehind: !0, inside: Prism.languages.javascript, alias: "language-javascript" } }), Prism.languages.js = Prism.languages.javascript;
!function (a) {
  var e = a.util.clone(a.languages.javascript);a.languages.jsx = a.languages.extend("markup", e), a.languages.jsx.tag.pattern = /<\/?[\w\.:-]+\s*(?:\s+[\w\.:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+|(\{[\w\W]*?\})))?\s*)*\/?>/i, a.languages.jsx.tag.inside["attr-value"].pattern = /=[^\{](?:('|")[\w\W]*?(\1)|[^\s>]+)/i;var s = a.util.clone(a.languages.jsx);delete s.punctuation, s = a.languages.insertBefore("jsx", "operator", { punctuation: /=(?={)|[{}[\];(),.:]/ }, { jsx: s }), a.languages.insertBefore("inside", "attr-value", { script: { pattern: /=(\{(?:\{[^}]*\}|[^}])+\})/i, inside: s, alias: "language-javascript" } }, a.languages.jsx.tag);
}(Prism);
