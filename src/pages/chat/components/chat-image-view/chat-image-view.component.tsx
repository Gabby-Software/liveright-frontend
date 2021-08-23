import React, { FC, useRef } from 'react'

import { ReactComponent as TimesIcon } from '../../../../assets/media/icons/cross.svg'
import { ReactComponent as ArrowIcon } from '../../../../assets/media/icons/right-arrow.svg'
import logger from '../../../../managers/logger.manager'
import { useChatRoom } from '../../../../modules/chat/contexts/chat-room.context'
import { classes } from '../../../../pipes/classes.pipe'
import Styles from './chat-image-view.styles'

const ChatImageView: FC<{}> = () => {
  const { openedImage, setOpenedImage } = useChatRoom()
  const imgRef = useRef<HTMLImageElement>(null)
  const openImageInNewTab = (url: string) => {
    const image = new Image()
    image.src = url
    image.style.width = '100%'
    image.style.height = '100vh'
    image.style.objectFit = 'scale-down'
    image.style.padding = '40px'
    image.style.boxSizing = 'border-box'
    image.style.display = 'block'
    image.style.background = 'black'
    const w = window.open('')
    if (!w) return
    w.document.write(image.outerHTML)

    const styles = document.createElement('style') as HTMLStyleElement
    styles.innerHTML = 'body {margin: 0}'
    w.document.body.appendChild(styles)
  }
  const props = openedImage.startsWith('data:')
    ? {
        onClick: () => openImageInNewTab(openedImage)
      }
    : {
        target: '_blank',
        href: openedImage
      }
  return (
    <Styles
      className={classes(
        'chat-image-view',
        openedImage && 'chat-image-view__open'
      )}
    >
      <div className={'chat-image-view__cont'}>
        <img
          src={openedImage}
          className={'chat-image-view__img'}
          alt={'view'}
          ref={imgRef}
          onClick={(e) => e.stopPropagation()}
        />
        <a {...props} className={'chat-image-view__link'} rel="noreferrer">
          <span>{'Open Original Image'}</span>
          <ArrowIcon />
        </a>
        <TimesIcon
          className={'chat-image-view__times'}
          onClick={() => setOpenedImage('')}
        />
      </div>
    </Styles>
  )
}

export default ChatImageView
