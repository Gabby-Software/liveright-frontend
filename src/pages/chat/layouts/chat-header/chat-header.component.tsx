import React, { FC } from 'react'

import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import { useChatRoom } from '../../../../modules/chat/contexts/chat-room.context'
import ChatHeaderDesktop from './chat-header-desktop/chat-header-desktop.component'
import ChatHeaderMobile from './chat-header-mobile/chat-header-mobile.component'

type Props = {}
const ChatHeader: FC<Props> = ({}) => {
  const { isPopup } = useChatRoom()
  const isMobile = useIsMobile()
  return isMobile || isPopup ? <ChatHeaderMobile /> : <ChatHeaderDesktop />
}

export default ChatHeader
