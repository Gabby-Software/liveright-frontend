import { useEffect } from 'react'
import { Socket } from 'socket.io-client'

import cookieManager from '../../../managers/cookie.manager'
import { AccountType } from '../../../types/account.type'
import { ChatMessageType } from '../types/chat-message.type'

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
  init() {
    // const token = cookieManager.get('access_token')
    // this.socket = io(`http://api.chat.liverightdev.xyz:5000/chat`, {
    //   auth: {
    //     token,
    //     accountToken
    //   }
    // })
    // this.socket.on('connect', () => {
    //   console.log('socket connected!', this.socket?.id)
    // })
    // this.socket.on('disconnect', () => {
    //   console.log('socket dissconected!', this.socket?.connected)
    // })
    // this.socket.on('message:receive', this.handleMessageReceived.bind(this))
  }
  // private handleMessageReceived(msg: ChatMessageType) {
  //   for (const { callback } of this.receivedHandlers) {
  //     callback(msg)
  //   }
  // }
  join(roomId: string) {
    if (!this.socket) return
    this.socket.emit('room:join', { roomId })
  }
  sendMessage(msg: ChatMessageType) {
    if (!this.socket) return
    this.socket.emit('message:send', msg)
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
