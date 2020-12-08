import {createStore, applyMiddleware} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './reducer'
import {routerMiddleware} from 'connected-react-router'
import history from '../history'
import {fetchMiddleware} from './middleware'

const enhancer = applyMiddleware(fetchMiddleware, thunk, routerMiddleware(history), logger)
const store = createStore(reducer, enhancer)

export default store