import React from 'react';
import { render } from 'react-dom';

import RangeSlider from './RangeSlider';
import RadialSlider from './RadialSlider';
import Tabs, { Item } from './Tabs';

class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {value: 10};
  }

  stopPropagation(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  handleChange(value, e) {
    this.stopPropagation(e);
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

class Tab extends React.Component {
  render() {
    return (
      <Tabs>
        <Item title='normal'>
          normal
        </Item>
        <Item title=':hover'>
          :hover
        </Item>
        <Item title=':active'>
          :active
        </Item>
      </Tabs>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div style={ {width: '300px', margin: '50px'} }>
        <Slider />
        <br />
        <br />
        <Circle />
        <br/>
        <Tab />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
