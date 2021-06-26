import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import "regenerator-runtime/runtime";
import rootReducer from "./reducers";
import rootSaga from './actions';

const saga = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(saga));
saga.run(rootSaga);

export default store;
