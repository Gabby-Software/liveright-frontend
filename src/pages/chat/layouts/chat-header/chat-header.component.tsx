import React, { FC } from 'react'

import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import ChatHeaderDesktop from './chat-header-desktop/chat-header-desktop.component'
import ChatHeaderMobile from './chat-header-mobile/chat-header-mobile.component'

type Props = {}
const ChatHeader: FC<Props> = ({}) => {
  const isMobile = useIsMobile()
  return isMobile ? <ChatHeaderMobile /> : <ChatHeaderDesktop />
}

export default ChatHeader
