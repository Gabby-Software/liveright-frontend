import moment from 'moment'
import { useEffect } from 'react'
import { io, Socket } from 'socket.io-client'

import cookieManager from '../../../managers/cookie.manager'
import logger from '../../../managers/logger.manager'
import { throttle } from '../../../pipes/throttle.pipe'
import { AccountType } from '../../../types/account.type'
import { ChatMessageType } from '../types/chat-message.type'
import { ChatNewMessageType } from '../types/chat-new-message.type'
import {
  NewMessageCallbackType,
  RoomCallbackType,
  SocketCallbackType,
  TypingCallbackPayloadType,
  TypingCallbackType
} from '../types/socket-payloads.type'

class SocketManager {
  private socket: Socket | null = null
  private receivedHandlers: NewMessageCallbackType[] = []
  private typingHandlers: TypingCallbackType[] = []
  private deliveredHandlers: RoomCallbackType[] = []
  private seenHandlers: RoomCallbackType[] = []
  private stopTyping = throttle((roomId: string) => {
    this.socket?.emit('event:typing:send', { isTyping: false, roomId })
  }, 1000)
  constructor() {
    const uuid = JSON.parse(cookieManager.get('auth') || '{}').accounts?.find(
      (acc: AccountType) => acc.is_current
    )?.uuid
    if (uuid) this.init(uuid)
  }
  init(accountToken: string) {
    const token = cookieManager.get('access_token')
    this.socket?.disconnect()
    this.socket = io(`https://${process.env.REACT_APP_CHAT_BASE_URL}`, {
      path: '/chat',
      transports: ['websocket'],
      secure: true,
      auth: {
        token: `Bearer ${token}`,
        accountToken
      }
    })
    this.socket.on('connect', () => {
      console.log('socket connected!', this.socket?.id)
    })
    this.socket.on('disconnect', () => {
      console.log('socket dissconected!', this.socket?.connected)
    })
    this.socket.on('error', (err: string) => {
      logger.error('socket error!', err)
    })
    this.socket.on('message:receive', this.handleMessageReceived.bind(this))
    this.socket.on('event:typing:receive', this.handleTypingChange.bind(this))
    this.socket.on(
      'message:deliveredAt:receive',
      this.handleRoomDelivered.bind(this)
    )
    this.socket.on('message:readAt:receive', this.handleRoomSeen.bind(this))
  }
  private handleMessageReceived(msg: ChatNewMessageType) {
    for (const { callback } of this.receivedHandlers) {
      callback({
        chat_room_id: msg.roomId,
        senderId: msg.senderId,
        receiverId: '',
        createdAt: '',
        updatedAt: '',
        _id: Math.random().toString(),
        __v: 1,
        ...msg.message
      })
    }
  }
  private handleTypingChange(data: TypingCallbackPayloadType) {
    this.typingHandlers.forEach(({ callback }) => callback(data))
  }
  private handleRoomDelivered(data: TypingCallbackPayloadType) {
    logger.info('message delivered main handler')
    this.deliveredHandlers.forEach(({ callback }) => callback(data))
  }
  private handleRoomSeen(data: TypingCallbackPayloadType) {
    this.seenHandlers.forEach(({ callback }) => callback(data))
  }
  join(roomId: string) {
    if (!this.socket) return
    this.socket.emit('room:join', { roomId })
    this.delivered(roomId)
  }
  sendMessage(msg: ChatMessageType) {
    if (!this.socket) return
    const socketMessage = {
      message: {
        types: msg.types,
        content: msg.content,
        meta: {
          sent_at: msg.meta.sent_at
        }
      },
      senderId: msg.senderId,
      roomId: msg.chat_room_id
    }
    this.socket.emit('message:send', socketMessage)
  }
  private generateCallbackHook<G>(callbackArray: SocketCallbackType<G>[]) {
    const id = Math.random()
    return (callback: (data: G) => void) => {
      useEffect(() => {
        callbackArray.push({ id, callback })
        return () => {
          const idx = callbackArray.findIndex(({ id: rid }) => rid === id)
          callbackArray.splice(idx, 1)
        }
      }, [])
    }
  }
  useTypingChange() {
    return this.generateCallbackHook(this.typingHandlers)
  }
  useMessageReceived() {
    return this.generateCallbackHook(this.receivedHandlers)
  }
  useDelivered() {
    return this.generateCallbackHook(this.deliveredHandlers)
  }
  useSeen() {
    return this.generateCallbackHook(this.seenHandlers)
  }
  type(roomId: string) {
    this.socket?.emit('event:typing:send', { isTyping: true, roomId })
    this.stopTyping.next(roomId)
  }
  delivered(roomId: string) {
    logger.info('message delivered send')
    this.socket?.emit('message:deliveredAt:send', {
      roomId,
      meta: {
        delivered_at: moment().format()
      }
    })
  }
  seen(roomId: string) {
    logger.info('message seen send')
    this.socket?.emit('message:readAt:send', {
      roomId,
      meta: {
        read_at: moment().format()
      }
    })
  }
  disconnect() {
    this.socket?.disconnect()
  }
  public log() {
    console.log('IM socket manager')
  }
}
const socketManager = new SocketManager()
export default socketManager
