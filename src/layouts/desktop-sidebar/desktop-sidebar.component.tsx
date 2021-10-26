import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import {
  BookmarkTrainerIcon,
  BrandLogoIcon,
  CalendarIcon,
  CalendarTrainerIcon,
  ChatTrainerIcon,
  ClientSolidIcon,
  CoachRightLogoIcon,
  DocumentTrainerIcon,
  FinancialsTrainerIcon,
  GroupIcon,
  HomeIcon,
  HomeTrainerIcon,
  InvoiceIcon,
  LibraryIcon,
  NotificationTrainerIcon,
  PlanIcon,
  ProgressIcon,
  ProgressTrainerIcon,
  RevenueIcon,
  UsersTrainerIcon,
  UserTrainerIcon
} from '../../assets/media/icons'
import UserBadgeCard from '../../components/cards/user-bardge-card/user-badge-card.component'
import ChatIcon from '../../components/chat-icon/chat-icon.component'
import NotificationIcon from '../../components/notification-icon/notification-icon.component'
import { Routes } from '../../enums/routes.enum'
import userTypes from '../../enums/user-types.enum'
import useTrainerAccount from '../../hooks/api/accounts/useTrainerAccount'
import useChatOnline from '../../hooks/api/chat/useChatOnline'
import useChatUnread from '../../hooks/api/chat/useChatUnread'
import { useAuth } from '../../hooks/auth.hook'
import { useChats } from '../../modules/chat/contexts/chats.context'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import { capitalize } from '../../pipes/capitalize.pipe'
import { classes } from '../../pipes/classes.pipe'
import DesktopFooter from '../desktop-footer/desktop-footer.component'
import {
  ClientsStyles,
  Container,
  TrainerStyles
} from './desktop-sidebar.styles'

type MenuItemType = {
  name: string
  Icon: React.ComponentType
  url: string
  type?: string
  requireTrainer?: boolean
  occur?: string[]
}

const clientMenuItems: MenuItemType[] = [
  { name: 'home', url: Routes.HOME, Icon: HomeIcon },
  { name: 'plans', url: Routes.PLANS, Icon: PlanIcon },
  {
    name: 'progress',
    url: Routes.PROGRESS_CLIENTS,
    Icon: ProgressIcon,
    type: userTypes.TRAINER,
    occur: ['progress']
  },
  {
    name: 'progress',
    url: Routes.PROGRESS_CLIENT_MEASUREMENTS,
    Icon: ProgressIcon,
    type: userTypes.CLIENT,
    occur: ['progress']
  },
  { name: 'sessions', url: Routes.SESSIONS, Icon: GroupIcon },
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

const trainerMenuItems: MenuItemType[] = [
  { name: 'home', url: Routes.HOME, Icon: HomeTrainerIcon },
  { name: 'plans', url: Routes.PLANS, Icon: DocumentTrainerIcon },
  {
    name: 'progress',
    url: Routes.PROGRESS_CLIENTS,
    Icon: ProgressTrainerIcon,
    type: userTypes.TRAINER,
    occur: ['progress']
  },
  { name: 'sessions', url: Routes.SESSIONS, Icon: UsersTrainerIcon },
  {
    name: 'clients',
    url: Routes.CLIENTS,
    Icon: UserTrainerIcon,
    type: userTypes.TRAINER
  },

  {
    name: 'chat',
    url: Routes.CHAT,
    Icon: ChatTrainerIcon,
    type: userTypes.TRAINER
  },
  { name: 'calendar', url: Routes.CALENDAR, Icon: CalendarTrainerIcon },
  { name: 'library', url: Routes.HUB, Icon: BookmarkTrainerIcon },
  {
    name: 'financials',
    url: Routes.FINANCIALS_OVERVIEW,
    Icon: FinancialsTrainerIcon,
    type: userTypes.TRAINER
  },
  {
    name: 'notifications',
    url: Routes.NOTIFICATIONS,
    Icon: NotificationTrainerIcon
  }
]

export default function DesktopSidebar() {
  const { type } = useAuth()
  const { pathname } = useLocation()
  const [isOpen] = useState(false)
  if (type === userTypes.CLIENT) {
    return (
      <>
        <ClientsStyles
          className={classes('sidebar', isOpen && 'sidebar__open')}
        >
          <div>
            <div className="sidebar__logo">
              <BrandLogoIcon />
            </div>

            {type === userTypes.CLIENT && <TrainerBadge />}

            <div className="sidebar__divider sidebar__divider_spacing" />

            <div className="sidebar__nav-spacer" />
            <nav className="sidebar__nav">
              <ul className="sidebar__menu">
                {clientMenuItems.map(
                  ({
                    url,
                    name,
                    Icon,
                    type: permission,
                    requireTrainer,
                    occur
                  }) =>
                    (!permission || type === permission) &&
                    (!requireTrainer || type !== userTypes.CLIENT) && (
                      <Link
                        to={url}
                        key={url}
                        className={classes(
                          'sidebar__item',
                          (pathname === url ||
                            occur?.some((o) => pathname.includes(o))) &&
                            'sidebar__item_active'
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
        </ClientsStyles>

        <DesktopFooter />
      </>
    )
  }
  return <TrainerDesktopSidebar isOpen={isOpen} />
}

function TrainerBadge() {
  const { t } = useTranslation()
  const { user: trainer, account } = useTrainerAccount()
  const { isOnline } = useChatOnline()
  const { rooms } = useChats()
  const { unread } = useChatUnread()

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
        unreadCount={unread}
        online={isOnline(account?.uuid, trainerRoom?.room?.meta?.lastSeenAt)}
      />
    </Link>
  )
}

function TrainerDesktopSidebar({ isOpen }: { isOpen: boolean }) {
  const { type } = useAuth()
  const { pathname } = useLocation()
  return (
    <Container>
      <TrainerStyles className={classes('sidebar', isOpen && 'sidebar__open')}>
        <div>
          <div className="sidebar__logo">
            <CoachRightLogoIcon />
          </div>
          <div className="sidebar__nav-spacer" />
          <nav className="sidebar__nav">
            <ul className="sidebar__menu">
              {trainerMenuItems.map(
                ({
                  url,
                  name,
                  Icon,
                  type: permission,
                  requireTrainer,
                  occur
                }) =>
                  (!permission || type === permission) &&
                  !requireTrainer && (
                    <Link
                      to={url}
                      key={url}
                      className={classes(
                        'sidebar__item',
                        (pathname === url ||
                          occur?.some((o) => pathname.includes(o))) &&
                          'sidebar__item_active'
                      )}
                    >
                      <div className="sidebar__item-icon__wrapper">
                        <Icon />
                      </div>

                      <span>{capitalize(name)}</span>
                    </Link>
                  )
              )}
            </ul>
          </nav>
        </div>
      </TrainerStyles>
      <DesktopFooter />
    </Container>
  )
}
