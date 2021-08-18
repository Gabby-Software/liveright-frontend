import {takeLatest,put, call} from 'redux-saga/effects';
import {
    ACTION_GET_NOTIFICATIONS_REQUEST, ACTION_GET_NOTIFICATIONS_SUCCESS,
    ACTION_GET_UNREAD_NOTIFICATIONS_COUNT_REQUEST, ACTION_GET_UNREAD_NOTIFICATIONS_COUNT_SUCCESS, ActionType,
} from "../action-types";
import {CallbackType} from "../../types/callback.type";
import logger from "../../managers/logger.manager";
import {NotificationsManager} from "../../modules/notifications/notifications.manager";
import {PaginatedDataType} from "../../types/paginated-data.type";
import {NotificationType} from "../../types/notifications.type";

export function* sagaNotificationsWatcher() {
    yield takeLatest(ACTION_GET_UNREAD_NOTIFICATIONS_COUNT_REQUEST, getUnreadCount);
    yield takeLatest(ACTION_GET_NOTIFICATIONS_REQUEST, getNotifications);
}

export function* getUnreadCount({payload}: ActionType<CallbackType<void>>) {
    const unread = (yield call(() => NotificationsManager.getUnreadCount())) as number;
    logger.success('UNREAD NOTIFICATIONS', unread);
    yield put({type: ACTION_GET_UNREAD_NOTIFICATIONS_COUNT_SUCCESS, payload: unread});
}
export function* getNotifications({payload}: ActionType<CallbackType<void>&{ page: number }>) {
    const notifications = (yield call(() => NotificationsManager.get(payload.page||1))) as PaginatedDataType<NotificationType>;
    logger.success('NOTIFICATIONS RRRES', notifications);
    yield put({type: ACTION_GET_NOTIFICATIONS_SUCCESS, payload: notifications});
    payload.onSuccess && payload.onSuccess();
}