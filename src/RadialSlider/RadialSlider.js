import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  radius: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  value: PropTypes.number,
  onChange: PropTypes.func
};

const defaultProps = {
  radius: 60,
  min: 0,
  max: 100,
  step: 1,
  value: 1,
  onChange: PropTypes.func
};

class RadialSlider extends Component {
  constructor(props) {
    super(props);

    this.handleStart = ::this.handleStart;
    this.handleMove = ::this.handleMove;
    this.handleEnd = ::this.handleEnd;

    this.state = {
      slider: null,
      arc: null,
      fill: null,
      thumb: null
    };
  }

  componentDidMount() {
    const slider = this.slider;
    const arc = this.arc;
    const fill = this.fill;
    const thumb = this.thumb;

    this.setState({
      slider,
      arc,
      fill,
      thumb
    });
  }

  stopPropagation(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  getPoint(e) {
    return {
      x: e.clientX,
      y: e.clientY
    };
  }

  getCircleCenter() {
    const { radius } = this.props;
    const { slider } = this.state;

    const direction = slider.getBoundingClientRect();

    return {
      x: direction.left + radius,
      y: direction.top + radius
    };
  }

  step(ratio) {
    const { step } = this.props;

    return step * Math.round(ratio / step);
  }

  // handles
  handleStart() {
    document.addEventListener('mousemove', this.handleMove);
    document.addEventListener('mouseup', this.handleEnd);
  }

  handleMove(e) {
    const { onChange } = this.props;

    this.stopPropagation(e);

    const position = this.position(e);
    const angle = this.getAngleToPosition(position);
    const value = this.getValueToAngle(angle);

    onChange(value);
  }

  handleEnd() {
    document.removeEventListener('mousemove', this.handleMove);
    document.removeEventListener('mouseup', this.handleEnd);
  }

  position(e) {
    const { radius } = this.props;
    const { thumb } = this.state;

    const thumbRadius = thumb.r.baseVal.value;

    const point = this.getPoint(e);
    const circleCenter = this.getCircleCenter();
    const dx = point.x - circleCenter.x;
    const dy = point.y - circleCenter.y;
    const scale = radius / Math.sqrt(dx*dx + dy*dy);

    const x = Math.round(dx * scale + radius) - thumbRadius;
    const y = Math.round(dy * scale + radius) - thumbRadius;

    return {
      x,
      y
    };
  }

  getAngleToPosition(position) {
    const { radius } = this.props;
    const { thumb } = this.state;

    const thumbRadius = thumb.r.baseVal.value;

    const x = position.x - radius + thumbRadius;
    const y = position.y - radius + thumbRadius;
    const atan = Math.atan2(x, y);
    const angle = -atan / (Math.PI / 180) + 180;

    return Math.round(angle);
  }

  getValueToAngle(angle) {
    const { max, min } = this.props;

    const ratio = (angle / 360) * (max - min);
    const step = this.step(ratio);
    const value = step + min;

    return value;
  }

  getAngleToValue(value) {
    const { max, min } = this.props;

    const angle = (value - min) / (max - min) * 360;

    return angle;
  }

  getPositionToAngle(angle) {
    const { radius } = this.props;

    const x = Math.round(radius * Math.sin(angle * Math.PI / 180)) + radius;
    const y = Math.round(radius * -Math.cos(angle * Math.PI / 180)) + radius;

    return {
      x,
      y
    };
  }

  render() {
    const { value } = this.props;

    const angle = this.getAngleToValue(value);
    const position = this.getPositionToAngle(angle);

    return (
      <div className="radial-slider"
        ref={ node => this.slider = node }
      >

        <svg
          width={ 138 }
          height={ 138 }
        >
          <circle
            ref={ node => this.arc = node }
            className='radial-slider__arc'
            cx={ 68 }
            cy={ 68 }
            r={ 60 }


          />
          <circle
            ref={ node => this.fill = node }
            className='radial-slider__arc'
            cx={ 68 }
            cy={ 68 }
            r={ 60 }
            strokeDasharray={ 600 }
            strokeDashoffset={ 600 }
          />
          <circle
            ref={ node => this.thumb = node }
            className='radial-slider__thumb'
            cx={ position.x + 8 }
            cy={ position.y + 8 }
            r={ 8 }
            onMouseDown={ this.handleStart }
            onMouseUp={ this.handleEnd }
          />
        </svg>
      </div>
    );
  }
}

RadialSlider.propTypes = propTypes;
RadialSlider.defaultProps = defaultProps;

export default RadialSlider;
