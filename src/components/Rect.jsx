import React, {PropTypes, Component} from 'react';

export default class Rect extends Component {

  static propTypes = {
    canvasWidth: PropTypes.number.isRequired,
    canvasHeight: PropTypes.number.isRequired,
    borderColor: PropTypes.string.isRequired,
    isRetina: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
  }

  paint = (coords) => {
    let {x, y, width, height} = coords;
    let handlerSize = 20;
    if (this.props.isRetina) {
      x = x * 2;
      y = y * 2;
      width = width * 2;
      height = height * 2;
      handlerSize = handlerSize * 2;
    }
    let {canvasWidth, canvasHeight} = this.props;
    let node = React.findDOMNode(this);
    let context = node.getContext('2d');
    context.clearRect(0, 0, node.width, node.height);
    if (!width || !height) {
      return;
    }
    context.strokeStyle = this.props.borderColor;
    context.fillStyle = 'rgba(0, 0, 0, 0.3)';
    context.beginPath();
    context.rect(x, y, width, height);
    context.stroke();
    context.rect(node.width, 0, -node.width, node.height);
    // credit: http://stackoverflow.com/a/11770000/337480
    // fix for safari
    context.fill('evenodd');
    context.fillStyle = this.props.borderColor;
    context.fillRect(x + width - handlerSize,
                     y + height - handlerSize,
                     handlerSize,
                     handlerSize);
  }

  componentDidUpdate() {
    let {x, y, height, width} = this.props;
    if (x !== null && y !== null) {
      this.paint({
        x,
        y,
        width,
        height
      });
    }
  }

  render() {
    let {canvasWidth, canvasHeight, isRetina} = this.props;
    let props = {};
    if (isRetina) {
      props.style = {
        width: canvasWidth,
        height: canvasHeight
      }
    }
    return (
      <canvas
        {...props}
        width={isRetina ? canvasWidth * 2 : canvasWidth}
        height={isRetina ? canvasHeight * 2 : canvasHeight}
      />
    );
  }
}
