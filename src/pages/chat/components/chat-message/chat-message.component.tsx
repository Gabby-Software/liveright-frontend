import React, { useMemo } from 'react'

import { ReactComponent as SeenIcon } from '../../../../assets/media/icons/chat-seen.svg'
import { ReactComponent as SentIcon } from '../../../../assets/media/icons/chat-sent.svg'
import { useAuth } from '../../../../hooks/auth.hook'
import { useChatRoom } from '../../../../modules/chat/contexts/chat-room.context'
import { chatMessageTypes } from '../../../../modules/chat/enums/chat-message-types.enum'
import { chatTime } from '../../../../modules/chat/pipes/chat-time.pipe'
import { ChatFileType } from '../../../../modules/chat/types/chat-file.type'
import { ChatMessageType } from '../../../../modules/chat/types/chat-message.type'
import { classes } from '../../../../pipes/classes.pipe'
import { noImage } from '../../../../pipes/no-image.pipe'
import ChatMessageAttachment from '../chat-message-attachment/chat-message-attachment.component'
import ChatMessageAudio from '../chat-message-audio/chat-message-audio.component'
import ChatMessageGallery from '../chat-message-gallery/chat-message-gallery.component'
import ChatMessageText from '../chat-message-text/chat-message-text.component'
import Styles, { ProfileImageStyled } from './chat-message.styles'
type Props = {
  msg: ChatMessageType
}
const emptyFile: ChatFileType = {
  url: '',
  original_name: '',
  mimetype: '',
  size: 0
}
const ChatMessage = ({ msg }: Props) => {
  const types = [...msg.types]
  const files = [...msg.content.files]
  const { isPopup, roomData } = useChatRoom()
  const { uuid } = useAuth()
  const isMe = useMemo(() => msg.senderId === uuid, [uuid])
  const renderText = () => {
    if (types[0] === chatMessageTypes.TEXT) {
      types.shift()
      return <ChatMessageText>{msg.content.text}</ChatMessageText>
    }
  }
  const renderImages = () => {
    if (types[0] !== chatMessageTypes.IMAGE) return null
    let imagesCount = 0
    while (types.shift() === chatMessageTypes.IMAGE) {
      imagesCount++
    }
    return <ChatMessageGallery images={files.splice(0, imagesCount)} />
  }
  const renderAudio = () => {
    if (types[0] === chatMessageTypes.AUDIO) {
      types.shift()
      return (
        <ChatMessageAudio
          file={files.shift() || emptyFile}
          id={msg._id}
          me={isMe}
        />
      )
    }
  }
  const renderFile = () => {
    if (types[0] === chatMessageTypes.FILE) {
      types.shift()
      return (
        <ChatMessageAttachment file={files.shift() || emptyFile} me={isMe} />
      )
    }
  }
  return (
    <Styles>
      {isMe ? null : (
        <ProfileImageStyled
          url={roomData?.avatar?.url}
          placeholder={noImage(roomData?.firstName, roomData?.lastName)}
          className={classes(isPopup && 'popup')}
        />
      )}
      <div
        className={classes('message__cont', isMe && 'me', isPopup && 'popup')}
      >
        <div
          className={classes('message__body', isMe && 'me', isPopup && 'popup')}
        >
          {renderText()}
          {renderImages()}
          {renderAudio()}
          {renderFile()}
        </div>
        <div
          className={classes('message__time', isMe && 'me', isPopup && 'popup')}
        >
          <span>{chatTime(msg.meta.sent_at)}</span>
          {isMe ? (
            msg.meta.read_at ? (
              <SeenIcon />
            ) : msg.meta.delivered_at ? (
              <SentIcon />
            ) : null
          ) : null}
        </div>
      </div>
    </Styles>
  )
}

export default ChatMessage
