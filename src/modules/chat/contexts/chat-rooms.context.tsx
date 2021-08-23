import React, { createContext, Dispatch, FC, useContext, useState } from 'react'

export type ChatRoomsContextType = {
  roomId: string
  setRoomId: Dispatch<string>
}
const ChatRoomsContext = createContext<ChatRoomsContextType | null>(null)

export const useChatRooms = () =>
  useContext(ChatRoomsContext) as ChatRoomsContextType

export const ChatRoomsProvider: FC<unknown> = ({ children }) => {
  const [roomId, setRoomId] = useState('')
  return (
    <ChatRoomsContext.Provider value={{ roomId, setRoomId }}>
      {children}
    </ChatRoomsContext.Provider>
  )
}
