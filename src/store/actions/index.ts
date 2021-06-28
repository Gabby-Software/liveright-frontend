import {spawn} from 'redux-saga/effects';
import {sagaProfileWatcher} from "./account.saga";
import {sagaAuthWatcher} from "./auth.saga";

export default function* rootSaga() {
    yield spawn(sagaProfileWatcher);
    yield spawn(sagaAuthWatcher);
}
