import React, { FC, useRef } from 'react'

import { ReactComponent as PlusIcon } from '../../../../../assets/media/icons/plus.svg'
import { useEvent } from '../../../../../hooks/event.hook'
import { useChatRoom } from '../../../../../modules/chat/contexts/chat-room.context'
import { ChatRoomModes } from '../../../../../modules/chat/enums/chat-room-modes.enum'
import { classes } from '../../../../../pipes/classes.pipe'
import ChatActionsAction from '../chat-actions-action/chat-actions-action.component'
import ChatActionsAttachment from '../chat-actions-attachment/chat-actions-attachment.component'
import ChatActionsRecord from '../chat-actions-record/chat-actions-record.component'
import Styles from './chat-actions-add.styles'

const ChatActionsAdd: FC<{}> = () => {
  const { setMode, mode } = useChatRoom()
  const ref = useRef<HTMLDivElement>(null)
  useEvent('click', (e) => {
    if (ref.current?.contains(e.target as HTMLElement)) return
    if (mode === ChatRoomModes.MORE_ACTIONS) setMode(ChatRoomModes.DEFAULT)
  })
  return (
    <Styles ref={ref}>
      <ChatActionsAction
        icon={<PlusIcon onClick={() => setMode(ChatRoomModes.MORE_ACTIONS)} />}
      />
      <div
        className={classes(
          'chat-add__options',
          mode === ChatRoomModes.MORE_ACTIONS && 'chat-add__options__open'
        )}
      >
        <ChatActionsAttachment />
        <ChatActionsRecord />
      </div>
    </Styles>
  )
}

export default ChatActionsAdd
