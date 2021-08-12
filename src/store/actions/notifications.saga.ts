import {takeLatest,put, call} from 'redux-saga/effects';
import {
    ACTION_GET_NOTIFICATIONS_REQUEST, ACTION_GET_NOTIFICATIONS_SUCCESS,
    ACTION_GET_UNREAD_NOTIFICATIONS_COUNT_REQUEST, ACTION_GET_UNREAD_NOTIFICATIONS_COUNT_SUCCESS, ActionType,
} from "../action-types";
import {CallbackType} from "../../types/callback.type";
import {EP_GET_NOTIFICATIONS, EP_GET_UNREAD_NOTIFICATIONS, EP_UNREAD_NOTIFICATIONS_COUNT} from "../../enums/api.enum";
import api from "../../managers/api.manager";
import logger from "../../managers/logger.manager";

export function* sagaNotificationsWatcher() {
    yield takeLatest(ACTION_GET_UNREAD_NOTIFICATIONS_COUNT_REQUEST, getUnreadCount);
    yield takeLatest(ACTION_GET_NOTIFICATIONS_REQUEST, getNotifications);
}

export function* getUnreadCount({payload}: ActionType<CallbackType<void>>) {
    const unread = (yield call(() => api.get(EP_UNREAD_NOTIFICATIONS_COUNT)
        .then(res => res.data.data.total))) as string;
    logger.success('UNREAD NOTIFICATIONS', unread);
    yield put({type: ACTION_GET_UNREAD_NOTIFICATIONS_COUNT_SUCCESS, payload: unread});
}
export function* getNotifications({payload}: ActionType<{ page: number }>) {
    const notifications = (yield call(() => api.get(EP_GET_NOTIFICATIONS+`?page=${payload.page||1}`)
        .then(res => res.data))) as string;
    logger.success('NOTIFICATIONS RRRES', notifications);
    yield put({type: ACTION_GET_NOTIFICATIONS_SUCCESS, payload: notifications});
}