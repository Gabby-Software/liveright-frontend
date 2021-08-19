import React, { FC } from 'react'

import ChatActions from '../../chat-actions/chat-actions.component'
import ChatHeader from '../../chat-header/chat-header.component'
import ChatMessagesBody from '../chat-messages-body/chat-messages-body.component'
import Styles from './chat-messages-full.styles'

type Props = {}
const ChatMessagesFull: FC<Props> = ({}) => {
  return (
    <Styles>
      <ChatHeader />
      <ChatMessagesBody />
      <ChatActions />
    </Styles>
  )
}

export default ChatMessagesFull
