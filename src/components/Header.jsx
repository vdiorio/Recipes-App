import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import './Header.css';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import HeaderSearchBar from './HeaderSearchBar';

export default function Header({ text }) {
  const [showComponent, setShowComponent] = useState(false);
  return (
    <div>
      <header>
        <Link to="/perfil">
          <img
            src={ profileIcon }
            alt="profile-icon"
            data-testid="profile-top-btn"
            className="profile-button"
          />
        </Link>
        <h1 data-testid="page-title">
          { text }
        </h1>
        <button type="button" onClick={ () => setShowComponent(!showComponent) }>
          <img src={ searchIcon } alt="search-icon" data-testid="search-top-btn" />
        </button>
      </header>
      {
        showComponent ? (<HeaderSearchBar />) : null
      }
    </div>
  );
}

Header.propTypes = {
  text: PropTypes.node.isRequired,
};
