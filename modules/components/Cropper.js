'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Rect = require('./Rect');

var _Rect2 = _interopRequireDefault(_Rect);

var _utils = require('../utils');

var Cropper = (function (_Component) {
  _inherits(Cropper, _Component);

  _createClass(Cropper, null, [{
    key: 'propTypes',
    value: {
      src: _react.PropTypes.string.isRequired,
      minCropWidth: _react.PropTypes.number,
      maxCropWidth: _react.PropTypes.number,
      borderColor: _react.PropTypes.string,
      style: _react.PropTypes.object
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      minCropWidth: 0,
      minCropHeight: 0,
      borderColor: '#FF4136', // red
      style: {}
    },
    enumerable: true
  }]);

  function Cropper(props) {
    var _this = this;

    _classCallCheck(this, Cropper);

    _Component.call(this, props);

    this.getPosition = function (e) {
      // @TODO this forces reflow, can we do something for
      // performance by batches operations?
      var x = e.pageX - _this.offsetLeft;
      var y = e.pageY - _this.offsetTop;
      return { x: x, y: y };
    };

    this.posCollidesCrop = function (pos) {
      var x = pos.x;
      var y = pos.y;

      return x >= _this.state.x && x <= _this.state.x + _this.state.width && (y >= _this.state.y && y <= _this.state.y + _this.state.height);
    };

    this.posCollidesResizeHandler = function (pos) {
      var x = pos.x;
      var y = pos.y;

      var handlerX = _this.state.x + _this.state.width - 20;
      var handlerY = _this.state.y + _this.state.height - 20;
      return x >= handlerX && x <= handlerX + 20 && (y >= handlerY && y <= handlerY + 20);
    };

    this.cropIsActive = function () {
      return _this.state.width && _this.state.height;
    };

    this.getDelta = function (pos) {
      return {
        x: pos.x - _this.state.x,
        y: pos.y - _this.state.y
      };
    };

    this.onMouseDown = function (e) {
      e.preventDefault();

      var pos = _this.getPosition(e);
      var isActive = _this.cropIsActive();
      var collides = _this.posCollidesCrop(pos);

      if (!isActive || !collides) {
        // reset starting position
        _this.setState(_extends({}, pos, {
          width: 0,
          height: 0,
          resizing: true
        }));
      } else {
        if (_this.posCollidesResizeHandler(pos)) {
          _this.setState({ resizing: true });
        } else {
          _this.setState({
            dragging: true,
            delta: _this.getDelta(pos)
          });
        }
      }
    };

    this.onResize = function (_ref) {
      var width = _ref.width;
      var height = _ref.height;
      var _props = _this.props;
      var aspectRatio = _props.aspectRatio;
      var minCropWidth = _props.minCropWidth;
      var minCropHeight = _props.minCropHeight;

      if (minCropWidth) {
        width = Math.max(minCropWidth, _this.getRatio() * width);
      }
      if (minCropHeight) {
        height = Math.max(minCropHeight, _this.getRatio() * height);
      }
      if (aspectRatio) {
        height = width / aspectRatio;
      }
      return { width: width, height: height };
    };

    this.onMouseMove = function (e) {
      if (!_this.state.dragging && !_this.state.resizing) {
        return;
      }
      e.preventDefault();

      var _getPosition = _this.getPosition(e);

      var x = _getPosition.x;
      var y = _getPosition.y;
      var _state = _this.state;
      var width = _state.width;
      var height = _state.height;
      var containerWidth = _state.containerWidth;
      var containerHeight = _state.containerHeight;
      var delta = _state.delta;

      var newState = {};
      if (_this.state.dragging) {
        newState = {
          x: _utils.clip(x - delta.x, 0, containerWidth - width),
          y: _utils.clip(y - delta.y, 0, containerHeight - height)
        };
      } else if (_this.state.resizing) {
        width = x - _this.state.x;
        height = y - _this.state.y;
        if (width <= 0 || height <= 0) {
          return;
        }
        newState = _this.onResize({
          width: _utils.clip(width, 0, containerWidth - _this.state.x),
          height: _utils.clip(height, 0, containerWidth - _this.state.y)
        });
      }
      _this.setState(newState);
      return;
    };

    this.isInBounds = function (_ref2) {
      var x = _ref2.x;
      var y = _ref2.y;
      var width = _ref2.width;
      var height = _ref2.height;

      return x + width <= _this.state.containerWidth && y + height <= _this.state.containerHeight;
    };

    this.onMouseUp = function () {
      if (!_this.state.dragging && !_this.state.resizing) {
        return;
      }
      var ratio = _this.getRatio();
      var _state2 = _this.state;
      var x = _state2.x;
      var y = _state2.y;
      var width = _state2.width;
      var height = _state2.height;

      var data = {
        nativeSize: _this.image.nativeSize,
        x: ratio * x,
        y: ratio * y,
        width: ratio * width,
        height: ratio * height
      };

      _this.setState({
        resizing: false,
        dragging: false
      });

      if (_this.props.onCrop) {
        _this.props.onCrop(data);
      }
    };

    this.computeSize = function () {
      var imgNode = _react2['default'].findDOMNode(_this.refs.image);
      var cs = window.getComputedStyle(imgNode);
      var canvasWidth = parseInt(cs.getPropertyValue('width').slice(0, -2), 10);
      var canvasHeight = parseInt(cs.getPropertyValue('height').slice(0, -2), 10);
      var isRetina = _this.state.isRetina;

      _this.image = _this.image || {};
      _this.image.nativeSize = {
        width: imgNode.naturalWidth,
        height: imgNode.naturalHeight
      };
      _this.setState({
        containerWidth: isRetina ? canvasWidth : canvasWidth,
        containerHeight: isRetina ? canvasHeight : canvasHeight,
        canvasWidth: canvasWidth,
        canvasHeight: canvasHeight
      });
    };

    this.state = {
      canvasWidth: 0,
      canvasHeight: 0,
      x: null,
      y: null,
      width: 0,
      height: 0,
      resizing: false,
      dragging: false,
      isRetina: _utils.isRetina()
    };
  }

  Cropper.prototype.componentDidMount = function componentDidMount() {
    this.setupListeners();
    var node = _react2['default'].findDOMNode(this);
    this.offsetLeft = node.offsetLeft;
    this.offsetTop = node.offsetTop;
  };

  Cropper.prototype.componentWillUnmount = function componentWillUnmount() {
    this.teardownListeners();
  };

  Cropper.prototype.setupListeners = function setupListeners() {
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
  };

  Cropper.prototype.teardownListeners = function teardownListeners() {
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
  };

  Cropper.prototype.getRatio = function getRatio() {
    return this.state.containerWidth / this.image.nativeSize.width;
  };

  Cropper.prototype.render = function render() {
    return _react2['default'].createElement(
      'div',
      {
        onDrag: this.onDrag,
        onMouseDown: this.onMouseDown,
        style: _extends({ position: 'relative' }, this.props.style)
      },
      _react2['default'].createElement(
        'div',
        { style: { position: 'absolute', top: 0, left: 0, zIndex: 1 } },
        _react2['default'].createElement(_Rect2['default'], {
          canvasWidth: this.state.canvasWidth,
          canvasHeight: this.state.canvasHeight,
          width: this.state.width,
          height: this.state.height,
          x: this.state.x,
          y: this.state.y,
          borderColor: this.props.borderColor,
          isRetina: this.state.isRetina
        })
      ),
      _react2['default'].createElement('img', {
        ref: 'image',
        onLoad: this.computeSize,
        style: { position: 'absolute', top: 0, left: 0, zIndex: 0 },
        src: this.props.src })
    );
  };

  return Cropper;
})(_react.Component);

exports['default'] = Cropper;
module.exports = exports['default'];