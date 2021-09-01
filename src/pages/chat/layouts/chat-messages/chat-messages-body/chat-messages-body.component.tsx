import React, { FC, useEffect, useRef } from 'react'

import { useIsMobile } from '../../../../../hooks/is-mobile.hook'
import logger from '../../../../../managers/logger.manager'
import { useChatRoom } from '../../../../../modules/chat/contexts/chat-room.context'
import { classes } from '../../../../../pipes/classes.pipe'
import ChatMessage from '../../../components/chat-message/chat-message.component'
import Styles from './chat-messages-body.styles'

const ChatMessagesBody: FC<{}> = () => {
  const { messages, isPopup, typing, roomData } = useChatRoom()
  const ref = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  useEffect(() => {
    if (!ref.current) return
    const el = isMobile ? window : ref.current
    el.scrollTo({
      top: ref.current.scrollHeight
      // behavior: 'smooth'
    })
  }, [messages])
  logger.info('messages', messages)
  return (
    <Styles ref={ref} className={classes(isPopup && 'popup')}>
      {messages.map((msg) => (
        <ChatMessage key={msg._id} msg={msg} />
      ))}
      <div className={'chat-typing'}>
        {typing
          ? `${roomData?.firstName} ${roomData?.lastName} is typing...`
          : null}
      </div>
    </Styles>
  )
}

export default ChatMessagesBody
