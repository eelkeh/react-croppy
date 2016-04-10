import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Cropper from '../src/components/Cropper';

let inputStyle = {
  width: '100%',
  //color: '#FF4136',
  color: 'rgba(0, 0, 0, 0.7)',
  fontSize: 16,
  border: 'none',
  padding: 16,
  margin: 0,
  width: '70%',
  outline: 'none',
  background: 'rgba(0, 0, 0, 0.03)',
  boxShadow: 'inset 0 0 1px rgba(0,0,0,0.2)',
}

let labelStyle = {
  display: 'block',
  fontSize: 16,
  color: 'rgba(0, 0, 0, 0.4)',
  margin: '12px 0 6px 0'
}

let statStyle = {
  fontSize: 16,
  color: '#F012BE',
  fontWeight: 500
}

let h1Style = {
  fontSize: 31,
  fontWeight: 700,
  // color: '#B50366',
  color: '#333',
  marginTop: '1em',
  marginBottom: '.3em',
}

let h3Style = {
  fontSize: 20,
  fontWeight: 300,
  color: '#444',
  // color: '#333',
  margin: '1em 0',
}

let introStyle = {
  fontSize: 20,
  marginBottom: '1em',
  color: 'rgba(0,0,0,.5)',
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

const Code = ({children}) => (
  <span style={{background: '#f5f2f0', padding: 3, fontWeight: 500}}>{children}</span>
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

  onCropEnd = crop => {
    this.updateCropInfo(crop);
    console.debug('%cCROP END', 'color: green');
    console.debug(crop);
  }

  genCodeSample() {
    return `<Cropper
      src="https://i.imgur.com/2Byd6ef.jpg"
      borderColor="#FO12BE"
      aspectRatio={16/9}
      onCropEnd={crop => console.debug(crop)}\n/>`.replace(/ {2,}/g,'  ');
  }

  genResult() {
    let {x, y, width, height} = this.state;
    return `{
      width: ${Math.round(width)},
      height: ${Math.round(height)},
      x: ${Math.round(x)},
      y: ${Math.round(y)},\n}`.replace(/ {2,}/g,'  ');
  }

  render() {
    let {
      color,
      aspectRatio
    } = this.state;
    return (
      <div style={{
        margin: 'auto',
        maxWidth: '700px',
      }}>
        <div>
          <h1 style={h1Style}>React Croppy</h1>
          <p style={introStyle}>
           A fully responsive zero-dependency image cropper
          </p>

          <img src="https://img.shields.io/npm/v/react-croppy.svg?maxAge=2592000&style=flat-square"/>

          <h3 style={h3Style}>
            Install instructions
          </h3>
          <pre>
            <code className="language-shell">npm install react-croppy</code>
          </pre>

          <h3 style={h3Style}>
            Include in your project
          </h3>
          <pre>
            <code className="language-js">import Cropper from react-croppy</code>
          </pre>

          <h3 style={h3Style}>
            Demo
          </h3>
          <div style={{display: 'flex'}}>
            <pre style={{flexBasis: '70%' }}>
              <code className="language-jsx">{this.genCodeSample()}</code>
            </pre>
            <pre style={{flexBasis: '30%', marginLeft: '.5em' }}>
              <code className="language-js">{this.genResult()}</code>
            </pre>
          </div>

          <Cropper
            onCrop={this.updateCropInfo}
            onCropEnd={this.onCropEnd}
            src='https://i.imgur.com/2Byd6ef.jpg'
            borderColor={color}
            start={[100, 100, 320, 180]}
          />

          <h3 style={h3Style}>
            API
          </h3>
          <ul style={{listStyle: 'circle inside'}}>
            <li><Code>src: string</Code> is the source of the image</li>
            <li><Code>borderColor: string</Code> is the CSS color of the border of the crop rectangle</li>
            <li><Code>aspectRatio: decimal</Code> optional aspect ratio (width / height) that will be enforced for the crop</li>
            <li><Code>onCrop()</Code> is a callback that's called on every crop</li>
            <li><Code>onCropStart(crop)</Code> is a callback that's called when the crop starts</li>
            <li><Code>onCropEnd(crop)</Code> is a callback that's called when the crop ends</li>
          </ul>
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
