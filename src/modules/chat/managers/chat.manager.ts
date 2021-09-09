import api from '../../../managers/api.manager'
import logger from '../../../managers/logger.manager'
import { serverError } from '../../../pipes/server-error.pipe'
import { Chat_EP } from '../enums/chat-ep.enum'
import { ChatFileType } from '../types/chat-file.type'
import { ChatMessageType } from '../types/chat-message.type'
import { ChatRoomType } from '../types/chat-room.type'

export function getChatUsers(): Promise<ChatRoomType[]> {
  return api.get<ChatRoomType[]>(Chat_EP.USERS).then((res) => res.data)
}
const PAGE_SIZE = 20
export function getRoomMessages(
  roomId: string,
  page = 0
): Promise<ChatMessageType[]> {
  return api
    .get<ChatMessageType[]>(
      Chat_EP.MESSAGES(roomId) + `?limit=${PAGE_SIZE}&skip=${page * PAGE_SIZE}`
    )
    .then((res) => res.data)
}
export function uploadChatFile(file: File): Promise<ChatFileType> {
  const fd = new FormData()
  fd.append('file', file)
  return api.post(Chat_EP.UPLOAD, fd).then((res) => res.data)
}
export function deleteMessage(room: string, id: string) {
  return api
    .delete(Chat_EP.DELETE(room, id))
    .then((res) => logger.success('DELETE SUCCESS', res.data))
    .catch((err) => logger.error('DELETE ERROR', serverError(err)))
}
export function getLinkMeta(url: string): Promise<string> {
  return api
    .get(Chat_EP.GET_LINK_META + `?url=${url}`)
    .then((res) => {
      logger.success(`meta for ${url}`, res.data)
      return url
    })
    .catch((err) => {
      logger.error('get link meta error', err.message)
      return url
    })
}
