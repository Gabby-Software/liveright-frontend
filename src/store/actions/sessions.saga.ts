/* eslint-disable no-unused-vars,@typescript-eslint/no-unused-vars */
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import { EP_GET_SESSIONS } from '../../enums/api.enum'
import api from '../../managers/api.manager'
import logger from '../../managers/logger.manager'
import { queryFiltersPipe } from '../../pipes/query-filters.pipe'
import { serverError } from '../../pipes/server-error.pipe'
import { CallbackType } from '../../types/callback.type'
import { InvoiceType } from '../../types/invoice.type'
import { PaginatedDataType } from '../../types/paginated-data.type'
import {
  Session,
  SessionEdit,
  SessionFilter,
  SessionType
} from '../../types/session.type'
import {
  ACTION_CLIENT_REQUEST_SESSION_ERROR,
  ACTION_CLIENT_REQUEST_SESSION_LOAD,
  ACTION_CLIENT_REQUEST_SESSION_REQUEST,
  ACTION_CLIENT_REQUEST_SESSION_SUCCESS,
  ACTION_CLIENT_RESCHEDULE_SESSION_ERROR,
  ACTION_CLIENT_RESCHEDULE_SESSION_LOAD,
  ACTION_CLIENT_RESCHEDULE_SESSION_REQUEST,
  ACTION_CLIENT_RESCHEDULE_SESSION_SUCCESS,
  ACTION_EDIT_SESSIONS_ERROR,
  ACTION_EDIT_SESSIONS_LOAD,
  ACTION_EDIT_SESSIONS_REQUEST,
  ACTION_EDIT_SESSIONS_SUCCESS,
  ACTION_GET_SESSIONS_ERROR,
  ACTION_GET_SESSIONS_LOAD,
  ACTION_GET_SESSIONS_REQUEST,
  ACTION_GET_SESSIONS_SUCCESS,
  ACTION_TRAINER_CREATE_SESSION_ERROR,
  ACTION_TRAINER_CREATE_SESSION_LOAD,
  ACTION_TRAINER_CREATE_SESSION_REQUEST,
  ACTION_TRAINER_CREATE_SESSION_SUCCESS,
  ACTION_TRAINER_REMOVE_SESSION_ERROR,
  ACTION_TRAINER_REMOVE_SESSION_LOAD,
  ACTION_TRAINER_REMOVE_SESSION_REQUEST,
  ACTION_TRAINER_REMOVE_SESSION_SUCCESS,
  ActionType
} from '../action-types'

export function* sagaSessionsWatcher() {
  yield takeEvery(ACTION_GET_SESSIONS_REQUEST, getSessionsWorker)
  yield takeLatest(ACTION_EDIT_SESSIONS_REQUEST, editTrainerSessionsWorker)
  yield takeLatest(
    ACTION_TRAINER_CREATE_SESSION_REQUEST,
    createTrainerSessionsWorker
  )
  yield takeLatest(
    ACTION_TRAINER_REMOVE_SESSION_REQUEST,
    removeTrainerSessionsWorker
  )
  yield takeLatest(
    ACTION_CLIENT_RESCHEDULE_SESSION_REQUEST,
    rescheduleClientSessionWorker
  )
  yield takeLatest(
    ACTION_CLIENT_REQUEST_SESSION_REQUEST,
    requestClientSessionWorker
  )
}

function* createTrainerSessionsWorker({
  payload
}: ActionType<
  {
    type: Session
    date: string
    duration: string
    time: string
    notes: string
    client_id: number
    client_info: { first_name: string; last_name: string }
  } & CallbackType<number>
>) {
  yield put({ type: ACTION_TRAINER_CREATE_SESSION_LOAD })
  const { onSuccess, onError, client_info, ...data } = payload
  try {
    const session = (yield call(() =>
      api.post(EP_GET_SESSIONS, data).then((res) => res.data)
    )) as { data: { id: number } }
    logger.success('SESSIONS', session)
    yield put({
      type: ACTION_TRAINER_CREATE_SESSION_SUCCESS,
      payload: {
        session: {
          ...session.data,
          client: {
            id: payload.client_id,
            user: client_info
          }
        }
      }
    })
    onSuccess && onSuccess(session.data.id)
  } catch (e: any) {
    yield put({
      type: ACTION_TRAINER_CREATE_SESSION_ERROR,
      payload: serverError(e)
    })
  }
}

