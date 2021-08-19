import React from 'react'

import Styles from './chat-message-image.styles'
type Props = { src: string }
const ChatMessageImage = ({ src }: Props) => {
  return <Styles alt={'chat-image'} src={src} />
}

export default ChatMessageImage
