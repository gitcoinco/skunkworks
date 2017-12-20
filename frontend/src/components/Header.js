import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Upload from './Upload';

import logo from '../ethereum-logo.png';

import './Header.css';

class Header extends React.Component {
  state = {
    open: false,
  };

  handleClick = item => {
    this.props.dispatch(push('/'));
  };

  handleUploadModal = () => {
    this.setState({ open: true });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div className="header">
        <div className="logo">
          <a onClick={this.handleClick.bind(this)} href="#logo">
            <img src={logo} alt="Ethereum Logo" />
          </a>
        </div>
        <div className="links">
          <a onClick={this.handleUploadModal.bind(this)} href="#create">
            Submit your wallpaper
          </a>
        </div>

        <Upload open={this.state.open} onClose={this.handleRequestClose.bind(this)} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    upload: state.upload,
  };
};
export default connect(mapStateToProps)(Header);
