import React, {
  ChangeEvent,
  ClipboardEventHandler,
  FC,
  useCallback
} from 'react'

import { useIsMobile } from '../../../../../hooks/is-mobile.hook'
import { useChatRoom } from '../../../../../modules/chat/contexts/chat-room.context'
import socketManager from '../../../../../modules/chat/managers/socket.manager'
import ChatActionsEmoji from '../chat-actions-emoji/chat-actions-emoji.component'
import Styles from './chat-actions-text-input.styles'

type Props = {}
const ChatActionsTextInput: FC<Props> = ({}) => {
  const isMobile = useIsMobile()
  const { textMessage, setTextMessage, room, sendFile } = useChatRoom()
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTextMessage(e.target.value)
    socketManager.type(room)
  }, [])
  const handlePaste: ClipboardEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const files: FileList = e.clipboardData.files
      if (files.length) {
        sendFile(files)
      }
    },
    []
  )
  return (
    <Styles>
      <input
        value={textMessage}
        onChange={handleChange}
        type={'text'}
        onPaste={handlePaste}
        className={'chat-input__input'}
        placeholder={isMobile ? 'Type a message' : 'Type your message here'}
      />
      <ChatActionsEmoji />
    </Styles>
  )
}

export default ChatActionsTextInput
