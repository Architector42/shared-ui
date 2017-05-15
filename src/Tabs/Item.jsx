import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  title: PropTypes.string,
  children: PropTypes.node
};

const defaultProps = {
  title: 'link' 
};

class Item extends Component {
  render() {
    return (
      <div className='tabs__content'>
        {this.props.children}
      </div>
    );
  }
}

Item.propTypes = propTypes;
Item.defaultProps = defaultProps;

export default Item;
