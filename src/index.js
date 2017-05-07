import React from 'react';
import { render } from 'react-dom';

import RangeSlider from './RangeSlider';
import RadialSlider from './RadialSlider';

class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {value: 10};
  }

  handleChange(value) {
    this.setState({value});
  }

  render() {
    return (
      <RangeSlider
        title='Width'
        unit='px'
        value={ this.state.value }
        onChange={ ::this.handleChange }
      />
    );
  }
}

class Circle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {value: 10};
  }

  handleChange(value) {
    this.setState({value});
  }

  render() {
    return (
      <RadialSlider
        title='Angle'
        min={ 0 }
        max={ 360 }
        value={ this.state.value }
        onChange={ ::this.handleChange }
      />
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div style={ {width: '200px', margin: '50px'} }>
        <Slider />
        <br />
        <br />
        <Circle />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
