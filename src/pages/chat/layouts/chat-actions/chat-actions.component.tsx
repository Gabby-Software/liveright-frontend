import React, { FC, FormEventHandler } from 'react'

import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import { useChatRoom } from '../../../../modules/chat/contexts/chat-room.context'
import { classes } from '../../../../pipes/classes.pipe'
import ChatActionsAdd from '../../components/actions/chat-actions-add/chat-actions-add.component'
import ChatActionsAttachment from '../../components/actions/chat-actions-attachment/chat-actions-attachment.component'
import ChatActionsRecord from '../../components/actions/chat-actions-record/chat-actions-record.component'
import ChatActionsSend from '../../components/actions/chat-actions-send/chat-actions-send.component'
import ChatActionsTextInput from '../../components/actions/chat-actions-text-input/chat-actions-text-input.component'
import Styles from './chat-actions.styles'

type Props = {}
const ChatActions: FC<Props> = ({}) => {
  const isMobile = useIsMobile()
  const { sendTextMessage, textMessage, isPopup } = useChatRoom()
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    if (!textMessage) return
    sendTextMessage()
  }
  return (
    <Styles onSubmit={handleSubmit} className={classes(isPopup && 'popup')}>
      <ChatActionsTextInput />
      {isPopup ? null : isMobile ? (
        <ChatActionsAdd />
      ) : (
        <>
          <ChatActionsAttachment />
          <ChatActionsRecord />
        </>
      )}
      <ChatActionsSend />
    </Styles>
  )
}

export default ChatActions
