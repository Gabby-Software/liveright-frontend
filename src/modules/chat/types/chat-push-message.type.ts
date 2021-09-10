import { notificationsTypes } from '../../notifications/enums/notification-types.enum'
import { ChatMessageTypeType } from './chat-message-type.type'

export type ChatPushMessageType = {
  account_uuid: string
  content: { message: string }
  message: string
  name: string
  notification_type: notificationsTypes
  room_id: string
  types: ChatMessageTypeType[]
}
