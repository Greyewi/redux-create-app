import {combineReducers} from 'redux'
import { reducer as formReducer } from 'redux-form'
import currencyReducer, {moduleName as currencyModule} from '../models/currency'

export default combineReducers({
  form: formReducer,
  [currencyModule]: currencyReducer,
})