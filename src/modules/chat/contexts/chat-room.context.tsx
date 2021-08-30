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

import { useAuth } from '../../../hooks/auth.hook'
import fileManager from '../../../managers/file.manager'
import logger from '../../../managers/logger.manager'
import { chatMessageTypes } from '../enums/chat-message-types.enum'
import { ChatRoomModes } from '../enums/chat-room-modes.enum'
import { imageExtentions } from '../enums/image-extentions.enum'
import socketManager from '../managers/socket.manager'
import { toFileType } from '../pipes/to-file-type.pipe'
import { ChatMessageType } from '../types/chat-message.type'
import { ChatMessageTypeType } from '../types/chat-message-type.type'
import { ChatRoomType } from '../types/chat-room.type'
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
  room: string
  roomData: null | ChatRoomType
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
  const { uuid } = useAuth()
  const [messages, roomData] = useMemo<
    [ChatMessageType[], ChatRoomType | null]
  >(() => {
    if (!room) return [[], null]
    if (rooms[room]) {
      getRoom(room)
      return [rooms[room].messages, rooms[room].room]
    }
    return [[], null]
  }, [room, rooms])
  const setMessages = useCallback(
    (msgs: ChatMessageType[]) => {
      updateRoom(room, msgs)
    },
    [room, messages]
  )
  const msgBase = () => ({
    meta: {
      sent_at: moment().format(),
      delivered_at: moment().format(),
      read_at: moment().format()
    },
    content: {
      text: '',
      files: [],
      embedLinks: []
    },
    types: [],
    _id: Math.random().toString(36),
    senderId: uuid,
    receiverId: '',
    chat_room_id: room,
    createdAt: moment().format(),
    updatedAt: moment().format(),
    __v: 0
  })
  const addMessage = (msg: ChatMessageType) => {
    setMessages([...messages, msg])
    setTextMessage('')
    socketManager.sendMessage(msg)
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
        fileManager.resize(file, 920).then(([resizedurl, f]) => {
          msg.content.files.push(toFileType(resizedurl, f))
          addMessage(msg)
        })
      } else {
        msg.types.push(type)
        fileManager.readAsUrl(file).then((url) => {
          msg.content.files.push(toFileType(url, file))
          addMessage(msg)
        })
      }
      setMode(ChatRoomModes.DEFAULT)
    }
  }
  const sendAudio = (file: File) => {
    const msg: ChatMessageType = msgBase()
    msg.types = [chatMessageTypes.AUDIO]
    msg.content.files = [toFileType(URL.createObjectURL(file), file)]
    addMessage(msg)
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
        isPopup,
        room,
        roomData
      }}
    >
      {children}
    </ChatRoomContext.Provider>
  )
}
