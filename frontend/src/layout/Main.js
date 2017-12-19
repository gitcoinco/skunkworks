import React, { Component } from 'react';

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
