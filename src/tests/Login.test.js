import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

const TESTID_EMAIL = 'email-input';
const TESTID_PASSWORD = 'password-input';
const TESTID_BUTTON = 'login-submit-btn';
const INPUT_EMAIL = 'test@test.com';

describe('Teste requisito 1 ao 6', () => {
  test('Farewell, front-end', () => {
    renderWithRouter(<App />);
    const linkElement = screen.getByText(/TRYBE/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('data-testid requisito 1', () => {
    renderWithRouter(<App />);

    expect(screen.getByTestId(TESTID_EMAIL)).toBeInTheDocument();
    expect(screen.getByTestId(TESTID_PASSWORD)).toBeInTheDocument();
    expect(screen.getByTestId(TESTID_BUTTON)).toBeInTheDocument();
  });

  test('verificação valores input', () => {
    renderWithRouter(<App />);

    const inputEmail = screen.getByRole('textbox', { name: /e-mail/i });
    const inputPassword = screen.getByLabelText(/password/i);

    userEvent.type(inputEmail, INPUT_EMAIL);
    userEvent.type(inputPassword, 'passwordtest');

    expect(inputEmail).toHaveValue(INPUT_EMAIL);
    expect(inputPassword).toHaveValue('passwordtest');
  });

  test('verificação de botão', () => {
    renderWithRouter(<App />);

    const inputEmail = screen.getByRole('textbox', { name: /e-mail/i });
    const inputPassword = screen.getByLabelText(/password/i);
    const buttonTest = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(inputEmail, 'test@test');
    userEvent.type(inputPassword, 'pass');

    expect(buttonTest.disabled).toBe(true);

    userEvent.type(inputEmail, INPUT_EMAIL);
    userEvent.type(inputPassword, 'pass');

    expect(buttonTest.disabled).toBe(true);

    userEvent.type(inputEmail, 'test@test');
    userEvent.type(inputPassword, 'password');

    expect(buttonTest.disabled).toBe(true);

    userEvent.type(inputEmail, INPUT_EMAIL);
    userEvent.type(inputPassword, 'passwordtest');

    expect(buttonTest.disabled).toBe(false);
  });
});
