import React from 'react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const testIdEmail = 'email-input';
const testIdPass = 'password-input';
const emailRegex = 'email@gmail.com';
const password = '123456';
const buttonValue = 'value-input';
const description = 'description-input';

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
  it('testa se a soma está correta', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const value = screen.getByTestId(buttonValue);
    const descript = screen.getByTestId(description);
    const buttonExpenses = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    act(() => {
      history.push('/carteira');
    });

    const api = global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(
        {
          USD: {
            code: 'USD',
            codein: 'BRL',
            name: 'Dólar Americano/Real Brasileiro',
            high: '5.2189',
            low: '5.1659',
            varBid: '-0.0101',
            pctChange: '-0.19',
            bid: '5.197',
            ask: '5.1975',
            timestamp: '1674507647',
            create_date: '2023-01-23 18:00:47',
          },
          USDT: {
            code: 'USD',
            codein: 'BRLT',
            name: 'Dólar Americano/Real Brasileiro Turismo',
            high: '5.24',
            low: '5.195',
            varBid: '-0.005',
            pctChange: '-0.1',
            bid: '5.06',
            ask: '5.38',
            timestamp: '1674502620',
            create_date: '2023-01-23 16:37:00',
          },
          CAD: {
            code: 'CAD',
            codein: 'BRL',
            name: 'Dólar Canadense/Real Brasileiro',
            high: '3.9034',
            low: '3.8618',
            varBid: '-0.0059',
            pctChange: '-0.15',
            bid: '3.8847',
            ask: '3.8866',
            timestamp: '1674507646',
            create_date: '2023-01-23 18:00:46',
          },
          GBP: {
            code: 'GBP',
            codein: 'BRL',
            name: 'Libra Esterlina/Real Brasileiro',
            high: '6.4828',
            low: '6.3903',
            varBid: '-0.0236',
            pctChange: '-0.37',
            bid: '6.4282',
            ask: '6.4315',
            timestamp: '1674507642',
            create_date: '2023-01-23 18:00:42',
          },
          ARS: {
            code: 'ARS',
            codein: 'BRL',
            name: 'Peso Argentino/Real Brasileiro',
            high: '0.0284',
            lo: '0.028',
            varBid: '-0.0002',
            pctChange: '-0.7',
            bid: '0.0282',
            ask: '0.0282',
            timestamp: '1674507643',
            create_date: '2023-01-23 18:00:43',
          },
          BTC: {
            code: 'BTC',
            codein: 'BRL',
            name: 'Bitcoin/Real Brasileiro',
            high: '120.7',
            low: '115',
            varBid: '2859',
            pctChange: '2.44',
            bid: '119.981',
            ask: '120.042',
            timestamp: '1674507648',
            create_date: '2023-01-23 18:00:48',
          },
          LTC: {
            code: 'LTC',
            codein: 'BRL',
            name: 'Litecoin/Real Brasileiro',
            high: '485.76',
            low: '452.23',
            varBid: '16.33',
            pctChange: '3.61',
            bid: '469.27',
            ask: '471.08',
            timestamp: '1674507641',
            create_date: '2023-01-23 18:00:41',
          },
          EUR: {
            code: 'EUR',
            codein: 'BRL',
            name: 'Euro/Real Brasileiro',
            high: '5.6907',
            low: '5.6145',
            varBid: '-0.0057',
            pctChange: '-0.1',
            bid: '5.6456',
            ask: '5.6482',
            timestamp: '1674507645',
            create_date: '2023-01-23 18:00:45',
          },
          JPY: {
            code: 'JPY',
            codein: 'BRL',
            name: 'Iene Japonês/Real Brasileiro',
            high: '0.04035',
            low: '0.03957',
            varBid: '-0.0004',
            pctChange: '-1',
            bid: '0.03975',
            ask: '0.03977',
            timestamp: '1674507645',
            create_date: '2023-01-23 18:00:45',
          },
          CHF: {
            code: 'CHF',
            codein: 'BRL',
            name: 'Franco Suíço/Real Brasileiro',
            high: '5.6852',
            low: '5.6005',
            varBid: '-0.0216',
            pctChange: '-0.38',
            bid: '5.6319',
            ask: '5.6355',
            timestamp: '1674507645',
            create_date: '2023-01-23 18:00:45',
          },
          AUD: {
            code: 'AUD',
            codein: 'BRL',
            name: 'Dólar Australiano/Real Brasileiro',
            high: '3.6541',
            low: '3.6163',
            varBid: '0.0238',
            pctChange: '0.65',
            bid: '3.6496',
            ask: '3.6529',
            timestamp: '1674507643',
            create_date: '2023-01-23 18:00:43',
          },
          CNY: {
            code: 'CNY',
            codein: 'BRL',
            name: 'Yuan Chinês/Real Brasileiro',
            high: '0.7691',
            low: '0.7616',
            varBid: '-0.0018',
            pctChange: '-0.24',
            bid: '0.7658',
            ask: '0.766',
            timestamp: '1674507604',
            create_date: '2023-01-23 18:00:04',
          },
          ILS: {
            code: 'ILS',
            codein: 'BRL',
            name: 'Novo Shekel Israelense/Real Brasileiro',
            high: '1.5453',
            low: '1.5309',
            varBid: '0.0113',
            pctChange: '0.74',
            bid: '1.5436',
            ask: '1.544',
            timestamp: '1674507606',
            create_date: '2023-01-23 18:00:06',
          },
          ETH: {
            code: 'ETH',
            codein: 'BRL',
            name: 'Ethereum/Real Brasileiro',
            high: '8.60524',
            low: '8.35',
            varBid: '97.55',
            pctChange: '1.16',
            bid: '8.504',
            ask: '8.51062',
            timestamp: '1674507648',
            create_date: '2023-01-23 18:00:48',
          },
          XRP: {
            code: 'XRP',
            codein: 'BRL',
            name: 'XRP/Real Brasileiro',
            high: '2.25',
            low: '2.07',
            varBid: '0.16',
            pctChange: '7.94',
            bid: '2.23',
            ask: '2.24',
            timestamp: '1674507637',
            create_date: '2023-01-23 18:00:37',
          },
          DOGE: {
            code: 'DOGE',
            codein: 'BRL',
            name: 'Dogecoin/Real Brasileiro',
            high: '0.475637',
            low: '0.452203',
            varBid: '0.00712901',
            pctChange: '1.57',
            bid: '0.461526',
            ask: '0.461526',
            timestamp: '1674507639',
            create_date: '2023-01-23 18:00:39',
          },
        },
      ),
    });
    userEvent.type(value, 'value-input');
    userEvent.type(descript, 'description-input');
    userEvent.click(buttonExpenses);

    const h3El = await screen.findByRole('button', api);

    // Testar`;
    expect(api).toBeInTheDocument();
    expect(global.fetch).toBeCalled();
  });
});
