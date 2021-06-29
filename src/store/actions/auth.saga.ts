import {takeLatest, put, call} from 'redux-saga/effects';
import {
    ACTION_LOGIN_REQUEST, ACTION_LOGIN_SUCCESS, ACTION_REGISTER_REQUEST, ACTION_REGISTER_SUCCESS, ActionType
} from "../action-types";
import {toast} from "../../components/toast/toast.component";
import {i18n} from "../../modules/i18n/i18n.context";
import {CallbackType} from "../../types/callback.type";
import api from "../../managers/api.manager";
import {EP_LOGIN, EP_REGISTER} from "../../enums/api.enum";
import {AuthRegisterType} from "../../modules/auth/auth-register.type";
import {AuthLoginType} from "../../modules/auth/auth-login.type";
import logger from "../../managers/logger.manager";
import {serverError} from "../../pipes/server-error.pipe";

export function* sagaAuthWatcher() {
    logger.info('AUTH SAGA INIT');
    yield takeLatest(ACTION_REGISTER_REQUEST, registerWorker);
    yield takeLatest(ACTION_LOGIN_REQUEST, loginWorker);
}

function* registerWorker({payload}: ActionType<AuthRegisterType & CallbackType<void>>) {
    logger.info('registering..', payload);
    try {
        const res = (yield call(() => callRegister(payload))) as string;
        yield put({type: ACTION_REGISTER_SUCCESS, payload: res});
        toast.show({type: 'success', msg: 'register-success'});
        payload.onSuccess && payload.onSuccess();
    } catch(e) {
        toast.show({type: 'error', msg: serverError(e)});
        payload.onError && payload.onError(e.message);
    }
}
function callRegister(data: AuthRegisterType): Promise<string> {
    return api.post(EP_REGISTER, data).then(res => res.data);
}

function* loginWorker({payload}: ActionType<AuthLoginType & CallbackType<void>>) {
    logger.info('login...');
    try {
        const res = (yield call(() => callLogin(payload))) as string;
        console.log('res', res);
        yield put({type: ACTION_LOGIN_SUCCESS, payload: res});
        toast.show({type: 'success', msg: i18n.t('alerts:login-success')});
    } catch(e) {
        toast.show({type: 'error', msg: serverError(e)});
        payload.onError && payload.onError(e.message);
    }
    payload.onSuccess && payload.onSuccess();
}
function callLogin(data: AuthLoginType): Promise<string> {
    return api.post(EP_LOGIN, data).then(res => res.data);
}
