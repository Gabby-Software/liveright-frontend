import React, { FC, useMemo } from 'react'

import { useWindowSize } from '../../hooks/window-size.hook'
import { useChats } from '../../modules/chat/contexts/chats.context'
import ChatPopup from '../chat-popup/chat-popup.component'
import Styles from './chat-popups.styles'

type Props = {}
const ChatPopups: FC<Props> = ({}) => {
  const { popups } = useChats()
  const { width } = useWindowSize()
  const allowedPopupsCount = useMemo(() => {
    if (width >= 1920) return 4
    if (width >= 1400) return 3
    if (width >= 1000) return 2
    return 0
  }, [width])
  return (
    <Styles>
      {popups.slice(0, allowedPopupsCount).map((p) => (
        <ChatPopup key={p} room={p} />
      ))}
    </Styles>
  )
}

export default ChatPopups
