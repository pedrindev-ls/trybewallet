const initialState = {
  currencies: [],
  isFetching: false,
  expenses: [],
  totalValue: 0,
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
  case 'addCurrencies': {
    return {
      ...state,
      currencies: action.currencies,
      isFetching: false,
    };
  }
  case 'currenciesError': {
    return {
      ...state,
      currencies: action.error,
      isFetching: false,
    };
  }
  case 'workingOnCurrencies': {
    return {
      ...state,
      isFetching: true,
    };
  }
  case 'addSpent': {
    return {
      ...state,
      expenses: [...state.expenses, action.spentObj],
    };
  }
  case 'removeSpent': {
    return {
      ...state,
      expenses: action.newObj,
    };
  }
  default:
    return state;
  }
};

export default wallet;
