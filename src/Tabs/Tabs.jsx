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
      active: this.props.active,
      width: []
    };
  }

  componentDidMount() {
    const list = this.list;

    this.getWidth(list);
  }

  noneSpread(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  handleClick(index, e) {
    this.noneSpread(e);
    this.setState({ active: index });
    this.getPositionLine();
  }

  getWidth(list) {
    const arr = [];

    [].map.call(list.children, li => {
      arr.push(li.clientWidth);
    });

    this.setState({ width: arr });
  }

  getPositionLine() {
    const { active, width } = this.state;
    let position = 0;

    for (var i = 0; i < active; i++) {
      position += width[i];
    }

    return {
      position: position, 
      width: width[active]
    };
  }

  render() {
    const { children } = this.props;

    const line = this.getPositionLine();
    const lineStyle = {
      transform: `translate(${line.position}px)`,
      width: `${line.width}px`
    };

    return (
      <div className='tabs'>
        <ul className='tabs-links' ref={ node => this.list = node }>
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
        <div className='tabs__line' style={ lineStyle }/>
        { this.props.children[this.state.active] }
      </div>
    );
  }
}

Tabs.propTypes = propTypes;
Tabs.defaultProps = defaultProps;

export default Tabs;
