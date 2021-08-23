import React, { FC } from 'react'

import { ChatRoomProvider } from '../../../modules/chat/contexts/chat-room.context'
import ChatMessagesFull from '../../../pages/chat/layouts/chat-messages/chat-messages-full/chat-messages-full.component'
import Styles from './chat-popup.styles'

type Props = {
  room: string
}
const ChatPopup: FC<Props> = ({ room }) => {
  return (
    <ChatRoomProvider isPopup room={room}>
      <Styles>
        <ChatMessagesFull />
      </Styles>
    </ChatRoomProvider>
  )
}

export default ChatPopup
