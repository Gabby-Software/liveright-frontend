/* eslint-disable no-unused-vars,@typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function,require-yield */
import { call, put } from 'redux-saga/effects'

import logger from '../../managers/logger.manager'
import { CallbackType } from '../../types/callback.type'
import { ProfileDataType } from '../../types/profile-data.type'
import { ACTION_UPDATE_ACCOUNT_SUCCESS, ActionType } from '../action-types'

export function* sagaProfileWatcher() {
  logger.info('PROFILE SAGA INIT')
  // yield takeLatest(ACTION_UPDATE_ACCOUNT_REQUEST, updateProfileAction);
  // yield takeLatest(ACTION_GET_ACCOUNT_REQUEST, getProfileAction);
}

function* updateProfileAction(
  action: ActionType<ProfileDataType & CallbackType<void>>
) {
  const { onSuccess, onError, ...data } = action.payload
  yield put({ type: ACTION_UPDATE_ACCOUNT_SUCCESS, payload: data })
  // yield call(() => toast.show({type: 'success', msg: i18n.t('profile:update-success')}));
  yield call(() => onSuccess && onSuccess())
}

function* getProfileAction() {}

async function getProfileCall() {
  // api.get(EP_GET)
}
