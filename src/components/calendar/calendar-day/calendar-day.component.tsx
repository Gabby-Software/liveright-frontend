import { Moment } from 'moment'
import React, { useContext } from 'react'

import { ReactComponent as CheckIcon } from '../../../assets/media/icons/check.svg'
import { ReactComponent as DoubleCheckIcon } from '../../../assets/media/icons/double-check.svg'
import { logStatus } from '../../../enums/log-status.enum'
import { useIsMobile } from '../../../hooks/is-mobile.hook'
import { CalendarContext } from '../../../pages/calendar/calendar.context'
import { classes } from '../../../pipes/classes.pipe'
import Styles from './calendar-day.styles'

type Props = {
  disabled?: boolean
  current?: boolean
  date: Moment
  status?: logStatus
  children?: React.ReactNode
}
const CalendarDay = ({ disabled, current, date, status, children }: Props) => {
  const { setCurrentDate } = useContext(CalendarContext)
  const isMobile = useIsMobile()
  return (
    <Styles
      className={classes(
        'calendar-day',
        disabled && 'calendar-day__disabled',
        current && 'calendar-day__selected'
      )}
      onClick={() => setCurrentDate(date.toDate())}
    >
      <div className={'calendar-day__date'}>{date.date()}</div>
      <div>{isMobile ? null : children}</div>
      {status === logStatus.FULLY_DONE ||
      (disabled && [16, 17, 18].includes(date.date())) ? (
        <DoubleCheckIcon
          className={classes('calendar-day__icon', 'calendar-day__icon__full')}
        />
      ) : status === logStatus.PARTIALLY_DONE ||
        (disabled && [12, 13, 14, 15].includes(date.date())) ? (
        <CheckIcon
          className={classes(
            'calendar-day__icon',
            'calendar-day__icon__partial'
          )}
        />
      ) : null}
    </Styles>
  )
}

export default CalendarDay
