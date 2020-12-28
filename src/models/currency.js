import {createSelector} from 'reselect'
import axios from 'axios'

/**
 * Constants
 * */

export const moduleName = 'currency'
const prefix = moduleName

export const INIT_CURRENCY_TITLE_LIST_REQUEST = `${prefix}/INIT_CURRENCY_TITLE_LIST_REQUEST`
export const INIT_CURRENCY_TITLE_LIST_SUCCESS = `${prefix}/INIT_CURRENCY_TITLE_LIST_SUCCESS`
export const FETCH_NEW_CURRENCY_LIST = `${prefix}/FETCH_NEW_CURRENCY_LIST`
export const SAVE_ACTIVE_CURRENCY = `${prefix}/SAVE_ACTIVE_CURRENCY`
export const REMOVE_SAVED_CURRENCY = `${prefix}/REMOVE_SAVED_CURRENCY`
export const LOADING_DATA_SUCCESS = `${prefix}/LOADING_DATA_SUCCESS`
export const FETCH_DEMO_ITEMS_REQUEST = `${prefix}/FETCH_DEMO_ITEMS_REQUEST`
export const FETCH_DEMO_ITEMS_SUCCESS = `${prefix}/FETCH_DEMO_ITEMS_SUCCESS`

/**
 * Reducer
 * */

export const ReducerRecord = {
  currencyList: null,
  activeCurrencies: null,
  saveCurrencies: [],
  items: null,
  isLoading: false
}

export default function reducer(state = ReducerRecord, action) {
  const {type, payload} = action

  switch (type) {
    case INIT_CURRENCY_TITLE_LIST_SUCCESS:
      return Object.assign({}, state, {
        currencyList: payload
      })
    case FETCH_NEW_CURRENCY_LIST:
      return Object.assign({}, state, {
        activeCurrencies: payload
      })
    case SAVE_ACTIVE_CURRENCY:
      return Object.assign({}, state, {
        saveCurrencies: payload
      })
    case LOADING_DATA_SUCCESS:
      return Object.assign({}, state, {
        isLoading: payload
      })
    case FETCH_DEMO_ITEMS_SUCCESS:
      return Object.assign({}, state, {
        isLoading: payload
      })
    default:
      return state
  }
}

/**
 * Selectors
 * */

export const stateSelector = state => state[moduleName]
export const currencyListSelector = createSelector(stateSelector, state => state.currencyList)
export const itemsSelector = createSelector(stateSelector, state => state.items)
export const isLoadingSelector = createSelector(stateSelector, state => state.isLoading)
export const activeCurrenciesSelector = createSelector(stateSelector, state => state.activeCurrencies)
export const saveCurrenciesSelector = createSelector(stateSelector, state => state.saveCurrencies)

/**
 * Redux thunks
 * */

export function removeActiveCurrency(payload) {
  return (dispatch) => {
    localStorage.removeItem(payload)
    dispatch({
      type: REMOVE_SAVED_CURRENCY,
      payload: localStorage
    })
  }
}

export function saveActiveCurrency(payload) {
  return (dispatch, getState) => {
    const {currencyList} = getState()
    localStorage.setItem(currencyList.base, JSON.stringify(currencyList))

    dispatch({
      type: SAVE_ACTIVE_CURRENCY,
      payload: localStorage
    })
  }
}

export function getCurrencyData(payload) {
  return (dispatch) => {
    const url = `https://api.exchangeratesapi.io/latest?base=${payload}`
    axios.get(url).then(({data}) => {
      dispatch({
        type: FETCH_NEW_CURRENCY_LIST,
        payload: data
      })
    })
  }
}

export const initCurrencyList = () => ({
  type: INIT_CURRENCY_TITLE_LIST_REQUEST,
})

export const getDemoItems = () => ({
  type: FETCH_DEMO_ITEMS_REQUEST,
})