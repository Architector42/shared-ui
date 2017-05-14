import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.string.isRequired
};

const defaultProps = {

};

class Option extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <span className='select-field-list__item'>
        { this.props.children }
      </span>
    );
  }
}

Option.propTypes = propTypes;
Option.defaultProps = defaultProps;

export default Option;