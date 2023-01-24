import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Table tests', () => {
  it('testando SAVE_EXPENSES', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push('/carteira');
    });
    expect(history.location.pathname).toBe('/carteira');

    const value = screen.getByPlaceholderText('Insira o valor');
    const description = screen.getByText(/descrição:/i);

    const buttonExpenses = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(value, '30');
    userEvent.type(description, 'lanche');
    userEvent.click(buttonExpenses);

    const btnEdit = screen.getByTestId('edit-btn');
    userEvent.click(btnEdit);
    userEvent.type(description, 'uber');

    const editBtn = screen.getByText('Editar despesa');
    userEvent.click(editBtn);
  });

  it('testando CLEAN_BUTTON', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push('/carteira');
    });
    expect(history.location.pathname).toBe('/carteira');
  });
});
