import {spawn} from 'redux-saga/effects';
import {sagaProfileWatcher} from "./account.saga";
import {sagaAuthWatcher} from "./auth.saga";
import {sagaInvoicesWatcher} from "./invoices.saga";

export default function* rootSaga() {
    yield spawn(sagaProfileWatcher);
    yield spawn(sagaAuthWatcher);
    yield spawn(sagaInvoicesWatcher);
}