function* requestClientSessionWorker({
  payload
}: ActionType<
  {
    type: Session
    client_request: {
      date: string
      duration: string
      time: string
    }
    trainer_id: number
    onSuccess?: (session: SessionType) => void
  } & CallbackType<void>
>) {
  yield put({ type: ACTION_CLIENT_REQUEST_SESSION_LOAD })
  const { onSuccess, onError, ...data } = payload
  try {
    const session = (yield call(() =>
      api.post(EP_GET_SESSIONS, data).then((res) => res.data)
    )) as SessionType
    logger.success('SESSIONS', session)

    yield put({ type: ACTION_CLIENT_REQUEST_SESSION_SUCCESS })
    onSuccess && onSuccess(session)
  } catch (e: any) {
    yield put({
      type: ACTION_CLIENT_REQUEST_SESSION_ERROR,
      payload: serverError(e)
    })
  }
}

function* rescheduleClientSessionWorker({
  payload
}: ActionType<
  {
    date: string
    time: string
    duration: string
    id: string
  } & CallbackType<void>
>) {
  yield put({ type: ACTION_CLIENT_RESCHEDULE_SESSION_LOAD })
  const { onSuccess, onError, id, ...data } = payload
  try {
    const session = (yield call(() =>
      api
        .put(EP_GET_SESSIONS + `/${id}?include=trainer`, {
          client_request: data
        })
        .then((res) => res.data)
    )) as PaginatedDataType<InvoiceType>
    logger.success('SESSIONS', session)
    yield put({
      type: ACTION_CLIENT_RESCHEDULE_SESSION_SUCCESS,
      payload: { session: session.data }
    })
    onSuccess && onSuccess()
  } catch (e: any) {
    yield put({
      type: ACTION_CLIENT_RESCHEDULE_SESSION_ERROR,
      payload: serverError(e)
    })
  }
}

function* getSessionsWorker({
  payload
}: ActionType<
  {
    filters: SessionFilter
    page: number
    search: string
    include: string
  } & CallbackType<void>
>) {
  yield put({ type: ACTION_GET_SESSIONS_LOAD })
  const { onSuccess, onError, filters, ...query } = payload
  try {
    const filtersQuery = queryFiltersPipe(filters)
    const params = new URLSearchParams({
      ...query,
      ...filtersQuery
    } as any).toString()
    const sessions = (yield call(() =>
      api
        .get(EP_GET_SESSIONS + `?${params}&per_page=10`)
        .then((res) => res.data)
    )) as PaginatedDataType<InvoiceType>
    logger.success('SESSIONS', sessions)
    yield put({
      type: ACTION_GET_SESSIONS_SUCCESS,
      payload: { [filters.status || 'upcoming']: sessions }
    })
    payload.onSuccess && payload.onSuccess()
  } catch (e: any) {
    yield put({ type: ACTION_GET_SESSIONS_ERROR, payload: serverError(e) })
  }
}

function* editTrainerSessionsWorker({
  payload
}: ActionType<SessionEdit & { isAwaiting?: boolean } & CallbackType<void>>) {
  yield put({ type: ACTION_EDIT_SESSIONS_LOAD })
  const { onSuccess, onError, id, isAwaiting, ...data } = payload
  try {
    const session = (yield call(() =>
      api
        .put(EP_GET_SESSIONS + `/${id}?include=client`, data)
        .then((res) => res.data)
    )) as PaginatedDataType<InvoiceType>
    logger.success('SESSIONS', session)
    yield put({
      type: ACTION_EDIT_SESSIONS_SUCCESS,
      payload: { session: session.data, isAwaiting }
    })
    payload.onSuccess && payload.onSuccess()
  } catch (e: any) {
    yield put({ type: ACTION_EDIT_SESSIONS_ERROR, payload: serverError(e) })
  }
}

function* removeTrainerSessionsWorker({
  payload
}: ActionType<{ id: number } & CallbackType<void>>) {
  yield put({ type: ACTION_TRAINER_REMOVE_SESSION_LOAD })
  const { id } = payload
  try {
    const session = (yield call(() =>
      api.delete(EP_GET_SESSIONS + `/${id}`).then((res) => res.data)
    )) as PaginatedDataType<InvoiceType>
    logger.success('SESSIONS', session)
    yield put({
      type: ACTION_TRAINER_REMOVE_SESSION_SUCCESS,
      payload
    })
    payload.onSuccess && payload.onSuccess()
  } catch (e: any) {
    yield put({
      type: ACTION_TRAINER_REMOVE_SESSION_ERROR,
      payload: serverError(e)
    })
  }
}
