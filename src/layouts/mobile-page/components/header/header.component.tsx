import { Link } from 'react-router-dom'

import { CalendarIcon, NotificationsIcon } from '../../../../assets/media/icons'
import IconButton from '../../../../components/buttons/icon-button/icon-button.component'
import ChatIcon from '../../../../components/chat-icon/chat-icon.component'
import UserBadge from '../../../../components/user-badge/user-badge.component'
import { Routes } from '../../../../enums/routes.enum'
import userTypes from '../../../../enums/user-types.enum'
import { useAuth } from '../../../../hooks/auth.hook'
import TrainerBadge from '../trainer-badge/trainer-badge.component'
import Styles from './header.styles'
import { HeaderProps } from './header.types'

export default function Header({
  title,
  actionComponent,
  spacing,
  component,
  topComponent,
  titleIcon,
  navChat
}: HeaderProps) {
  const { type } = useAuth()
  return (
    <Styles className="mobile-page-header" $spacing={spacing}>
      <div className="mobile-page-header__info">
        <div className="mobile-page-header__info-item mobile-page-header__info-item_top">
          {topComponent ? (
            topComponent
          ) : type === userTypes.CLIENT ? (
            <TrainerBadge />
          ) : (
            <>
              {navChat ? (
                <Link to={Routes.CHAT}>
                  <ChatIcon />
                </Link>
              ) : titleIcon ? (
                titleIcon
              ) : (
                <UserBadge
                  avatar=""
                  firstName="A"
                  lastName="B"
                  className="mobile-page-header__badge"
                  avatarOnly
                />
              )}
              <h5 className="mobile-page-header__title">LiveRight</h5>
            </>
          )}
        </div>
        <div className="mobile-page-header__info-item">
          <IconButton
            size="sm"
            className="mobile-page-header__action-icon"
            to={Routes.CALENDAR}
          >
            <CalendarIcon />
          </IconButton>
          <IconButton
            size="sm"
            className="mobile-page-header__action-icon"
            to={Routes.NOTIFICATIONS}
          >
            <NotificationsIcon />
          </IconButton>
        </div>
      </div>

      <div className="mobile-page-header__page-title-container">
        <div>
          <h2 className="mobile-page-header__page-title">{title}</h2>
        </div>
        <div>{actionComponent}</div>
      </div>

      {!!component && (
        <div className="mobile-page-header__component">{component}</div>
      )}
    </Styles>
  )
}
