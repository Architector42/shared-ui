import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as pattern from './patterns';

const propTypes = {
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  template: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

const defaultProps = {
  minLength: 0,
  maxLength: 30,
  template: /^[a-zA-Z0-9]+$/,
  value: '',
  placeholder: ''
};

class TextInput extends Component {
  constructor(props) {
    super(props);

    this.handleChange = ::this.handleChange;
    this.handleBlur = ::this.handleBlur;

    this.state = {
      value: this.props.value,
      valid: false
    };
  }

  getRegExp() {
    const { template } = this.props;

    switch (template) {
      case 'number':
        return pattern.number;
      default:
        return /^[a-zA-Z0-9]+$/; 
    }
  }

  isRange() {
    const { minLength, maxLength } = this.props;
    const { value } = this.state;

    const length = value.length;

    if (length < minLength || maxLength < length) {
      return false;
    }

    return true;
  }

  isValid() {
    const regexp = this.getRegExp();
    const value = this.state.value;
    const valid = regexp.test(value);

    return valid;
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  handleBlur(e) {
    const valid = this.isValid();
    const range = this.isRange();

    if (valid && range) {
      e.target.style.borderColor = '#27ae60';
    } else {
      e.target.style.borderColor = '#c0392b';
    }
    
  }

  render() {
    return (
      <div className='text-input'>
        <input 
          className='text-input__input'
          type='text' 
          value={ this.state.value } 
          onChange={ this.handleChange }
          onBlur={ this.handleBlur }
        />
        <p className='text-input__message'>  </p>
      </div>
    );
  }
}

TextInput.propTypes = propTypes;
TextInput.defaultProps = defaultProps;

export default TextInput;
