import {takeLatest, put, call} from 'redux-saga/effects';
import {
    ACTION_ADD_ACCOUNT_REQUEST,
    ACTION_ADD_ACCOUNT_SUCCESS,
    ACTION_LOGIN_REQUEST,
    ACTION_LOGIN_SUCCESS,
    ACTION_LOGOUT_REQUEST,
    ACTION_REGISTER_REQUEST,
    ACTION_REGISTER_SUCCESS,
    ACTION_RESET_PASSWORD_REQUEST, ACTION_SWITCH_ACCOUNT_REQUEST,
    ACTION_SWITCH_ACCOUNT_SUCCESS,
    ACTION_UPDATE_AUTH_REQUEST,
    ACTION_UPDATE_AUTH_SUCCESS,
    ACTION_VERIFY_EMAIL_REQUEST,
    ACTION_VERIFY_EMAIL_RESEND_REQUEST,
    ActionType
} from "../action-types";
import {toast} from "../../components/toast/toast.component";
import {i18n} from "../../modules/i18n/i18n.context";
import {CallbackType} from "../../types/callback.type";
import api from "../../managers/api.manager";
import {
    EP_ADD_ACCOUNT,
    EP_LOGOUT,
    EP_UPDATE_USER,
} from "../../enums/api.enum";
import logger from "../../managers/logger.manager";
import {serverError} from "../../pipes/server-error.pipe";
import {AccountObjType, AccountType} from "../../types/account.type";
import {Routes} from "../../enums/routes.enum";
import cookieManager from "../../managers/cookie.manager";
import {identity} from "../../pipes/identity.pipe";
import {ProfileDataType} from "../../types/profile-data.type";

