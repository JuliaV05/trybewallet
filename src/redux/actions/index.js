export const ADD_EMAIL = 'ADD_EMAIL';
export const FETCH_CURR_REQUEST = 'FETCH_CURR_REQUEST';
export const FETCH_CURR_SUCCESS = 'FETCH_CURR_SUCCESS';
export const FETCH_CURR_FAILURE = 'FETCH_CURR_FAILURE';

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  payload: {
    email,
  },

});

const fetchCurrRequest = () => ({
  type: FETCH_CURR_REQUEST,
});

const fetchCurrSuccess = (currencies) => ({
  type: FETCH_CURR_SUCCESS,
  payload: {
    currencies,
  },
});

const fetchCurrFailure = (errorMessage) => ({
  type: FETCH_CURR_FAILURE,
  payload: {
    errorMessage,
  },
});

export const fetchCurrenciesApi = () => async (dispatch) => {
  try {
    dispatch(fetchCurrRequest());
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const currencies = Object.keys(data).filter((cur) => cur !== 'USDT');
    dispatch(fetchCurrSuccess(currencies));
  } catch (error) {
    dispatch(fetchCurrFailure('Algo deu errado!'));
  }
};
