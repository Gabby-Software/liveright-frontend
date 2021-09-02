import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import { ReactComponent as CrossIcon } from '../../../../../assets/media/icons/cross-24.svg'
import { ReactComponent as BackIcon } from '../../../../../assets/media/icons/left-arrow.svg'
import { ReactComponent as ExpandIcon } from '../../../../../assets/media/icons/maximize.svg'
import BlueLink from '../../../../../components/blue-link/blue-link.component'
import { Routes } from '../../../../../enums/routes.enum'
import userTypes from '../../../../../enums/user-types.enum'
import { useAuth } from '../../../../../hooks/auth.hook'
import { useChatRoom } from '../../../../../modules/chat/contexts/chat-room.context'
import { useChats } from '../../../../../modules/chat/contexts/chats.context'
import { classes } from '../../../../../pipes/classes.pipe'
import { noImage } from '../../../../../pipes/no-image.pipe'
import Styles, { HeaderHolder, StyledAvatar } from './chat-header-mobile.styles'

type Props = {}
const ChatHeaderMobile: FC<Props> = ({}) => {
  const { type } = useAuth()
  const { isPopup, room, roomData } = useChatRoom()
  const { expand, close } = useChats()
  return (
    <>
      <Styles
        className={classes('chat-header', isPopup && 'chat-header__popup')}
      >
        {isPopup ? null : (
          <Link
            to={type === userTypes.CLIENT ? Routes.HOME : Routes.CHAT}
            className={'chat-header__back'}
          >
            <BackIcon />
          </Link>
        )}
        <StyledAvatar
          placeholder={noImage(roomData?.firstName, roomData?.lastName)}
          url={roomData?.avatar.url}
        />
        <div className={'chat-header__name'}>
          {roomData?.firstName} {roomData?.lastName}
        </div>
        {isPopup ? (
          <div className={'chat-header__link'}>
            <ExpandIcon onClick={() => expand(room)} />
            <CrossIcon onClick={() => close(room)} />
          </div>
        ) : (
          <BlueLink
            className={'chat-header__link'}
            to={
              type === userTypes.CLIENT
                ? Routes.TRAINER
                : Routes.CLIENTS + `/${roomData?.user_uuid}` + Routes.PROFILE
            }
          >
            See Profile
          </BlueLink>
        )}
      </Styles>
      <HeaderHolder />
    </>
  )
}

export default ChatHeaderMobile
