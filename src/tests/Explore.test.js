import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Explore from '../pages/Explore';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testes requisitos 67 ao 69', () => {
  it('Renderização dos botões Explorar Comidas e Explorar Bebidas', () => {
    renderWithRouter(<Explore />);
    const dataIdExploreFoods = screen.getByTestId('explore-food');
    const dataIdExploreDrinks = screen.getByTestId('explore-drinks');

    expect(dataIdExploreFoods).toBeInTheDocument();
    expect(dataIdExploreDrinks).toBeInTheDocument();
  });

  it('Clique no botão comidas e redireciona para o caminho "explorar/comidas"', () => {
    const { history } = renderWithRouter(<Explore />);

    const buttonExploreFoods = screen.getByRole('button', { name: /Explorar Comidas/i });
    userEvent.click(buttonExploreFoods);

    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas');
  });

  it('Clique no botão comidas e redireciona para o caminho "explorar/bebidas"', () => {
    const { history } = renderWithRouter(<Explore />);

    const buttonExploreDrinks = screen.getByRole('button', { name: /Explorar Bebidas/i });
    userEvent.click(buttonExploreDrinks);

    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/bebidas');
  });
});
