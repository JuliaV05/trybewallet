export const ADD_EMAIL = 'ADD_EMAIL';
export const FETCH_CURR_REQUEST = 'FETCH_CURR_REQUEST';
export const FETCH_CURR_FAILURE = 'FETCH_CURR_FAILURE';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';
export const SELECT_COINS = 'SELECT_COINS';
export const CLEAN_BUTTON = 'CLEAN_BUTTON';

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  payload: {
    email,
  },

});

const fetchCurrRequest = () => ({
  type: FETCH_CURR_REQUEST,
});

const fetchCurrFailure = (errorMessage) => ({
  type: FETCH_CURR_FAILURE,
  payload: {
    errorMessage,
  },
});

export const saveExpenses = (expenses) => ({
  type: SAVE_EXPENSES,
  payload: expenses,
});

export const selectCoins = (currencies) => ({
  type: SELECT_COINS,
  payload: currencies,
});

export const cleanButton = (id) => ({
  type: CLEAN_BUTTON,
  payload: id,
});

export const fetchCurrenciesApi = () => async (dispatch) => {
  try {
    dispatch(fetchCurrRequest());
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const currencies = Object.keys(data).filter((cur) => cur !== 'USDT');
    dispatch(selectCoins(currencies));
  } catch (error) {
    dispatch(fetchCurrFailure('Algo deu errado!'));
  }
};

export const saveExpensesForm = (info) => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  delete data.USDT;
  dispatch(saveExpenses({ ...info, exchangeRates: data }));
};
