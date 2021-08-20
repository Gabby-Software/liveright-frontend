import React, { FC } from 'react'

import { ReactComponent as SendIcon } from '../../../../../assets/media/icons/chat-send.svg'
import { useChatRoom } from '../../../../../modules/chat/contexts/chat-room.context'
import ChatActionsAction from '../chat-actions-action/chat-actions-action.component'
import Styles from './chat-actions-send.styles'

type Props = {}
const ChatActionsSend: FC<Props> = ({}) => {
  const { textMessage, sendTextMessage } = useChatRoom()
  return (
    <>
      <ChatActionsAction
        disabled={!textMessage.length}
        color={'primary'}
        icon={<SendIcon onClick={sendTextMessage} />}
      />
      <Styles type={'submit'} />
    </>
  )
}

export default ChatActionsSend
