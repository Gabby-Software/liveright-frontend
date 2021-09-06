import moment from 'moment'

import { ChatMessageType } from '../types/chat-message.type'

export function emptyMessage(room: string, uuid: string): ChatMessageType {
  return {
    meta: {
      sent_at: moment().format(),
      delivered_at: null,
      read_at: null
    },
    content: {
      // text: '',
      files: [],
      embedLinks: []
    },
    types: [],
    _id: Math.random().toString(36),
    senderId: uuid,
    receiverId: '',
    chat_room_id: room,
    createdAt: moment().format(),
    updatedAt: moment().format(),
    __v: 0
  }
}
