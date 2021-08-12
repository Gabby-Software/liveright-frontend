import {NotificationsType} from "../../types/notifications.type";
import {PaginatedDataType} from "../../types/paginated-data.type";
import {withStorage} from "./storage.hook";
import {
    ACTION_GET_NOTIFICATIONS_SUCCESS,
    ACTION_GET_UNREAD_NOTIFICATIONS_COUNT_SUCCESS, ACTION_NEW_NOTIFICATION,
    ActionType
} from "../action-types";
import logger from "../../managers/logger.manager";

export type NotificationsReducerType = {
    unread: number;
    notifications: PaginatedDataType<NotificationsType>
}
const initialValues: NotificationsReducerType = {
    unread: 0,
    notifications: {
        data: [],
        meta: {
            current_page: 1,
            per_page: 10,
            total: 0
        }
    }
}
export const notificationsReducer = withStorage((state = initialValues, {type, payload}: ActionType<any>) => {
    switch(type) {
        case ACTION_GET_UNREAD_NOTIFICATIONS_COUNT_SUCCESS:
            return {
                ...state,
                unread: payload
            }
        case ACTION_GET_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                notifications: payload
            }
        case ACTION_NEW_NOTIFICATION:
            logger.info('NEW UNREAD NOTIFICATION');
            return {
                ...state,
                unread: state.unread+1
            }
        default:
            return state;
    }
}, initialValues, 'notifications');