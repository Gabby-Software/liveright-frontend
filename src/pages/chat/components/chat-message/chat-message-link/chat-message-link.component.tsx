import React from 'react'

import { ChatMessageLinkType } from '../../../../../modules/chat/types/chat-message-link.type'
import Styles from './chat-message-link.styles'
const ChatMessageLink = ({ title, url }: ChatMessageLinkType) => {
  return <Styles href={url}>{title}</Styles>
}

export default ChatMessageLink
