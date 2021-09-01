import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import {
  BrandLogoIcon,
  CalendarIcon,
  ChatIcon,
  ClientSolidIcon,
  HomeIcon,
  InvoiceIcon,
  LibraryIcon,
  NotificationsIcon,
  PlanIcon,
  ProgressIcon,
  RevenueIcon,
  UsersIcon
} from '../../assets/media/icons'
import UserBadgeCard from '../../components/cards/user-bardge-card/user-badge-card.component'
import { Routes } from '../../enums/routes.enum'
import userTypes from '../../enums/user-types.enum'
import useTrainerAccount from '../../hooks/api/accounts/useTrainerAccount'
import { useAuth } from '../../hooks/auth.hook'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import { capitalize } from '../../pipes/capitalize.pipe'
import { classes } from '../../pipes/classes.pipe'
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
  { name: 'plans', url: Routes.PLANS, Icon: PlanIcon },
  { name: 'progress', url: Routes.PROGRESS_HEALTH_DATA, Icon: ProgressIcon },
  { name: 'sessions', url: Routes.SESSIONS, Icon: UsersIcon },
  {
    name: 'clients',
    url: Routes.CLIENTS,
    Icon: ClientSolidIcon,
    type: userTypes.TRAINER
  },
  {
    name: 'trainer',
    url: Routes.TRAINER,
    Icon: ClientSolidIcon,
    type: userTypes.CLIENT
  },
  {
    name: 'invoices',
    url: Routes.INVOICES,
    Icon: InvoiceIcon,
    type: userTypes.CLIENT
  },
  { name: 'chat', url: Routes.CHAT, Icon: ChatIcon },
  { name: 'calendar', url: Routes.CALENDAR, Icon: CalendarIcon },
  { name: 'library', url: Routes.HOME, Icon: LibraryIcon },
  {
    name: 'financials',
    url: Routes.FINANCIALS_OVERVIEW,
    Icon: RevenueIcon,
    type: userTypes.TRAINER
  },
  { name: 'notifications', url: Routes.NOTIFICATIONS, Icon: NotificationsIcon }
]

const DesktopSidebar = () => {
  const { t } = useTranslation()
  const { type } = useAuth()
  const { pathname } = useLocation()
  const [isOpen] = useState(false)
  const { user: trainer } = useTrainerAccount()

  return (
    <Styles className={classes('sidebar', isOpen && 'sidebar__open')}>
      <div>
        <div className="sidebar__logo">
          <BrandLogoIcon />
        </div>

        {type === userTypes.CLIENT && trainer.id && (
          <UserBadgeCard
            img={trainer.avatar?.url}
            firstName={trainer.first_name}
            lastName={trainer.last_name}
            userRole={t('your-trainer')}
            className="sidebar__trainer"
          />
        )}

        <div className="sidebar__divider sidebar__divider_spacing" />

        <div className="sidebar__nav-spacer" />
        <nav className="sidebar__nav">
          <ul className="sidebar__menu">
            {menuItems.map(
              ({ url, name, Icon, type: permission }) =>
                (!permission || type === permission) && (
                  <Link
                    to={url}
                    key={url}
                    className={classes(
                      'sidebar__item',
                      pathname === url && 'sidebar__item_active'
                    )}
                  >
                    <Icon />
                    <span>{capitalize(name)}</span>
                  </Link>
                )
            )}
          </ul>
        </nav>
      </div>

      <DesktopFooter />
    </Styles>
  )
}

export default DesktopSidebar
