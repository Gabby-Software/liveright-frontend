import React, { FC } from 'react'

import { ReactComponent as MicrophonIcon } from '../../../../../assets/media/icons/microphon.svg'
import ChatActionsAction from '../chat-actions-action/chat-actions-action.component'

type Props = {}
const ChatActionsRecord: FC<Props> = ({}) => {
  return (
    <ChatActionsAction
      icon={<MicrophonIcon onClick={(e) => e.preventDefault()} />}
    />
  )
}

export default ChatActionsRecord
