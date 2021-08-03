import {takeLatest,throttle, put, call} from 'redux-saga/effects';
import {
    ACTION_GET_SESSIONS_ERROR,
    ACTION_GET_SESSIONS_LOAD,
    ACTION_GET_SESSIONS_REQUEST, ACTION_GET_SESSIONS_SUCCESS,
    ActionType
} from "../action-types";
import {CallbackType} from "../../types/callback.type";
import {EP_GET_SESSIONS, EP_GET_TRAINER} from "../../enums/api.enum";
import api from "../../managers/api.manager";
import logger from "../../managers/logger.manager";
import {PaginatedDataType} from "../../types/paginated-data.type";
import {InvoiceType} from "../../types/invoice.type";
import {serverError} from "../../pipes/server-error.pipe";

export function* sagaSessionsWatcher() {
    yield throttle(400,ACTION_GET_SESSIONS_REQUEST, getSessionsWorker);
}

function* getSessionsWorker({payload}:ActionType<{page: number, status: string, search: string, include: string}&CallbackType<void>>) {
    yield put({type:ACTION_GET_SESSIONS_LOAD});
    const {onSuccess, onError, ...query} = payload;
    try {
        const params = new URLSearchParams({...query} as any).toString();
        const sessions = (yield call(() => api.get(EP_GET_SESSIONS+`?${params}`).then(res => res.data))) as PaginatedDataType<InvoiceType>;
        logger.success('SESSIONS', sessions);
        yield put({type: ACTION_GET_SESSIONS_SUCCESS, payload: sessions});
        payload.onSuccess && payload.onSuccess();
    } catch(e) {
        yield put({type:ACTION_GET_SESSIONS_ERROR, payload: serverError(e)});
    }
}
