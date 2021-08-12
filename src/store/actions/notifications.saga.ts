import {takeLatest,put, call} from 'redux-saga/effects';
import {
    ACTION_GET_NOTIFICATIONS_REQUEST,
    ACTION_GET_UNREAD_NOTIFICATIONS_COUNT_REQUEST, ActionType,
} from "../action-types";
import {CallbackType} from "../../types/callback.type";
import {EP_GET_NOTIFICATIONS, EP_GET_UNREAD_NOTIFICATIONS} from "../../enums/api.enum";
import api from "../../managers/api.manager";
import logger from "../../managers/logger.manager";

export function* sagaNotificationsSagaWatcher() {
    yield takeLatest(ACTION_GET_UNREAD_NOTIFICATIONS_COUNT_REQUEST, getUnreadCount);
    yield takeLatest(ACTION_GET_NOTIFICATIONS_REQUEST, getNotifications);
}

export function* getUnreadCount({payload}: ActionType<CallbackType<void>>) {
    const unread = (yield call(() => api.get(EP_GET_UNREAD_NOTIFICATIONS)
        .then(res => res.data))) as string;
    logger.success('UNREAD NOTIFICATIONS', unread);
}
export function* getNotifications({payload}: ActionType<{ page: number }>) {
    const notifications = (yield call(() => api.get(EP_GET_NOTIFICATIONS)
        .then(res => res.data))) as string;
    logger.success('NOTIFICATIONS', notifications);
}