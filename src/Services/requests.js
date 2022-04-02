export async function currenciesApi() {
  const URL = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(URL);
  const data = await response.json();
  const currenciesArray = [];
  Object.keys(data).map((key) => (
    currenciesArray.push(key)
  ));
  const correctCurrenciesArray = currenciesArray.filter((element) => element !== 'USDT');
  return correctCurrenciesArray;
}

export async function exchangeApi() {
  const URL = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(URL);
  const data = await response.json();
  return data;
}
