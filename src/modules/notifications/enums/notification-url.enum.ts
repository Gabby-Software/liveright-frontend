import { Routes } from '../../../enums/routes.enum'
import { notificationsTypes } from './notification-types.enum'

const EMPTY_RESPONSE = {
  url: '',
  slug: ''
}
export const notificationUrl: (
  message: string,
  data: { [key: string]: string | number }
) => { slug: string; url: string } = (message, data) => {
  switch (message) {
    case notificationsTypes.INVITATION_ACCEPT:
      return {
        slug: `client's profile`,
        url: Routes.CLIENTS + `/${data.account_to_user_uuid}` + Routes.PROFILE
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
        url: Routes.INVOICES + `/${data.invoice_id}`,
        slug: 'invoice'
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
    default:
      return EMPTY_RESPONSE
  }
}
