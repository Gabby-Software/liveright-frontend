import React, { FC, useEffect } from 'react'

import { useChatRoom } from '../../../../../modules/chat/contexts/chat-room.context'
import { ChatRoomModes } from '../../../../../modules/chat/enums/chat-room-modes.enum'
import ChatActionsRecording from '../../../components/actions/chat-actions-recording/chat-actions-recording.component'
import ChatActions from '../../chat-actions/chat-actions.component'
import ChatHeader from '../../chat-header/chat-header.component'
import ChatMessagesBody from '../chat-messages-body/chat-messages-body.component'
import Styles from './chat-messages-full.styles'

type Props = {}
const ChatMessagesFull: FC<Props> = ({}) => {
  const { mode, setMode, room } = useChatRoom()
  useEffect(() => {
    setMode(ChatRoomModes.DEFAULT)
  }, [room])
  return (
    <Styles>
      <ChatHeader />
      <ChatMessagesBody />
      {mode === ChatRoomModes.RECORDING ? (
        <ChatActionsRecording />
      ) : (
        <ChatActions />
      )}
    </Styles>
  )
}

export default ChatMessagesFull
