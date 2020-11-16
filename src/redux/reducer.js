import {combineReducers} from 'redux'

import currencyReducer, {moduleName as currencyModule} from '../models/currency'

export default combineReducers({
  [currencyModule]: currencyReducer,
})