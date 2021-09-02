import moment from 'moment'
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
import { useAccountBasedState } from '../../../hooks/account-based-state'
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
  updateRoom: (roomId: string, msg: ChatMessageType) => void
  seeRoom: (roomId: string) => void
}
const ChatsContext = createContext<ChatsContextType | null>(null)
export const useChats = () => useContext(ChatsContext) as ChatsContextType

export const ChatsProvider: FC<unknown> = ({ children }) => {
  const [rooms, setRooms] = useAccountBasedState<ContextRoomType>(
    {},
    'chat-rooms'
  )
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
  socketManager.useDelivered()(({ roomId }) => {
    logger.success('message seen handle', roomId)
    roomsRef.current[roomId].messages.forEach((message) => {
      if (!message.meta.delivered_at) {
        message.meta.delivered_at = moment().format()
      }
    })
    setRooms({ ...roomsRef.current })
  })
  const seeRoom = (roomId: string) => {
    roomsRef.current[roomId].room.unReadMessagesCount = 0
    setRooms({ ...roomsRef.current })
  }
  socketManager.useSeen()(({ roomId }) => {
    logger.success('message seen handle', roomId)
    roomsRef.current[roomId].messages.forEach((message) => {
      if (!message.meta.read_at) {
        message.meta.read_at = moment().format()
      }
    })
    setRooms({ ...roomsRef.current })
  })
  socketManager.useMessageReceived()((msg: ChatMessageType) => {
    roomsRef.current[msg.chat_room_id].messages = [
      ...roomsRef.current[msg.chat_room_id].messages,
      msg
    ]
    roomsRef.current[msg.chat_room_id].room.lastMessage = msg
    roomsRef.current[msg.chat_room_id].room.unReadMessagesCount += 1
    setRooms({ ...roomsRef.current })
    socketManager.delivered(msg.chat_room_id)
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
      roomsRef.current[roomId] = {
        ...roomsRef.current[roomId],
        room: {
          ...roomsRef.current[roomId].room,
          unReadMessagesCount: 0
        },
        messages: res
      }
      setRooms({
        ...roomsRef.current
      })
    })
  }
  const updateRoom = (roomId: string, msg: ChatMessageType) => {
    roomsRef.current[roomId].messages = [
      ...roomsRef.current[roomId].messages,
      msg
    ]
    roomsRef.current[roomId].room.lastMessage = msg
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
        updateRoom,
        seeRoom
      }}
    >
      {children}
    </ChatsContext.Provider>
  )
}
