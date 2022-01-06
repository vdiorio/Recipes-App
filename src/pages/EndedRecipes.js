import React from 'react';
import GenericHeader from '../components/GenericHeader';

export default function EndedRecipes() {
  const value = 'Receitas Feitas';
  return (
    <div>
      <GenericHeader value={ value } />
    </div>
  );
}
