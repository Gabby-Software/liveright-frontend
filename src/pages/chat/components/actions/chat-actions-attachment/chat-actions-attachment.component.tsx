import React, { ChangeEvent, ChangeEventHandler, FC } from 'react'

import { ReactComponent as AttachmentIcon } from '../../../../../assets/media/icons/attachment.svg'
import logger from '../../../../../managers/logger.manager'
import { useChatRoom } from '../../../../../modules/chat/contexts/chat-room.context'
import ChatActionsAction from '../chat-actions-action/chat-actions-action.component'
import Styles from './chat-actions-attachment.styles'

type Props = {}
const ChatActionsAttachment: FC<Props> = ({}) => {
  const { sendFile } = useChatRoom()
  const handleFileChange: ChangeEventHandler = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    logger.info('file input change', e.target.files)
    const files = e.target.files as FileList
    if (!files.length) return
    sendFile(files)
    e.target.value = ''
  }
  return (
    <Styles>
      <ChatActionsAction icon={<AttachmentIcon />} />
      <input type={'file'} onChange={handleFileChange} multiple />
    </Styles>
  )
}

export default ChatActionsAttachment
