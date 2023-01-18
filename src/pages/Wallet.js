import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';
// import { fetchCurrenciesApi, selectCoins } from '../redux/actions';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <WalletForm />
        <Table />
      </div>
    );
  }
}

export default connect()(Wallet);
