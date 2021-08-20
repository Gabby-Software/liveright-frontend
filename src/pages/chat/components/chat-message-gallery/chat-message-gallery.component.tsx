import React from 'react'

import { useChatRoom } from '../../../../modules/chat/contexts/chat-room.context'
import { classes } from '../../../../pipes/classes.pipe'
import Styles from './chat-message-gallery.styles'
type Props = {
  images: string[]
}
const ChatMessageGallery = ({ images }: Props) => {
  const { setOpenedImage } = useChatRoom()
  return (
    <Styles className={classes('cm-image', `cm-images-${images.length}`)}>
      {images.map((img, i) => (
        <img
          alt={'chat message'}
          src={img}
          key={i}
          onClick={() => setOpenedImage(img)}
          className={'cm-image__image'}
        />
      ))}
    </Styles>
  )
}

export default ChatMessageGallery
