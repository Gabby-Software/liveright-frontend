import Picker, { IEmojiData } from 'emoji-picker-react'
import React, { FC, useCallback, useRef, useState } from 'react'

import { ReactComponent as EmojiIcon } from '../../../../../assets/media/icons/emoji.svg'
import { useOutsideClick } from '../../../../../hooks/click-outside.hook'
import { useChatRoom } from '../../../../../modules/chat/contexts/chat-room.context'
import { classes } from '../../../../../pipes/classes.pipe'
import Styles from './chat-actions-emoji.styles'

type Props = {}
const ChatActionsEmoji: FC<Props> = ({}) => {
  const { textMessage, setTextMessage } = useChatRoom()
  const [pickerOpen, setPickerOpen] = useState(false)
  const emojiRef = useRef<HTMLDivElement>(null)
  const onEmojiClick = useCallback(
    (event: React.MouseEvent, data: IEmojiData) => {
      setTextMessage(textMessage + data.emoji)
    },
    [textMessage]
  )
  useOutsideClick(emojiRef, () => setPickerOpen(false), pickerOpen)
  return (
    <Styles
      className={classes(pickerOpen && 'emoji-picker__open')}
      ref={emojiRef}
    >
      <EmojiIcon
        onClick={(e) => {
          e.preventDefault()
          setPickerOpen(true)
        }}
      />
      <Picker onEmojiClick={onEmojiClick} disableSearchBar />
    </Styles>
  )
}

export default ChatActionsEmoji
