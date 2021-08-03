import {takeLatest,throttle, put, call} from 'redux-saga/effects';
import {
    ACTION_GET_CLIENT_MINIMAL_REQUEST, ACTION_GET_CLIENT_MINIMAL_SUCCESS,
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
import {MinimalProfileType} from "../../types/minimal-profile.type";

export function* sagaClientWatcher() {
    logger.log('DDDDDDDDDDDDDDD 1')
    yield takeLatest(ACTION_GET_CLIENT_MINIMAL_REQUEST, getClientMinimalWorker);
}
export function* getClientMinimalWorker({payload}: ActionType<string>) {
    logger.log('DDDDDDDDDDDDDD 2')
    const user = (yield call(() => api.get<{data:MinimalProfileType}>(EP_GET_CLIENTS+'/'+payload+'?return_minimal=1')
        .then(res => res.data.data))) as MinimalProfileType;
    yield put({type: ACTION_GET_CLIENT_MINIMAL_SUCCESS, payload: user});
}
