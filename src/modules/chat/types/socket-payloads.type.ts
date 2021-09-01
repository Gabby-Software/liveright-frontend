import { ChatMessageType } from './chat-message.type'

type SocketCallbackType<G> = {
  id: number
  callback: (data: G) => void
}
export type NewMessageCallbackType = SocketCallbackType<ChatMessageType>

export type TypingCallbackPayloadType = {
  roomId: string
  isTyping: boolean
}
export type TypingCallbackType = SocketCallbackType<TypingCallbackPayloadType>
