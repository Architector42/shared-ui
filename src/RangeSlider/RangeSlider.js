import React, { Component, PropTypes } from 'react';

const propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number
};

const defaultProps = {
  min: 0,
  max: 100,
  step: 1
};

class RangeSlider extends Component {
  constructor(props) {
    super(props);

  }

  stopPropagation(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  handleStart() {
    document.addEventListener('mousemove', this.handleMove);
    document.addEventListener('mouseup', this.handleEnd);
  }

  handleMove(e) {
    this.stopPropagation(e);


  }

  handleEnd() {
    document.removeEventListener('mousemove', this.handleMove);
    document.removeEventListener('mouseup', this.handleEnd);
  }

  position() {

  }

  render() {
    return (
      <div className='range-slider'>
        <div className='range-slider__fill' />
        <div className='range-slider__thumb'
          onMouseDown={ this.handleStart }
          onMouseUp={ this.handleEnd }
        />
      </div>
    );
  }
}

RangeSlider.propTypes = propTypes;
RangeSlider.defaultProps = defaultProps;

export default RangeSlider;
