import moment from 'moment'
import React, { memo, ReactElement, ReactNode } from 'react'

import {
  CalendarSmallIcon,
  ClockSmallIcon
} from '../../../../assets/media/icons'
import UserBadge from '../../../../components/user-badge/user-badge.component'
import userTypes from '../../../../enums/user-types.enum'
import { useAuth } from '../../../../hooks/auth.hook'
import { SessionType } from '../../../../types/session.type'
import Styles from './session-mobile-card.styles'

interface Props {
  session: SessionType
  SwipeContent?: ReactNode
  renderOptions?: (session: SessionType) => ReactElement
}

const SessionCard: React.FC<Props> = (props) => {
  const { session, renderOptions } = props
  const { client, trainer, type, starts_at } = session
  const isTrainerType = useAuth().type === userTypes.TRAINER
  const person = isTrainerType ? client : trainer
  const day = moment(starts_at).format('DD')
  const month = moment(starts_at).format('MMMM')
  const time = moment.utc(starts_at).format('HH:mm')

  return (
    <Styles className="session-card">
      <div className="session-card__container">
        <div className="session-card__info">
          <p className="session-card__title">{type}</p>
          <UserBadge
            size="sm"
            avatar={person?.user.avatar?.url}
            firstName={person?.user.first_name}
            lastName={person?.user.last_name}
          />
        </div>

        <div className="session-card__date">
          <p className="session-card__date-item">
            <span>
              {day} {month}
            </span>
            <CalendarSmallIcon />
          </p>
          <p className="session-card__date-item">
            <span>{time}</span>
            <ClockSmallIcon />
          </p>
        </div>
      </div>

      {renderOptions && renderOptions(session)}
    </Styles>
  )
}

export default memo(SessionCard)
