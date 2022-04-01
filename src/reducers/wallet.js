const initialState = {
  currencies: [],
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
  case 'addCurrencies': {
    return {
      ...state,
      currencies: action.currencies,
    };
  }
  default:
    return state;
  }
};

export default wallet;
