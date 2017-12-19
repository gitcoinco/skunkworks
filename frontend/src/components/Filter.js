import React from 'react';
import { connect } from 'react-redux';

import { setFilter } from '../actions/filter';

import filterIcon from './filter-icon.png';

class Filter extends React.Component {
  onClick(size) {
    if (this.props.filter === size) {
      size = '';
    }
    this.props.dispatch(setFilter(size));
  }

  render() {
    const { filter } = this.props;
    return (
      <section className="filters">
        <ul>
          <li className={filter === '8k' ? 'selected' : ''}>
            <span onClick={this.onClick.bind(this, '8k')}>8k</span>
          </li>
          <li className={filter === '5k' ? 'selected' : ''}>
            <span onClick={this.onClick.bind(this, '5k')}>5k</span>
          </li>
          <li className={filter === '4k' ? 'selected' : ''}>
            <span onClick={this.onClick.bind(this, '4k')}>4k</span>
          </li>
          <li className={filter === 'tablet' ? 'selected' : ''}>
            <span onClick={this.onClick.bind(this, 'tablet')}>Tablet</span>
          </li>
          <li className={filter === 'phone' ? 'selected' : ''}>
            <span onClick={this.onClick.bind(this, 'phone')}>Phone</span>
          </li>
          <li>
            <img className="filter-icon" src={filterIcon} alt="filter" />
          </li>
        </ul>
      </section>
    );
  }
}

const mapStateToProps = store => {
  return {
    filter: store.filter,
  };
};

export default connect(mapStateToProps)(Filter);
