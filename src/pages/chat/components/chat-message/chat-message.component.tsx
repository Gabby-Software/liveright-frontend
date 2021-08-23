import React from 'react'

import { ReactComponent as SeenIcon } from '../../../../assets/media/icons/chat-seen.svg'
import { ReactComponent as SentIcon } from '../../../../assets/media/icons/chat-sent.svg'
import profilePlaceholder from '../../../../assets/media/profile-placeholder.png'
import logger from '../../../../managers/logger.manager'
import { useChatRoom } from '../../../../modules/chat/contexts/chat-room.context'
import { chatMessageTypes } from '../../../../modules/chat/enums/chat-message-types.enum'
import { chatTime } from '../../../../modules/chat/pipes/chat-time.pipe'
import { ChatMessageType } from '../../../../modules/chat/types/chat-message.type'
import { classes } from '../../../../pipes/classes.pipe'
import ChatMessageAttachment from '../chat-message-attachment/chat-message-attachment.component'
import ChatMessageAudio from '../chat-message-audio/chat-message-audio.component'
import ChatMessageGallery from '../chat-message-gallery/chat-message-gallery.component'
import ChatMessageText from '../chat-message-text/chat-message-text.component'
import Styles, { ProfileImageStyled } from './chat-message.styles'
type Props = {
  msg: ChatMessageType
}
const ChatMessage = ({ msg }: Props) => {
  const types = [...msg.types]
  const files = [...msg.content.files]
  const isMe = msg.senderId === '123'
  const { isPopup } = useChatRoom()
  const renderText = () => {
    if (types[0] === chatMessageTypes.TEXT) {
      types.shift()
      return <ChatMessageText>{msg.content.text}</ChatMessageText>
    }
  }
  const renderImages = () => {
    logger.info('TYPES', types, msg.content)
    if (types[0] !== chatMessageTypes.IMAGE) return null
    let imagesCount = 0
    while (types.shift() === chatMessageTypes.IMAGE) {
      imagesCount++
    }
    logger.info('Images', imagesCount, msg.content.files)
    return <ChatMessageGallery images={files.splice(0, imagesCount)} />
  }
  const renderAudio = () => {
    if (types[0] === chatMessageTypes.AUDIO) {
      types.shift()
      return (
        <ChatMessageAudio file={files.shift() || ''} id={msg._id} me={isMe} />
      )
    }
  }
  const renderFile = () => {
    if (types[0] === chatMessageTypes.FILE) {
      types.shift()
      return <ChatMessageAttachment file={files.shift() || ''} />
    }
  }
  return (
    <Styles>
      {isMe ? null : (
        <ProfileImageStyled
          url={profilePlaceholder}
          placeholder={'YT'}
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
