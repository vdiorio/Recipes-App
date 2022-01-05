import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import GenericHeader from '../components/GenericHeader';

export default function Profile() {
  const value = 'Perfil';
  return (
    <div>
      <GenericHeader value={ value } />
      <label htmlFor="email-profile">
        Puxar email do login/localStorage
        <input
          data-testid="profile-email"
          id="email-profile"
          name="email-profile"
        />
      </label>
      <Link to="/receitas-feitas">
        <button
          data-testid="profile-done-btn"
          type="button"
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
      <button
        data-testid="profile-logout-btn"
        type="button"
      >
        Sair
      </button>
      <Footer />
    </div>
  );
}
