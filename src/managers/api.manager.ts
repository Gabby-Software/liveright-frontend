import axios, {AxiosRequestConfig} from 'axios';
import cookieManager from "./cookie.manager";
import {EP_CSRF} from "../enums/api.enum";
import {toast} from "../components/toast/toast.component";
import {i18n} from "../modules/i18n/i18n.context";
import logger from "./logger.manager";

const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL,
    withCredentials: true
});
logger.info('ENV', process.env);
api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        const csrf = cookieManager.get('XSRF-TOKEN');
        if(token) config.headers.Authorization =  `Bearer ${token}`;
        if(csrf) config.headers['X-XSRF-TOKEN'] = csrf;
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
            return toast.show({type: 'error',msg:i18n.t('errors:network-error')});
        }
        logger.error('HTTP_ERROR', err.response?.data?.message || err.message, err.response);
        if(err.response.status === 401) {
            localStorage.removeItem('token');
            // Todo: remove user data from redux store
            window.location.pathname = '/login';
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

export default api;
