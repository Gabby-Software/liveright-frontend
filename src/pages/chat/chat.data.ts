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
    room_id: 'aaa',
    unread_count: 2
  },
  {
    id: 2,
    first_name: 'John',
    last_name: 'Travol',
    avatar: profilePlaceholder,
    last_message: 'Lorem Ipsum dolor sit ammet tralala trululu lalali lula',
    last_message_date: moment().add(-2, 'hours').format(),
    room_id: 'bbb',
    unread_count: 1
  },
  {
    id: 3,
    first_name: 'John',
    last_name: 'Travol',
    avatar: profilePlaceholder,
    last_message: 'Sound Great!',
    last_message_date: moment().add(-2, 'days').format(),
    room_id: 'ccc',
    unread_count: 0
  },
  {
    id: 4,
    first_name: 'John',
    last_name: 'Travol',
    avatar: profilePlaceholder,
    last_message: 'Sound Great!',
    last_message_date: moment().add(-1, 'week').format(),
    room_id: 'ddd',
    unread_count: 0
  }
]

export const mockMessages: ChatMessageType[] = [
  // {
  //   meta: {
  //     sent_at: moment().add(-2, 'days').format(),
  //     delivered_at: moment().add(-2, 'days').format(),
  //     read_at: moment().add(-2, 'days').format()
  //   },
  //   content: {
  //     text: 'Hello World',
  //     files: [],
  //     embedLinks: []
  //   },
  //   types: ['text'],
  //   _id: '611d974911dcb53c1064fd71',
  //   senderId: '123',
  //   receiverId: '941cbd93-10c1-4a0d-b922-b39908a7227d',
  //   chat_room_id: '6116a782093e0a5e500e8eb6',
  //   createdAt: '2021-08-18T23:27:05.383Z',
  //   updatedAt: '2021-08-18T23:27:05.383Z',
  //   __v: 0
  // },
  // {
  //   meta: {
  //     sent_at: moment().add(-1, 'days').format(),
  //     delivered_at: moment().add(-1, 'days').format(),
  //     read_at: moment().add(-1, 'days').format()
  //   },
  //   content: {
  //     text: '',
  //     files: ['https://picsum.photos/id/1/1200/920'],
  //     embedLinks: []
  //   },
  //   types: ['image'],
  //   _id: '611d974911dcb53c1064fd72',
  //   senderId: '941cbce2-fa1f-4e0f-9afe-2b04369a819a',
  //   receiverId: '941cbd93-10c1-4a0d-b922-b39908a7227d',
  //   chat_room_id: '6116a782093e0a5e500e8eb6',
  //   createdAt: '2021-08-18T23:27:05.383Z',
  //   updatedAt: '2021-08-18T23:27:05.383Z',
  //   __v: 0
  // },
  // {
  //   meta: {
  //     sent_at: moment().add(-1, 'hour').format(),
  //     delivered_at: moment().add(-1, 'hour').format(),
  //     read_at: moment().add(-1, 'hour').format()
  //   },
  //   content: {
  //     text: 'Lorem ipsum dolor sit ammet',
  //     files: [
  //       'https://picsum.photos/id/1/1200/920',
  //       'https://picsum.photos/id/8/1200/920'
  //     ],
  //     embedLinks: []
  //   },
  //   types: ['text', 'image', 'image'],
  //   _id: '611d974911dcb53c1064fd73',
  //   senderId: '123',
  //   receiverId: '941cbd93-10c1-4a0d-b922-b39908a7227d',
  //   chat_room_id: '6116a782093e0a5e500e8eb6',
  //   createdAt: '2021-08-18T23:27:05.383Z',
  //   updatedAt: '2021-08-18T23:27:05.383Z',
  //   __v: 0
  // },
  // {
  //   meta: {
  //     sent_at: moment().add(-23, 'minutes').format(),
  //     delivered_at: moment().add(-23, 'minutes').format(),
  //     read_at: null
  //   },
  //   content: {
  //     text: '',
  //     files: ['http://www.africau.edu/images/default/sample.pdf'],
  //     embedLinks: []
  //   },
  //   types: ['file'],
  //   _id: '611d974911dcb53c1064fd74',
  //   senderId: '941cbce2-fa1f-4e0f-9afe-2b04369a819a',
  //   receiverId: '941cbd93-10c1-4a0d-b922-b39908a7227d',
  //   chat_room_id: '6116a782093e0a5e500e8eb6',
  //   createdAt: '2021-08-18T23:27:05.383Z',
  //   updatedAt: '2021-08-18T23:27:05.383Z',
  //   __v: 0
  // },
  // {
  //   meta: {
  //     sent_at: moment().add(-23, 'minutes').format(),
  //     delivered_at: moment().add(-23, 'minutes').format(),
  //     read_at: null
  //   },
  //   content: {
  //     text: '',
  //     files: [
  //       'https://picsum.photos/id/53/1080/920',
  //       'https://picsum.photos/id/67/800/800',
  //       'https://picsum.photos/id/46/800/600',
  //       'https://picsum.photos/id/23/1080/1200',
  //       'https://picsum.photos/id/54/1200/1080',
  //       'https://picsum.photos/id/55/920/1200',
  //       'https://picsum.photos/id/56/600/920',
  //       'https://picsum.photos/id/77/920/800'
  //     ],
  //     embedLinks: []
  //   },
  //   types: [
  //     'image',
  //     'image',
  //     'image',
  //     'image',
  //     'image',
  //     'image',
  //     'image',
  //     'image'
  //   ],
  //   _id: '611d974911dcb53c1064fd75',
  //   senderId: '941cbce2-fa1f-4e0f-9afe-2b04369a819a',
  //   receiverId: '941cbd93-10c1-4a0d-b922-b39908a7227d',
  //   chat_room_id: '6116a782093e0a5e500e8eb6',
  //   createdAt: '2021-08-18T23:27:05.383Z',
  //   updatedAt: '2021-08-18T23:27:05.383Z',
  //   __v: 0
  // },
  // {
  //   meta: {
  //     sent_at: moment().add(-3, 'minutes').format(),
  //     delivered_at: moment().add(-3, 'minutes').format(),
  //     read_at: null
  //   },
  //   content: {
  //     text: '',
  //     files: [
  //       'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3'
  //     ],
  //     embedLinks: []
  //   },
  //   types: ['audio'],
  //   _id: '611d974911dcb63c1064fd75',
  //   senderId: '941cbce2-fa1f-4e0f-9afe-2b04369a819a',
  //   receiverId: '941cbd93-10c1-4a0d-b922-b39908a7227d',
  //   chat_room_id: '6116a782093e0a5e500e8eb6',
  //   createdAt: '2021-08-18T23:27:05.383Z',
  //   updatedAt: '2021-08-18T23:27:05.383Z',
  //   __v: 0
  // },
  // {
  //   meta: {
  //     sent_at: moment().add(-3, 'minutes').format(),
  //     delivered_at: moment().add(-3, 'minutes').format(),
  //     read_at: null
  //   },
  //   content: {
  //     text: '',
  //     files: [
  //       'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3'
  //     ],
  //     embedLinks: []
  //   },
  //   types: ['audio'],
  //   _id: '611d974911dcb63c1064id75',
  //   senderId: '123',
  //   receiverId: '941cbd93-10c1-4a0d-b922-b39908a7227d',
  //   chat_room_id: '6116a782093e0a5e500e8eb6',
  //   createdAt: '2021-08-18T23:27:05.383Z',
  //   updatedAt: '2021-08-18T23:27:05.383Z',
  //   __v: 0
  // }
]
