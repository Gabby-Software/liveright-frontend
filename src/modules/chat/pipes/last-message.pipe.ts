import { chatMessageTypes } from '../enums/chat-message-types.enum'
import { ChatMessageType } from '../types/chat-message.type'

export const lastMessage = (msg?: ChatMessageType | null) => {
  if (!msg) return 'Joined chat'
  switch (msg.types[0]) {
    case chatMessageTypes.TEXT:
      return msg.content.text
    case chatMessageTypes.FILE:
      return 'Attached file'
    case chatMessageTypes.AUDIO:
      return 'Audio message'
    case chatMessageTypes.IMAGE:
      return 'Sent an image'
    case chatMessageTypes.VIDEO:
      return 'Sent a video'
    case chatMessageTypes.REQUEST_SESSION:
      return 'Requested a session'
    case chatMessageTypes.SESSION_RESCHEDULE:
      return 'Requested session reschedule'
    case chatMessageTypes.INVOICE:
      return 'Sent an invoice'
    default:
      return ''
  }
}
