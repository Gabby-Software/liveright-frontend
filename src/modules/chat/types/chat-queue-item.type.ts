import { ChatMessageType } from './chat-message.type'

export type ChatQueueItemType = {
  message: ChatMessageType
  files: FileList
}
