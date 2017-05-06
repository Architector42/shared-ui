import React from 'react';
import { render } from 'react-dom';

import RangeSlider from './RangeSlider';

class App extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div style={ {width: '200px', margin: '50px'} }>
        <RangeSlider />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
