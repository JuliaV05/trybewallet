import React from 'react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';
import WalletForm from '../components/WalletForm';

const testIdEmail = 'email-input';
const testIdPass = 'password-input';
const emailRegex = 'email@gmail.com';
const password = '123456';

describe('Login tests', () => {
  it('testa se o Login está no caminho certo', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/');
    });
    expect(history.location.pathname).toBe('/');
  });
  it('testa se os inputs estão na tela', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(testIdEmail);
    const inputPass = screen.getByTestId(testIdPass);

    expect(inputEmail).toBeInTheDocument();
    expect(inputPass).toBeInTheDocument();
  });

  it('testa se os campos estão sendo preenchidos corretamente', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(testIdEmail);
    const inputPass = screen.getByTestId(testIdPass);

    expect(inputEmail).toHaveValue('');
    expect(inputPass).toHaveValue('');
    expect(inputEmail).toHaveAttribute('placeholder', 'Insira seu e-mail');
    expect(inputPass).toHaveAttribute('placeholder', 'Insira sua senha');
    userEvent.type(inputEmail, emailRegex);
    userEvent.type(inputPass, password);
  });

  it('testa se o botão está na tela e se está desabilitado', () => {
    renderWithRouterAndRedux(<App />);

    const button = screen.getByRole('button', {
      name: /entrar/i,
    });

    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it('testa se ao preencher os campos o botão é habilitado', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(testIdEmail);
    const inputPass = screen.getByTestId(testIdPass);
    const button = screen.getByRole('button', {
      name: /entrar/i,
    });

    expect(button).toBeDisabled();
    userEvent.type(inputEmail, emailRegex);
    userEvent.type(inputPass, password);
    expect(button).not.toBeDisabled();
  });

  it('testa se a rota do botão está correta', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    expect(history.location.pathname).toBe('/');
    const inputEmail = screen.getByTestId(testIdEmail);
    const inputPass = screen.getByTestId(testIdPass);
    const button = screen.getByRole('button', {
      name: /entrar/i,
    });

    userEvent.type(inputEmail, emailRegex);
    userEvent.type(inputPass, password);
    userEvent.click(button);
    expect(history.location.pathname).toBe('/carteira');
  });
});

describe('Table tests', () => {
  it('testa adicionar despesa', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));
    renderWithRouterAndRedux(<WalletForm />);

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(1);

    const value = screen.getByTestId('value-input');
    const descript = screen.getByTestId('description-input');
    const buttonExpenses = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(value, '45');
    expect(value).toHaveValue(45);
    userEvent.type(descript, 'lanche');
    expect(descript).toHaveValue('lanche');
    userEvent.click(buttonExpenses);
  });
});
