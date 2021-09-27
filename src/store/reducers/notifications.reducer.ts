import { NotificationSettingsType } from '../../modules/notifications/types/notification-settings.type'
import { NotificationType } from '../../types/notifications.type'
import { PaginatedDataType } from '../../types/paginated-data.type'
import {
  ACTION_GET_NOTIFICATIONS_SETTINGS_SUCCESS,
  ACTION_GET_NOTIFICATIONS_SUCCESS,
  ACTION_GET_UNREAD_NOTIFICATIONS_COUNT_SUCCESS,
  ACTION_NEW_NOTIFICATION,
  ACTION_UPDATE_NOTIFICATIONS_SETTINGS_SUCCESS,
  ActionType
} from '../action-types'
import { withStorage } from './storage.hook'

export type NotificationsReducerType = {
  unread: number
  notifications: PaginatedDataType<NotificationType>
  settings: NotificationSettingsType
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
  },
  settings: {
    payment: {
      browser: true,
      email: true
    },
    training: {
      browser: true,
      email: true
    },
    chat: {
      browser: true,
      email: true
    },
    other: {
      browser: true,
      email: true
    }
  }
}
export const notificationsReducer = withStorage(
  (state = initialValues, { type, payload }: ActionType<any>) => {
    switch (type) {
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
        return {
          ...state,
          unread: state.unread + 1
        }
      case ACTION_GET_NOTIFICATIONS_SETTINGS_SUCCESS:
      case ACTION_UPDATE_NOTIFICATIONS_SETTINGS_SUCCESS:
        return {
          ...state,
          settings: payload
        }
      default:
        return state
    }
  },
  initialValues,
  'notifications'
)
