import React from 'react';
import { connect } from 'react-redux';

import { likeWallpaper, reportWallpaper, getWallpaper } from '../actions/wallpapers';
import { apiConfig, WALLPAPERS } from '../config/apiClient';
import { LinearProgress } from 'material-ui/Progress';

import './WallpaperMeta.css';

class WallpaperMeta extends React.Component {

  state = {
    updated: true
  }

  handleDownload() {
    const downloadUrl = `${apiConfig.url}${WALLPAPERS}${this.props.wallpaper.payload.id}/media/`;
    window.location.href = downloadUrl;
  }

  handleLike() {
    this.setState({ updated: false });
    this.props.dispatch(likeWallpaper(this.props.wallpaper.payload.id));
  }

  handleReport() {
    this.setState({ updated: false });
    this.props.dispatch(reportWallpaper(this.props.wallpaper.payload.id));
  }

  componentDidUpdate() {
    if (this.props.activity.fetched && !this.state.updated) {
      this.setState({ updated: true });
      this.props.dispatch(getWallpaper(this.props.wallpaper.payload.id));
    }
  }

  render() {
    const { payload } = this.props.wallpaper;
    const cls = this.props.activity.fetching ? "progress-on" : "progress-off";

    return (
      <div className="wallpaper-meta">
        <LinearProgress className={cls} />
        <div className="left-section svg-background">
          {payload.author} &gt; {payload.title}
        </div>
        <div className="right-section">
          <span onClick={this.handleReport.bind(this)} id="report-button" className="svg-background">
            {payload.reports}
          </span>
          <span onClick={this.handleLike.bind(this)} id="likes-button" className="svg-background">
            {payload.likes}
          </span>
          <span onClick={this.handleDownload.bind(this)} id="downloads-button" className="svg-background">
            {payload.downloads}
          </span>
        </div>

        <a class="twitter-share-button"
          href="https://twitter.com/intent/tweet?text=Check out this #ETH Wallpaper:"
          data-size="large">
          Tweet</a>
      </div>
    );
  }
}

const mapStateToProps = (store, ownProps) => {
  return {
    wallpaper: store.wallpaper,
    activity: store.activity,
  };
};

export default connect(mapStateToProps)(WallpaperMeta);
