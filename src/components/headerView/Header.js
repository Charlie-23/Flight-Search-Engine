import React, { Component } from 'react';

import './header.css';

class Header extends Component {
  render() {
    return (
      <header className="header display--flex">
        <h2 className="header__title">Welcome to Flight Search Engine</h2>
      </header>
    );
  }
}

export default Header;
