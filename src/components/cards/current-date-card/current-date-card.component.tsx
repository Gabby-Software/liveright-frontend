import moment from 'moment'
import React from 'react'

import { CalendarBoldIcon } from '../../../assets/media/icons'
import { ReactComponent as ClockIcon } from '../../../assets/media/icons/clock.svg'
import { useTranslation } from '../../../modules/i18n/i18n.hook'
import { classes } from '../../../pipes/classes.pipe'
import { date as datePipe } from '../../../pipes/date.pipe'
import Styles from './current-date-card.styles'

interface CurrentDateCardProps {
  date: string
  className?: string
  dateLabel?: string
  timeLabel?: string
}

export default function CurrentDateCard({
  date,
  className,
  dateLabel,
  timeLabel
}: CurrentDateCardProps) {
  const { t } = useTranslation()
  return (
    <Styles className={classes('current-date-card', className)}>
      <div className="current-date-card__item">
        <CalendarBoldIcon />
        <div className="current-date-card__item-container">
          <p className="current-date-card__item-title">
            {dateLabel || t('sessions:current-date')}
          </p>
          <p className="current-date-card__item-value">{datePipe(date)}</p>
        </div>
      </div>
      <div className="current-date-card__item">
        <ClockIcon />
        <div className="current-date-card__item-container">
          <p className="current-date-card__item-title">
            {timeLabel || t('sessions:current-time')}
          </p>
          <p className="current-date-card__item-value">
            {moment.utc(date).format('HH:mm')}
          </p>
        </div>
      </div>
    </Styles>
  )
}
