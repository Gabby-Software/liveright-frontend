import { ChatFileType } from './chat-file.type'
import { ChatMessageLinkType } from './chat-message-link.type'

export type ChatMessageContentType = {
  text?: string
  files: ChatFileType[]
  embedLinks: ChatMessageLinkType[]
}
