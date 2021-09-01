import moment from 'moment'
import React, {
  createContext,
  Dispatch,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'

import { useAuth } from '../../../hooks/auth.hook'
import fileManager from '../../../managers/file.manager'
import logger from '../../../managers/logger.manager'
import { chatMessageTypes } from '../enums/chat-message-types.enum'
import { ChatRoomModes } from '../enums/chat-room-modes.enum'
import { imageExtentions } from '../enums/image-extentions.enum'
import { uploadChatFile } from '../managers/chat.manager'
import socketManager from '../managers/socket.manager'
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
  typing: boolean
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
  const [typing, setTyping] = useState<boolean>(false)
  const { rooms, getRoom, updateRoom } = useChats()
  const { uuid } = useAuth()
  const [messages, roomData]: [ChatMessageType[], ChatRoomType | null] =
    room && rooms[room] ? [rooms[room].messages, rooms[room].room] : [[], null]
  useEffect(() => {
    setTyping(false)
    if (room && rooms[room]) {
      socketManager.seen(room)
      getRoom(room)
    }
  }, [room])
  socketManager.useTypingChange()(({ isTyping, roomId }) => {
    if (roomId === room) {
      setTyping(isTyping)
    }
  })
  socketManager.useSeen()(({ roomId }) => {
    if (roomId === room) {
      socketManager.seen(room)
    }
  })
  const setMessages = useCallback(
    (msg: ChatMessageType) => {
      updateRoom(room, msg)
    },
    [room]
  )
  const msgBase = () => ({
    meta: {
      sent_at: moment().format(),
      delivered_at: null,
      read_at: null
    },
    content: {
      // text: '',
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
    setMessages(msg)
    setTextMessage('')
    socketManager.sendMessage(msg)
  }
  const sendTextMessage = () => {
    const msg: ChatMessageType = msgBase()
    msg.types = [chatMessageTypes.TEXT]
    msg.content.text = textMessage
    addMessage(msg)
  }
  const sendFile = async (files: FileList) => {
    const msg: ChatMessageType = msgBase()
    for await (const file of [...files]) {
      const ext = file.name.split('.').pop()?.toLowerCase()
      let type: ChatMessageTypeType = chatMessageTypes.FILE
      if (imageExtentions.includes(ext || '')) {
        type = chatMessageTypes.IMAGE
        msg.types.push(type)
        await fileManager
          .resize(file, 920)
          .then(([_, f]) => {
            console.log(_)
            return uploadChatFile(f)
          })
          .then((f) => {
            msg.content.files.push(f)
          })
      } else {
        msg.types.push(type)
        await uploadChatFile(file).then((res) => {
          msg.content.files.push(res)
        })
      }
    }
    setMode(ChatRoomModes.DEFAULT)
    addMessage(msg)
  }
  const sendAudio = (file: File) => {
    uploadChatFile(file).then((res) => {
      logger.success('file uploaded', res)
      const msg: ChatMessageType = msgBase()
      msg.types = [chatMessageTypes.AUDIO]
      msg.content.files = [res]
      addMessage(msg)
    })
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
        roomData,
        typing
      }}
    >
      {children}
    </ChatRoomContext.Provider>
  )
}
