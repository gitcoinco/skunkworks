import React, { Component } from 'react';
import Identicon from 'identicon.js';

// todo: add react-router and impliment
// import { Router } from 'react-router';

/* Navbar Component */
class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="/"
          rel="noopener noreferrer"
        >
          InsureNET Social Network
        </a>
        <a
          className="navbar"
          href="https://insurenet-ico-site.netlify.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          ICO
        </a>
        <a
          className="navbar"
          href="https://insurenet-whitepaper.netlify.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Whitepaper
        </a>
        <a
          className="navbar"
          href="/team"
          rel="noopener noreferrer"
        >
          Team
        </a>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-secondary">
              <small id="account">{this.props.account}</small>
            </small>
            {this.props.account
              ? <img
                className='ml-2'
                width='30'
                height='30'
                src={`data:image/png;base64,${ new Identicon(this.props.account, 30).toString() }`}
                alt='Avatar'
              />
              : <span></span>
            }
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
