import axios, { AxiosRequestConfig } from 'axios'
import { FormikHelpers } from 'formik'
import moment from 'moment-timezone'

import { toast } from '../components/toast/toast.component'
import { EP_LOGOUT } from '../enums/api.enum'
import { Routes } from '../enums/routes.enum'
import notificationManager from '../modules/notifications/notifications.manager'
import { identity } from '../pipes/identity.pipe'
import { serverError } from '../pipes/server-error.pipe'
import { AccountType } from '../types/account.type'
import cookieManager from './cookie.manager'
import logger from './logger.manager'

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL
})
api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = cookieManager.get('access_token')
    const uuid = JSON.parse(cookieManager.get('auth') || '{}').accounts.find(
      (acc: AccountType) => acc.is_current
    )?.uuid
    if (uuid) config.headers['Account-Token'] = uuid
    if (token) config.headers['Authorization'] = `Bearer ${token}`
    config.headers['Timezone'] = moment.tz.guess()
    logger?.info('HTTP_REQUEST', config.url, config.data, config.headers)
    return config
  },
  (err) => Promise.reject(err)
)
api.interceptors.response.use(
  (res) => {
    logger?.info('HTTP_RESPONSE', res.config.url, res)
    return res
  },
  (err) => {
    if (!err.response) {
      logger?.error('HTTP_ERROR', 'network error!')
      // toast.show({type: 'error',msg:i18n.t('errors:network-error')});
      return Promise.reject(err)
    }
    logger?.error(
      'HTTP_ERROR',
      err.response?.data?.message || err.message,
      err.response
    )
    if (err.response.status === 401) {
      notificationManager.unsubscribeFromNotifications()
      api.post(EP_LOGOUT)
      localStorage.clear()
      cookieManager.removeAll()
      setTimeout(() => (document.location.href = identity(Routes.LOGIN)))
    }
    return Promise.reject(err)
  }
)
export const handleError = (formHelper: FormikHelpers<any>) => (e: any) => {
  if (e?.response?.data?.errors) {
    for (const [name, [message]] of Object.entries<string[]>(
      e.response.data.errors
    )) {
      formHelper.setFieldError(name, message)
    }
    toast.show({ type: 'error', msg: serverError(e) })
  } else {
    toast.show({ type: 'error', msg: serverError(e) })
  }
  formHelper.setSubmitting(false)
}
export default api
