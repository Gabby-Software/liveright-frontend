import React, { FC } from 'react'
import { useParams } from 'react-router'

import { ChatRoomProvider } from '../../../../modules/chat/contexts/chat-room.context'
import ChatImageView from '../../components/chat-image-view/chat-image-view.component'
import Styles from './chat-messages.styles'
import ChatMessagesEmpty from './chat-messages-empty/chat-messages-empty.component'
import ChatMessagesFull from './chat-messages-full/chat-messages-full.component'

type Props = {}
const ChatMessages: FC<Props> = ({}) => {
  const { room } = useParams<{ room?: string }>()
  return (
    <ChatRoomProvider>
      <Styles>{room ? <ChatMessagesFull /> : <ChatMessagesEmpty />}</Styles>
      <ChatImageView />
    </ChatRoomProvider>
  )
}

export default ChatMessages
