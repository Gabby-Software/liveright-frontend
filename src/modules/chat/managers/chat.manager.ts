import api from '../../../managers/api.manager'
import { Chat_EP } from '../enums/chat-ep.enum'
import { ChatFileType } from '../types/chat-file.type'
import { ChatMessageType } from '../types/chat-message.type'
import { ChatRoomType } from '../types/chat-room.type'

export function getChatUsers(): Promise<ChatRoomType[]> {
  return api.get<ChatRoomType[]>(Chat_EP.USERS).then((res) => res.data)
}
export function getRoomMessages(roomId: string): Promise<ChatMessageType[]> {
  return api
    .get<ChatMessageType[]>(Chat_EP.MESSAGES(roomId))
    .then((res) => res.data)
}
export function uploadChatFile(file: File): Promise<ChatFileType> {
  const fd = new FormData()
  fd.append('file', file)
  return api.post(Chat_EP.UPLOAD, fd).then((res) => res.data)
}
