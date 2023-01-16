import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import { fetchCurrenciesApi, selectCoins } from '../redux/actions';

class Wallet extends React.Component {
  state = {
    currencies: [],
  };

  componentDidMount() {
    this.fetchApi();
  }

  request = () => {
    const { dispatch } = this.props;
    const { currencies } = this.state;
    dispatch(selectCoins(currencies));
  };

  fetchApi = async () => {
    const currencies = await fetchCurrenciesApi();
    this.setState({
      currencies,
    }, this.request);
  };

  render() {
    return (
      <div>
        <Header />
        <WalletForm />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.wallet,
});

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Wallet);
