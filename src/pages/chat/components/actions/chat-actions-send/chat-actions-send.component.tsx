import React, { FC } from 'react'

import { ReactComponent as SendIcon } from '../../../../../assets/media/icons/chat-send.svg'
import { useChatRoom } from '../../../../../modules/chat/contexts/chat-room.context'
import { ChatRoomModes } from '../../../../../modules/chat/enums/chat-room-modes.enum'
import ChatActionsAction from '../chat-actions-action/chat-actions-action.component'
import Styles from './chat-actions-send.styles'

type Props = {}
const ChatActionsSend: FC<Props> = ({}) => {
  const { textMessage, mode } = useChatRoom()
  return (
    <>
      <ChatActionsAction
        disabled={mode === ChatRoomModes.DEFAULT && !textMessage.length}
        color={'primary'}
        icon={
          <label htmlFor={'chat-message-submit'}>
            <SendIcon />
            <Styles type={'submit'} id={'chat-message-submit'} />
          </label>
        }
      />
    </>
  )
}

export default ChatActionsSend
