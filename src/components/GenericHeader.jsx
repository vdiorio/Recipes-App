import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import AppContext from '../context/ContextAPI';
import './Header.css';

export default function GenericHeader({ value }) {
  const { goesTo } = useContext(AppContext);

  return (
    <div>
      <header>
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
          { value }
        </h1>
      </header>
    </div>
  );
}

GenericHeader.propTypes = {
  value: PropTypes.node.isRequired,
};
