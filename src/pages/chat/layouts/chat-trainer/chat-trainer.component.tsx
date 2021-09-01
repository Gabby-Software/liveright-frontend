import React, { FC } from 'react'

import { ReactComponent as CalendarIcon } from '../../../../assets/media/icons/calendar.svg'
import { ReactComponent as RevenueIcon } from '../../../../assets/media/icons/revenue.svg'
import BlueLink from '../../../../components/blue-link/blue-link.component'
import Card from '../../../../components/card/card.style'
import { Routes } from '../../../../enums/routes.enum'
import useTrainerAccount from '../../../../hooks/api/accounts/useTrainerAccount'
import { noImage } from '../../../../pipes/no-image.pipe'
import Styles, { DataItem, StyledAvatar } from './chat-trainer.styles'

const mockSessions = [
  '22 June 2021 at 3 pm',
  '22 June 2021 at 3 pm',
  '22 June 2021 at 3 pm'
]
const mockInvoices = ['#456 for 456 AED']
const ChatTrainer: FC<{}> = () => {
  const { user: trainer } = useTrainerAccount()
  return (
    <Styles>
      <Card className={'chat-trainer__info'}>
        <StyledAvatar
          placeholder={noImage(trainer?.first_name, trainer?.last_name)}
          url={trainer?.avatar?.url}
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
        {mockSessions.map((s, i) => (
          <DataItem key={i}>{s}</DataItem>
        ))}
      </div>
      <div className={'chat-trainer__meta'}>
        <div className={'chat-trainer__title'}>
          <RevenueIcon />
          <span>Invoices</span>
        </div>
        {mockInvoices.map((s, i) => (
          <DataItem key={i}>{s}</DataItem>
        ))}
      </div>
    </Styles>
  )
}
export default ChatTrainer
