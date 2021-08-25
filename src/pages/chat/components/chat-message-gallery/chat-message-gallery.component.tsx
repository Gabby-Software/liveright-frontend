import React from 'react'

import { useChatRoom } from '../../../../modules/chat/contexts/chat-room.context'
import { ChatFileType } from '../../../../modules/chat/types/chat-file.type'
import { classes } from '../../../../pipes/classes.pipe'
import Styles from './chat-message-gallery.styles'
type Props = {
  images: ChatFileType[]
}
const ChatMessageGallery = ({ images }: Props) => {
  const { setOpenedImage } = useChatRoom()
  return (
    <Styles className={classes('cm-image', `cm-images-${images.length}`)}>
      {images.map((img, i) => (
        <img
          alt={'chat message'}
          src={img.url}
          key={i}
          onClick={() => setOpenedImage(img.url)}
          className={'cm-image__image'}
        />
      ))}
    </Styles>
  )
}

export default ChatMessageGallery
