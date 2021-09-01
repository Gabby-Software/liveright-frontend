/* eslint-disable no-unused-vars,@typescript-eslint/no-unused-vars */
import { call, put, takeLatest } from 'redux-saga/effects'

import { EP_GET_CLIENTS } from '../../enums/api.enum'
import userTypes from '../../enums/user-types.enum'
import api from '../../managers/api.manager'
import logger from '../../managers/logger.manager'
import { fillExist } from '../../pipes/fill-exist.pipe'
import { serverError } from '../../pipes/server-error.pipe'
import { AccountObjType, AccountType } from '../../types/account.type'
import { CallbackType } from '../../types/callback.type'
import { PaginatedDataType } from '../../types/paginated-data.type'
import { ProfileDataType } from '../../types/profile-data.type'
import {
  ACTION_GET_CLIENTS_ERROR,
  ACTION_GET_CLIENTS_LOAD,
  ACTION_GET_CLIENTS_REQUEST,
  ACTION_GET_CLIENTS_SUCCESS,
  ACTION_UPDATE_CLIENTS_FILTERS,
  ActionType
} from '../action-types'

export function* sagaClientsWatcher() {
  yield takeLatest(ACTION_GET_CLIENTS_REQUEST, getClientsWorker)
}

function* getClientsWorker({
  payload
}: ActionType<
  {
    page: number
    status: string
    query: string
    type: string
  } & CallbackType<void>
>) {
  const { onSuccess, onError, ...q } = payload
  yield put({ type: ACTION_GET_CLIENTS_LOAD })
  yield put({
    type: ACTION_UPDATE_CLIENTS_FILTERS,
    payload: { query: q.query, status: q.status, type: q.type }
  })
  try {
    const params = new URLSearchParams(fillExist(q) as any).toString()
    const clients = (yield call(() =>
      api
        .get<PaginatedDataType<AccountObjType>>(EP_GET_CLIENTS + `?${params}`)
        .then((res) => res.data)
        .then((res) => ({
          meta: res.meta,
          data: res.data.map((client) => ({
            ...client,
            ...client.accounts.find((acc) => acc.type === userTypes.CLIENT),
            ...client.accounts.find((acc) => acc.type === userTypes.CLIENT)
              ?.profile,
            user_uuid: client.uuid,
            status: client.extras?.status
          }))
        }))
    )) as PaginatedDataType<AccountObjType & AccountType & ProfileDataType>
    logger.success('CLIENTS RESPONSE', clients)
    yield put({ type: ACTION_GET_CLIENTS_SUCCESS, payload: clients })
    payload.onSuccess && payload.onSuccess()
  } catch (e) {
    logger.error('CLIENTS ERROR', e)
    yield put({ type: ACTION_GET_CLIENTS_ERROR, payload: serverError(e) })
    payload.onError && payload.onError(serverError(e))
  }
}
