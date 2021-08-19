import { ReactComponent as InfoIcon } from '../../../assets/media/icons/info-outlined.svg'
import { ReactComponent as InvoicesIcon } from '../../../assets/media/icons/invoices.svg'
import { ReactComponent as SessionsIcon } from '../../../assets/media/icons/sessions.svg'
import { ReactComponent as InvitationIcon } from '../../../assets/media/icons/user.svg'
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
        Icon: InvitationIcon,
        color: 'invitation'
      }
    case notificationsTypes.INVOICE_CREATED:
    case notificationsTypes.INVOICE_STATUS_CHANGED:
      return {
        Icon: InvoicesIcon,
        color: 'invoice'
      }
    case notificationsTypes.SESSION_CREATED:
    case notificationsTypes.SESSION_DELETED:
    case notificationsTypes.SESSION_REQUESTED:
    case notificationsTypes.SESSION_UPDATED:
      return {
        Icon: SessionsIcon,
        color: 'session'
      }
    default:
      return {
        Icon: InfoIcon,
        color: 'info'
      }
  }
}
