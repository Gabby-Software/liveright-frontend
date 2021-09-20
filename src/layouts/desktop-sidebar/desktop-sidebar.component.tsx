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
import useChatOnline from '../../hooks/api/chat/useChatOnline'
import { useAuth } from '../../hooks/auth.hook'
import { useChats } from '../../modules/chat/contexts/chats.context'
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
  {
    name: 'progress',
    url: Routes.PROGRESS_CLIENTS,
    Icon: ProgressIcon,
    type: userTypes.TRAINER
  },
  {
    name: 'progress',
    url: Routes.PROGRESS_CLIENT_HEALTH_DATA,
    Icon: ProgressIcon,
    type: userTypes.CLIENT
  },
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
  { name: 'chat', url: Routes.CHAT, Icon: ChatIcon, type: userTypes.TRAINER },
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

export default function DesktopSidebar() {
  const { type } = useAuth()
  const { pathname } = useLocation()
  const [isOpen] = useState(false)

  return (
    <>
      <Styles className={classes('sidebar', isOpen && 'sidebar__open')}>
        <div>
          <div className="sidebar__logo">
            <BrandLogoIcon />
          </div>

          {type === userTypes.CLIENT && <TrainerBadge />}

          <div className="sidebar__divider sidebar__divider_spacing" />

          <div className="sidebar__nav-spacer" />
          <nav className="sidebar__nav">
            <ul className="sidebar__menu">
              {menuItems.map(
                ({ url, name, Icon, type: permission, requireTrainer }) =>
                  (!permission || type === permission) &&
                  (!requireTrainer || type !== userTypes.CLIENT) && (
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

function TrainerBadge() {
  const { t } = useTranslation()
  const { user: trainer, account } = useTrainerAccount()
  const { isOnline } = useChatOnline()
  const { rooms } = useChats()

  const trainerRoom = rooms?.[Object.keys(rooms)[0]]

  if (!trainer.id) {
    return null
  }

  return (
    <Link to={Routes.CHAT}>
      <UserBadgeCard
        img={trainer.avatar?.url}
        firstName={trainer.first_name}
        lastName={trainer.last_name}
        userRole={t('your-trainer')}
        className="sidebar__trainer"
        online={isOnline(account?.uuid, trainerRoom?.room?.meta?.lastSeenAt)}
      />
    </Link>
  )
}
