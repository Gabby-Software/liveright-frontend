import {spawn} from 'redux-saga/effects';
import {sagaProfileWatcher} from "./account.saga";

export default function* rootSaga() {
    yield spawn(sagaProfileWatcher);
}
