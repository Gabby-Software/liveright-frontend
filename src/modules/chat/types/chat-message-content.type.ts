import { ChatFileType } from './chat-file.type'
import { ChatMessageInvoiceMetaType } from './chat-message-invoice-meta.type'
import { ChatMessageLinkType } from './chat-message-link.type'
import { ChatMessageSessionMetaType } from './chat-message-session-meta.type'

export type ChatMessageContentType = {
  text?: string
  files: ChatFileType[]
  embedLinks: ChatMessageLinkType[]
  session_meta_data?: ChatMessageSessionMetaType
  invoice_meta_data?: ChatMessageInvoiceMetaType
}
