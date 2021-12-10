import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';

export default function GenericHeader({ value }) {
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
          { value }
        </h1>
      </header>
    </div>
  );
}

GenericHeader.propTypes = {
  value: PropTypes.node.isRequired,
};
