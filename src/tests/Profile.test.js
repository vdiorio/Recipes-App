import React from 'react';
import { screen } from '@testing-library/react';
import Profile from '../pages/Profile';
import renderWithRouter from '../helpers/renderWithRouter';

discribe('Testes dos requisitos 82 a 87, "Profile"', () => {
  test('Existencia de botões na pagina', () => {
    renderWithRouter(<Profile />);
    const buttonReceitasFeitas = screen.getByRole('button', { name: /receitas feitas/i });
    const buttonReceitasFavoritas = screen
      .getByRole('button', { name: /receitas favoritas/i });
    expect(buttonReceitasFeitas).toBeInTheDocument();
    expect(buttonReceitasFavoritas).toBeInTheDocument();
  });
});
