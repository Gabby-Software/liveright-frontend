import moment from 'moment'
import React, { FC } from 'react'
import useSWR from 'swr'

import { ReactComponent as CalendarIcon } from '../../../../assets/media/icons/calendar.svg'
import { ReactComponent as RevenueIcon } from '../../../../assets/media/icons/revenue.svg'
import BlueLink from '../../../../components/blue-link/blue-link.component'
import Card from '../../../../components/card/card.style'
import UserBadge from '../../../../components/user-badge/user-badge.component'
import { EP_GET_INVOICES, EP_GET_SESSIONS } from '../../../../enums/api.enum'
import { Routes } from '../../../../enums/routes.enum'
import useTrainerAccount from '../../../../hooks/api/accounts/useTrainerAccount'
import useChatOnline from '../../../../hooks/api/chat/useChatOnline'
import api from '../../../../managers/api.manager'
import { InvoiceType } from '../../../../types/invoice.type'
import { SessionType } from '../../../../types/session.type'
import Styles, { DataItem } from './chat-trainer.styles'

const ChatTrainer: FC = () => {
  const { user: trainer, account } = useTrainerAccount()
  const { isOnline } = useChatOnline()

  const { data: sessions } = useSWR<SessionType[]>(
    EP_GET_SESSIONS + '?filter[status]=upcoming',
    (url) => api.get(url).then((res) => res.data.data)
  )
  const { data: invoices } = useSWR<InvoiceType[]>(
    EP_GET_INVOICES + '?filter[status]=outstanding,due_soon,overdue',
    (url) => api.get(url).then((res) => res.data.data)
  )

  return (
    <Styles>
      <Card className={'chat-trainer__info'}>
        <UserBadge
          firstName={trainer?.first_name || ''}
          lastName={trainer?.last_name || ''}
          avatar={trainer?.avatar?.url || ''}
          avatarOnly
          size="lg"
          online={isOnline(account?.uuid)}
        />

        <div className={'chat-trainer__info__data'}>
          <div className={'chat-trainer__name'}>
            {trainer?.first_name} {trainer?.last_name}
          </div>
          <BlueLink to={Routes.TRAINER} className={'chat-trainer__link'}>
            View Profile
          </BlueLink>
        </div>
      </Card>
      <div className={'chat-trainer__meta'}>
        <div className={'chat-trainer__title'}>
          <CalendarIcon />
          <span>Upcoming Sessions</span>
        </div>
        {sessions && !sessions.length ? (
          <DataItem>{`No upcoming sessions yet`}</DataItem>
        ) : (
          sessions
            ?.slice(0, 3)
            .map(({ starts_at }, i) => (
              <DataItem key={i}>{`${moment(starts_at).format(
                'DD MMMM YYYY'
              )} at ${moment(starts_at).format('HH:mm')}`}</DataItem>
            ))
        )}
      </div>
      <div className={'chat-trainer__meta'}>
        <div className={'chat-trainer__title'}>
          <RevenueIcon />
          <span>Invoices</span>
        </div>
        {invoices && !invoices.length ? (
          <DataItem>{`No open invoices yet`}</DataItem>
        ) : (
          invoices
            ?.slice(0, 3)
            .map(({ invoice_number, total, currency }, i) => (
              <DataItem
                key={i}
              >{`#${invoice_number} for ${total} ${currency.code}`}</DataItem>
            ))
        )}
      </div>
    </Styles>
  )
}
export default ChatTrainer
