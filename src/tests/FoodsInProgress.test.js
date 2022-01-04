import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Requisitos 47 ao 53', () => {
  test('', () => {
    const { myHistory } = renderWithRouter(<App />);
    // myHistory.push('/bebidas/178319/in-progress'); // precisa de mock
    const inputs = findAllByRole('checkbox', { name: /ingredient-step/i });
    expect(inputs.length).toBe(8);
  });
});
