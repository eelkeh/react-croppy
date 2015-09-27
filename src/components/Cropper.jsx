import React, {PropTypes, Component} from 'react';
import Rect from './Rect';
import {clip, isRetina, recursiveOffset} from '../utils';

export default class Cropper extends Component {

  static propTypes = {
    src: PropTypes.string.isRequired,
    minCropWidth: PropTypes.number,
    maxCropWidth: PropTypes.number,
    borderColor: PropTypes.string,
    style: PropTypes.object
  }

  static defaultProps = {
    minCropWidth: 0,
    minCropHeight: 0,
    borderColor: '#FF4136', // red
    style: {}
  }

  constructor(props) {
    super(props);
    this.state = {
      canvasWidth: 0,
      canvasHeight: 0,
      x: null,
      y: null,
      width: 0,
      height: 0,
      resizing: false,
      dragging: false,
      isRetina: isRetina()
    };
  }

  componentDidMount() {
    this.setupListeners();
    let node = React.findDOMNode(this);
    this.offsetLeft = node.offsetLeft;
    this.offsetTop = node.offsetTop;
  }

  componentWillUnmount() {
    this.teardownListeners();
  }

  setupListeners() {
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
  }

  teardownListeners() {
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
  }

  getPosition = (e) => {
    let off = recursiveOffset(e.target);
    console.log(off);
    // let x = e.pageX - this.offsetLeft - off.x;
    // let y = e.pageY - this.offsetTop - off.y;
    let x = e.pageX + off.x;
    let y = e.pageY + off.y;
    console.log(x, y);
    // let x = e.layerX;
    // let y = e.layerY;
    //console.log(x, y, x1, y1);
    return {x, y};
  }

  posCollidesCrop = (pos) => {
    let {x, y} = pos;
    return ((x >= this.state.x && x <= (this.state.x + this.state.width))
        && (y >= this.state.y && y <= (this.state.y + this.state.height)));
  }

  posCollidesResizeHandler = (pos) => {
    let {x, y} = pos;
    let handlerX = this.state.x + this.state.width - 20;
    let handlerY = this.state.y + this.state.height - 20;
    return ((x >= handlerX && x <= (handlerX + 20))
        && (y >= handlerY && y <= (handlerY + 20)));
  }

  cropIsActive = () => {
    return this.state.width && this.state.height;
  }

  getDelta = (pos) => {
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
        this.setState({resizing: true});
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
    let {width, height, containerWidth, containerHeight, delta} = this.state;
    let newState = {};
    if (this.state.dragging) {
      newState = {
        x: clip(x - delta.x, 0, containerWidth - width),
        y: clip(y - delta.y, 0, containerHeight - height)
      };
    }
    else if (this.state.resizing) {
      width = x - this.state.x;
      height = y - this.state.y;
      if (width <= 0 || height <= 0) {
        return;
      }
      newState = this.onResize({
        width: clip(width, 0, containerWidth - this.state.x),
        height: clip(height, 0, containerWidth - this.state.y)
      });
    }
    this.setState(newState);
    return;
  }

  isInBounds = ({x, y, width, height}) => {
    return ((x + width <= this.state.containerWidth) &&
            (y + height <= this.state.containerHeight));
  }

  getRatio() {
    return this.state.containerWidth / this.image.nativeSize.width;
  }

  onMouseUp = () => {
    if (!this.state.dragging && !this.state.resizing) {
      return;
    }
    let ratio = this.getRatio();
    let {x, y, width, height} = this.state;
    let data = {
      nativeSize: this.image.nativeSize,
      x: ratio * x,
      y: ratio * y,
      width: ratio * width,
      height: ratio * height
    };

    this.setState({
      resizing: false,
      dragging: false
    });

    if (this.props.onCrop) {
      this.props.onCrop(data);
    }

  }

  computeSize = () => {
    let imgNode = React.findDOMNode(this.refs.image);
    let cs = window.getComputedStyle(imgNode);
    let canvasWidth = parseInt(cs.getPropertyValue('width').slice(0, -2), 10);
    let canvasHeight = parseInt(cs.getPropertyValue('height').slice(0, -2), 10);
    let {isRetina} = this.state;

    this.image = this.image || {};
    this.image.nativeSize = {
      width: imgNode.naturalWidth,
      height: imgNode.naturalHeight
    };
    this.setState({
      containerWidth: isRetina ? canvasWidth : canvasWidth,
      containerHeight: isRetina ? canvasHeight : canvasHeight,
      canvasWidth,
      canvasHeight
    });
  }

  render() {
    return (
      <div
        onDrag={this.onDrag}
        style={{position: 'relative', ...this.props.style}}
        onMouseDown={this.onMouseDown}
        >
        <div
          style={{position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
          <Rect
            canvasWidth={this.state.canvasWidth}
            canvasHeight={this.state.canvasHeight}
            width={this.state.width}
            height={this.state.height}
            x={this.state.x}
            y={this.state.y}
            borderColor={this.props.borderColor}
            isRetina={this.state.isRetina}
          />
        </div>
        <img
          ref='image'
          onLoad={this.computeSize}
          style={{position: 'absolute', top: 0, left: 0, zIndex: 0}}
          src={this.props.src}/>
      </div>
    );
  }
}
