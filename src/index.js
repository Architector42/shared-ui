import React from 'react';
import { render } from 'react-dom';

import RangeSlider from './RangeSlider';

class App extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <RangeSlider />
        <h1 style={ {color: 'red'} }> Test 3 </h1>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
