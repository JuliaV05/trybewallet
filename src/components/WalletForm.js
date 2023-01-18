import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveExpensesForm, fetchCurrenciesApi, saveEditExpense } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    tag: 'Alimentação',
    currency: 'USD',
    method: 'Dinheiro',
  };

  componentDidMount() {
    this.fetchApi();
  }

  fetchApi = () => {
    const { dispatch } = this.props;
    dispatch(fetchCurrenciesApi());
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { expenses, dispatch, idToEdit, editor } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const detailsExpenses = {
      id: editor ? idToEdit : expenses.length,
      value,
      description,
      currency,
      method,
      tag,
    };
    if (editor) {
      dispatch(saveEditExpense(detailsExpenses));
    } else {
      dispatch(saveExpensesForm(detailsExpenses));
    }
    this.handleInputClear();
  };

  handleInputClear = () => {
    this.setState({ value: '',
      description: '',
      tag: 'Alimentação',
      currency: 'USD',
      method: 'Dinheiro' });
  };

  render() {
    const { currencies, expenses, editor } = this.props;
    const mapCurr = currencies.map((cur, i) => (
      <option
        key={ i }
        value={ cur }
      >
        {cur}
      </option>
    ));
    const { value, tag, method, description } = this.state;
    return (
      <div>
        <label
          htmlFor="value"
        >
          Valor:
          <input
            data-testid="value-input"
            type="number"
            name="value"
            placeholder="Insira o valor"
            onChange={ this.handleChange }
            id="value"
            value={ value }
          />
        </label>

        <label htmlFor="currency">
          Moeda:
          <select
            data-testid="currency-input"
            name="currency"
            id="currency"
            onChange={ this.handleChange }
          >
            { mapCurr }
          </select>
        </label>

        <label htmlFor="method">
          Método de pagamento:
          <select
            data-testid="method-input"
            name="method"
            id="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de débito">Cartão de débito</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
          </select>
        </label>

        <label htmlFor="tag">
          Categoria:
          <select
            data-testid="tag-input"
            name="tag"
            id="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>

        <label htmlFor="description">
          Descrição:
          <input
            data-testid="description-input"
            name="description"
            id="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>

        <button
          type="button"
          value={ expenses }
          onClick={ this.handleSubmit }
        >
          {
            editor ? 'Editar despesa' : 'Adicionar despesa'
          }
        </button>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,
  editor: state.wallet.editor,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  idToEdit: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
