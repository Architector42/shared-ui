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
      list: [],
      isOpen: false,
      active: this.props.active,
      search: ''
    };
  }

  componentDidMount() {
    this.getChildren();
  }

  getChildren() {
    const { children } = this.props;
    const list = [];

    children.forEach(item => (
      list.push({
        isOpen: false,
        value: item.props.value,
        label: item.props.children
      })
    ));

    this.setState({ list });
  }

  filterList(item, index) {
    const { search } = this.state;

    if (item.label.toLowerCase().indexOf(search) !== -1 ) {
      return this.renderListItem(item, index);
    }
  }

  // handles
  handleClickOpen() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  handleClickActive(index) {
    this.setState({ active: index, isOpen: false, search: ''  });
  }

  handleKeyEnterActive(index) {
    this.setState({ active: index, isOpen: false });
  }

  handleChangeInput(e) {
    const value = e.target.value.toLowerCase();

    this.setState({ search: value });
  }

  handleFocusClear(e) {
    console.log(e.target);
    this.setState({ isOpen: false });
  }

  // renders
  renderSelectField() {
    const { isOpen, list, active } = this.state;

    if (isOpen) {
      return (
        <div>
          <input
            type='text'
            className='select-field__input'
            onChange={ ::this.handleChangeInput }
            autoFocus
          />
        </div>
      );
    }

    return (
      <div
        className='select-field__active'
        onClick={ ::this.handleClickOpen }
      >
        { list[active] ? list[active].label : null }
      </div>
    );
  }

  renderListItem(item, index) {
    return (
      <li
        className='select-field-list__item'
        key={ index }
        onClick={ this.handleClickActive.bind(this, index) }>
        { item.label }
      </li>
    );
  }

  renderList() {
    const { isOpen, list } = this.state;

    if (!isOpen) return;

    const items = list.map(::this.filterList);

    return (
      <ul className='select-field-list'>
        {
          items
        }
      </ul>
    );
  }

  render() {
    return (
      <div className='select-field'>
        { this.renderSelectField() }
        { this.renderList() }
      </div>
    );
  }
}

SelectField.propTypes = propTypes;
SelectField.defaultProps = defaultProps;

export default SelectField;
