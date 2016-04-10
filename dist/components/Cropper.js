'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Rect = require('./Rect');

var _Rect2 = _interopRequireDefault(_Rect);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Cropper = function (_Component) {
  _inherits(Cropper, _Component);

  function Cropper(props) {
    _classCallCheck(this, Cropper);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Cropper).call(this, props));

    _initialiseProps.call(_this);

    var _props$start = _slicedToArray(props.start, 4);

    var x = _props$start[0];
    var y = _props$start[1];
    var width = _props$start[2];
    var height = _props$start[3];

    _this.state = {
      canvasWidth: 0,
      canvasHeight: 0,
      x: x || 0,
      y: y || 0,
      width: width || 0,
      height: height || 0,
      resizing: false,
      dragging: false,
      deltaHandler: { x: 0, y: 0 },
      pixelRatio: (0, _utils.getPixelRatio)()
    };
    return _this;
  }

  _createClass(Cropper, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setupListeners();
      var node = _reactDom2.default.findDOMNode(this);
      this.offsetLeft = node.offsetLeft;
      this.offsetTop = node.offsetTop;
      this.node = node;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.teardownListeners();
    }
  }, {
    key: 'setupListeners',
    value: function setupListeners() {
      window.addEventListener('mousemove', this.onMouseMove);
      window.addEventListener('mouseup', this.onMouseUp);
      window.addEventListener('resize', this.onWindowResize);
    }
  }, {
    key: 'teardownListeners',
    value: function teardownListeners() {
      window.removeEventListener('mousemove', this.onMouseMove);
      window.removeEventListener('mouseup', this.onMouseUp);
      window.removeEventListener('resize', this.onWindowResize);
    }
  }, {
    key: 'getRatio',
    value: function getRatio() {
      return this.image.nativeSize.width / this.state.containerWidth;
    }
  }, {
    key: 'toNativeMetrics',
    value: function toNativeMetrics(_ref) {
      var x = _ref.x;
      var y = _ref.y;
      var width = _ref.width;
      var height = _ref.height;

      // convert current in dom dimensions to sizes of the image object
      var ratio = this.getRatio();
      var delta = this.state.deltaHandler;
      return {
        width: width * ratio,
        height: height * ratio,
        x: x * ratio,
        y: y * ratio
      };
    }
  }, {
    key: 'getImageNode',
    value: function getImageNode() {
      return _reactDom2.default.findDOMNode(this.refs.image);
    }
  }, {
    key: 'imageDomSize',
    value: function imageDomSize() {
      var imgNode = this.getImageNode();
      var cs = window.getComputedStyle(imgNode);
      var width = parseInt(cs.getPropertyValue('width').slice(0, -2), 10);
      var height = parseInt(cs.getPropertyValue('height').slice(0, -2), 10);
      return { width: width, height: height };
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state;
      var canvasWidth = _state.canvasWidth;
      var canvasHeight = _state.canvasHeight;

      return _react2.default.createElement(
        'div',
        {
          onDrag: this.onDrag,
          onMouseDown: this.onMouseDown,

          style: _extends({
            position: 'relative',
            height: 0,
            paddingBottom: canvasHeight / canvasWidth * 100 + '%'
          }, this.props.style)
        },
        this.props.children,
        _react2.default.createElement(
          'div',
          {
            style: {
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 1
            } },
          _react2.default.createElement(_Rect2.default, {
            canvasWidth: this.state.canvasWidth,
            canvasHeight: this.state.canvasHeight,
            width: this.state.width,
            height: this.state.height,
            x: this.state.x,
            y: this.state.y,
            borderColor: this.props.borderColor,
            handlerSize: this.props.handlerSize,
            pixelRatio: this.state.pixelRatio
          })
        ),
        _react2.default.createElement('img', {
          ref: 'image',
          onLoad: this.computeSize,
          style: {
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 0,
            maxWidth: '100%'
          },
          src: this.props.src })
      );
    }
  }]);

  return Cropper;
}(_react.Component);

