import 'regenerator-runtime/runtime'

import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootSaga from './actions'
import rootReducer from './reducers'

const saga = createSagaMiddleware()
const store = createStore(rootReducer, applyMiddleware(saga))
saga.run(rootSaga)

export default store
