import React, { FC } from 'react'

import { ReactComponent as CalendarIcon } from '../../../../../assets/media/icons/calendar.svg'
import { ReactComponent as ClockIcon } from '../../../../../assets/media/icons/clock.svg'
import { ReactComponent as MinimizeIcon } from '../../../../../assets/media/icons/minimize.svg'
import { ReactComponent as RevenueIcon } from '../../../../../assets/media/icons/revenue.svg'
import { ReactComponent as ArrowIcon } from '../../../../../assets/media/icons/right-arrow.svg'
import BlueLink from '../../../../../components/blue-link/blue-link.component'
import UserBadge from '../../../../../components/user-badge/user-badge.component'
import { Routes } from '../../../../../enums/routes.enum'
import userTypes from '../../../../../enums/user-types.enum'
import useChatOnline from '../../../../../hooks/api/chat/useChatOnline'
import useSessions from '../../../../../hooks/api/sessions/useSessions'
import useStatistic from '../../../../../hooks/api/stat/useStatistic'
import { useAuth } from '../../../../../hooks/auth.hook'
import { useChatRoom } from '../../../../../modules/chat/contexts/chat-room.context'
import { useChats } from '../../../../../modules/chat/contexts/chats.context'
import Styles, { ClientHeader } from './chat-header-desktop.styles'

type Props = {}

const ChatHeaderDesktop: FC<Props> = ({}) => {
  const { collapse } = useChats()
  const { room, roomData } = useChatRoom()
  const { type } = useAuth()
  const statistic = useStatistic({ account_id: roomData?.user_id })

  const upcomingSessions = useSessions({
    filter: {
      client_id: roomData?.user_id,
      status: 'upcoming'
    }
  })

  const { isOnline, lastSeen } = useChatOnline()

  if (type === userTypes.CLIENT)
    return (
      <ClientHeader>
        {roomData?.firstName} {roomData?.lastName}
      </ClientHeader>
    )

  return (
    <Styles>
      <UserBadge
        key={roomData?.user_id}
        firstName={roomData?.firstName}
        lastName={roomData?.lastName}
        avatar={roomData?.avatar?.url}
        avatarOnly
        size="xl"
        online={isOnline(
          roomData?.account_uuid || '',
          roomData?.meta?.lastSeenAt
        )}
      />

      <div className={'chat-header__body'}>
        <div className={'chat-header__body__top'}>
          <div className={'chat-header__name'}>
            {roomData?.firstName} {roomData?.lastName}
          </div>
          <BlueLink
            to={Routes.CLIENTS + `/${roomData?.user_id}` + Routes.PROFILE}
          >
            <span>Open Client Profile</span>
            <ArrowIcon className={'chat-header__arrow'} />
          </BlueLink>
        </div>
        <div className={'chat-header__body__bottom'}>
          <div className={'chat-header__data'}>
            <CalendarIcon />
            <span>{upcomingSessions.meta.total || 0} Upcoming sessions</span>
          </div>
          <div className={'chat-header__data'}>
            <RevenueIcon />
            <span>{statistic.progressCount.total || 0} Open invoices</span>
          </div>
          <div className={'chat-header__data'}>
            <ClockIcon />
            {lastSeen(roomData?.account_uuid || '', roomData?.meta?.lastSeenAt)}
          </div>
          <MinimizeIcon
            className={'chat-header__minimize'}
            onClick={() => collapse(room)}
          />
        </div>
      </div>
    </Styles>
  )
}

export default ChatHeaderDesktop
