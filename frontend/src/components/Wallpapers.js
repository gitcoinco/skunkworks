import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import 'path';

import { selectWallpaper, getWallpapers } from '../actions/wallpapers';
import './Wallpapers.css';

class Wallpapers extends React.Component {
  constructor(props) {
    super(props);
    this.filter = '';
    this.search = '';
  }

  componentWillMount() {
    this.props.dispatch(getWallpapers(this.filter, this.search, this.props.max));
  }

  handleClick(item) {
    this.props.dispatch(selectWallpaper(item));
    this.props.dispatch(push(`/preview/${item.id}`));
  }

  componentDidUpdate() {
    if (this.filter !== this.props.filter || this.search !== this.props.search) {
      this.filter = this.props.filter;
      this.search = this.props.search;
      this.props.dispatch(getWallpapers(this.filter, this.search, this.props.max));
    }
  }

  render() {
    const { payload } = this.props.wallpapers;
    const images = payload.map((item, index) => {
      return (
        <div className="wallpaper" key={item.id} onClick={this.handleClick.bind(this, item)}>
          <img className="image" src={item.url} alt={item.title} />
          <div className="middle">
            <div className="overlay-downloads">{item.downloads}</div>
            <div className="overlay-likes">{item.likes}</div>
          </div>
        </div>
      );
    });

    return <section className="wallpapers">{images}</section>;
  }
}

const mapStateToProps = store => {
  return {
    wallpapers: store.wallpapers,
    filter: store.filter,
    search: store.search,
    tag: store.tag,
  };
};

export default connect(mapStateToProps)(Wallpapers);
