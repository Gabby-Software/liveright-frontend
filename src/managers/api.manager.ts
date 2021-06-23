import axios, {AxiosRequestConfig} from 'axios';
import cookieManager from "./cookie.manager";
const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL,
});
api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        const csrf = cookieManager.get('XSRF-TOKEN');
        if(token) config.headers.Authorization =  `Bearer ${token}`;
        if(csrf) config.headers['X-XSRF-TOKEN'] = csrf;
        return config;
    },
    err => Promise.reject(err)
);
api.interceptors.response.use(
    res => res,
    err => {
        if(err.response.status === 401) {
            localStorage.removeItem('token');
            // Todo: remove user data from redux store
            window.location.pathname = '/login';
        }
        return Promise.reject(err)
    }
);
export default api;
