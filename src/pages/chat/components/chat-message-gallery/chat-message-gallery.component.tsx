import React from 'react'

import logger from '../../../../managers/logger.manager'
import { classes } from '../../../../pipes/classes.pipe'
import Styles from './chat-message-gallery.styles'
type Props = {
  images: string[]
}
const ChatMessageGallery = ({ images }: Props) => {
  logger.info('Images to render', images)
  return (
    <Styles className={classes('cm-image', `cm-images-${images.length}`)}>
      {images.map((img, i) => (
        <img
          alt={'chat message'}
          src={img}
          key={i}
          className={'cm-image__image'}
        />
      ))}
    </Styles>
  )
}

export default ChatMessageGallery
