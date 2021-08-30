import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import { useHistory } from 'react-router-dom'

import { Routes } from '../../../enums/routes.enum'
import { useAuth } from '../../../hooks/auth.hook'
import logger from '../../../managers/logger.manager'
import { serverError } from '../../../pipes/server-error.pipe'
import { getChatUsers, getRoomMessages } from '../managers/chat.manager'
import socketManager from '../managers/socket.manager'
import { ChatMessageType } from '../types/chat-message.type'
import { ChatRoomType } from '../types/chat-room.type'
type ContextRoomType = {
  [roomId: string]: {
    room: ChatRoomType
    messages: ChatMessageType[]
  }
}
export type ChatsContextType = {
  rooms: ContextRoomType
  popups: string[]
  expand: (roomID: string) => void
  collapse: (roomID: string) => void
  close: (roomID: string) => void
  getRoom: (roomId: string) => void
  updateRoom: (roomId: string, msgs: ChatMessageType[]) => void
}
const ChatsContext = createContext<ChatsContextType | null>(null)
export const useChats = () => useContext(ChatsContext) as ChatsContextType

export const ChatsProvider: FC<unknown> = ({ children }) => {
  const [rooms, setRooms] = useState<ContextRoomType>({})
  const { uuid } = useAuth()
  const roomsRef = useRef<ContextRoomType>({})
  const [popups, setPopups] = useState<string[]>([])
  const history = useHistory()
  const close = (roomId: string) => {
    setPopups(popups.filter((p) => p !== roomId))
  }
  const expand = (roomId: string) => {
    close(roomId)
    history.push(Routes.CHAT + `/${roomId}`)
  }
  socketManager.useMessageReceived()((msg: ChatMessageType) => {
    logger.info('new message handled', msg)
    roomsRef.current[msg.chat_room_id].messages.push(msg)
    roomsRef.current[msg.chat_room_id].room.lastMessage = msg
    setRooms({ ...roomsRef.current })
  })
  useEffect(() => {
    getChatUsers()
      .then((res) => {
        logger.success('USERS', res)
        res.forEach((room) => {
          socketManager.join(room.roomId)
        })
        roomsRef.current = res.reduce(
          (rooms: ContextRoomType, room: ChatRoomType) => {
            rooms[room.roomId] = {
              room,
              messages: []
            }
            return rooms
          },
          {}
        )
        setRooms(roomsRef.current)
      })
      .catch((err) => logger.error('Fail to load chat users', serverError(err)))
  }, [uuid])
  const collapse = (roomId: string) => {
    setPopups([...new Set([roomId, ...popups])])
    history.push(Routes.HOME)
  }
  const getRoom = (roomId: string) => {
    getRoomMessages(roomId).then((res) => {
      logger.success('Messages', res)
      roomsRef.current[roomId] = {
        ...roomsRef.current[roomId],
        messages: res
      }
      setRooms({
        ...roomsRef.current
      })
    })
  }
  const updateRoom = (roomId: string, msgs: ChatMessageType[]) => {
    logger.info('updating room', roomId, rooms, roomsRef)
    roomsRef.current[roomId].messages = msgs
    roomsRef.current[roomId].room.lastMessage = msgs[msgs.length - 1]
    setRooms({
      ...roomsRef.current
    })
  }
  return (
    <ChatsContext.Provider
      value={{
        rooms,
        popups,
        expand,
        close,
        collapse,
        getRoom,
        updateRoom
      }}
    >
      {children}
    </ChatsContext.Provider>
  )
}
