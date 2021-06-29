import {takeLatest, put, call} from 'redux-saga/effects';
import {
    ACTION_LOGIN_REQUEST,
    ACTION_LOGIN_SUCCESS,
    ACTION_REGISTER_REQUEST,
    ACTION_REGISTER_SUCCESS,
    ACTION_VERIFY_EMAIL_REQUEST,
    ActionType
} from "../action-types";
import {toast} from "../../components/toast/toast.component";
import {i18n} from "../../modules/i18n/i18n.context";
import {CallbackType} from "../../types/callback.type";
import api from "../../managers/api.manager";
import {EP_LOGIN, EP_REGISTER, EP_VERIFY_EMAIL} from "../../enums/api.enum";
import {AuthRegisterType} from "../../modules/auth/auth-register.type";
import {AuthLoginType} from "../../modules/auth/auth-login.type";
import logger from "../../managers/logger.manager";
import {serverError} from "../../pipes/server-error.pipe";
import {VerifyEmailParamsType, VerifyEmailQueryType} from "../../modules/auth/verify-email-params.type";
import {AccountObjType} from "../../types/account.type";

export function* sagaAuthWatcher() {
    logger.info('AUTH SAGA INIT');
    yield takeLatest(ACTION_REGISTER_REQUEST, registerWorker);
    yield takeLatest(ACTION_LOGIN_REQUEST, loginWorker);
    yield takeLatest(ACTION_VERIFY_EMAIL_REQUEST, verifyEmailWorker);
}

function* registerWorker({payload}: ActionType<AuthRegisterType & CallbackType<void>>) {
    logger.info('registering..', payload);
    try {
        const res = (yield call(() => callRegister(payload))) as AccountObjType;
        yield put({type: ACTION_REGISTER_SUCCESS, payload: res});
        logger.log('REGISTRATION RESPONSE', res);
        localStorage.setItem('uuid', res.uuid);
        toast.show({type: 'success', msg: 'alerts:register-success'});
        payload.onSuccess && payload.onSuccess();
    } catch(e) {
        toast.show({type: 'error', msg: serverError(e)});
        payload.onError && payload.onError(e.message);
    }
}
function callRegister(data: AuthRegisterType): Promise<string> {
    return api.post(EP_REGISTER, {...data, gender:'male'}).then(res => res.data?.data);
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
function* verifyEmailWorker({payload}: ActionType<VerifyEmailParamsType & VerifyEmailQueryType & CallbackType<void>>) {
    try {
        const res: string = yield call(() => callVerify(payload));
        payload.onSuccess && payload.onSuccess();
        toast.show({type:'success', msg:'Email verified!'});
    } catch(e) {

    }
}
function callVerify({id, token,expires,signature}: VerifyEmailParamsType & VerifyEmailQueryType) {
    return api.get(EP_VERIFY_EMAIL+`/${id}/${token}?expires=${expires}&signature=${signature}`)
        .then(res => res.data);
}
