import React from 'react';
import { Link } from 'react-router-dom';
import GenericHeader from '../components/GenericHeader';

export default function Profile() {
  const value = 'Perfil';
  const { email } = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <GenericHeader value={ value } />
      <h2 data-testid="profile-email">
        { email }
      </h2>
      <Link to="/receitas-feitas">
        <button
          data-testid="profile-done-btn"
          type="button"
          name="receitas"
        >
          Receitas Feitas
        </button>
      </Link>
      <Link to="/receitas-favoritas">
        <button
          data-testid="profile-favorite-btn"
          type="button"
        >
          Receitas Favoritas
        </button>
      </Link>
      <Link to="/">
        <button
          data-testid="profile-logout-btn"
          type="button"
          onClick={ () => localStorage.clear() }
        >
          Sair
        </button>
      </Link>
    </div>
  );
}
