import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  active: PropTypes.number,
  children: PropTypes.arrayOf(PropTypes.element).isRequired
};

const defaultProps = {
  active: 0
};

class Tabs extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      active: this.props.active
    };
  }

  handleClick(index) {
    this.setState({ active: index });
  }

  render() {
    const { children } = this.props;

    console.log(this.state.active);

    return (
      <div className='tabs'>
        <ul className='tabs-links'>
          { 
            children.map((item, index) =>
              <li 
                className='tabs-links__link' 
                key={ index }
                onClick={ this.handleClick.bind(this, index) }
              > 
                { item.props.title } 
              </li>
            )
          }
        </ul>
        { this.props.children[this.state.active] }
      </div>
    );
  }
}

Tabs.propTypes = propTypes;
Tabs.defaultProps = defaultProps;

export default Tabs;