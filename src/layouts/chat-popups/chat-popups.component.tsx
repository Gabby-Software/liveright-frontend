import React, { FC } from 'react'

import { useChats } from '../../modules/chat/contexts/chats.context'
import ChatPopup from '../chat-popup/chat-popup.component'
import Styles from './chat-popups.styles'

type Props = {}
const ChatPopups: FC<Props> = ({}) => {
  const { popups } = useChats()
  return (
    <Styles>
      {popups.map((p) => (
        <ChatPopup key={p} room={p} />
      ))}
    </Styles>
  )
}

export default ChatPopups
