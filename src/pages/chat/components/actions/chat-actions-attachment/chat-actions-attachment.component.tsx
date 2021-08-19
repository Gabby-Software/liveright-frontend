import React, { FC } from 'react'

import { ReactComponent as AttachmentIcon } from '../../../../../assets/media/icons/attachment.svg'
import ChatActionsAction from '../chat-actions-action/chat-actions-action.component'

type Props = {}
const ChatActionsAttachment: FC<Props> = ({}) => {
  return (
    <>
      <ChatActionsAction icon={<AttachmentIcon />} />
    </>
  )
}

export default ChatActionsAttachment
