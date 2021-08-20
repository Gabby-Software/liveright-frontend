/* eslint-disable no-unused-vars,@typescript-eslint/no-unused-vars */
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import { EP_GET_SESSIONS, EP_HEALTH_DATA_LOGS } from '../../enums/api.enum'
import api from '../../managers/api.manager'
import logger from '../../managers/logger.manager'
import { HealthData } from '../../pages/progress/progress.types'
import { queryFiltersPipe } from '../../pipes/query-filters.pipe'
import { serverError } from '../../pipes/server-error.pipe'
import { CallbackType } from '../../types/callback.type'
import { InvoiceType } from '../../types/invoice.type'
import { PaginatedDataType } from '../../types/paginated-data.type'
import { Session, SessionEdit, SessionFilter } from '../../types/session.type'
import {
  ACTION_CLIENT_REQUEST_SESSION_ERROR,
  ACTION_CLIENT_REQUEST_SESSION_LOAD,
  ACTION_CLIENT_REQUEST_SESSION_REQUEST,
  ACTION_CLIENT_REQUEST_SESSION_SUCCESS,
  ACTION_SET_HEALTH_DATA_ERROR,
  ACTION_SET_HEALTH_DATA_LOAD,
  ACTION_SET_HEALTH_DATA_REQUEST,
  ACTION_SET_HEALTH_DATA_SUCCESS,
  ActionType
} from '../action-types'

export function* sagaProgressWatcher() {
  yield takeLatest(ACTION_SET_HEALTH_DATA_REQUEST, setHealthDataWorker)
}

function* setHealthDataWorker({
  payload
}: ActionType<HealthData & CallbackType<void>>) {
  yield put({ type: ACTION_SET_HEALTH_DATA_LOAD })
  const { onSuccess, onError, ...data } = payload
  try {
    yield call(() => api.post(EP_HEALTH_DATA_LOGS, data))

    yield put({ type: ACTION_SET_HEALTH_DATA_SUCCESS })

    onSuccess && onSuccess()
  } catch (e) {
    yield put({
      type: ACTION_SET_HEALTH_DATA_ERROR,
      payload: serverError(e)
    })
  }
}
