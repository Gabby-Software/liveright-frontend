import {takeLatest, put, call} from 'redux-saga/effects';
import {
    ACTION_LOGIN_REQUEST,
    ACTION_LOGIN_SUCCESS, ACTION_LOGOUT_REQUEST,
    ACTION_REGISTER_REQUEST,
    ACTION_REGISTER_SUCCESS, ACTION_RESET_PASSWORD_REQUEST, ACTION_UPDATE_AUTH,
    ACTION_VERIFY_EMAIL_REQUEST, ACTION_VERIFY_EMAIL_RESEND_REQUEST,
    ActionType
} from "../action-types";
import {toast} from "../../components/toast/toast.component";
import {i18n} from "../../modules/i18n/i18n.context";
import {CallbackType} from "../../types/callback.type";
import api from "../../managers/api.manager";
import {
    EP_LOGIN, EP_LOGOUT,
    EP_REGISTER,
    EP_SEND_RESET_PASSWORD,
    EP_VERIFY_EMAIL,
    EP_VERIFY_EMAIL_RESEND
} from "../../enums/api.enum";
import {AuthRegisterType} from "../../modules/auth/auth-register.type";
import {AuthLoginType} from "../../modules/auth/auth-login.type";
import logger from "../../managers/logger.manager";
import {serverError} from "../../pipes/server-error.pipe";
import {VerifyEmailParamsType, VerifyEmailQueryType} from "../../modules/auth/verify-email-params.type";
import {AccountObjType} from "../../types/account.type";
import {Routes} from "../../enums/routes.enum";
import cookieManager from "../../managers/cookie.manager";

export function* sagaAuthWatcher() {
    logger.info('AUTH SAGA INIT');
    yield takeLatest(ACTION_REGISTER_REQUEST, registerWorker);
    yield takeLatest(ACTION_LOGIN_REQUEST, loginWorker);
    yield takeLatest(ACTION_VERIFY_EMAIL_REQUEST, verifyEmailWorker);
    yield takeLatest(ACTION_VERIFY_EMAIL_RESEND_REQUEST, verifyEmailResendWorker);
    yield takeLatest(ACTION_RESET_PASSWORD_REQUEST, resetPasswordWorker);
    yield takeLatest(ACTION_LOGOUT_REQUEST, logoutWorker);
}

function* registerWorker({payload}: ActionType<AuthRegisterType & CallbackType<void>>) {
    logger.info('registering..', payload);
    try {
        const res = (yield call(() => callRegister(payload))) as AccountObjType;
        yield put({type: ACTION_REGISTER_SUCCESS, payload: res});
        logger.log('REGISTRATION RESPONSE', res);
        localStorage.setItem('uuid', res.uuid);
        toast.show({type: 'success', msg: i18n.t('alerts:register-success')});
        payload.onSuccess && payload.onSuccess();
    } catch(e) {
        toast.show({type: 'error', msg: serverError(e)});
        payload.onError && payload.onError(e.message);
    }
}
function callRegister(data: AuthRegisterType): Promise<string> {
    return api.post(EP_REGISTER, data).then(res => res.data?.data);
}

function* loginWorker({payload}: ActionType<AuthLoginType & CallbackType<void>>) {
    logger.info('login...');
    try {
        const res = (yield call(() => callLogin(payload))) as AccountObjType;
        logger.info('login response', res);
        localStorage.setItem('uuid', res.uuid);
        yield put({type: ACTION_LOGIN_SUCCESS, payload: res});
        toast.show({type: 'success', msg: i18n.t('alerts:login-success')});
    } catch(e) {
        toast.show({type: 'error', msg: serverError(e)});
        payload.onError && payload.onError(e.message);
    }
    payload.onSuccess && payload.onSuccess();
}
function callLogin(data: AuthLoginType): Promise<string> {
    return api.post(EP_LOGIN, data).then(res => res.data.data);
}
function* verifyEmailWorker({payload}: ActionType<VerifyEmailParamsType & VerifyEmailQueryType & CallbackType<void>>) {
    try {
        yield call(() => callVerify(payload));
        yield put({type: ACTION_UPDATE_AUTH, payload: {is_active: true}});
        payload.onSuccess && payload.onSuccess();
        toast.show({type:'success', msg:i18n.t('alerts:email-verification-success')});
    } catch(e) {
        toast.show({type:'error', msg: i18n.t('alerts:email-verification-error')});
    }
}
function callVerify({id, token,expires,signature}: VerifyEmailParamsType & VerifyEmailQueryType) {
    return api.get(EP_VERIFY_EMAIL+`/${id}/${token}?expires=${expires}&signature=${signature}`)
        .then(res => res.data);
}
function* verifyEmailResendWorker() {
    try {
        yield call(() => api.post(EP_VERIFY_EMAIL_RESEND));
        toast.show({type:'success', msg: i18n.t('alerts:resend-verification-success')});
    } catch(e) {
        toast.show({type:'error', msg: i18n.t('errors:network-error')});
    }
}

function* resetPasswordWorker({payload}: ActionType<{email:string}&CallbackType<void>>) {
    try {
        yield call(() => api.post(EP_SEND_RESET_PASSWORD, {email: payload.email}));
        payload.onSuccess && payload.onSuccess();
    } catch(e) {
        toast.show({type: "error", msg: serverError(e)});
        payload.onError && payload.onError(serverError(e));
    }
}
function* logoutWorker() {
    try {
        yield () =>(api.post(EP_LOGOUT));
    } catch(e) {
        logger.error('Unable to logout');
    } finally {
        yield call(() => {
            localStorage.clear();
            document.cookie = '';
            window.location.pathname = Routes.LOGIN;
        });
    }
}
