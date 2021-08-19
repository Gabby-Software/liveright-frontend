import { call, put, takeLatest } from 'redux-saga/effects'

import { EP_GET_TRAINER } from '../../enums/api.enum'
import api from '../../managers/api.manager'
import { serverError } from '../../pipes/server-error.pipe'
import { AccountObjType } from '../../types/account.type'
import { CallbackType } from '../../types/callback.type'
import {
  ACTION_GET_TRAINER_ERROR,
  ACTION_GET_TRAINER_LOAD,
  ACTION_GET_TRAINER_REQUEST,
  ACTION_GET_TRAINER_SUCCESS,
  ActionType
} from '../action-types'

export function* sagaTrainerWatcher() {
  yield takeLatest(ACTION_GET_TRAINER_REQUEST, getTrainerWorker)
}

// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
function* getTrainerWorker({ payload }: ActionType<CallbackType<void>>) {
  yield put({ type: ACTION_GET_TRAINER_LOAD })

  try {
    const { data } = (yield call(() =>
      api.get(EP_GET_TRAINER).then((res) => res.data)
    )) as { data: AccountObjType }
    yield put({ type: ACTION_GET_TRAINER_SUCCESS, payload: data })
  } catch (e) {
    yield put({ type: ACTION_GET_TRAINER_ERROR, payload: serverError(e) })
  }
}
