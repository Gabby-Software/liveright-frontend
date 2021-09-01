import React, { ChangeEvent, FC, useCallback } from 'react'

import { useIsMobile } from '../../../../../hooks/is-mobile.hook'
import { useChatRoom } from '../../../../../modules/chat/contexts/chat-room.context'
import socketManager from '../../../../../modules/chat/managers/socket.manager'
import ChatActionsEmoji from '../chat-actions-emoji/chat-actions-emoji.component'
import Styles from './chat-actions-text-input.styles'

type Props = {}
const ChatActionsTextInput: FC<Props> = ({}) => {
  const isMobile = useIsMobile()
  const { textMessage, setTextMessage, room } = useChatRoom()
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTextMessage(e.target.value)
    socketManager.type(room)
  }, [])
  return (
    <Styles>
      <input
        value={textMessage}
        onChange={handleChange}
        type={'text'}
        className={'chat-input__input'}
        placeholder={isMobile ? 'Type a message' : 'Type your message here'}
      />
      <ChatActionsEmoji />
    </Styles>
  )
}

export default ChatActionsTextInput
