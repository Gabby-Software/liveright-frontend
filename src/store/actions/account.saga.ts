import {takeLatest, put, call} from 'redux-saga/effects';
import {
    ACTION_GET_ACCOUNT_REQUEST,
    ACTION_UPDATE_ACCOUNT_REQUEST,
    ACTION_UPDATE_ACCOUNT_SUCCESS,
    ActionType
} from "../action-types";
import {ProfileDataType} from "../../types/profile-data.type";
import {toast} from "../../components/toast/toast.component";
import {i18n} from "../../modules/i18n/i18n.context";
import logger from "../../managers/logger.manager";
import {CallbackType} from "../../types/callback.type";
import api from "../../managers/api.manager";

export function* sagaProfileWatcher() {
    logger.info('PROFILE SAGA INIT');
    yield takeLatest(ACTION_UPDATE_ACCOUNT_REQUEST, updateProfileAction);
    yield takeLatest(ACTION_GET_ACCOUNT_REQUEST, getProfileAction);
}

function* updateProfileAction(action: ActionType<ProfileDataType&CallbackType<void>>) {
    const {onSuccess, onError, ...data} = action.payload;
    yield put({type: ACTION_UPDATE_ACCOUNT_SUCCESS, payload: data});
    // yield call(() => toast.show({type: 'success', msg: i18n.t('profile:update-success')}));
    yield call(() => onSuccess && onSuccess());
}

function* getProfileAction() {

}

async function getProfileCall() {
    // api.get(EP_GET)
}

