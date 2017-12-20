import React from 'react';
import { connect } from 'react-redux';

import { likeWallpaper } from '../actions/wallpapers';
import { apiConfig, WALLPAPERS } from '../config/apiClient';

import './WallpaperMeta.css';

class WallpaperMeta extends React.Component {
  handleDownload() {
    const downloadUrl = `${apiConfig.url}${WALLPAPERS}${this.props.wallpaper.payload.id}/media/`;
    window.location.href = downloadUrl;
  }

  handleLike() {
    this.props.dispatch(likeWallpaper(this.props.wallpaper.payload.id));
  }

  render() {
    const { payload } = this.props.wallpaper;

    return (
      <div className="wallpaper-meta">
        <div className="left-section svg-background">
          {payload.author} &gt; {payload.title}
        </div>
        <div className="right-section">
          <span onClick={this.handleLike.bind(this)} id="likes-button" className="svg-background">
            {payload.likes}
          </span>
          <span onClick={this.handleDownload.bind(this)} id="downloads-button" className="svg-background">
            {payload.downloads}
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store, ownProps) => {
  return {
    wallpaper: store.wallpaper,
  };
};

export default connect(mapStateToProps)(WallpaperMeta);
