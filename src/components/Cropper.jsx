import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import Rect from './Rect';
import {clip, recursiveOffset, getOffset, getPixelRatio} from '../utils';

export default class Cropper extends Component {

  static propTypes = {
    src: PropTypes.string.isRequired,
    minCropWidth: PropTypes.number,
    maxCropWidth: PropTypes.number,
    borderColor: PropTypes.string,
    style: PropTypes.object,
    start: PropTypes.array,
    startChange: PropTypes.bool,
    isLoading: PropTypes.bool,
    onCrop: PropTypes.func,
    onCropEnd: PropTypes.func
  }

  static defaultProps = {
    minCropWidth: 0,
    minCropHeight: 0,
    borderColor: '#FF4136', // red
    handlerSize: 20,
    start: [null, null, null, null],
    style: {}
  }

  constructor(props) {
    super(props);
    let [x, y, width, height] = props.start;
    this.state = {
      canvasWidth: 0,
      canvasHeight: 0,
      x: x || 0,
      y: y || 0,
      width: width || 0,
      height: height || 0,
      resizing: false,
      dragging: false,
      deltaHandler: {x: 0, y: 0},
      pixelRatio: getPixelRatio()
    };
  }

  componentDidMount() {
    this.setupListeners();
    let node = ReactDOM.findDOMNode(this);
    this.offsetLeft = node.offsetLeft;
    this.offsetTop = node.offsetTop;
    this.node = node;
  }

  componentWillUnmount() {
    this.teardownListeners();
  }

  setupListeners() {
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
    window.addEventListener('resize', this.onWindowResize);
  }

  teardownListeners() {
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
    window.removeEventListener('resize', this.onWindowResize);
  }

  getPosition = (e) => {
    let offset = getOffset(this.node);
    let x = e.pageX - offset.left;
    let y = e.pageY - offset.top;
    return {x, y};
  }

  posCollidesCrop = (pos) => {
    // does the provided mouse position collide with the crop box
    let {x, y} = pos;
    return ((x >= this.state.x && x <= (this.state.x + this.state.width))
        && (y >= this.state.y && y <= (this.state.y + this.state.height)));
  }

  posCollidesResizeHandler = (pos) => {
    // does the provided mouse position collide with the resize handler
    let {handlerSize} = this.props;
    let {x, y} = pos;
    let handlerX = this.state.x + this.state.width - handlerSize;
    let handlerY = this.state.y + this.state.height - handlerSize;
    return ((x >= handlerX && x <= (handlerX + handlerSize))
        && (y >= handlerY && y <= (handlerY + handlerSize)));
  }

  cropIsActive = () => {
    // is there currently an active cropbox?
    return this.state.width && this.state.height;
  }

  getDelta = (pos) => {
    // diff between mouse position and left/top position of crop box
    return {
      x: pos.x - this.state.x,
      y: pos.y - this.state.y
    };
  }

  onMouseDown = (e) => {
    e.preventDefault();

    let pos = this.getPosition(e);
    let isActive = this.cropIsActive();
    let collides = this.posCollidesCrop(pos);

    if (!isActive || !collides) {
      // reset starting position
      this.setState({
        ...pos,
        width: 0,
        height: 0,
        resizing: true,
        startX: pos.x,
        startY: pos.y
      });
    } else {

      let delta = this.getDelta(pos);
      let {width, height} = this.state;

      if (this.posCollidesResizeHandler(pos)) {
        this.setState({
          resizing: true,
          // calc distance between left bottom corner and mouse pos
          deltaHandler: {x: width - delta.x, y: height - delta.y}
        });
      } else {
        this.setState({
          dragging: true,
          delta
        });
      }
    }
  }

  onResize = ({width, height}) => {
    let {aspectRatio, minCropWidth, minCropHeight} = this.props;
    if (minCropWidth) {
      width = Math.max(minCropWidth, this.getRatio() * width);
    }
    if (minCropHeight) {
      height = Math.max(minCropHeight, this.getRatio() * height);
    }
    if (aspectRatio) {
      height = width / aspectRatio;
    }
    return {width, height};
  }

