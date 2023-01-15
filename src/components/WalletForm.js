import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrenciesApi } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    tag: 'Alimentação',
    currency: 'USD',
    method: 'Dinheiro',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrenciesApi());
  }

  // handleChange = () => {

  // };

  render() {
    const { currencies } = this.props;
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
          htmlFor="value-input"
        >
          Valor:
          <input
            data-testid="value-input"
            type="number"
            name={ value }
          />
        </label>

        <label htmlFor="currency-input">
          Moeda:
          <select
            data-testid="currency-input"
            name={ currency }
          >
            { mapCurr }
          </select>
        </label>

        <label htmlFor="methd">
          Método de pagamento:
          <select
            data-testid="method-input"
            name={ method }
            id="methd"
          >
            <option defaultValue="Dinheiro">Dinheiro</option>
            <option value="Cartão de débito">Cartão de débito</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
          </select>
        </label>

        <label htmlFor="tag-input">
          Categoria:
          <select
            data-testid="tag-input"
            name={ tag }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>

        <label htmlFor="description-input">
          Descrição:
          <select
            data-testid="description-input"
            name={ description }
          >
            {/* <option> </option> */}
            <option>Zaffari</option>
            <option>Restaurante Grelhatus</option>
            <option>Academia</option>
            <option>Shark Sushi</option>
          </select>
        </label>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(String).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
