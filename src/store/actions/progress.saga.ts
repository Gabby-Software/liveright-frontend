import { call, put, takeLatest } from 'redux-saga/effects'

import { EP_HEALTH_DATA_LOGS } from '../../enums/api.enum'
import api from '../../managers/api.manager'
import {
  HealthData,
  OverTimeType,
  ProgressLogType
} from '../../pages/progress/progress.types'
import { queryFiltersPipe } from '../../pipes/query-filters.pipe'
import { serverError } from '../../pipes/server-error.pipe'
import { CallbackType } from '../../types/callback.type'
import {
  ACTION_GET_HEALTH_DATA_ERROR,
  ACTION_GET_HEALTH_DATA_REQUEST,
  ACTION_GET_HEALTH_DATA_SUCCESS,
  ACTION_SET_HEALTH_DATA_ERROR,
  ACTION_SET_HEALTH_DATA_LOAD,
  ACTION_SET_HEALTH_DATA_REQUEST,
  ACTION_SET_HEALTH_DATA_SUCCESS,
  ActionType
} from '../action-types'

export function* sagaProgressWatcher() {
  yield takeLatest(ACTION_SET_HEALTH_DATA_REQUEST, setHealthDataWorker)
  yield takeLatest(ACTION_GET_HEALTH_DATA_REQUEST, getHealthDataWorker)
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
  } catch (e:any) {
    yield put({
      type: ACTION_SET_HEALTH_DATA_ERROR,
      payload: serverError(e)
    })

    onError && onError(e)
  }
}

function* getHealthDataWorker({
  payload
}: ActionType<
  {
    id?: string
    only_include?: ProgressLogType
    date?: string
    account_id?: number
    range?: OverTimeType
    from_date?: string
    to_date?: string
  } & CallbackType<void>
>) {
  yield put({ type: ACTION_GET_HEALTH_DATA_REQUEST })
  const { onSuccess, onError, only_include, ...filters } = payload
  const filtersQuery = queryFiltersPipe(filters)
  const params = new URLSearchParams({
    only_include,
    ...filtersQuery
  } as any).toString()
  try {
    yield call(() => api.get(EP_HEALTH_DATA_LOGS + `?${params}&per_page=10`))
    yield put({ type: ACTION_GET_HEALTH_DATA_SUCCESS })

    onSuccess && onSuccess()
  } catch (e:any) {
    yield put({
      type: ACTION_GET_HEALTH_DATA_ERROR,
      payload: serverError(e)
    })

    onError && onError(e)
  }
}
