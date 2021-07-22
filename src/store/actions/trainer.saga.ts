import {takeLatest, put, call} from 'redux-saga/effects';
import {ACTION_GET_TRAINER_REQUEST, ACTION_GET_TRAINER_SUCCESS, ActionType} from "../action-types";
import {CallbackType} from "../../types/callback.type";
import {AccountObjType} from "../../types/account.type";
import {EP_GET_TRAINER} from "../../enums/api.enum";
import api from "../../managers/api.manager";

function* sagaTrainerWatcher() {
    yield takeLatest(ACTION_GET_TRAINER_REQUEST, getTrainerWorker);
}

function* getTrainerWorker({payload}:ActionType<CallbackType<void>>) {
    try {
        const trainerData = (yield call(() => api.get(EP_GET_TRAINER))) as AccountObjType;
        yield put({type: ACTION_GET_TRAINER_SUCCESS, payload: trainerData});
    } catch(e) {

    }
}
