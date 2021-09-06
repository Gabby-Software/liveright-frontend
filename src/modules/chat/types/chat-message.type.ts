import { chatMessageState } from '../enums/chat-message-state.enum'
import { ChatMessageContentType } from './chat-message-content.type'
import { ChatMessageInvoiceMetaType } from './chat-message-invoice-meta.type'
import { ChatMessageMetaType } from './chat-message-meta.type'
import { ChatMessageSessionMetaType } from './chat-message-session-meta.type'
import { ChatMessageTypeType } from './chat-message-type.type'

export type ChatMessageType = {
  meta: ChatMessageMetaType
  content: ChatMessageContentType
  types: ChatMessageTypeType[]
  _id: string
  senderId: string
  receiverId: string
  chat_room_id: string
  createdAt: string
  updatedAt: string
  __v: number
  session_meta_data?: ChatMessageSessionMetaType
  invoice_meta_data?: ChatMessageInvoiceMetaType
  state?: chatMessageState
}
