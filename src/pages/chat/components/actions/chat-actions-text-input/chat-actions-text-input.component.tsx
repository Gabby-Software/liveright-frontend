import React, { FC } from 'react'

import ChatActionsEmoji from '../chat-actions-emoji/chat-actions-emoji.component'
import Styles from './chat-actions-text-input.styles'

type Props = {}
const ChatActionsTextInput: FC<Props> = ({}) => {
  return (
    <Styles>
      <input
        type={'text'}
        className={'chat-input__input'}
        placeholder={'Type your message here'}
      />
      <ChatActionsEmoji />
    </Styles>
  )
}

export default ChatActionsTextInput
