import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  active: PropTypes.number,
  children: PropTypes.node
};

const defaultProps = {
  active: 0
};

class SelectField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      active: this.props.active
    };
  }

  handleClickOpen() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  handleClickActive(index) {
    this.setState({ active: index, isOpen: false });
  }

  render() {
    const list = () => {
      if (!this.state.isOpen) return; 

      return (
        <ul>
          { 
            this.props.children.map((item, index) => (
              <li
                key={ index } 
                onClick={ this.handleClickActive.bind(this, index) }
              >
                {item.props.children}
              </li>
            ))
          }
        </ul>
      );
    };

    return (
      <div className='select-field'>
        <div onClick={ ::this.handleClickOpen }> 
          { this.props.children[this.state.active] }
        </div>
        { list() }
      </div>
    );
  }
}

SelectField.propTypes = propTypes;
SelectField.defaultProps = defaultProps;

export default SelectField;