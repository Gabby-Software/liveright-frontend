import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import { ReactComponent as BackIcon } from '../../../../../assets/media/icons/left-arrow.svg'
import profilePlaceholder from '../../../../../assets/media/profile-placeholder.jpg'
import BlueLink from '../../../../../components/blue-link/blue-link.component'
import { Routes } from '../../../../../enums/routes.enum'
import userTypes from '../../../../../enums/user-types.enum'
import { useAuth } from '../../../../../hooks/auth.hook'
import Styles, { HeaderHolder, StyledAvatar } from './chat-header-mobile.styles'

type Props = {}
const ChatHeaderMobile: FC<Props> = ({}) => {
  const { type } = useAuth()
  return (
    <>
      <Styles className={'chat-header'}>
        <Link
          to={type === userTypes.CLIENT ? Routes.HOME : Routes.CHAT}
          className={'chat-header__back'}
        >
          <BackIcon />
        </Link>
        <StyledAvatar placeholder={'YT'} url={profilePlaceholder} />
        <div className={'chat-header__name'}>John Travolta</div>
        <BlueLink
          className={'chat-header__link'}
          to={
            type === userTypes.CLIENT
              ? Routes.TRAINER
              : Routes.CLIENTS + '/abc' + Routes.PROFILE
          }
        >
          See Profile
        </BlueLink>
      </Styles>
      <HeaderHolder />
    </>
  )
}

export default ChatHeaderMobile
