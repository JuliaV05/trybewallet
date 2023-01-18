import {
  FETCH_CURR_FAILURE,
  FETCH_CURR_REQUEST,
  SAVE_EXPENSES,
  SELECT_COINS,
  CLEAN_BUTTON,
  SAVE_EDIT_EXPENSE,
  EDIT_EXPENSE,
} from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  errorMessage: null,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_CURR_REQUEST: {
    return {
      ...state,
    };
  }
  case SELECT_COINS: {
    return {
      ...state,
      currencies: action.payload,
    };
  }
  case FETCH_CURR_FAILURE: {
    return {
      ...state,
      errorMessage: action.payload.errorMessage,
    };
  } case SAVE_EXPENSES: return {
    ...state,
    expenses: [...state.expenses, action.payload],
  };
  case CLEAN_BUTTON: {
    return {
      ...state,
      expenses: state.expenses.filter((expense) => (expense.id !== action.payload)),
    };
  }
  case SAVE_EDIT_EXPENSE: {
    return {
      ...state,
      expenses: state.expenses.map((expense) => (
        expense.id === action.payload.id ? { ...expense, ...action.payload } : expense)),
      editor: false,
    };
  }
  case EDIT_EXPENSE: {
    return {
      ...state,
      idToEdit: action.payload,
      editor: true,
    };
  }

  default: return state;
  }
};
export default walletReducer;
