import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

const TESTID_EMAIL = 'email-input';
const TESTID_PASSWORD = 'password-input';
const TESTID_BUTTON = 'login-submit-btn';
const INPUT_EMAIL = 'test@test.com';

describe('Teste requisito 1 ao 6', () => {
  test('Farewell, front-end', () => {
    const { getByText } = render(<App />);
    const linkElement = getByText(/TRYBE/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('data-testid requisito 1', () => {
    render(<App />);

    expect(screen.getByTestId(TESTID_EMAIL)).toBeInTheDocument();
    expect(screen.getByTestId(TESTID_PASSWORD)).toBeInTheDocument();
    expect(screen.getByTestId(TESTID_BUTTON)).toBeInTheDocument();
  });

  test('verificação valores input', () => {
    render(<App />);

    const inputEmail = screen.getByRole('textbox', { name: /e-mail/i });
    const inputPassword = screen.getByLabelText(/password/i);

    userEvent.type(inputEmail, INPUT_EMAIL);
    userEvent.type(inputPassword, 'passwordtest');

    expect(inputEmail).toHaveValue(INPUT_EMAIL);
    expect(inputPassword).toHaveValue('passwordtest');
  });

  test('verificação de botão', () => {
    render(<App />);

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
