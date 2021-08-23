import React, { FC, useEffect, useRef } from 'react'

import { useChatRoom } from '../../../../../modules/chat/contexts/chat-room.context'
import ChatMessage from '../../../components/chat-message/chat-message.component'
import Styles from './chat-messages-body.styles'

const ChatMessagesBody: FC<{}> = () => {
  const { messages } = useChatRoom()
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!ref.current) return
    ref.current.scrollTo({
      top: ref.current.scrollHeight
      // behavior: 'smooth'
    })
  }, [messages])
  return (
    <Styles ref={ref}>
      {messages.map((msg) => (
        <ChatMessage key={msg._id} msg={msg} />
      ))}
    </Styles>
  )
}

export default ChatMessagesBody
