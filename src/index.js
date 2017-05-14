import React from 'react';
import { render } from 'react-dom';

import RangeSlider from './RangeSlider';
import RadialSlider from './RadialSlider';
import Tabs, { Item } from './Tabs';
import TextInput from './TextInput';
import SelectField, { Option } from './SelectField';

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

class Tab extends React.Component {
  render() {
    return (
      <Tabs active={ 1 }>
        <Item title='normal'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Proin suscipit interdum commodo.
          Sed imperdiet porta rutrum.
          Vivamus sodales egestas nisl, ut finibus eros porttitor eu.
          Sed non elit id tortor eleifend congue.
          Vivamus sed odio at orci posuere pretium non ut risus.
          Vestibulum ut nunc purus. Nullam id erat odio.
          Vestibulum faucibus congue magna, scelerisque rhoncus arcu laoreet eu.
        </Item>
        <Item title=':hover'>
          Sed imperdiet porta rutrum.
          Vivamus sodales egestas nisl, ut finibus eros porttitor eu.
          Sed non elit id tortor eleifend congue.
        </Item>
        <Item title=':active'>
          Sed non elit id tortor eleifend congue.
        </Item>
      </Tabs>
    );
  }
}

class Select extends React.Component {
  render() {
    return (
      <SelectField>
        <Option> Chrome </Option>
        <Option> Mozila </Option>
        <Option> Opera </Option>
      </SelectField>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div style={ {width: '250px', margin: '50px'} }>
        <Slider />
        <br />
        <br />
        <Circle />
        <br/>
        <Tab />
        <br />
        <TextInput template='number' />
        <br/>
        <Select/>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
