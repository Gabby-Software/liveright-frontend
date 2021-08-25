import React, { createContext, FC, useContext, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { Routes } from '../../../enums/routes.enum'
import { APIGetType } from '../../../hoc/api-get'
import { ChatMessageType } from '../types/chat-message.type'

export type ChatsContextType = {
  rooms: { [roomId: string]: APIGetType<ChatMessageType[]> }
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
  const [rooms, setRooms] = useState<{
    [roomId: string]: APIGetType<ChatMessageType[]>
  }>({})
  const roomsRef = useRef<{
    [roomId: string]: APIGetType<ChatMessageType[]>
  }>({})
  const [popups, setPopups] = useState<string[]>([])
  const history = useHistory()
  const close = (roomId: string) => {
    setPopups(popups.filter((p) => p !== roomId))
  }
  const expand = (roomId: string) => {
    close(roomId)
    history.push(Routes.CHAT + `/${roomId}`)
  }

  const collapse = (roomId: string) => {
    setPopups([...new Set([roomId, ...popups])])
    history.push(Routes.HOME)
  }
  const getRoom = (roomId: string) => {
    roomsRef.current[roomId] = {
      loading: false,
      error: '',
      data: [
        // ...mockMessages
      ]
    }
    setRooms({
      ...roomsRef.current
    })
  }
  const updateRoom = (roomId: string, msgs: ChatMessageType[]) => {
    roomsRef.current[roomId] = {
      error: '',
      loading: false,
      data: msgs
    }
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
