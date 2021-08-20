import React, { FC } from 'react'

import { useIsMobile } from '../../../../../hooks/is-mobile.hook'
import { useChatRoom } from '../../../../../modules/chat/contexts/chat-room.context'
import ChatActionsEmoji from '../chat-actions-emoji/chat-actions-emoji.component'
import Styles from './chat-actions-text-input.styles'

type Props = {}
const ChatActionsTextInput: FC<Props> = ({}) => {
  const isMobile = useIsMobile()
  const { textMessage, setTextMessage } = useChatRoom()
  return (
    <Styles>
      <input
        value={textMessage}
        onChange={(e) => setTextMessage(e.target.value)}
        type={'text'}
        className={'chat-input__input'}
        placeholder={isMobile ? 'Type a message' : 'Type your message here'}
      />
      <ChatActionsEmoji />
    </Styles>
  )
}

export default ChatActionsTextInput
