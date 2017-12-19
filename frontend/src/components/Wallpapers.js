import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import 'path';

import { selectWallpaper, getWallpapers } from '../actions/wallpapers';
import { apiConfig } from '../config/apiClient';


class Wallpapers extends React.Component {
  constructor(props) {
    super(props);
    this.filter = '';
    this.search = '';
    this.baseUrl = apiConfig.url.replace(/\/$/, "");
  }

  componentWillMount() {
    this.props.dispatch(getWallpapers(this.filter, this.search, this.props.max));
  }

  handleClick(item) {
    this.props.dispatch(selectWallpaper(item));
    this.props.dispatch(push(`/preview/${item.id}`));
  }

  componentDidUpdate() {
    if (this.filter !== this.props.filter ||
      this.search !== this.props.search) {
      this.filter = this.props.filter
      this.search = this.props.search
      console.log('TEEEE')
      this.props.dispatch(getWallpapers(this.filter, this.search, this.props.max));
    }
  }

  render() {
    const { payload } = this.props.wallpapers;
    const images = payload.map((item, index) => {
      return (
        <a key={item.id} onClick={this.handleClick.bind(this, item)}>
          <img src={`${this.baseUrl}${item.url}`} alt={item.title} />
        </a>
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
