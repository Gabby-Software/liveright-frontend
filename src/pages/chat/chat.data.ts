import moment from 'moment'

import profilePlaceholder from '../../assets/media/profile-placeholder.png'
import { ChatMessageType } from '../../modules/chat/types/chat-message.type'
import { ChatRoomType } from '../../modules/chat/types/chat-room.type'

export const mockRooms: ChatRoomType[] = [
  {
    id: 1,
    first_name: 'John',
    last_name: 'Travol',
    avatar: profilePlaceholder,
    last_message: 'Sound Great!',
    last_message_date: moment().add(-24, 'minutes').format(),
    room_id: Math.random().toString(36).substring(2),
    unread_count: 2
  },
  {
    id: 2,
    first_name: 'John',
    last_name: 'Travol',
    avatar: profilePlaceholder,
    last_message: 'Lorem Ipsum dolor sit ammet tralala trululu lalali lula',
    last_message_date: moment().add(-2, 'hours').format(),
    room_id: Math.random().toString(36).substring(2),
    unread_count: 1
  },
  {
    id: 3,
    first_name: 'John',
    last_name: 'Travol',
    avatar: profilePlaceholder,
    last_message: 'Sound Great!',
    last_message_date: moment().add(-2, 'days').format(),
    room_id: Math.random().toString(36).substring(2),
    unread_count: 0
  },
  {
    id: 4,
    first_name: 'John',
    last_name: 'Travol',
    avatar: profilePlaceholder,
    last_message: 'Sound Great!',
    last_message_date: moment().add(-1, 'week').format(),
    room_id: Math.random().toString(36).substring(2),
    unread_count: 0
  }
]

export const mockMessages: ChatMessageType[] = [
  {
    meta: {
      sent_at: '2021-08-18T23:27:05.307Z',
      delivered_at: null,
      read_at: null
    },
    content: {
      text: 'Hello World',
      files: [],
      embedLinks: []
    },
    types: ['text'],
    _id: '611d974911dcb53c1064fd73',
    senderId: '941cbce2-fa1f-4e0f-9afe-2b04369a819a',
    receiverId: '941cbd93-10c1-4a0d-b922-b39908a7227d',
    chat_room_id: '6116a782093e0a5e500e8eb6',
    createdAt: '2021-08-18T23:27:05.383Z',
    updatedAt: '2021-08-18T23:27:05.383Z',
    __v: 0
  },
  {
    meta: {
      sent_at: '2021-08-18T23:27:05.307Z',
      delivered_at: null,
      read_at: null
    },
    content: {
      text: 'Hello World',
      files: [],
      embedLinks: []
    },
    types: ['text'],
    _id: '611d974911dcb53c1064fd73',
    senderId: '941cbce2-fa1f-4e0f-9afe-2b04369a819a',
    receiverId: '941cbd93-10c1-4a0d-b922-b39908a7227d',
    chat_room_id: '6116a782093e0a5e500e8eb6',
    createdAt: '2021-08-18T23:27:05.383Z',
    updatedAt: '2021-08-18T23:27:05.383Z',
    __v: 0
  },
  {
    meta: {
      sent_at: '2021-08-18T23:27:05.307Z',
      delivered_at: null,
      read_at: null
    },
    content: {
      text: 'Hello World',
      files: [],
      embedLinks: []
    },
    types: ['text'],
    _id: '611d974911dcb53c1064fd73',
    senderId: '941cbce2-fa1f-4e0f-9afe-2b04369a819a',
    receiverId: '941cbd93-10c1-4a0d-b922-b39908a7227d',
    chat_room_id: '6116a782093e0a5e500e8eb6',
    createdAt: '2021-08-18T23:27:05.383Z',
    updatedAt: '2021-08-18T23:27:05.383Z',
    __v: 0
  },
  {
    meta: {
      sent_at: '2021-08-18T23:27:05.307Z',
      delivered_at: null,
      read_at: null
    },
    content: {
      text: 'Hello World',
      files: [],
      embedLinks: []
    },
    types: ['text'],
    _id: '611d974911dcb53c1064fd73',
    senderId: '941cbce2-fa1f-4e0f-9afe-2b04369a819a',
    receiverId: '941cbd93-10c1-4a0d-b922-b39908a7227d',
    chat_room_id: '6116a782093e0a5e500e8eb6',
    createdAt: '2021-08-18T23:27:05.383Z',
    updatedAt: '2021-08-18T23:27:05.383Z',
    __v: 0
  }
]
