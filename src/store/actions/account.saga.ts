import {takeLatest, put, call} from 'redux-saga/effects';
import {
    ACTION_GET_ACCOUNT_REQUEST,
    ACTION_UPDATE_ACCOUNT_REQUEST,
    ACTION_UPDATE_ACCOUNT_SUCCESS,
    ActionType
} from "../action-types";
import {ProfileDataType} from "../../types/profile-data.type";

export function* sagaProfileWatcher() {
    console.log('SAGA INIT');
    yield takeLatest(ACTION_UPDATE_ACCOUNT_REQUEST, updateProfileAction);
    yield takeLatest(ACTION_GET_ACCOUNT_REQUEST, getProfileAction);
}

function* updateProfileAction(action: ActionType<ProfileDataType>) {
    yield put({type: ACTION_UPDATE_ACCOUNT_SUCCESS, payload: action.payload});
}

function* getProfileAction() {

}
