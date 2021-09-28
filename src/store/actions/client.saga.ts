import { call, put, takeLatest } from 'redux-saga/effects'

import { EP_GET_CLIENTS, EP_UPDATE_PROFILE } from '../../enums/api.enum'
import api from '../../managers/api.manager'
import { serverError } from '../../pipes/server-error.pipe'
import { AccountObjType } from '../../types/account.type'
import { CallbackType } from '../../types/callback.type'
import { MinimalProfileType } from '../../types/minimal-profile.type'
import {
  ACTION_GET_CLIENT_MINIMAL_REQUEST,
  ACTION_GET_CLIENT_MINIMAL_SUCCESS,
  ACTION_GET_FULL_CLIENT_ERROR,
  ACTION_GET_FULL_CLIENT_LOAD,
  ACTION_GET_FULL_CLIENT_REQUEST,
  ACTION_GET_FULL_CLIENT_SUCCESS,
  ACTION_UPDATE_CLIENT_REQUEST,
  ACTION_UPDATE_CLIENT_SUCCESS,
  ActionType
} from '../action-types'

export function* sagaClientWatcher() {
  yield takeLatest(ACTION_GET_CLIENT_MINIMAL_REQUEST, getClientMinimalWorker)
  yield takeLatest(ACTION_GET_FULL_CLIENT_REQUEST, getFullClientWorker)
  yield takeLatest(ACTION_UPDATE_CLIENT_REQUEST, updateClientWorker)
}
function* getClientMinimalWorker({ payload }: ActionType<string>) {
  const user = (yield call(() =>
    api
      .get<{ data: MinimalProfileType }>(
        EP_GET_CLIENTS + '/' + payload + '?return_minimal=1'
      )
      .then((res) => res.data.data)
  )) as MinimalProfileType
  yield put({ type: ACTION_GET_CLIENT_MINIMAL_SUCCESS, payload: user })
}
function* getFullClientWorker({ payload }: ActionType<string>) {
  yield put({ type: ACTION_GET_FULL_CLIENT_LOAD })
  try {
    const user = (yield call(() =>
      api
        .get<{ data: MinimalProfileType }>(EP_GET_CLIENTS + '/' + payload)
        .then((res) => res.data.data)
    )) as MinimalProfileType
    yield put({ type: ACTION_GET_FULL_CLIENT_SUCCESS, payload: user })
  } catch (e: any) {
    yield put({ type: ACTION_GET_FULL_CLIENT_ERROR, payload: serverError(e) })
  }
}
function* updateClientWorker({
  payload
}: ActionType<
  CallbackType<void> & {
    dietary_restrictions: string
    injuries: string
    client_uuid: string
  }
>) {
  const { onError, onSuccess, injuries, dietary_restrictions, client_uuid } =
    payload
  try {
    const user = (yield call(() =>
      api
        .put(EP_UPDATE_PROFILE, {
          dietary_restrictions,
          injuries,
          client_uuid
        })
        .then((res) => res.data.data)
    )) as AccountObjType
    yield put({ type: ACTION_UPDATE_CLIENT_SUCCESS, payload: user })
    onSuccess && onSuccess()
  } catch (e: any) {
    onError && onError(serverError(e))
  }
}
