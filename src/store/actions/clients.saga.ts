import {takeLatest,throttle, put, call} from 'redux-saga/effects';
import {
    ACTION_GET_CLIENTS_ERROR,
    ACTION_GET_CLIENTS_LOAD, ACTION_GET_CLIENTS_REQUEST, ACTION_GET_CLIENTS_SUCCESS,
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

export function* sagaClientsWatcher() {
    yield throttle(400,ACTION_GET_CLIENTS_REQUEST, getClientsWorker);
}

function* getClientsWorker({payload}:ActionType<{page: number, status: string, search: string, include: string}&CallbackType<void>>) {
    yield put({type:ACTION_GET_CLIENTS_LOAD});
    const {onSuccess, onError, ...query} = payload;
    try {
        const params = new URLSearchParams({
            ...query,
        } as any).toString();
        const clients = (yield call(() => api.get<PaginatedDataType<AccountObjType>>(EP_GET_CLIENTS+`?${params}`)
            .then(res => res.data)
            .then(res => ({
                meta: res.meta,
                data: res.data.map(client => ({
                    ...client,
                    ...client.accounts.find(acc => acc.type === userTypes.CLIENT),
                    ...client.accounts.find(acc => acc.type === userTypes.CLIENT)?.profile
                }))
            }))
        )) as PaginatedDataType<AccountObjType&AccountType&ProfileDataType>;
        logger.success('CLIENTS RESPONSE', clients);
        yield put({type: ACTION_GET_CLIENTS_SUCCESS, payload: clients});
        payload.onSuccess && payload.onSuccess();
    } catch(e) {
        logger.error('CLIENTS ERROR', e);
        yield put({type:ACTION_GET_CLIENTS_ERROR, payload: serverError(e)});
    }
}
