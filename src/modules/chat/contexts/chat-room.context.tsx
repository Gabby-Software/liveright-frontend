import React, { createContext, Dispatch, FC, useContext, useState } from 'react'

import { ChatRoomModes } from '../enums/chat-room-modes.enum'
import { ChatMessageType } from '../types/chat-message.type'

type ChatRoomContextType = {
  mode: ChatRoomModes
  setMode: Dispatch<ChatRoomModes>
  messages: ChatMessageType[]
  setMessages: Dispatch<ChatMessageType[]>
  playing: string | null
  setPlaying: Dispatch<string | null>
  openedImage: string
  setOpenedImage: Dispatch<string>
}

const ChatRoomContext = createContext<ChatRoomContextType | null>(null)

export const useChatRoom = () =>
  useContext(ChatRoomContext) as ChatRoomContextType

export const ChatRoomProvider: FC<{}> = ({ children }) => {
  const [mode, setMode] = useState<ChatRoomModes>(ChatRoomModes.DEFAULT)
  const [messages, setMessages] = useState<ChatMessageType[]>([])
  const [playing, setPlaying] = useState<string | null>(null)
  const [openedImage, setOpenedImage] = useState<string>('')
  return (
    <ChatRoomContext.Provider
      value={{
        mode,
        setMode,
        messages,
        setMessages,
        playing,
        setPlaying,
        openedImage,
        setOpenedImage
      }}
    >
      {children}
    </ChatRoomContext.Provider>
  )
}
