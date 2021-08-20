import React, { FC, useRef } from 'react'

import { ReactComponent as TimesIcon } from '../../../../assets/media/icons/cross.svg'
import { ReactComponent as ArrowIcon } from '../../../../assets/media/icons/right-arrow.svg'
import { useChatRoom } from '../../../../modules/chat/contexts/chat-room.context'
import { classes } from '../../../../pipes/classes.pipe'
import Styles from './chat-image-view.styles'

const ChatImageView: FC<{}> = () => {
  const { openedImage, setOpenedImage } = useChatRoom()
  const imgRef = useRef<HTMLImageElement>(null)
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
        <a
          target={'_blank'}
          href={openedImage}
          className={'chat-image-view__link'}
          rel="noreferrer"
        >
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
