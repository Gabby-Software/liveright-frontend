import React, {
  createContext,
  Dispatch,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'

import { toast } from '../../../components/toast/toast.component'
import { useAuth } from '../../../hooks/auth.hook'
import { useConnection } from '../../../hooks/connection.hook'
import fileManager from '../../../managers/file.manager'
import logger from '../../../managers/logger.manager'
import { chatMessageState } from '../enums/chat-message-state.enum'
import { chatMessageTypes } from '../enums/chat-message-types.enum'
import { ChatRoomModes } from '../enums/chat-room-modes.enum'
import { imageExtentions } from '../enums/image-extentions.enum'
import { getLinkMeta, uploadChatFile } from '../managers/chat.manager'
import socketManager from '../managers/socket.manager'
import { insertedLinks } from '../pipes/links'
import { emptyMessage } from '../pipes/msg-base'
import { toFileType } from '../pipes/to-file-type.pipe'
import { ChatMessageType } from '../types/chat-message.type'
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
  const { rooms, getRoom, updateRoom, seeRoom, removeMessage } = useChats()
  const { uuid } = useAuth()
  const isOnline = useConnection()
  const [messages, roomData]: [ChatMessageType[], ChatRoomType | null] =
    room && rooms[room] ? [rooms[room].messages, rooms[room].room] : [[], null]
  useEffect(() => {
    setTyping(false)
    if (room && rooms[room] && isOnline) {
      socketManager.seen(room)
      getRoom(room)
    }
  }, [room, isOnline])
  socketManager.useTypingChange()(({ isTyping, roomId }) => {
    if (roomId === room) {
      setTyping(isTyping)
    }
  })
  socketManager.useMessageReceived()(({ chat_room_id }) => {
    if (chat_room_id === room) {
      socketManager.seen(room)
      seeRoom(room)
    }
  })
  const setMessages = useCallback(
    (msg: ChatMessageType) => {
      updateRoom(room, msg)
    },
    [room]
  )
  const msgBase = () => emptyMessage(room, uuid)
  const addMessage = (msg: ChatMessageType) => {
    // setMessages(msg)
    setTextMessage('')
    socketManager.sendMessage(msg)
  }
  const sendTextMessage = async () => {
    const msg: ChatMessageType = msgBase()
    msg.types = [chatMessageTypes.TEXT]
    msg.content.text = textMessage
    const links = insertedLinks(textMessage)
    if (links?.length) {
      const embedLinks = []
      for await (const url of links) {
        const title = await getLinkMeta(url)
        embedLinks.push({ title, url })
      }
      msg.content.embedLinks = embedLinks
    }
    addMessage(msg)
  }
  const sendFile = async (files: FileList) => {
    logger.info('send file triggered', files)
    if ([...files].some((file) => file.size > 1024 ** 2 * 100)) {
      return toast.show({
        type: 'error',
        msg: 'file size cannot be greater then 100 MB'
      })
    }
    const msg: ChatMessageType = msgBase()
    const id = msg._id
    msg.state = chatMessageState.PENDING
    msg.content.files = [...files].map((f, i) => {
      const ext = f.name.split('.').pop()?.toLowerCase()
      const isImage = imageExtentions.includes(ext || '')
      msg.types[i] = isImage ? chatMessageTypes.IMAGE : chatMessageTypes.FILE
      return toFileType(isImage ? URL.createObjectURL(f) : `file.${ext}`, f)
    })
    logger.info('set pending message', msg)
    setMessages(msg)
    for await (const [i, file] of [...files].entries()) {
      const ext = file.name.split('.').pop()?.toLowerCase()
      if (imageExtentions.includes(ext || '')) {
        logger.info('uploading image', file)
        await fileManager
          .resize(file, 920)
          .then(([_, f]) => {
            console.log(_)
            return uploadChatFile(f)
          })
          .then((f) => {
            msg.content.files[i] = f
          })
      } else {
        logger.info('uploading file', file)
        await uploadChatFile(file).then((res) => {
          msg.content.files[i] = res
        })
      }
    }
    logger.info('finish upload', msg)
    setMode(ChatRoomModes.DEFAULT)
    msg.state = chatMessageState.SENT
    removeMessage(room, id)
    addMessage(msg)
  }
  const sendAudio = (file: File) => {
    const msg: ChatMessageType = msgBase()
    msg.types = [chatMessageTypes.AUDIO]
    msg.content.files = [toFileType('', file)]
    msg.state = chatMessageState.PENDING
    setMessages(msg)
    uploadChatFile(file).then((res) => {
      logger.success('file uploaded', res)
      msg.state = chatMessageState.SENT
      msg.content.files = [res]
      removeMessage(room, msg._id)
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
