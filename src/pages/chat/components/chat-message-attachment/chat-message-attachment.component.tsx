import React, { FC } from 'react'

import { chatIcons } from '../../../../modules/chat/enums/chat-icons.enum'
import { filesize } from '../../../../modules/chat/pipes/filesize.pipe'
import { ChatFileType } from '../../../../modules/chat/types/chat-file.type'
import { KnownFileTypesType } from '../../../../modules/chat/types/known-file-types.type'
import { classes } from '../../../../pipes/classes.pipe'
import { excerpt } from '../../../../pipes/excerpt.pipe'
import Styles from './chat-message-attachment.styles'

type Props = {
  file: ChatFileType
  me?: boolean
}
const ChatMessageAttachment: FC<Props> = ({ file, me }) => {
  const type = file.url.split('.').pop() as KnownFileTypesType
  const Icon = chatIcons[type]
  return (
    <Styles
      className={classes('cm-file', me && 'me')}
      target={'_blank'}
      download={file.original_name}
      href={file.url}
    >
      <Icon className={'cm-file__icon'} />
      <div>
        <div className={'cm-file__name'}>{excerpt(file.original_name, 30)}</div>
        <div className={'cm-file__data'}>
          <span>{type.toUpperCase()}</span>
          <span className={'cm-file__divider'} />
          <span>{filesize(file.size)}</span>
        </div>
      </div>
    </Styles>
  )
}

export default ChatMessageAttachment
