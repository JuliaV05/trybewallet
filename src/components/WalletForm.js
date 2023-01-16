import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveExpensesForm } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    tag: 'Alimentação',
    currency: 'USD',
    method: 'Dinheiro',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { expenses, dispatch } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const detailsExpenses = {
      id: expenses.length,
      value,
      description,
      currency,
      method,
      tag,
    };
    dispatch(saveExpensesForm(detailsExpenses));
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
    const { currencies, expenses } = this.props;
    console.log(currencies);
    const mapCurr = currencies.map((cur, i) => (
      <option
        key={ i }
        value={ cur }
      >
        {cur}
      </option>
    ));
    const { value, description, tag, currency, method } = this.state;
    return (
      <div>
        <label
          htmlFor="value"
        >
          Valor:
          <input
            data-testid="value-input"
            type="number"
            name={ value }
            placeholder="Insira o valor"
            onChange={ this.handleChange }
            id="value"
          />
        </label>

        <label htmlFor="currency">
          Moeda:
          <select
            data-testid="currency-input"
            name={ currency }
            id="currency"
          >
            { mapCurr }
          </select>
        </label>

        <label htmlFor="method">
          Método de pagamento:
          <select
            data-testid="method-input"
            name={ method }
            id="method"
          >
            <option defaultValue="Dinheiro">Dinheiro</option>
            <option value="Cartão de débito">Cartão de débito</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
          </select>
        </label>

        <label htmlFor="tag">
          Categoria:
          <select
            data-testid="tag-input"
            name={ tag }
            id="tag"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>

        <label htmlFor="description">
          Descrição:
          <select
            data-testid="description-input"
            name={ description }
            id="description"
          >
            <option>Zaffari</option>
            <option>Restaurante Grelhatus</option>
            <option>Academia</option>
            <option>Shark Sushi</option>
          </select>
        </label>

        <button
          type="button"
          value={ expenses }
          onClick={ this.handleSubmit }
        >
          Adicionar despesa

        </button>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
