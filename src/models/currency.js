import {createSelector} from 'reselect'
import axios from 'axios'
import {all, take, put} from 'redux-saga/effects'

/**
 * Constants
 * */

export const moduleName = 'currency'
const prefix = moduleName

export const INIT_CURRENCY_TITLE_LIST_REQUEST = `${prefix}/INIT_CURRENCY_TITLE_LIST_REQUEST`
export const INIT_CURRENCY_TITLE_LIST_SUCCESS = `${prefix}/INIT_CURRENCY_TITLE_LIST_SUCCESS`
export const SAVE_ACTIVE_CURRENCY = `${prefix}/SAVE_ACTIVE_CURRENCY`
export const REMOVE_SAVED_CURRENCY = `${prefix}/REMOVE_SAVED_CURRENCY`
export const LOADING_DATA_SUCCESS = `${prefix}/LOADING_DATA_SUCCESS`
export const FETCH_DEMO_ITEMS_REQUEST = `${prefix}/FETCH_DEMO_ITEMS_REQUEST`
export const FETCH_DEMO_ITEMS_SUCCESS = `${prefix}/FETCH_DEMO_ITEMS_SUCCESS`

export const FETCH_CURRENCY_LIST_SAGA_START = `${prefix}/FETCH_CURRENCY_LIST_SAGA_START`
export const FETCH_CURRENCY_LIST_SAGA_SUCCESS = `${prefix}/FETCH_CURRENCY_LIST_SAGA_SUCCESS`
export const FETCH_CURRENCY_LIST_SAGA_ERROR = `${prefix}/FETCH_CURRENCY_LIST_SAGA_ERROR`

/**
 * Reducer
 * */

export const ReducerRecord = {
  currencyList: null,
  activeCurrencies: {
    rates: {},
    base: '',
    date: null
  },
  saveCurrencies: [],
  items: null,
  isLoading: false,
  errorMessage: null
}

export default function reducer(state = ReducerRecord, action) {
  const {type, payload} = action

  switch (type) {
    case INIT_CURRENCY_TITLE_LIST_SUCCESS:
      return Object.assign({}, state, {
        currencyList: payload
      })
    case FETCH_CURRENCY_LIST_SAGA_SUCCESS:
      return Object.assign({}, state, {
        activeCurrencies: payload
      })
    case FETCH_CURRENCY_LIST_SAGA_ERROR:
      return Object.assign({}, state, {
        errorMessage: payload
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
export const activeCurrenciesSelector = createSelector(stateSelector, state => state.activeCurrencies.rates)
export const activeCurrencyNameSelector = createSelector(stateSelector, state => state.activeCurrencies.base)
export const activeCurrencyDateSelector = createSelector(stateSelector, state => state.activeCurrencies.date)
export const saveCurrenciesSelector = createSelector(stateSelector, state => state.saveCurrencies)
export const loadingErrorSelector = createSelector(stateSelector, state => state.loadingError)

/**
 * Action Creators
 * */

export const initCurrencyList = () => ({
  type: INIT_CURRENCY_TITLE_LIST_REQUEST,
})

export const getDemoItems = () => ({
  type: FETCH_DEMO_ITEMS_REQUEST,
})

export const getCurrencyData = currency => ({
  type: FETCH_CURRENCY_LIST_SAGA_START,
  payload: currency
})

/**
 * Thunks
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

export const getCurrencyDataSaga = function* () {
  while (true) {
    const {payload} = yield take(FETCH_CURRENCY_LIST_SAGA_START)

    try {
      const url = `https://api.exchangeratesapi.io/latest?base=${payload}`
      const {data} = yield axios.get(url)

      yield put({
        type: FETCH_CURRENCY_LIST_SAGA_SUCCESS,
        payload: data
      })

    } catch (error) {
      console.log(error)
      yield put({
        type: FETCH_CURRENCY_LIST_SAGA_ERROR,
        payload: error
      })
    }
  }
}

export const saga = function* () {
  yield all([
    getCurrencyDataSaga(),
  ])
}