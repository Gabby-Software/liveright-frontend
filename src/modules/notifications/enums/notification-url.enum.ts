import { Routes } from '../../../enums/routes.enum'
import userTypes from '../../../enums/user-types.enum'
import { invoices } from '../../../pipes/payments.pipe'
import { AccessOptionType } from '../../../types/access-option.type'
import { notificationsTypes } from './notification-types.enum'

interface NotificationUrlResponse {
  url: string
  slug: string
  native?: boolean
}

const EMPTY_RESPONSE: NotificationUrlResponse = {
  url: '',
  slug: ''
}

type NotificationUrl = (
  message: string,
  data: Record<string, any>,
  userType?: AccessOptionType
) => NotificationUrlResponse

export const notificationUrl: NotificationUrl = (message, data, userType) => {
  switch (message) {
    case notificationsTypes.INVITATION_ACCEPT:
      return {
        slug: `client's profile`,
        url: data.account_to?.id
          ? Routes.CLIENTS + `/${data.account_to?.id}` + Routes.PROFILE
          : ''
      }
    case notificationsTypes.INVITATION_REJECT:
      return {
        slug: `clients`,
        url: Routes.CLIENTS
      }
    case notificationsTypes.INVITATION_RECEIVED:
      return EMPTY_RESPONSE
    case notificationsTypes.INVOICE_CREATED:
    case notificationsTypes.INVOICE_STATUS_CHANGED:
      return {
        url: invoices(data.invoice_id),
        slug: 'invoice',
        native: true
      }
    case notificationsTypes.SESSION_DELETED:
      return {
        url: Routes.SESSIONS,
        slug: 'sessions'
      }
    case notificationsTypes.SESSION_REQUESTED:
      if (data.is_awaiting_rescheduling)
        return {
          url: Routes.SESSIONS,
          slug: 'awaiting reschedule'
        }
      return {
        url: Routes.SESSIONS,
        slug: 'sessions'
      }
    case notificationsTypes.SESSION_CREATED:
    case notificationsTypes.SESSION_UPDATED:
      return {
        url: Routes.SESSIONS,
        slug: 'sessions'
      }
    case notificationsTypes.NEW_CHAT_MESSAGE:
      return {
        url: Routes.CHAT + `/${data.room_id}`,
        slug: 'chat'
      }
    case notificationsTypes.HEALTH_REMINDER:
      return {
        url:
          userType === userTypes.CLIENT
            ? Routes.PROGRESS_CLIENT_HEALTH_DATA
            : Routes.CHAT,
        slug: userType === userTypes.CLIENT ? 'health data' : 'chat'
      }
    default:
      return EMPTY_RESPONSE
  }
}
