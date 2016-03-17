import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Cropper from '../src/components/Cropper';

var inputStyle = {
  width: '100%',
  //color: '#FF4136',
  color: 'rgba(0, 0, 0, 0.7)',
  fontSize: '16px',
  border: 'none',
  padding: '16px',
  margin: 0,
  width: '70%',
  outline: 'none',
  background: 'rgba(0, 0, 0, 0.03)',
  boxShadow: 'inset 0 0 1px rgba(0,0,0,0.2)',
}

var labelStyle = {
  display: 'block',
  fontSize: '16px',
  color: 'rgba(0, 0, 0, 0.4)',
  margin: '12px 0 6px 0'
}

var statStyle = {
  fontSize: '16px',
  color: '#F012BE',
  fontWeight: 500
}

const Input = (props) => (
  <div>
    <label style={labelStyle}>{props.label}</label>
    <input
      value={props.value}
      onChange={props.onChange}
      style={inputStyle}
      placeholder={props.label}/>
  </div>
);

class Demo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      color: '#FFDC00',
      aspectRatio: 16/9,
      crop: {}
    }
  }

  handleChange(key, e) {
    let keyVal = {};
    keyVal[key] = e.target.value;
    this.setState(keyVal);
  }

  updateCropInfo = (crop) => {
    this.setState({
      ...crop
    });
  }

  render() {
    let {
      color,
      aspectRatio
    } = this.state;
    return (
      <div style={{
        margin: 'auto',
        maxWidth: '900px'
      }}>
        <div style={{
          boxSizing: 'border-box',
          width: '50%', 
          float: 'left'
        }}>
          <Cropper
            onCrop={this.updateCropInfo}
            onCropEnd={this.updateCropInfo}
            style={{maxWith: '100%'}}
            src='http://i.imgur.com/2Byd6ef.jpg'
            borderColor={color}
            start={[10, 10, 100, 100]}
            aspectRatio={aspectRatio}/>
        </div>

        <div style={{
          boxSizing: 'border-box',
          width: '50%', 
          float: 'right', 
          paddingLeft: '16px'
        }}>
          <Input
            label="Color"
            value={this.state.color}
            onChange={e => this.handleChange('color', e)}
            />
          <Input
            label="Aspect Ratio"
            value={this.state.aspectRatio}
            onChange={e => this.handleChange('aspectRatio', e)}
            />
          <div>
            <div style={statStyle}>
              width: {Math.round(this.state.width)}
            </div>
            <div style={statStyle}>
              height: {Math.round(this.state.height)}
            </div>
            <div style={statStyle}>
              x: {Math.round(this.state.x)}
            </div>
            <div style={statStyle}>
              y: {Math.round(this.state.y)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Demo/>
  // <div style={{width: '700px', margin: '0 auto', position: 'fixed', height: '50%', overflow: 'auto', top: '12px' }}>
 , document.getElementById('root'));
//minCropWidth={100}
//
