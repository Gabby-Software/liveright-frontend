import React, { FC } from 'react'

import { ReactComponent as PlusIcon } from '../../../../../assets/media/icons/plus.svg'
import ChatActionsAction from '../chat-actions-action/chat-actions-action.component'

type Props = {}
const ChatActionsAdd: FC<Props> = ({}) => {
  return <ChatActionsAction icon={<PlusIcon />} />
}

export default ChatActionsAdd
