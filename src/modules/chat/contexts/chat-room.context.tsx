import moment from 'moment'
import React, {
  createContext,
  Dispatch,
  FC,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react'

import fileManager from '../../../managers/file.manager'
import logger from '../../../managers/logger.manager'
import { chatMessageTypes } from '../enums/chat-message-types.enum'
import { ChatRoomModes } from '../enums/chat-room-modes.enum'
import { imageExtentions } from '../enums/image-extentions.enum'
import { ChatMessageType } from '../types/chat-message.type'
import { ChatMessageTypeType } from '../types/chat-message-type.type'
import { useChats } from './chats.context'

type ChatRoomContextType = {
  mode: ChatRoomModes
  setMode: Dispatch<ChatRoomModes>
  messages: ChatMessageType[]
  playing: string | null
  setPlaying: Dispatch<string | null>
  openedImage: string
  setOpenedImage: Dispatch<string>
  textMessage: string
  setTextMessage: Dispatch<string>
  sendTextMessage: () => void
  sendFile: (file: FileList) => void
  sendAudio: (file: File) => void
  isPopup: boolean
}

const ChatRoomContext = createContext<ChatRoomContextType | null>(null)

export const useChatRoom = () =>
  useContext(ChatRoomContext) as ChatRoomContextType

export const ChatRoomProvider: FC<{ isPopup: boolean; room: string }> = ({
  children,
  isPopup,
  room
}) => {
  const [mode, setMode] = useState<ChatRoomModes>(ChatRoomModes.DEFAULT)
  const [playing, setPlaying] = useState<string | null>(null)
  const [openedImage, setOpenedImage] = useState<string>('')
  const [textMessage, setTextMessage] = useState<string>('')
  const { rooms, getRoom, updateRoom } = useChats()
  const messages = useMemo(() => {
    if (!room) return []
    if (rooms[room]) {
      return rooms[room].data
    }
    getRoom(room)
    return []
  }, [rooms, room])
  const setMessages = useCallback(
    (msgs: ChatMessageType[]) => {
      updateRoom(room, msgs)
    },
    [room, messages]
  )
  const msgBase = () => ({
    meta: {
      sent_at: moment().format(),
      delivered_at: null,
      read_at: null
    },
    content: {
      text: '',
      files: [],
      embedLinks: []
    },
    types: [],
    _id: Math.random().toString(36),
    senderId: '123',
    receiverId: '941cbd93-10c1-4a0d-b922-b39908a7227d',
    chat_room_id: '6116a782093e0a5e500e8eb6',
    createdAt: moment().format(),
    updatedAt: moment().format(),
    __v: 0
  })
  const addMessage = (msg: ChatMessageType) => {
    setMessages([...messages, msg])
    setTextMessage('')
  }
  const sendTextMessage = () => {
    const msg: ChatMessageType = msgBase()
    msg.types = [chatMessageTypes.TEXT]
    msg.content.text = textMessage
    addMessage(msg)
  }
  const sendFile = (files: FileList) => {
    const msg: ChatMessageType = msgBase()
    // if (textMessage) {
    //   msg.content.text = textMessage
    //   msg.types.push(chatMessageTypes.TEXT)
    // }
    for (const file of [...files]) {
      const ext = file.name.split('.').pop()?.toLowerCase()
      let type: ChatMessageTypeType = chatMessageTypes.FILE
      if (imageExtentions.includes(ext || '')) {
        logger.info('Image file type')
        type = chatMessageTypes.IMAGE
        msg.types.push(type)
        fileManager.resize(file, 920).then(([resizedurl]) => {
          msg.content.files.push(resizedurl)
          setMessages([...messages, msg])
        })
      } else {
        msg.types.push(type)
        fileManager.readAsUrl(file).then((url) => {
          msg.content.files.push(url)
          setMessages([...messages, msg])
        })
      }
    }
  }
  const sendAudio = (file: File) => {
    const msg: ChatMessageType = msgBase()
    msg.types = [chatMessageTypes.AUDIO]
    msg.content.files = [URL.createObjectURL(file)]
    setMessages([...messages, msg])
  }
  return (
    <ChatRoomContext.Provider
      value={{
        mode,
        setMode,
        messages,
        sendTextMessage,
        playing,
        setPlaying,
        openedImage,
        setOpenedImage,
        textMessage,
        setTextMessage,
        sendFile,
        sendAudio,
        isPopup
      }}
    >
      {children}
    </ChatRoomContext.Provider>
  )
}
