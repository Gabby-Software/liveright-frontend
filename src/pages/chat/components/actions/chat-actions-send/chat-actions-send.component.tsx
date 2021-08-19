import React, { FC } from 'react'

import { ReactComponent as SendIcon } from '../../../../../assets/media/icons/chat-send.svg'
import ChatActionsAction from '../chat-actions-action/chat-actions-action.component'

type Props = {}
const ChatActionsSend: FC<Props> = ({}) => {
  return (
    <ChatActionsAction
      color={'primary'}
      icon={<SendIcon onClick={(e) => e.preventDefault()} />}
    />
  )
}

export default ChatActionsSend
