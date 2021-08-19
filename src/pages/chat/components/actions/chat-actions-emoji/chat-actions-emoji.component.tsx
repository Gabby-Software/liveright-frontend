import React, { FC } from 'react'

import { ReactComponent as EmojiIcon } from '../../../../../assets/media/icons/emoji.svg'
import Styles from './chat-actions-emoji.styles'

type Props = {}
const ChatActionsEmoji: FC<Props> = ({}) => {
  return (
    <Styles>
      <EmojiIcon onClick={(e) => e.preventDefault()} />
    </Styles>
  )
}

export default ChatActionsEmoji
