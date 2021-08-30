import { useEffect } from 'react'
import { io, Socket } from 'socket.io-client'

import cookieManager from '../../../managers/cookie.manager'
import logger from '../../../managers/logger.manager'
import { AccountType } from '../../../types/account.type'
import { ChatMessageType } from '../types/chat-message.type'
import { ChatNewMessageType } from '../types/chat-new-message.type'

type SocketCallbackType = {
  id: number
  callback: (message: ChatMessageType) => void
}
class SocketManager {
  private socket: Socket | null = null
  private receivedHandlers: SocketCallbackType[] = []
  constructor() {
    const uuid = JSON.parse(cookieManager.get('auth') || '{}').accounts.find(
      (acc: AccountType) => acc.is_current
    )?.uuid
    this.init(uuid)
  }
  init(accountToken: string) {
    const token = cookieManager.get('access_token')
    this.socket = io(`ws://${process.env.REACT_APP_CHAT_BASE_URL}/chat`, {
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
  }
  private handleMessageReceived(msg: ChatNewMessageType) {
    logger.success('New message received!', msg)
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
  join(roomId: string) {
    if (!this.socket) return
    this.socket.emit('room:join', { roomId })
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
  useMessageReceived() {
    const id = Math.random()
    return (callback: (message: ChatMessageType) => void) => {
      useEffect(() => {
        this.receivedHandlers.push({ id, callback })
        return () => {
          const idx = this.receivedHandlers.findIndex(
            ({ id: rid }) => rid === id
          )
          this.receivedHandlers.splice(idx, 1)
        }
      }, [])
    }
  }
  public log() {
    console.log('IM socket manager')
  }
}
const socketManager = new SocketManager()
export default socketManager
