import {takeLatest, put, call} from 'redux-saga/effects';
import {
    ACTION_GET_TRAINER_REQUEST,
    ACTION_GET_TRAINER_SUCCESS,
    ACTION_GET_TRAINER_LOAD,
    ACTION_GET_TRAINER_ERROR,
    ActionType,
} from "../action-types";
import {CallbackType} from "../../types/callback.type";
import {AccountObjType} from "../../types/account.type";
import {EP_GET_TRAINER} from "../../enums/api.enum";
import api from "../../managers/api.manager";
import {serverError} from "../../pipes/server-error.pipe";

export function* sagaTrainerWatcher() {
    yield takeLatest(ACTION_GET_TRAINER_REQUEST, getTrainerWorker);
}

function* getTrainerWorker({payload}:ActionType<CallbackType<void>>) {
    yield put({type:ACTION_GET_TRAINER_LOAD});

    try {
        const {data} = (yield call(() => api.get(EP_GET_TRAINER).then((res) => res.data))) as { data: AccountObjType };
        yield put({type: ACTION_GET_TRAINER_SUCCESS, payload: data});
    } catch(e) {
        yield put({type: ACTION_GET_TRAINER_ERROR, payload: serverError(e)});
    }
}