  onMouseMove = (e) => {
    if (!this.state.dragging &&
        !this.state.resizing) {
      return;
    }
    e.preventDefault();

    let {x, y} = this.getPosition(e);

    console.log(
      x,y
    );

    let ratio = this.getRatio();
    let {width, height, containerWidth, containerHeight, delta} = this.state;
    let newState = {};

    if (this.state.dragging) {
      newState = {
        x: clip(x - delta.x, 0, containerWidth - width),
        y: clip(y - delta.y, 0, containerHeight - height),
        width,
        height
      };
    } else if (this.state.resizing) {
      width = x - this.state.x;
      height = y - this.state.y;

      newState = {
        x: this.state.x,
        y: this.state.y,
        ...this.onResize({
          width: clip(width + this.state.deltaHandler.x, 1, containerWidth - this.state.x),
          height: clip(height + this.state.deltaHandler.y , 1, containerHeight - this.state.y)
        })
      }
    }
    if (this.props.onCrop) {
      this.props.onCrop(
        this.toNativeMetrics(newState)
      );
    }
    this.setState(newState);
  }

  getRatio() {
    return this.image.nativeSize.width / this.state.containerWidth;
  }

  toNativeMetrics({x, y, width, height}) {
    // convert current in dom dimensions to sizes of the image object
    let ratio = this.getRatio();
    let delta = this.state.deltaHandler;
    return {
      width: width * ratio,
      height: height * ratio,
      x: x * ratio,
      y: y * ratio
    }
  }

  onMouseUp = () => {
    if (!this.state.dragging && !this.state.resizing) {
      return;
    }
    let {x, y, width, height} = this.state;
    let data = {
      nativeSize: this.image.nativeSize,
      ...this.toNativeMetrics({x, y, width, height})
    };

    this.setState({
      resizing: false,
      dragging: false
    });

    if (width && height && this.props.onCropEnd) {
      this.props.onCropEnd(data);
    }

  }

  onWindowResize = () => {
    this.computeSize();
  }

  getImageNode() {
    return ReactDOM.findDOMNode(this.refs.image);
  }

  imageDomSize() {
    let imgNode = this.getImageNode();
    let cs = window.getComputedStyle(imgNode);
    let width = parseInt(cs.getPropertyValue('width').slice(0, -2), 10);
    let height = parseInt(cs.getPropertyValue('height').slice(0, -2), 10);
    return {width, height};
  }

  computeSize = () => {
    let imgNode = this.getImageNode();
    let domSize = this.imageDomSize();
    this.domSize = domSize;

    this.image = this.image || {};
    this.image.nativeSize = {
      width: imgNode.naturalWidth,
      height: imgNode.naturalHeight
    };

    this.setState({
      containerWidth: domSize.width,
      containerHeight: domSize.height,
      canvasWidth: domSize.width,
      canvasHeight: domSize.height,
    });
  }

  render() {
    const {canvasWidth, canvasHeight} = this.state;
    return (
      <div
        onDrag={this.onDrag}
        onMouseDown={this.onMouseDown}

        style={{
          position: 'relative',
          height: 0,
          paddingBottom: (canvasHeight / canvasWidth) * 100 + '%',
          ...this.props.style
        }}
        >
        {this.props.children}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1
          }}>
          <Rect
            canvasWidth={this.state.canvasWidth}
            canvasHeight={this.state.canvasHeight}
            width={this.state.width}
            height={this.state.height}
            x={this.state.x}
            y={this.state.y}
            borderColor={this.props.borderColor}
            handlerSize={this.props.handlerSize}
            pixelRatio={this.state.pixelRatio}
          />
        </div>
        <img
          ref='image'
          onLoad={this.computeSize}
          style={{
            position: 'absolute', 
            top: 0, 
            left: 0, 
            zIndex: 0, 
            maxWidth: '100%'
          }}
          src={this.props.src}/>
      </div>
    );
  }
}
