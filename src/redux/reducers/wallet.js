import {
  FETCH_CURR_FAILURE,
  FETCH_CURR_SUCCESS,
  FETCH_CURR_REQUEST,
} from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  errorMessage: null,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_CURR_REQUEST: {
    return {
      ...state,
    };
  }
  case FETCH_CURR_SUCCESS: {
    return {
      ...state,
      currencies: action.payload.currencies,
    };
  }
  case FETCH_CURR_FAILURE: {
    return {
      ...state,
      errorMessage: action.payload.errorMessage,
    };
  }
  default: return state;
  }
};
export default wallet;
