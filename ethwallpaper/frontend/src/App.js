import React, { Component } from 'react';

import { Route, Router } from 'react-router';

import Main from './layout/Main';
import Preview from './layout/Preview';
import LineChartComponent from './components/LineChart';
import Footer from './components/Footer';

import './App.css';

class App extends Component {
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
      <Router history={this.props.history}>
        <div className="App">
          <Route exact path="/" component={Main} />
          <Route path="/preview/:id" component={Preview} />
          <Route path="/chart" component={LineChartComponent} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
