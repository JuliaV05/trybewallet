// export const fetchCurrApi = async () => {
//   const response = await fetch('https://economia.awesomeapi.com.br/json/all');
//   const dataJson = await response.json();
//   return dataJson;
// };

// export default fetchCurrApi;

// export const fetchCurrencies = () => async () => {
//   const dataJson = await fetchCurrApi();
//   const filterCurr = Object.keys(dataJson).filter((el) => el !== 'USDT');
//   dispatch(fetchCurrenciesSuccess(filterCurr));
// };
