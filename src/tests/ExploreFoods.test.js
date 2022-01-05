import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExploreFoods from '../pages/ExploreFoods';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testes requisitos 70 ao 74 tela "Explorar Comidas"', () => {
  it('Renderização dos botões da tela "Explorar Comidas"', () => {
    renderWithRouter(<ExploreFoods />);
    const dataIdExploreIngredients = screen.getByTestId('explore-by-ingredient');
    const dataIdExploreArea = screen.getByTestId('explore-by-area');
    const dataIdSurpriseMe = screen.getByTestId('explore-surprise');

    expect(dataIdExploreIngredients).toBeInTheDocument();
    expect(dataIdExploreArea).toBeInTheDocument();
    expect(dataIdSurpriseMe).toBeInTheDocument();
  });

  it('Botão "Por Ingredientes" ao clicar redireciona p/ "explorar/comidas/ingredientes"',
    () => {
      const { history } = renderWithRouter(<ExploreFoods />);

      const buttonByIndredients = screen.getByRole(
        'button', { name: /Por Ingredientes/i },
      );
      expect(buttonByIndredients).toBeInTheDocument();
      userEvent.click(buttonByIndredients);

      const { pathname } = history.location;
      expect(pathname).toBe('/explorar/comidas/ingredientes');
    });

  it('Botão "Por Local de Origem" ao clicar redireciona p/ "explorar/comidas/area"',
    () => {
      const { history } = renderWithRouter(<ExploreFoods />);

      const buttonByArea = screen.getByRole(
        'button', { name: /Por Local de Origem/i },
      );
      expect(buttonByArea).toBeInTheDocument();
      userEvent.click(buttonByArea);

      const { pathname } = history.location;
      expect(pathname).toBe('/explorar/comidas/area');
    });
  it('Botão "Me Surpreenda!" ao clicar redireciona p/ "/comidas/random"',
    () => {
      const { history } = renderWithRouter(<ExploreFoods />);

      const buttonBySurprise = screen.getByRole(
        'button', { name: /Me Surpreenda!/i },
      );
      expect(buttonBySurprise).toBeInTheDocument();
      // Presisa fazer o Mock do test
      userEvent.click(buttonBySurprise);

      const { pathname } = history.location;
      expect(pathname).toBe('/explorar/comidas/area');
    });
});
