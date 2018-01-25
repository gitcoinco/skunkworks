import React from 'react';
import { connect } from 'react-redux';

import './Info.css';

class Info extends React.Component {
  render() {
    const { payload } = this.props.wallpaper;

    return (
      <div className="wallpaper-info">
        <h3>Info</h3>
        <h5>Description</h5>
        <div>{payload.description}</div>
        <h5>Resolution</h5>
        <div>{payload.resolution}</div>
        <h5>License</h5>
        <div>Creative Commons</div>
      </div>
    );
  }
}

const mapStateToProps = (store, ownProps) => {
  return {
    wallpaper: store.wallpaper,
  };
};

export default connect(mapStateToProps)(Info);
