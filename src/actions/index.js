import { currenciesApi } from '../Services/requests';

export const addEmailVariable = 'addEmail';
export const addEmail = (email) => ({ type: 'addEmail', email });
export const takeCurrencies = (currencies) => ({ type: 'addCurrencies', currencies });

export function takingCurrencies() {
  return async (dispatch) => {
    const currencies = await currenciesApi();
    dispatch(takeCurrencies(currencies));
  };
}
