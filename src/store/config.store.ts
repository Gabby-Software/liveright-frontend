import 'regenerator-runtime/runtime'

import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'

import rootSaga from './actions'
import rootReducer from './reducers'

const saga = createSagaMiddleware()
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(saga))
)
saga.run(rootSaga)

export default store
