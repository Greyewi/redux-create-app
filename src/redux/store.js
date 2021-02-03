import {createStore, applyMiddleware} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './reducer'
import {routerMiddleware} from 'connected-react-router'
import history from '../history'
import {fetchMiddleware} from './middleware'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga'
const sagaMiddleware = createSagaMiddleware()

const enhancer = applyMiddleware(fetchMiddleware, thunk, routerMiddleware(history), logger, sagaMiddleware)
const store = createStore(reducer, enhancer)
sagaMiddleware.run(rootSaga)

export default store