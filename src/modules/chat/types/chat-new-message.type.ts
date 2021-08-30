import { ChatMessageContentType } from './chat-message-content.type'
import { ChatMessageMetaType } from './chat-message-meta.type'
import { ChatMessageTypeType } from './chat-message-type.type'

export type ChatNewMessageType = {
  roomId: string
  senderId: string
  message: {
    meta: ChatMessageMetaType
    content: ChatMessageContentType
    types: ChatMessageTypeType[]
  }
}
