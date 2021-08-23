import React, { FC } from 'react'

import { ReactComponent as MicrophonIcon } from '../../../../../assets/media/icons/microphon.svg'
import { useChatRoom } from '../../../../../modules/chat/contexts/chat-room.context'
import { ChatRoomModes } from '../../../../../modules/chat/enums/chat-room-modes.enum'
import ChatActionsAction from '../chat-actions-action/chat-actions-action.component'

type Props = {}
const ChatActionsRecord: FC<Props> = ({}) => {
  const { setMode } = useChatRoom()
  return (
    <ChatActionsAction
      icon={
        <MicrophonIcon
          onClick={(e) => {
            e.preventDefault()
            navigator.mediaDevices
              .getUserMedia({ audio: true, video: false })
              .then(() => setMode(ChatRoomModes.RECORDING))
          }}
        />
      }
    />
  )
}

export default ChatActionsRecord
