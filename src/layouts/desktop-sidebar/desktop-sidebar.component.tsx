import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { ReactComponent as CalendarIcon } from '../../assets/media/icons/calendar.svg'
import { ReactComponent as ChatIcon } from '../../assets/media/icons/chat.svg'
import { ReactComponent as HomeIcon } from '../../assets/media/icons/home.svg'
import { ReactComponent as InvoiceIcon } from '../../assets/media/icons/invoice.svg'
import { ReactComponent as LogoSmall } from '../../assets/media/icons/logo-small.svg'
import { ReactComponent as PlanIcon } from '../../assets/media/icons/plan.svg'
import { ReactComponent as ProgressIcon } from '../../assets/media/icons/progress.svg'
import { ReactComponent as SessionIcon } from '../../assets/media/icons/session.svg'
import { ReactComponent as UsersIcon } from '../../assets/media/icons/users.svg'
import NotificationIcon from '../../components/notification-icon/notification-icon.component'
import { Routes } from '../../enums/routes.enum'
import userTypes from '../../enums/user-types.enum'
import useTrainerAccount from '../../hooks/api/accounts/useTrainerAccount'
import { useAuth } from '../../hooks/auth.hook'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import { classes } from '../../pipes/classes.pipe'
import { noImage } from '../../pipes/no-image.pipe'
import DesktopFooter from '../desktop-footer/desktop-footer.component'
import Styles from './desktop-sidebar.styles'

type MenuItemType = {
  name: string
  Icon: React.ComponentType
  url: string
  type?: string
}

const menuItems: MenuItemType[] = [
  { name: 'home', url: Routes.HOME, Icon: HomeIcon },
  {
    name: 'clients',
    url: Routes.CLIENTS,
    Icon: UsersIcon,
    type: userTypes.TRAINER
  },
  { name: 'plans', url: Routes.PLANS, Icon: PlanIcon },
  { name: 'progress', url: Routes.PROGRESS_HEALTH_DATA, Icon: ProgressIcon },
  { name: 'library', url: Routes.CHAT, Icon: ChatIcon },
  {
    name: 'invoices',
    url: Routes.INVOICES,
    Icon: InvoiceIcon,
    type: userTypes.CLIENT
  },
  {
    name: 'invoices',
    url: Routes.FINANCIALS_OVERVIEW,
    Icon: InvoiceIcon,
    type: userTypes.TRAINER
  },
  { name: 'sessions', url: Routes.SESSIONS, Icon: SessionIcon },
  { name: 'calendar', url: Routes.CALENDAR, Icon: CalendarIcon },
  { name: 'notifications', url: Routes.NOTIFICATIONS, Icon: NotificationIcon }
]

const DesktopSidebar = () => {
  const { t } = useTranslation()
  const { type } = useAuth()
  const { pathname } = useLocation()
  const [isOpen] = useState(false)
  const { user } = useTrainerAccount()
  return (
    <Styles className={classes('sidebar', isOpen && 'sidebar__open')}>
      <div className={'sidebar__logo'}>
        <LogoSmall />
      </div>
      <div className={'sidebar__nav-spacer'} />
      <nav className={'sidebar__nav'}>
        <ul className={'sidebar__menu'}>
          {menuItems.map(({ url, Icon, type: permission }) =>
            !permission || type === permission ? (
              <li
                key={url}
                className={classes(
                  'sidebar__item',
                  pathname === url && 'sidebar__item__active'
                )}
              >
                <Link to={url}>
                  <Icon />
                </Link>
              </li>
            ) : null
          )}
        </ul>
        {type === 'client' && user ? (
          <>
            <div className={'sidebar__hr'} />
            <Link to={Routes.TRAINER} className={'sidebar__trainer'}>
              {user.avatar?.thumb_url ? (
                <img alt={'trainer'} src={user.avatar?.thumb_url} />
              ) : (
                <div className={'sidebar__trainer__placeholder'}>
                  {noImage(user.first_name, user.last_name)}
                </div>
              )}
              <span>{t('menu.trainer')}</span>
            </Link>
          </>
        ) : null}
      </nav>
      <div className={'sidebar__nav-spacer'} />
      <DesktopFooter />
    </Styles>
  )
}

export default DesktopSidebar
