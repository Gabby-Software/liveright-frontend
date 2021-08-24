import moment from 'moment'
import React, { FC } from 'react'

import { ReactComponent as CalendarIcon } from '../../../../../assets/media/icons/calendar.svg'
import { ReactComponent as ClockIcon } from '../../../../../assets/media/icons/clock.svg'
import { ReactComponent as MinimizeIcon } from '../../../../../assets/media/icons/minimize.svg'
import { ReactComponent as RevenueIcon } from '../../../../../assets/media/icons/revenue.svg'
import { ReactComponent as ArrowIcon } from '../../../../../assets/media/icons/right-arrow.svg'
import profilePlaceholder from '../../../../../assets/media/profile-placeholder.png'
import BlueLink from '../../../../../components/blue-link/blue-link.component'
import { Routes } from '../../../../../enums/routes.enum'
import userTypes from '../../../../../enums/user-types.enum'
import { useAuth } from '../../../../../hooks/auth.hook'
import { useChatRoom } from '../../../../../modules/chat/contexts/chat-room.context'
import { useChats } from '../../../../../modules/chat/contexts/chats.context'
import { noImage } from '../../../../../pipes/no-image.pipe'
import Styles, {
  ClientHeader,
  StyledAvatar
} from './chat-header-desktop.styles'

type Props = {}
const user = {
  first_name: 'Lucas',
  last_name: 'Travolta',
  uuid: 'abdrakadabra',
  avatar: {
    url: profilePlaceholder
  },
  sessions: 1,
  invoices: 2,
  last_login: moment().add(-1, 'day')
}
const ChatHeaderDesktop: FC<Props> = ({}) => {
  const { collapse } = useChats()
  const { room } = useChatRoom()
  const { type } = useAuth()
  if (type === userTypes.CLIENT)
    return <ClientHeader>Lucas Travolta</ClientHeader>
  return (
    <Styles>
      <StyledAvatar
        placeholder={noImage(user.first_name, user.last_name)}
        url={user.avatar?.url}
      />
      <div className={'chat-header__body'}>
        <div className={'chat-header__body__top'}>
          <div className={'chat-header__name'}>
            {user.first_name} {user.last_name}
          </div>
          <BlueLink to={Routes.CLIENTS + `/${user.uuid}` + Routes.PROFILE}>
            <span>Open Client Profile</span>
            <ArrowIcon className={'chat-header__arrow'} />
          </BlueLink>
        </div>
        <div className={'chat-header__body__bottom'}>
          <div className={'chat-header__data'}>
            <CalendarIcon />
            <span>{user.sessions} Upcoming sessions</span>
          </div>
          <div className={'chat-header__data'}>
            <RevenueIcon />
            <span>{user.invoices} Open invoices</span>
          </div>
          <div className={'chat-header__data'}>
            <ClockIcon />
            <span>Last logged {moment(user.last_login).fromNow()}</span>
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
