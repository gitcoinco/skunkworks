import React, { Component } from 'react';
import MetaTags from 'react-meta-tags';

import Header from '../components/Header';
import Search from '../components/Search';
import Filter from '../components/Filter';
import Wallpapers from '../components/Wallpapers';

class Main extends Component {
  componentWillMount() {
    const w = window,
      d = document,
      documentElement = d.documentElement,
      body = d.getElementsByTagName('body')[0],
      width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
      height = w.innerHeight || documentElement.clientHeight || body.clientHeight;

    this.setState({ width: width, height: height });
  }

  render() {
    return (
      <div>
        <MetaTags>
          <meta
            property="og:image"
            content="https://d3vv6lp55qjaqc.cloudfront.net/items/2f2b2R0x1j3u450f0p3W/maxresdefault.png"
          />
          <meta
            name="twitter:image"
            content="https://d3vv6lp55qjaqc.cloudfront.net/items/2f2b2R0x1j3u450f0p3W/maxresdefault.png"
          />
        </MetaTags>
        <div className="main-fold" style={{ height: this.state.height }}>
          <Header />
          <Search />
        </div>
        <Filter />
        <Wallpapers />
      </div>
    );
  }
}

export default Main;
