export default getPayload => ({
  'currency/INIT_CURRENCY_TITLE_LIST' : {
    url: `https://api.exchangeratesapi.io/latest`,
    selector: data => Object.keys(data.rates)
  },
  'currency/FETCH_NEW_CURRENCY_LIST' : {
    url: `https://api.exchangeratesapi.io/latest?base=${getPayload}`,
    selector: data => Object.keys(data.rates)
  }
})