import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import "regenerator-runtime/runtime";
import rootReducer from "./reducers";

function* exampleSaga() {
    yield console.log("Example saga reached");
}

const saga = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(saga));
saga.run(exampleSaga);

export default store;
