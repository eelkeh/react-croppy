import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import Rect from './Rect';
import {clip, isRetina, recursiveOffset, getOffset} from '../utils';

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
    let [x, y, width, height] = this.props.start;
    this.state = {
      canvasWidth: 0,
      canvasHeight: 0,
      x: x,
      y: y,
      width: width,
      height: height,
      resizing: false,
      dragging: false,
      isRetina: isRetina()
    };
  }

  componentWillReceiveProps(nextProps) {
    // let [x, y, width, height] = this.sizeFromPercentage(nextProps.start);
    // this.setState({
    //   x,
    //   y,
    //   width,
    //   height
    // });
  }

  componentDidMount() {
    this.setupListeners();
    let node = ReactDOM.findDOMNode(this);
    this.offsetLeft = node.offsetLeft;
    this.offsetTop = node.offsetTop;
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
  }

  getPosition = (e) => {
    let offset = getOffset(e.target);
    let x = e.pageX - offset.left;
    let y = e.pageY - offset.top;
    return {x, y};
  }

  posCollidesCrop = (pos) => {
    let {x, y} = pos;
    return ((x >= this.state.x && x <= (this.state.x + this.state.width))
        && (y >= this.state.y && y <= (this.state.y + this.state.height)));
  }

  posCollidesResizeHandler = (pos) => {
    let {handlerSize} = this.props;
    let {x, y} = pos;
    let handlerX = this.state.x + this.state.width - handlerSize;
    let handlerY = this.state.y + this.state.height - handlerSize;
    return ((x >= handlerX && x <= (handlerX + handlerSize))
        && (y >= handlerY && y <= (handlerY + handlerSize)));
  }

  cropIsActive = () => {
    return this.state.width && this.state.height;
  }

  getDelta = (pos) => {
    let {handlerSize} = this.props;
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
        resizing: true
      });
    } else {
      if (this.posCollidesResizeHandler(pos)) {
        this.setState({
          resizing: true,
        });
      } else {
        this.setState({
          dragging: true,
          delta: this.getDelta(pos)
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
    }
    else if (this.state.resizing) {
      width = x - this.state.x;
      height = y - this.state.y;
      if (width <= 0 || height <= 0) {
        return;
      }
      newState = {
        x: this.state.x, 
        y: this.state.y,
        ...this.onResize({
          width: clip(width, 0, containerWidth - this.state.x),
          height: clip(height, 0, containerWidth - this.state.y)
        })
      }
    }
    if (this.props.onCrop) {
      this.props.onCrop(Object.assign({}, this.toNativeMetrics(newState)));
    }
    this.setState(newState);
  }

  getRatio() {
    return this.image.nativeSize.width / this.state.containerWidth;
  }

  toNativeMetrics({x, y, width, height}) {
    let ratio = this.getRatio();
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

    if (this.props.onCropEnd) {
      this.props.onCropEnd(data);
    }

  }

  sizeFromPercentage = (start) => {
    let [x, y, width, height] = start;
    const {containerWidth, containerHeight} = this.state;
    if (x <= 1 && y <= 1 && width <= 1 && height <= 1) {
      x = x * containerWidth;
      y = y * containerHeight;
      width = width * containerWidth;
      height = height * containerHeight;
    }
    return [x, y, width, height];
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
    let {isRetina, x, y, width, height} = this.state;
    let imgNode = this.getImageNode();
    let domSize = this.imageDomSize();
    this.domSize = domSize;

    this.image = this.image || {};
    this.image.nativeSize = {
      width: imgNode.naturalWidth,
      height: imgNode.naturalHeight
    };

    if (x <= 1 && y <= 1 && width <= 1 && height <= 1) {
      x = x * domSize.width;
      y = y * domSize.height;
      width = width * domSize.width;
      height = height * domSize.height;
    }

    this.setState({
      containerWidth: domSize.width,
      containerHeight: domSize.height,
      canvasWidth: domSize.width,
      canvasHeight: domSize.height,
      x,
      y,
      width,
      height
    });
  }

  render() {
    const {canvasWidth, canvasHeight} = this.state;
    return (
      <div
        onDrag={this.onDrag}
        style={{
          position: 'relative',
          height: 0,
          paddingBottom: (canvasHeight / canvasWidth) * 100 + '%',
          ...this.props.style
        }}
        onMouseDown={this.onMouseDown}
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
            isRetina={this.state.isRetina}
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
