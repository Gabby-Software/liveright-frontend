import React, { FC } from 'react'
import { useParams } from 'react-router'

import ChatMessagesEmpty from '../chat-messages-empty/chat-messages-empty.component'
import Styles from './chat-messages.styles'

type Props = {}
const ChatMessages: FC<Props> = ({}) => {
  const { room } = useParams<{ room?: string }>()
  return <Styles>{room ? null : <ChatMessagesEmpty />}</Styles>
}

export default ChatMessages
