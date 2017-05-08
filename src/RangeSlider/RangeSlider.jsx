import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  title: PropTypes.string,
  unit: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  value: PropTypes.number,
  onChange: PropTypes.func
};

const defaultProps = {
  min: 0,
  max: 100,
  step: 1,
  value: 1,
  title: '',
  unit: ''
};

class RangeSlider extends Component {
  constructor(props) {
    super(props);

    this.handleStart = ::this.handleStart;
    this.handleMove = ::this.handleMove;
    this.handleEnd = ::this.handleEnd;

    this.state = {
      track: 0,
      thumb: 0
    };
  }

  componentDidMount() {
    const nodeTrack = this.track;
    const nodeThumb = this.thumb;

    const track = nodeTrack.clientWidth;
    const thumb = nodeThumb.clientWidth;

    this.setState({
      track: track - thumb,
      thumb: thumb / 2
    });
  }

  noneSpread(e) {
    e.stopPropagation();
    e.preventDefault();
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
    const value = this.getValue(position);

    onChange(value);
  }

  handleEnd() {
    document.removeEventListener('mousemove', this.handleMove);
    document.removeEventListener('mouseup', this.handleEnd);
  }

  position(e) {
    const { thumb } = this.state;

    const point = e.clientX;
    const direction = this.track.getBoundingClientRect();
    const position = point - direction.left - thumb;

    return position;
  }

  step(ratio) {
    const { min, max, step } = this.props;

    return step * Math.round(ratio * (max - min) / step);
  }

  getValue(position) {
    const { min, max } = this.props;
    const { track } = this.state;

    const ratio = position / track;
    const step = this.step(ratio);
    const value = Math.round(step + min);

    if (value < min) return min;
    if (value > max) return max;

    return value;
  }

  getPosition(value) {
    const { min, max } = this.props;
    const { track } = this.state;

    const ratio = (value - min) / (max - min);
    const position = Math.round(ratio * track);

    return position;
  }

  render() {
    const position = this.getPosition(this.props.value);

    const styleThumb = {
      left: position + 'px'
    };

    const styleFill = {
      width: position + 'px'
    };

    return (
      <div className="range-slider">
        <h6 className="range-slider-header">
          <span className="range-slider-header__title">
            { this.props.title }
          </span>
          <span className="range-slider-header__value">
            { `${this.props.value}${this.props.unit}` }
          </span>
        </h6>
        <div className='range-slider__track'
            ref={ node => this.track = node }>
          <div className='range-slider__fill'
              style={ styleFill }
          />
          <div className='range-slider__thumb'
            ref={ node => this.thumb = node }
            style={ styleThumb }
            onMouseDown={ this.handleStart }
            onMouseUp={ this.handleEnd }
          />
        </div>
      </div>
    );
  }
}

RangeSlider.propTypes = propTypes;
RangeSlider.defaultProps = defaultProps;

export default RangeSlider;
