import React, { FC, useMemo } from 'react'

import { ReactComponent as Icon } from '../../assets/media/icons/chat.svg'
import userTypes from '../../enums/user-types.enum'
import useTrainerAccount from '../../hooks/api/accounts/useTrainerAccount'
import { useAuth } from '../../hooks/auth.hook'
import { useIsMobile } from '../../hooks/is-mobile.hook'
import { useChats } from '../../modules/chat/contexts/chats.context'
import { classes } from '../../pipes/classes.pipe'
import { noImage } from '../../pipes/no-image.pipe'
import ProfileImage from '../profile-image/profile-image.component'
import Styles from './chat-icon.styles'

const ChatIcon: FC = () => {
  const { rooms } = useChats()
  const { type } = useAuth()
  const isMobile = useIsMobile()
  const { user: trainer } = useTrainerAccount()

  const unreads = useMemo(() => {
    return Object.values(rooms).reduce(
      (a, b) => a + b.room.unReadMessagesCount,
      0
    )
  }, [rooms])

  if (type === userTypes.CLIENT && !trainer.email) return null

  return (
    <Styles
      className={classes(unreads && 'notification__active')}
      data-count={String(unreads)}
    >
      {type === userTypes.CLIENT && isMobile ? (
        <ProfileImage
          placeholder={noImage(trainer.first_name, trainer.last_name)}
          url={trainer.avatar?.url}
        />
      ) : (
        <Icon />
      )}
    </Styles>
  )
}

export default ChatIcon
