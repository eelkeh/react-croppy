'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var Rect = (function (_Component) {
  _inherits(Rect, _Component);

  _createClass(Rect, null, [{
    key: 'propTypes',
    value: {
      canvasWidth: _react.PropTypes.number.isRequired,
      canvasHeight: _react.PropTypes.number.isRequired,
      borderColor: _react.PropTypes.string.isRequired,
      isRetina: _react.PropTypes.bool.isRequired
    },
    enumerable: true
  }]);

  function Rect(props) {
    var _this = this;

    _classCallCheck(this, Rect);

    _Component.call(this, props);

    this.paint = function (coords) {
      var x = coords.x;
      var y = coords.y;
      var width = coords.width;
      var height = coords.height;

      var handlerSize = 20;
      if (_this.props.isRetina) {
        x = x * 2;
        y = y * 2;
        width = width * 2;
        height = height * 2;
        handlerSize = handlerSize * 2;
      }
      var _props = _this.props;
      var canvasWidth = _props.canvasWidth;
      var canvasHeight = _props.canvasHeight;

      var node = _react2['default'].findDOMNode(_this);
      var context = node.getContext('2d');
      context.clearRect(0, 0, node.width, node.height);
      if (!width || !height) {
        return;
      }
      context.strokeStyle = _this.props.borderColor;
      context.fillStyle = 'rgba(0, 0, 0, 0.3)';
      context.beginPath();
      context.rect(x, y, width, height);
      context.stroke();
      context.rect(node.width, 0, -node.width, node.height);
      // credit: http://stackoverflow.com/a/11770000/337480
      // fix for safari
      context.fill('evenodd');
      context.fillStyle = _this.props.borderColor;
      context.fillRect(x + width - handlerSize, y + height - handlerSize, handlerSize, handlerSize);
    };
  }

  Rect.prototype.componentDidUpdate = function componentDidUpdate() {
    var _props2 = this.props;
    var x = _props2.x;
    var y = _props2.y;
    var height = _props2.height;
    var width = _props2.width;

    if (x !== null && y !== null) {
      this.paint({
        x: x,
        y: y,
        width: width,
        height: height
      });
    }
  };

  Rect.prototype.render = function render() {
    var _props3 = this.props;
    var canvasWidth = _props3.canvasWidth;
    var canvasHeight = _props3.canvasHeight;
    var isRetina = _props3.isRetina;

    var props = {};
    if (isRetina) {
      props.style = {
        width: canvasWidth,
        height: canvasHeight
      };
    }
    return _react2['default'].createElement('canvas', _extends({}, props, {
      width: isRetina ? canvasWidth * 2 : canvasWidth,
      height: isRetina ? canvasHeight * 2 : canvasHeight
    }));
  };

  return Rect;
})(_react.Component);

exports['default'] = Rect;
module.exports = exports['default'];