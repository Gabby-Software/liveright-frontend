import api from '../../../managers/api.manager'
import { Chat_EP } from '../enums/chat-ep.enum'
import { ChatMessageType } from '../types/chat-message.type'
import { ChatRoomType } from '../types/chat-room.type'

export function getChatUsers(): Promise<ChatRoomType[]> {
  return api
    .get<ChatRoomType[]>(Chat_EP.USERS + '?limit=3')
    .then((res) => res.data)
}
export function getRoomMessages(roomId: string): Promise<ChatMessageType[]> {
  return api
    .get<ChatMessageType[]>(Chat_EP.MESSAGES(roomId))
    .then((res) => res.data)
}
