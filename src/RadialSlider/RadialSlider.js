import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  radius: PropTypes.number,
  thumbRadius: PropTypes.number,
  title: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  value: PropTypes.number,
  onChange: PropTypes.func
};

const defaultProps = {
  radius: 60,
  thumbRadius: 8,
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
      arc: null,
      fill: null,
      thumb: null
    };
  }

  componentDidMount() {
    const arc = this.arc;
    const fill = this.fill;
    const thumb = this.thumb;

    this.setState({
      arc,
      fill,
      thumb
    });
  }

  noneSpread(e) {
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
    const { arc } = this.state;

    const direction = arc.getBoundingClientRect();

    return {
      x: direction.left + radius,
      y: direction.top + radius
    };
  }

  getCircleLenth() {
    const { fill } = this.state;

    if (!fill) {
      return 0;
    }

    const length = fill.getTotalLength();
    return length;
  }

  getCircleFill(length, angle) {
    const ratio = length / 360;
    const fill = length - ratio * angle;

    return fill;
  }

  scale(dx, dy) {
    const { radius } = this.props;

    if (dx === 0 && dy === 0) {
      return radius;
    }

    return radius / Math.sqrt(dx*dx + dy*dy);
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

    this.noneSpread(e);

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
    const { radius, thumbRadius } = this.props;

    const point = this.getPoint(e);
    const circleCenter = this.getCircleCenter();
    const dx = point.x - circleCenter.x;
    const dy = point.y - circleCenter.y;
    const scale = this.scale(dx, dy);

    const x = Math.round(dx * scale + radius) - thumbRadius;
    const y = Math.round(dy * scale + radius) - thumbRadius;

    return {
      x,
      y
    };
  }

  getAngleToPosition(position) {
    const { radius, thumbRadius } = this.props;

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
    const { radius, thumbRadius, value } = this.props;

    const angle = this.getAngleToValue(value);
    const position = this.getPositionToAngle(angle);

    const canvasSize = (radius + thumbRadius) * 2;
    const length = this.getCircleLenth();
    const fill = this.getCircleFill(length, angle);

    const textCenter = radius + thumbRadius + 1;

    return (
      <div className='radial-slider'>
        <h6 className='radial-slider__title'>
          { this.props.title }
        </h6>
        <div className='radial-slider__container'>
          <svg
            width={ canvasSize }
            height={ canvasSize }
          >
            <text
              x={ textCenter }
              y={ textCenter }
              textAnchor='middle'
              fontFamily='Verdana'
              fontSize='18'
            >
              {value}
            </text>
            <circle
              ref={ node => this.arc = node }
              className='radial-slider__arc'
              cx={ radius + thumbRadius }
              cy={ radius + thumbRadius }
              r={ radius }
            />
            <circle
              ref={ node => this.fill = node }
              className='radial-slider__fill'
              cx={ radius + thumbRadius }
              cy={ radius + thumbRadius }
              r={ radius }
              strokeDasharray={ length }
              strokeDashoffset={ fill }
              transform={
                `rotate(-90 ${radius + thumbRadius} ${radius + thumbRadius})`
              }
            />
          </svg>
          <div
            className='radial-slider__thumb'
            ref={ node => this.thumb = node }
            style={ {
              left: position.x  + 'px',
              top: position.y  + 'px'
            } }
            onMouseDown={ this.handleStart }
            onMouseUp={ this.handleEnd }
          />
        </div>
      </div>
    );
  }
}

RadialSlider.propTypes = propTypes;
RadialSlider.defaultProps = defaultProps;

export default RadialSlider;
