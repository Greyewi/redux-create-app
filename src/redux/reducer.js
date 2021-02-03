import {combineReducers} from 'redux'
import { reducer as formReducer } from 'redux-form'
import currencyReducer, {moduleName as currencyModule} from '../models/currency'
import {connectRouter} from 'connected-react-router'
import history from '../history'

export default combineReducers({
  router: connectRouter(history),
  form: formReducer,
  [currencyModule]: currencyReducer,
})