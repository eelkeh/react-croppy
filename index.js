import React from 'react';
import Cropper from '../src/components/Cropper';

React.render(
  // <div style={{width: '700px', margin: '0 auto', position: 'fixed', height: '50%', overflow: 'auto', top: '12px' }}>
  <div>
    <Cropper
      style={{maxWith: '100%'}}
      src='http://i.imgur.com/6K5iXpV.jpg'
      borderColor='#FFDC00'
      start={[0.1, 0.1, 0.5, 0.5]}
      aspectRatio={16 / 9}/>
    <p>Something else</p>
  </div>, document.getElementById('root'));
//minCropWidth={100}
