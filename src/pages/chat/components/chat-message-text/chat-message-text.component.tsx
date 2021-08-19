import React, { FC } from 'react'

import Styles from './chat-message-text.styles'

const ChatMessageText: FC<{}> = ({ children }) => {
  return <Styles>{children}</Styles>
}

export default ChatMessageText
