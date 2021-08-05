import {takeLatest,throttle, put, call} from 'redux-saga/effects';
import {
    ACTION_GET_CLIENTS_ERROR,
    ACTION_GET_CLIENTS_LOAD, ACTION_GET_CLIENTS_REQUEST, ACTION_GET_CLIENTS_SUCCESS, ACTION_UPDATE_CLIENTS_FILTERS,
    ActionType
} from "../action-types";
import {CallbackType} from "../../types/callback.type";
import {EP_GET_CLIENTS,} from "../../enums/api.enum";
import api from "../../managers/api.manager";
import logger from "../../managers/logger.manager";
import {PaginatedDataType} from "../../types/paginated-data.type";
import {InvoiceType} from "../../types/invoice.type";
import {serverError} from "../../pipes/server-error.pipe";
import {AccountObjType, AccountType} from "../../types/account.type";
import userTypes from "../../enums/user-types.enum";
import {ProfileDataType} from "../../types/profile-data.type";
import {fillExist} from "../../pipes/fill-exist.pipe";

export function* sagaClientsWatcher() {
    yield takeLatest(ACTION_GET_CLIENTS_REQUEST, getClientsWorker);
}

function* getClientsWorker({payload}:ActionType<{page: number, status: string, query: string, type: string}&CallbackType<void>>) {
    const {onSuccess, onError, ...q} = payload;
    yield put({type:ACTION_GET_CLIENTS_LOAD});
    yield put({type:ACTION_UPDATE_CLIENTS_FILTERS, payload: {query:q.query, status:q.status, type:q.type}});
    try {
        const params = new URLSearchParams(fillExist(q) as any).toString();
        const clients = (yield call(() => api.get<PaginatedDataType<{user:AccountObjType, status:string}>>(EP_GET_CLIENTS+`?${params}`)
            .then(res => res.data)
            .then(res => ({
                meta: res,
                data: res.data.map(client => ({
                    ...client.user,
                    ...client.user.accounts.find(acc => acc.type === userTypes.CLIENT),
                    ...client.user.accounts.find(acc => acc.type === userTypes.CLIENT)?.profile,
                    user_uuid: client.user.uuid,
                    status: client.status,
                }))
            }))
        )) as PaginatedDataType<AccountObjType&AccountType&ProfileDataType>;
        logger.success('CLIENTS RESPONSE', clients);
        yield put({type: ACTION_GET_CLIENTS_SUCCESS, payload: clients});
        payload.onSuccess && payload.onSuccess();
    } catch(e) {
        logger.error('CLIENTS ERROR', e);
        yield put({type:ACTION_GET_CLIENTS_ERROR, payload: serverError(e)});
        payload.onError && payload.onError(serverError(e));
    }
}
