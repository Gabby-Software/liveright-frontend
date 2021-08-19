import React, { FC } from 'react'

import ChatActionsAttachment from '../../components/actions/chat-actions-attachment/chat-actions-attachment.component'
import ChatActionsRecord from '../../components/actions/chat-actions-record/chat-actions-record.component'
import ChatActionsSend from '../../components/actions/chat-actions-send/chat-actions-send.component'
import ChatActionsTextInput from '../../components/actions/chat-actions-text-input/chat-actions-text-input.component'
import Styles from './chat-actions.styles'

type Props = {}
const ChatActions: FC<Props> = ({}) => {
  return (
    <Styles>
      <ChatActionsTextInput />
      <ChatActionsAttachment />
      <ChatActionsRecord />
      <ChatActionsSend />
    </Styles>
  )
}

export default ChatActions
