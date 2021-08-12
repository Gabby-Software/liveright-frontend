import {spawn} from 'redux-saga/effects';
import {sagaProfileWatcher} from "./account.saga";
import {sagaAuthWatcher} from "./auth.saga";
import {sagaInvoicesWatcher} from "./invoices.saga";
import {sagaClientsWatcher} from "./clients.saga";
import {sagaClientWatcher} from "./client.saga";
import {sagaSessionsWatcher} from "./sessions.saga";
import {sagaNotificationsWatcher} from "./notifications.saga";

export default function* rootSaga() {
    yield spawn(sagaProfileWatcher);
    yield spawn(sagaAuthWatcher);
    yield spawn(sagaInvoicesWatcher);
    yield spawn(sagaClientsWatcher);
    yield spawn(sagaClientWatcher);
    yield spawn(sagaSessionsWatcher);
    yield spawn(sagaNotificationsWatcher);
}
