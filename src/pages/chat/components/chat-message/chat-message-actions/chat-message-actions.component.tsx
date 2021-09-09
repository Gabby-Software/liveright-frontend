import React, { FC, useCallback, useRef, useState } from 'react'

import { ReactComponent as DownArrowIcon } from '../../../../../assets/media/icons/down-arrow.svg'
import { toast } from '../../../../../components/toast/toast.component'
import { useOutsideClick } from '../../../../../hooks/click-outside.hook'
import { useChatRoom } from '../../../../../modules/chat/contexts/chat-room.context'
import { useChats } from '../../../../../modules/chat/contexts/chats.context'
import { deleteMessage } from '../../../../../modules/chat/managers/chat.manager'
import { classes } from '../../../../../pipes/classes.pipe'
import Styles from './chat-message-actions.styles'

type Props = { isMe: boolean; msgId: string }
const ChatMessageActions: FC<Props> = ({ isMe, msgId }) => {
  const { isPopup, room } = useChatRoom()
  const { removeMessage } = useChats()
  const actionsRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  useOutsideClick(actionsRef, () => setOpen(false), open)
  const report = useCallback(() => {
    toast.show({
      type: 'success',
      msg: 'Message was reported to the LiveRight administration'
    })
  }, [])
  const deleteMsg = useCallback(() => {
    deleteMessage(room, msgId).then(() => {
      removeMessage(room, msgId)
    })
  }, [room, msgId])
  return (
    <Styles
      ref={actionsRef}
      className={classes('message__action', isMe && 'me', isPopup && 'popup')}
      onClick={() => setOpen(!open)}
    >
      <DownArrowIcon />
      <ul
        className={classes(
          'msg-actions__menu',
          open && 'msg-actions__menu__open'
        )}
      >
        {isMe ? (
          <li className={'msg-actions__item'} onClick={deleteMsg}>
            Delete
          </li>
        ) : (
          <li className={'msg-actions__item'} onClick={report}>
            Report
          </li>
        )}
      </ul>
    </Styles>
  )
}

export default ChatMessageActions
