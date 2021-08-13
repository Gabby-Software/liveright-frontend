import axios, {AxiosRequestConfig} from 'axios';
import cookieManager from "./cookie.manager";
import {EP_LOGOUT} from "../enums/api.enum";
import {toast} from "../components/toast/toast.component";
import {i18n} from "../modules/i18n/i18n.context";
import logger from "./logger.manager";
import {Routes} from "../enums/routes.enum";
import {FormikHelpers} from "formik";
import {serverError} from "../pipes/server-error.pipe";
import {AccountType} from "../types/account.type";
import {identity} from "../pipes/identity.pipe";
import notificationManager from "../modules/notifications/notifications.manager";

const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL,
});
api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        const token = cookieManager.get('access_token');
        const uuid = JSON.parse(cookieManager.get('auth') || '{}').accounts.find((acc:AccountType) => acc.is_current)?.uuid;
        if(uuid) config.headers['Account-Token'] =  uuid;
        if(token) config.headers['Authorization'] =  `Bearer ${token}`;
        logger?.info('HTTP_REQUEST', config.url, config.data, config.headers);
        return config;
    },
    err => Promise.reject(err)
);
api.interceptors.response.use(
    res => {
        logger?.info('HTTP_RESPONSE', res.config.url, res);
        return res;
    },
    err => {
        if(!err.response) {
            logger?.error('HTTP_ERROR', 'network error!');
            // toast.show({type: 'error',msg:i18n.t('errors:network-error')});
            return Promise.reject(err);
        }
        logger?.error('HTTP_ERROR', err.response?.data?.message || err.message, err.response);
        if(err.response.status === 401) {
            notificationManager.unsubscribeFromNotifications();
            api.post(EP_LOGOUT);
            localStorage.clear();
            cookieManager.removeAll();
            setTimeout(() => document.location.href = identity(Routes.LOGIN));
        }
        return Promise.reject(err)
    }
);
export const handleError = (formHelper:FormikHelpers<any>) => (e: any) => {
    if(e?.response?.data?.errors) {
        for (const [name, [message]] of Object.entries<string[]>(e.response.data.errors)) {
            formHelper.setFieldError(name, message);
        }
        toast.show({type: 'error', msg: serverError(e)})
    } else {
        toast.show({type: 'error', msg: serverError(e)})
    }
    formHelper.setSubmitting(false)
};
export default api;
