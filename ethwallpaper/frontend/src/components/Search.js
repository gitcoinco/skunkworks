import React from 'react';
import { connect } from 'react-redux';

import { setSearch } from '../actions/filter';

class Search extends React.Component {
  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.props.dispatch(setSearch(e.target.value));
    }
  }

  render() {
    return (
      <section className="search-section">
        <h1>Wallpapers as decentralzed as your currency</h1>
        <input
          onKeyPress={this.handleKeyPress.bind(this)}
          className="search-text"
          placeholder="Search for free high-resolution wallpapaers"
          type="search"
        />
      </section>
    );
  }
}

const mapStateToProps = store => {
  return {
    search: store.search,
  };
};
export default connect(mapStateToProps)(Search);
