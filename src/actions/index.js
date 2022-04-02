import { currenciesApi } from '../Services/requests';

export const addEmailVariable = 'addEmail';
export const addEmail = (email) => ({ type: 'addEmail', email });
export const takeCurrencies = (currencies) => ({ type: 'addCurrencies', currencies });
export const notTakeCurrencies = (error) => ({ type: 'currenciesError', error });
export const startTakeCurrencies = () => ({ type: 'workingOnCurrencies' });
export const addSpent = (spentObj) => ({ type: 'addSpent', spentObj });

export function takingCurrencies() {
  return async (dispatch) => {
    startTakeCurrencies();

    try {
      const currencies = await currenciesApi();
      dispatch(takeCurrencies(currencies));
    } catch (error) {
      notTakeCurrencies(error);
    }
  };
}