export function* sagaAuthWatcher() {
    logger.info('AUTH SAGA INIT');
    // yield takeLatest(ACTION_REGISTER_REQUEST, registerWorker);
    // yield takeLatest(ACTION_LOGIN_REQUEST, loginWorker);
    // yield takeLatest(ACTION_VERIFY_EMAIL_REQUEST, verifyEmailWorker);
    // yield takeLatest(ACTION_VERIFY_EMAIL_RESEND_REQUEST, verifyEmailResendWorker);
    // yield takeLatest(ACTION_RESET_PASSWORD_REQUEST, resetPasswordWorker);
    yield takeLatest(ACTION_LOGOUT_REQUEST, logoutWorker);
    yield takeLatest(ACTION_UPDATE_AUTH_REQUEST, updateAuthWorker);
    yield takeLatest(ACTION_SWITCH_ACCOUNT_REQUEST, switchAccountWorker);
    yield takeLatest(ACTION_ADD_ACCOUNT_REQUEST, addAccountWorker);
}
//
// function* registerWorker({payload}: ActionType<AuthRegisterType & CallbackType<void>>) {
//     logger.info('registering..', payload);
//     try {
//         const res = (yield call(() => callRegister(payload))) as AccountObjType;
//         yield put({type: ACTION_REGISTER_SUCCESS, payload: res});
//         logger.log('REGISTRATION RESPONSE', res);
//         localStorage.setItem('uuid', res.uuid);
//         toast.show({type: 'success', msg: i18n.t('alerts:register-success')});
//         payload.onSuccess && payload.onSuccess();
//     } catch(e) {
//         payload.onError && payload.onError(e);
//     }
// }
// function callRegister(data: AuthRegisterType): Promise<string> {
//     return api.post(EP_REGISTER, data).then(res => res.data?.data);
// }
//
// function* loginWorker({payload}: ActionType<AuthLoginType & CallbackType<void>>) {
//     logger.info('login...');
//     try {
//         const res = (yield call(() => callLogin(payload))) as AccountObjType;
//         logger.info('login response', res);
//         localStorage.setItem('uuid', res.uuid);
//         yield put({type: ACTION_LOGIN_SUCCESS, payload: res});
//         toast.show({type: 'success', msg: i18n.t('alerts:login-success')});
//         payload.onSuccess && payload.onSuccess();
//     } catch(e) {
//         payload.onError && payload.onError(e);
//     }
//
// }
// function callLogin(data: AuthLoginType): Promise<string> {
//     return api.post(EP_LOGIN, data).then(res => res.data.data);
// }
// function* verifyEmailWorker({payload}: ActionType<VerifyEmailParamsType & VerifyEmailQueryType & CallbackType<void>>) {
//     try {
//         yield call(() => callVerify(payload));
//         yield put({type: ACTION_UPDATE_AUTH_SUCCESS, payload: {is_active: true}});
//         setTimeout(() => {
//             payload.onSuccess && payload.onSuccess();
//         });
//         toast.show({type:'success', msg:i18n.t('alerts:email-verification-success')});
//     } catch(e) {
//         toast.show({type:'error', msg: serverError(e)});
//         payload.onError && payload.onError(serverError(e));
//     }
// }
// function callVerify({id, token,expires,signature}: VerifyEmailParamsType & VerifyEmailQueryType) {
//     return api.get(EP_VERIFY_EMAIL+`/${id}/${token}?expires=${expires}&signature=${signature}`)
//         .then(res => res.data);
// }
// function* verifyEmailResendWorker() {
//     try {
//         yield call(() => api.post(EP_VERIFY_EMAIL_RESEND));
//         toast.show({type:'success', msg: i18n.t('alerts:resend-verification-success')});
//     } catch(e) {
//         toast.show({type:'error', msg: i18n.t('errors:network-error')});
//     }
// }
//
// function* resetPasswordWorker({payload}: ActionType<{email:string}&CallbackType<void>>) {
//     try {
//         yield call(() => api.post(EP_SEND_RESET_PASSWORD, {email: payload.email}));
//         payload.onSuccess && payload.onSuccess();
//     } catch(e) {
//         toast.show({type: "error", msg: serverError(e)});
//         payload.onError && payload.onError(serverError(e));
//     }
// }
function* logoutWorker() {
    try {
        const res = (yield call(logoutCall)) as {};
    } catch(e) {
        logger.error('Unable to logout');
    } finally {
        yield call(() => {
            localStorage.clear();
            cookieManager.removeAll();
            document.location.href = identity(Routes.LOGIN);
        });
    }
}
async function logoutCall() {
    return call(() =>(api.post(EP_LOGOUT)));
}
function* updateAuthWorker({payload}: ActionType<AccountObjType & CallbackType<void>>) {
    const {onSuccess, onError, ...data} = payload;
    try {
        yield call(() => api.put(EP_UPDATE_USER, payload).then(res => res.data));
        yield put({type: ACTION_UPDATE_AUTH_SUCCESS, payload: data});
        onSuccess && onSuccess();
    } catch(e) {
        toast.show({type: 'error',msg: serverError(e)});
        onError && onError(serverError(e));
    }
}
async function updateCall(payload: AccountObjType) {
    api.put(EP_UPDATE_USER, payload).then(res => res.data)
}

function* switchAccountWorker({payload}: ActionType<{uuid:string}&CallbackType<void>>) {
    const {uuid, onError, onSuccess} = payload;
    logger.info('SWITCH_ACCOUNT', 2, uuid);
    yield put({type: ACTION_SWITCH_ACCOUNT_SUCCESS, payload: uuid});
    onSuccess && onSuccess();
}
// async function switchAccountCall() {
//
// }
function* addAccountWorker({payload}: ActionType<{type:string}&CallbackType<void>>) {
    const {type,onError,onSuccess} = payload;
    try {
        const res = (yield call(() => addAccountCall(type))) as AccountType;
        logger.success('GET NEW ACCOUNT', res);
        onSuccess && onSuccess();
        yield put({type: ACTION_ADD_ACCOUNT_SUCCESS, payload:{...res, profile:null}})
    }catch(e){
        onError && onError(e);
        toast.show({type: 'error',msg: serverError(e)});
    }
}
async function addAccountCall(type: string) {
    return api.post(EP_ADD_ACCOUNT,{type}).then(res => res.data.data);
}
function* updateProfileWorker({payload} : ActionType<ProfileDataType&AccountObjType&AccountType&CallbackType<void>>) {

}
