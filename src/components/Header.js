import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

export const Header = ({ startLogout }) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/dashboard">
          <img className="header__tape header__tape--top-left" src="/images/tape-horizontal.png" />
          <h3>Projects</h3>
        </Link>
        <a className="header__title" href="#about-me">
          <img className="header__tape header__tape--middle" src="/images/tape-horizontal.png" />
          <h3>About Me</h3>
        </a>
        <Link className="header__title" to="#about-me">
          <img className="header__tape header__tape--top-right" src="/images/tape-horizontal.png" />
          <h3>Contact</h3>
        </Link>
      </div>
    </div>
  </header>
);

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);
