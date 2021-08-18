import {takeLatest, put, call, throttle} from 'redux-saga/effects';
import {
    ACTION_GET_NOTIFICATIONS_REQUEST,
    ACTION_GET_NOTIFICATIONS_SETTINGS_REQUEST,
    ACTION_GET_NOTIFICATIONS_SETTINGS_SUCCESS,
    ACTION_GET_NOTIFICATIONS_SUCCESS,
    ACTION_GET_UNREAD_NOTIFICATIONS_COUNT_REQUEST,
    ACTION_GET_UNREAD_NOTIFICATIONS_COUNT_SUCCESS,
    ACTION_UPDATE_NOTIFICATIONS_SETTINGS_REQUEST,
    ACTION_UPDATE_NOTIFICATIONS_SETTINGS_SUCCESS,
    ActionType,
} from "../action-types";
import {CallbackType} from "../../types/callback.type";
import logger from "../../managers/logger.manager";
import {NotificationsManager} from "../../modules/notifications/notifications.manager";
import {PaginatedDataType} from "../../types/paginated-data.type";
import {NotificationType} from "../../types/notifications.type";
import {NotificationSettingsType} from "../../modules/notifications/types/notification-settings.type";
import {toast} from "../../components/toast/toast.component";
import {serverError} from "../../pipes/server-error.pipe";

export function* sagaNotificationsWatcher() {
    yield takeLatest(ACTION_GET_UNREAD_NOTIFICATIONS_COUNT_REQUEST, getUnreadCount);
    yield takeLatest(ACTION_GET_NOTIFICATIONS_REQUEST, getNotifications);
    yield takeLatest(ACTION_GET_NOTIFICATIONS_SETTINGS_REQUEST, getNotificationsSettings);
    yield throttle(2000, ACTION_UPDATE_NOTIFICATIONS_SETTINGS_REQUEST, updateNotificationSettings);
}

export function* getUnreadCount({payload}: ActionType<CallbackType<void>>) {
    const unread = (yield call(() => NotificationsManager.getUnreadCount())) as number;
    yield put({type: ACTION_GET_UNREAD_NOTIFICATIONS_COUNT_SUCCESS, payload: unread});
}
export function* getNotifications({payload}: ActionType<CallbackType<void>&{ page: number }>) {
    const notifications = (yield call(() => NotificationsManager.get(payload.page||1))) as PaginatedDataType<NotificationType>;
    yield put({type: ACTION_GET_NOTIFICATIONS_SUCCESS, payload: notifications});
    payload.onSuccess && payload.onSuccess();
}

export function* getNotificationsSettings() {
    const settings = (yield call(()=> NotificationsManager.getSettings())) as NotificationSettingsType;
    logger.success('USER SETTINGS', settings);
    yield put({type: ACTION_GET_NOTIFICATIONS_SETTINGS_SUCCESS, payload: settings});
}
export function* updateNotificationSettings({payload}: ActionType<NotificationSettingsType>) {
    try {
        yield call(() => NotificationsManager.updateSettings(payload));
        yield put({type: ACTION_UPDATE_NOTIFICATIONS_SETTINGS_SUCCESS, payload});
    } catch(e) {
        toast.show({type: 'error', msg: serverError(e)})
    }
}