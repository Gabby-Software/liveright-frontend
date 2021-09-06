import React, { FC, useState } from 'react'

import { excerpt } from '../../../../../pipes/excerpt.pipe'
import Styles from './chat-message-text.styles'

type Props = {
  children: string
}
const MAX_MESSAGE_LENGTH = 400
const ChatMessageText: FC<Props> = ({ children }) => {
  const [readMore, setReadMore] = useState(false)
  return (
    <Styles>
      <span>{readMore ? children : excerpt(children, MAX_MESSAGE_LENGTH)}</span>
      {children.length > MAX_MESSAGE_LENGTH ? (
        <span
          className={'cm-text__read-more'}
          onClick={() => setReadMore(!readMore)}
        >
          {readMore ? 'Read Less' : 'Read More'}
        </span>
      ) : null}
    </Styles>
  )
}

export default ChatMessageText
