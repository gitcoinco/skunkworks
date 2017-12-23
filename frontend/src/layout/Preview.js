import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header';
import WallpaperMeta from '../components/WallpaperMeta';
import Info from '../components/Info';
import Wallpapers from '../components/Wallpapers';

import { getWallpaper } from '../actions/wallpapers';

import './Preview.css';

class Preview extends Component {

  componentWillMount() {
    this.props.dispatch(getWallpaper(this.props.id));
  }

  render() {
    const { payload } = this.props.wallpaper;
    return (
      <div>
        <div className="preview">
          <Header />
          <div className="preview-wallpaper">
            <img src={payload.url} alt={payload.title} />
          </div>
        </div>
        <WallpaperMeta />
        <div className="preview-info">
          <div className="similar-wallpapers">
            <h3>Random Wallpapers</h3>
            <Wallpapers max={10} />
          </div>
          <Info />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    id: ownProps.match.params.id,
    wallpaper: state.wallpaper,
  };
}
export default connect(mapStateToProps)(Preview);