Cropper.propTypes = {
  src: _react.PropTypes.string.isRequired,
  minCropWidth: _react.PropTypes.number,
  maxCropWidth: _react.PropTypes.number,
  borderColor: _react.PropTypes.string,
  style: _react.PropTypes.object,
  start: _react.PropTypes.array,
  startChange: _react.PropTypes.bool,
  isLoading: _react.PropTypes.bool,
  onCrop: _react.PropTypes.func,
  onCropEnd: _react.PropTypes.func
};
Cropper.defaultProps = {
  minCropWidth: 0,
  minCropHeight: 0,
  borderColor: '#FF4136', // red
  handlerSize: 20,
  start: [null, null, null, null],
  style: {}
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.getPosition = function (e) {
    var offset = (0, _utils.getOffset)(_this2.node);
    var x = e.pageX - offset.left;
    var y = e.pageY - offset.top;
    return { x: x, y: y };
  };

  this.posCollidesCrop = function (pos) {
    // does the provided mouse position collide with the crop box
    var x = pos.x;
    var y = pos.y;

    return x >= _this2.state.x && x <= _this2.state.x + _this2.state.width && y >= _this2.state.y && y <= _this2.state.y + _this2.state.height;
  };

  this.posCollidesResizeHandler = function (pos) {
    // does the provided mouse position collide with the resize handler
    var handlerSize = _this2.props.handlerSize;
    var x = pos.x;
    var y = pos.y;

    var handlerX = _this2.state.x + _this2.state.width - handlerSize;
    var handlerY = _this2.state.y + _this2.state.height - handlerSize;
    return x >= handlerX && x <= handlerX + handlerSize && y >= handlerY && y <= handlerY + handlerSize;
  };

  this.cropIsActive = function () {
    // is there currently an active cropbox?
    return _this2.state.width && _this2.state.height;
  };

  this.getDelta = function (pos) {
    // diff between mouse position and left/top position of crop box
    return {
      x: pos.x - _this2.state.x,
      y: pos.y - _this2.state.y
    };
  };

  this.onMouseDown = function (e) {
    e.preventDefault();

    var pos = _this2.getPosition(e);
    var isActive = _this2.cropIsActive();
    var collides = _this2.posCollidesCrop(pos);

    if (!isActive || !collides) {
      // reset starting position
      _this2.setState(_extends({}, pos, {
        width: 0,
        height: 0,
        resizing: true,
        startX: pos.x,
        startY: pos.y
      }));
    } else {

      var delta = _this2.getDelta(pos);
      var _state2 = _this2.state;
      var width = _state2.width;
      var height = _state2.height;


      if (_this2.posCollidesResizeHandler(pos)) {
        _this2.setState({
          resizing: true,
          // calc distance between left bottom corner and mouse pos
          deltaHandler: { x: width - delta.x, y: height - delta.y }
        });
      } else {
        _this2.setState({
          dragging: true,
          delta: delta
        });
      }
    }
  };

  this.onResize = function (_ref2) {
    var width = _ref2.width;
    var height = _ref2.height;
    var _props = _this2.props;
    var aspectRatio = _props.aspectRatio;
    var minCropWidth = _props.minCropWidth;
    var minCropHeight = _props.minCropHeight;

    if (minCropWidth) {
      width = Math.max(minCropWidth, _this2.getRatio() * width);
    }
    if (minCropHeight) {
      height = Math.max(minCropHeight, _this2.getRatio() * height);
    }
    if (aspectRatio) {
      height = width / aspectRatio;
    }
    return { width: width, height: height };
  };

  this.onMouseMove = function (e) {
    if (!_this2.state.dragging && !_this2.state.resizing) {
      return;
    }
    e.preventDefault();

    var _getPosition = _this2.getPosition(e);

    var x = _getPosition.x;
    var y = _getPosition.y;


    console.log(x, y);

    var ratio = _this2.getRatio();
    var _state3 = _this2.state;
    var width = _state3.width;
    var height = _state3.height;
    var containerWidth = _state3.containerWidth;
    var containerHeight = _state3.containerHeight;
    var delta = _state3.delta;

    var newState = {};

    if (_this2.state.dragging) {
      newState = {
        x: (0, _utils.clip)(x - delta.x, 0, containerWidth - width),
        y: (0, _utils.clip)(y - delta.y, 0, containerHeight - height),
        width: width,
        height: height
      };
    } else if (_this2.state.resizing) {
      width = x - _this2.state.x;
      height = y - _this2.state.y;

      newState = _extends({
        x: _this2.state.x,
        y: _this2.state.y
      }, _this2.onResize({
        width: (0, _utils.clip)(width + _this2.state.deltaHandler.x, 1, containerWidth - _this2.state.x),
        height: (0, _utils.clip)(height + _this2.state.deltaHandler.y, 1, containerHeight - _this2.state.y)
      }));
    }
    if (_this2.props.onCrop) {
      _this2.props.onCrop(_this2.toNativeMetrics(newState));
    }
    _this2.setState(newState);
  };

  this.onMouseUp = function () {
    if (!_this2.state.dragging && !_this2.state.resizing) {
      return;
    }
    var _state4 = _this2.state;
    var x = _state4.x;
    var y = _state4.y;
    var width = _state4.width;
    var height = _state4.height;

    var data = _extends({
      nativeSize: _this2.image.nativeSize
    }, _this2.toNativeMetrics({ x: x, y: y, width: width, height: height }));

    _this2.setState({
      resizing: false,
      dragging: false
    });

    if (width && height && _this2.props.onCropEnd) {
      _this2.props.onCropEnd(data);
    }
  };

  this.onWindowResize = function () {
    _this2.computeSize();
  };

  this.computeSize = function () {
    var imgNode = _this2.getImageNode();
    var domSize = _this2.imageDomSize();
    _this2.domSize = domSize;

    _this2.image = _this2.image || {};
    _this2.image.nativeSize = {
      width: imgNode.naturalWidth,
      height: imgNode.naturalHeight
    };

    _this2.setState({
      containerWidth: domSize.width,
      containerHeight: domSize.height,
      canvasWidth: domSize.width,
      canvasHeight: domSize.height
    });
  };
};

exports.default = Cropper;