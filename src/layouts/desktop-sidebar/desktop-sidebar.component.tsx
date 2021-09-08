import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import {
  BrandLogoIcon,
  CalendarIcon,
  ClientSolidIcon,
  HomeIcon,
  InvoiceIcon,
  LibraryIcon,
  PlanIcon,
  ProgressIcon,
  RevenueIcon,
  UsersIcon
} from '../../assets/media/icons'
import UserBadgeCard from '../../components/cards/user-bardge-card/user-badge-card.component'
import ChatIcon from '../../components/chat-icon/chat-icon.component'
import NotificationIcon from '../../components/notification-icon/notification-icon.component'
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
  requireTrainer?: boolean
}

const menuItems: MenuItemType[] = [
  { name: 'home', url: Routes.HOME, Icon: HomeIcon },
  { name: 'plans', url: Routes.PLANS, Icon: PlanIcon },
  { name: 'progress', url: Routes.PROGRESS_MEASUREMENTS, Icon: ProgressIcon },
  { name: 'sessions', url: Routes.SESSIONS, Icon: UsersIcon },
  {
    name: 'clients',
    url: Routes.CLIENTS,
    Icon: ClientSolidIcon,
    type: userTypes.TRAINER
  },
  {
    name: 'invoices',
    url: Routes.INVOICES,
    Icon: InvoiceIcon,
    type: userTypes.CLIENT
  },
  { name: 'chat', url: Routes.CHAT, Icon: ChatIcon, requireTrainer: true },
  { name: 'calendar', url: Routes.CALENDAR, Icon: CalendarIcon },
  { name: 'library', url: Routes.HUB, Icon: LibraryIcon },
  {
    name: 'financials',
    url: Routes.FINANCIALS_OVERVIEW,
    Icon: RevenueIcon,
    type: userTypes.TRAINER
  },
  { name: 'notifications', url: Routes.NOTIFICATIONS, Icon: NotificationIcon }
]

const DesktopSidebar = () => {
  const { t } = useTranslation()
  const { type } = useAuth()
  const { pathname } = useLocation()
  const [isOpen] = useState(false)
  const { user: trainer } = useTrainerAccount()

  return (
    <>
      <Styles className={classes('sidebar', isOpen && 'sidebar__open')}>
        <div>
          <div className="sidebar__logo">
            <BrandLogoIcon />
          </div>

          {type === userTypes.CLIENT && trainer.id && (
            <Link to={Routes.TRAINER}>
              <UserBadgeCard
                img={trainer.avatar?.url}
                firstName={trainer.first_name}
                lastName={trainer.last_name}
                userRole={t('your-trainer')}
                className="sidebar__trainer"
              />
            </Link>
          )}

          <div className="sidebar__divider sidebar__divider_spacing" />

          <div className="sidebar__nav-spacer" />
          <nav className="sidebar__nav">
            <ul className="sidebar__menu">
              {menuItems.map(
                ({ url, name, Icon, type: permission, requireTrainer }) =>
                  (!permission || type === permission) &&
                  (!requireTrainer ||
                    type !== userTypes.CLIENT ||
                    trainer.first_name) && (
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
      </Styles>
      <DesktopFooter />
    </>
  )
}

export default DesktopSidebar
