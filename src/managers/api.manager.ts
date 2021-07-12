import axios, {AxiosRequestConfig} from 'axios';
import cookieManager from "./cookie.manager";
import {EP_CSRF, EP_LOGOUT} from "../enums/api.enum";
import {toast} from "../components/toast/toast.component";
import {i18n} from "../modules/i18n/i18n.context";
import logger from "./logger.manager";
import {Routes} from "../enums/routes.enum";
import {FormikHelpers} from "formik";
import {serverError} from "../pipes/server-error.pipe";

const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL,
    withCredentials: true
});
logger.info('ENV', process.env);
api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        const token = cookieManager.get('access_token');
        const uuid = JSON.parse(cookieManager.get('auth') || '{}').uuid;
        if(uuid) config.headers['Account-Token'] =  uuid;
        if(token) config.headers['Authorization'] =  `Bearer ${token}`;
        logger.info('HTTP_REQUEST', config.url, config.data);
        return config;
    },
    err => Promise.reject(err)
);
api.interceptors.response.use(
    res => {
        logger.info('HTTP_RESPONSE', res.config.url, res);
        return res;
    },
    err => {
        if(!err.response) {
            logger.error('HTTP_ERROR', 'network error!');
            // toast.show({type: 'error',msg:i18n.t('errors:network-error')});
            return Promise.reject(err);
        }
        logger.error('HTTP_ERROR', err.response?.data?.message || err.message, err.response);
        if(err.response.status === 401) {
            // Todo: call api to logout
            api.post(EP_LOGOUT);
            localStorage.clear();
            cookieManager.removeAll();
            document.location.href = document.location.protocol + '//identity.' + document.location.host;
        }
        return Promise.reject(err)
    }
);
const post = api.post;
const put = api.put;
api.post = (url: string, data: any, config: AxiosRequestConfig) => {
    return api.get(EP_CSRF).then(() => post(url, data, config));
};
api.put = (url: string, data: any, config: AxiosRequestConfig) => {
    return api.get(EP_CSRF).then(() => put(url, data, config));
};

export const handleError = (formHelper:FormikHelpers<any>) => (e: any) => {
    if(e?.response?.data?.errors) {
        for (const [name, [message]] of Object.entries<string[]>(e.response.data.errors)) {
            formHelper.setFieldError(name, message);
        }
    } else {
        toast.show({type: 'error', msg: serverError(e)})
    }
    formHelper.setSubmitting(false)
};
export default api;
