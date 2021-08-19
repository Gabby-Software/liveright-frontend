import React, { FC } from 'react'

import { mockMessages } from '../../../chat.data'
import ChatMessage from '../../../components/chat-message/chat-message.component'
import Styles from './chat-messages-body.styles'

const ChatMessagesBody: FC<{}> = () => {
  return (
    <Styles>
      {mockMessages.map((msg) => (
        <ChatMessage key={msg._id} msg={msg} />
      ))}
    </Styles>
  )
}

export default ChatMessagesBody
