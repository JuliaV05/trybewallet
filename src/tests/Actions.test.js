import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

const emailRegex = 'email@gmail.com';
const password = '123456';

describe('Actions wallet tests', () => {
  it('testando caso de falha', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/');
    });
    expect(history.location.pathname).toBe('/');

    const testIdEmail = 'email-input';
    const testIdPass = 'password-input';
    const inputEmail = screen.getByTestId(testIdEmail);
    const inputPass = screen.getByTestId(testIdPass);

    expect(inputEmail).toHaveAttribute('placeholder', 'Insira seu e-mail');
    expect(inputPass).toHaveAttribute('placeholder', 'Insira sua senha');
    userEvent.type(inputEmail, emailRegex);
    userEvent.type(inputPass, password);
  });
});
