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
import Styles, { ProfileImageStyled } from './chat-message.styles'
import ChatMessageAttachment from './chat-message-attachment/chat-message-attachment.component'
import ChatMessageAudio from './chat-message-audio/chat-message-audio.component'
import ChatMessageGallery from './chat-message-gallery/chat-message-gallery.component'
import ChatMessageInvoice from './chat-message-invoice/chat-message-invoice.component'
import ChatMessageLink from './chat-message-link/chat-message-link.component'
import ChatMessageText from './chat-message-text/chat-message-text.component'
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
  const renderInvoice = () => {
    if (types[0] === chatMessageTypes.INVOICE) {
      types.shift()
      return <ChatMessageInvoice {...msg.invoice_meta_data!} me={isMe} />
    }
  }
  const renderText = () => {
    if (types[0] === chatMessageTypes.TEXT) {
      types.shift()
      return <ChatMessageText>{msg.content.text || ''}</ChatMessageText>
    }
  }
  const renderImages = () => {
    let i = 0
    const gallery: ChatFileType[] = []
    while (i < types.length) {
      if (types[i] === chatMessageTypes.IMAGE) {
        types.splice(i, 1)
        gallery.push(...files.splice(i, 1))
      } else {
        i++
      }
    }
    if (!gallery.length) return null
    return <ChatMessageGallery images={gallery} />
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
  const renderFile: () => React.ReactNode[] = () => {
    if (types[0] === chatMessageTypes.FILE) {
      types.shift()
      const file = files.shift()
      return [
        <ChatMessageAttachment
          file={file || emptyFile}
          me={isMe}
          key={file?.url}
        />,
        ...renderFile()
      ]
    }
    return [null]
  }
  return (
    <Styles state={msg.state}>
      <div className={'message__wrapper'}>
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
            className={classes(
              'message__body',
              isMe && 'me',
              isPopup && 'popup'
            )}
          >
            {renderText()}
            {renderImages()}
            {renderAudio()}
            {renderFile()}
          </div>
          <div
            className={classes(
              'message__time',
              isMe && 'me',
              isPopup && 'popup'
            )}
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
      </div>
      <div className={classes('message__links', isMe && 'message__links__me')}>
        {msg.content.embedLinks.map((link, i) => (
          <ChatMessageLink key={i} {...link} />
        ))}
        {renderInvoice()}
      </div>
    </Styles>
  )
}

export default ChatMessage
