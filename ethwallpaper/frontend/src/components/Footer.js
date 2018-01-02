import React from 'react';
import { connect } from 'react-redux';

import Upload from './Upload';

import './Footer.css';

class Filter extends React.Component {
  state = {
    open: false,
  };

  handleUploadModal = () => {
    this.setState({ open: true });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <footer>
        <div className="footer-links">
          <a href="https://gitcoin.co/about?source=ethwallpaper"> Who we are? </a>
          <a onClick={this.handleUploadModal.bind(this)} href="#create">
            Submit your wallpaper
          </a>
        </div>
        <span>
          <a href="https://gitcoin.co/">
            with <span className="heart">&hearts;</span> from gitcoin community
          </a>
        </span>
        <Upload open={this.state.open} onClose={this.handleRequestClose.bind(this)} />
      </footer>
    );
  }
}

const mapStateToProps = store => {
  return {
    size: store.size,
  };
};

export default connect(mapStateToProps)(Filter);
