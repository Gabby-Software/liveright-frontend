import {
  CalendarIcon,
  InfoIcon,
  Invoice3Icon
} from '../../../assets/media/icons'
import { NotificationIconType } from '../types/notification-icon.type'
import { notificationsTypes } from './notification-types.enum'

export const notificationIcon: (
  notificationType: string
) => NotificationIconType = (notificationType) => {
  switch (notificationType) {
    case notificationsTypes.INVITATION_ACCEPT:
    case notificationsTypes.INVITATION_REJECT:
    case notificationsTypes.INVITATION_RECEIVED:
      return {
        Icon: InfoIcon,
        color: 'invitation'
      }
    case notificationsTypes.INVOICE_CREATED:
    case notificationsTypes.INVOICE_STATUS_CHANGED:
      return {
        Icon: Invoice3Icon,
        color: 'invoice'
      }
    case notificationsTypes.SESSION_CREATED:
    case notificationsTypes.SESSION_DELETED:
    case notificationsTypes.SESSION_REQUESTED:
    case notificationsTypes.SESSION_UPDATED:
      return {
        Icon: CalendarIcon,
        color: 'session'
      }
    default:
      return {
        Icon: CalendarIcon,
        color: 'info'
      }
  }
}
