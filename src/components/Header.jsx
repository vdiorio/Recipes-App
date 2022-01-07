import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './Header.css';
import AppContext from '../context/ContextAPI';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import HeaderSearchBar from './HeaderSearchBar';

export default function Header({ text }) {
  const { showComponent, setShowComponent, goesTo } = useContext(AppContext);
  return (
    <div>
      <header className="header-container">
        <button
          type="button"
          onClick={ () => goesTo('perfil') }
          className="profile-btn"
        >
          <img
            src={ profileIcon }
            alt="profile-icon"
            data-testid="profile-top-btn"
            className="profile-button"
          />
        </button>
        <h1 data-testid="page-title">
          { text }
        </h1>
        <button
          type="button"
          onClick={ () => setShowComponent(!showComponent) }
          className="search-btn"
        >
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
