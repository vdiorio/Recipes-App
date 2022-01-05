import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExploreDrinks from '../pages/ExploreDrinks';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testes requisitos 70 ao 74 tela "Explorar Bebidas"', () => {
  it('Renderização dos botões da tela "Explorar Bebidas"', () => {
    renderWithRouter(<ExploreDrinks />);
    const dataIdExploreIngredients = screen.getByTestId('explore-by-ingredient');
    const dataIdExploreArea = screen.getByTestId('explore-by-area');
    const dataIdSurpriseMe = screen.getByTestId('explore-surprise');

    expect(dataIdExploreIngredients).toBeInTheDocument();
    expect(dataIdExploreArea).toBeInTheDocument();
    expect(dataIdSurpriseMe).toBeInTheDocument();
  });

  it('Botão "Por Ingredientes" ao clicar redireciona p/ "explorar/bebidas/ingredientes"',
    () => {
      const { history } = renderWithRouter(<ExploreDrinks />);

      const buttonByIndredients = screen.getByRole(
        'button', { name: /Por Ingredientes/i },
      );
      expect(buttonByIndredients).toBeInTheDocument();
      userEvent.click(buttonByIndredients);

      const { pathname } = history.location;
      expect(pathname).toBe('/explorar/bebidas/ingredientes');
    });

  it('Botão "Me Surpreenda!" ao clicar redireciona p/ "/bebidas/random"',
    () => {
      const { history } = renderWithRouter(<ExploreDrinks />);

      const buttonBySurprise = screen.getByRole(
        'button', { name: /Me Surpreenda!/i },
      );
      expect(buttonBySurprise).toBeInTheDocument();
      // Presisa fazer o Mock do test
      userEvent.click(buttonBySurprise);

      const { pathname } = history.location;
      expect(pathname).toBe('/bebidas/area');
    });
});
