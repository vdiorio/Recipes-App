import React from 'react';
import GenericHeader from '../components/GenericHeader';

export default function FavoritesRecipes() {
  const value = 'Receitas Favoritas';
  return (
    <div>
      <GenericHeader value={ value } />
    </div>
  );
}
