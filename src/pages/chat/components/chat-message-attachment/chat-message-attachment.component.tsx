import React, { FC } from 'react'

import { chatIcons } from '../../../../modules/chat/enums/chat-icons.enum'
import Styles from './chat-message-attachment.styles'

type Props = {
  file: string
}
const ChatMessageAttachment: FC<Props> = ({ file }) => {
  const Icon = chatIcons['pdf']
  return (
    <Styles
      className={'cm-file'}
      target={'_blank'}
      download={'Example File.pdf'}
      href={file}
    >
      <Icon className={'cm-file__icon'} />
      <div>
        <div className={'cm-file__name'}>Example File.pdf</div>
        <div className={'cm-file__data'}>
          <span>PDF</span>
          <span className={'cm-file__divider'} />
          <span>45 KB</span>
        </div>
      </div>
    </Styles>
  )
}

export default ChatMessageAttachment
