import {takeLatest, takeEvery, put, call} from 'redux-saga/effects';
import {
    ActionType,
    ACTION_TRAINER_CREATE_SESSION_ERROR,
    ACTION_TRAINER_CREATE_SESSION_LOAD,
    ACTION_TRAINER_CREATE_SESSION_REQUEST,
    ACTION_TRAINER_CREATE_SESSION_SUCCESS,
    ACTION_GET_SESSIONS_ERROR,
    ACTION_GET_SESSIONS_LOAD,
    ACTION_GET_SESSIONS_REQUEST,
    ACTION_GET_SESSIONS_SUCCESS,
    ACTION_EDIT_SESSIONS_ERROR,
    ACTION_EDIT_SESSIONS_LOAD,
    ACTION_EDIT_SESSIONS_REQUEST,
    ACTION_EDIT_SESSIONS_SUCCESS,
    ACTION_CLIENT_REQUEST_SESSION_REQUEST,
    ACTION_CLIENT_REQUEST_SESSION_LOAD,
    ACTION_CLIENT_REQUEST_SESSION_SUCCESS,
    ACTION_CLIENT_REQUEST_SESSION_ERROR,
    ACTION_CLIENT_RESCHEDULE_SESSION_LOAD,
    ACTION_CLIENT_RESCHEDULE_SESSION_SUCCESS,
    ACTION_CLIENT_RESCHEDULE_SESSION_ERROR,
    ACTION_CLIENT_RESCHEDULE_SESSION_REQUEST,
} from "../action-types";
import {CallbackType} from "../../types/callback.type";
import {EP_GET_SESSIONS} from "../../enums/api.enum";
import api from "../../managers/api.manager";
import logger from "../../managers/logger.manager";
import {PaginatedDataType} from "../../types/paginated-data.type";
import {InvoiceType} from "../../types/invoice.type";
import {serverError} from "../../pipes/server-error.pipe";
import {Session, SessionEdit, SessionFilter} from "../../types/session.type";
import {queryFiltersPipe} from "../../pipes/query-filters.pipe";

export function* sagaSessionsWatcher() {
    yield takeLatest(ACTION_TRAINER_CREATE_SESSION_REQUEST, createTrainerSessionsWorker)
    yield takeLatest(ACTION_CLIENT_REQUEST_SESSION_REQUEST, requestClientSessionWorker)
    yield takeLatest(ACTION_CLIENT_RESCHEDULE_SESSION_REQUEST, rescheduleClientSessionWorker)
    yield takeEvery(ACTION_GET_SESSIONS_REQUEST, getSessionsWorker)
    yield takeLatest(ACTION_EDIT_SESSIONS_REQUEST, editSessionsWorker)
}

function* createTrainerSessionsWorker({payload}:ActionType<{
    type: Session,
    date: string,
    duration: string,
    time: string,
    notes: string,
    client_id: number
}&CallbackType<void>>) {
    yield put({type:ACTION_TRAINER_CREATE_SESSION_LOAD});
    const {onSuccess, onError, ...data} = payload;
    try {
        const session = (yield call(() => api.post(EP_GET_SESSIONS, data).then(res => res.data))) as PaginatedDataType<InvoiceType>;
        logger.success('SESSIONS', session);
        yield put({type: ACTION_TRAINER_CREATE_SESSION_SUCCESS, payload: session});
        onSuccess && onSuccess();
    } catch(e) {
        yield put({type:ACTION_TRAINER_CREATE_SESSION_ERROR, payload: serverError(e)});
    }
}

function* requestClientSessionWorker({payload}:ActionType<{
    type: Session,
    client_request: {
        date: string,
        duration: string,
        time: string,
    },
    trainer_id: number
}&CallbackType<void>>) {
    yield put({type:ACTION_CLIENT_REQUEST_SESSION_LOAD});
    const {onSuccess, onError, ...data} = payload;
    try {
        const session = (yield call(() => api.post(EP_GET_SESSIONS, data).then(res => res.data))) as PaginatedDataType<InvoiceType>;
        logger.success('SESSIONS', session);
        yield put({type: ACTION_CLIENT_REQUEST_SESSION_SUCCESS, payload: session});
        onSuccess && onSuccess();
    } catch(e) {
        yield put({type:ACTION_CLIENT_REQUEST_SESSION_ERROR, payload: serverError(e)});
    }
}

function* rescheduleClientSessionWorker({payload}:ActionType<{
    date: string,
    time: string,
    duration: string,
    id: string
}&CallbackType<void>>) {
    yield put({type:ACTION_CLIENT_RESCHEDULE_SESSION_LOAD});
    const {onSuccess, onError, id, ...data} = payload;
    try {
        const session = (yield call(() => api.put(EP_GET_SESSIONS + `/${id}?include=trainer`, {
            client_request: data,
        }).then(res => res.data))) as PaginatedDataType<InvoiceType>;
        logger.success('SESSIONS', session);
        yield put({type: ACTION_CLIENT_RESCHEDULE_SESSION_SUCCESS, payload: session});
        onSuccess && onSuccess();
    } catch(e) {
        yield put({type:ACTION_CLIENT_RESCHEDULE_SESSION_ERROR, payload: serverError(e)});
    }
}

function* getSessionsWorker({payload}:ActionType<{
    filters: SessionFilter,
    page: number,
    search: string,
    include: string
}&CallbackType<void>>) {
    yield put({type:ACTION_GET_SESSIONS_LOAD});
    const {onSuccess, onError, filters, ...query} = payload;
    try {
        const filtersQuery = queryFiltersPipe(filters);
        const params = new URLSearchParams({...query, ...filtersQuery} as any).toString();
        const sessions = (
            yield call(
                () => api.get(EP_GET_SESSIONS+`?${params}&per_page=10`).then(res => res.data)
            )
        ) as PaginatedDataType<InvoiceType>;
        logger.success('SESSIONS', sessions);
        yield put({
            type: ACTION_GET_SESSIONS_SUCCESS,
            payload: { [filters.status || 'upcoming']: sessions }
        });
        payload.onSuccess && payload.onSuccess();
    } catch(e) {
        yield put({type:ACTION_GET_SESSIONS_ERROR, payload: serverError(e)});
    }
}

function* editSessionsWorker({payload}:ActionType<SessionEdit&CallbackType<void>>) {
    yield put({type:ACTION_EDIT_SESSIONS_LOAD});
    const {onSuccess, onError, id, ...data} = payload;
    try {
        const session = (
            yield call(
                () => api.put(EP_GET_SESSIONS+`/${id}?include=client`, data).then(res => res.data)
            )
        ) as PaginatedDataType<InvoiceType>;
        logger.success('SESSIONS', session);
        yield put({
            type: ACTION_EDIT_SESSIONS_SUCCESS,
            payload: session
        });
        payload.onSuccess && payload.onSuccess();
    } catch(e) {
        yield put({type:ACTION_EDIT_SESSIONS_ERROR, payload: serverError(e)});
    }
}
