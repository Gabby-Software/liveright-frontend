import React, { FC } from 'react'

import { ReactComponent as SendIcon } from '../../../../../assets/media/icons/chat-send.svg'
import { useChatRoom } from '../../../../../modules/chat/contexts/chat-room.context'
import ChatActionsAction from '../chat-actions-action/chat-actions-action.component'

type Props = {}
const ChatActionsSend: FC<Props> = ({}) => {
  const { textMessage } = useChatRoom()
  return (
    <ChatActionsAction
      disabled={!textMessage.length}
      color={'primary'}
      icon={<SendIcon onClick={(e) => e.preventDefault()} />}
    />
  )
}

export default ChatActionsSend
