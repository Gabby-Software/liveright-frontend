import React, { FC } from 'react'

import { ChatRoomProvider } from '../../../../modules/chat/contexts/chat-room.context'
import ChatImageView from '../../components/chat-image-view/chat-image-view.component'
import Styles from './chat-messages.styles'
import ChatMessagesEmpty from './chat-messages-empty/chat-messages-empty.component'
import ChatMessagesFull from './chat-messages-full/chat-messages-full.component'

type Props = {
  room: string
  isPopup?: boolean
}
const ChatMessages: FC<Props> = ({ room, isPopup }) => {
  return (
    <ChatRoomProvider isPopup={!!isPopup} room={room}>
      <Styles>{room ? <ChatMessagesFull /> : <ChatMessagesEmpty />}</Styles>
      <ChatImageView />
    </ChatRoomProvider>
  )
}

export default ChatMessages
