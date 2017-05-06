import React, { Component, PropTypes } from 'react';

const propTypes = {
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
  value: 0
};

class RangeSlider extends Component {
  constructor(props) {
    super(props);

    this.handleStart = ::this.handleStart;
    this.handleMove = ::this.handleMove;
    this.handleEnd = ::this.handleEnd;

    this.state = {
      track: 0,
      thumb: 0,
      value: this.props.value
    };

    this.value = this.props.value;
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

  stopPropagation(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  // handles
  handleStart() {
    document.addEventListener('mousemove', this.handleMove);
    document.addEventListener('mouseup', this.handleEnd);
  }

  handleMove(e) {
    this.stopPropagation(e);

    const position = this.position(e);
    const value = this.getValue(position);

    this.setState({value});
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

  getValue(position) {
    const { min, max } = this.props;
    const { track } = this.state;

    const ratio = max / track;
    const value = Math.round(ratio * position);

    if (value < min) return min;
    if (value > max) return max;

    return value;
  }

  getPosition(value) {
    const { max } = this.props;
    const { track } = this.state;

    const ratio = value / max;
    const position = Math.round(ratio * track);

    return position;
  }

  render() {
    const position = this.getPosition(this.state.value);

    const styleThumb = {
      left: position + 'px'
    };

    const styleFill = {
      width: position + 'px'
    };

    return (
      <div>
        <div className='range-slider'
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
        {'Position ' + position + 'Value' + this.state.value}
      </div>
    );
  }
}

RangeSlider.propTypes = propTypes;
RangeSlider.defaultProps = defaultProps;

export default RangeSlider;
