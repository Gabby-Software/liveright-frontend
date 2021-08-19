import moment from 'moment'
import React from 'react'

import ActivitySmall from '../../../components/calendar/activity-small/activity-small.component'
import CalendarDay from '../../../components/calendar/calendar-day/calendar-day.component'
import Hr from '../../../components/hr/hr.styles'
import { activityTypes } from '../../../enums/actvity-types.enum'
import { forOf } from '../../../pipes/for-of.pipe'
import { useCalendar } from '../calendar.hook'
import Styles from './calendar-month.styles'

const demoActivities1: { name: string; type: string; time: string }[] = [
  { name: 'Low crab day', type: activityTypes.MEAL, time: '14:30' },
  { name: 'Push workout', type: activityTypes.WORKOUT, time: '15:00' }
]
const demoActivities2: { name: string; type: string; time: string }[] = [
  { name: 'Push workout lalala', type: activityTypes.WORKOUT, time: '15:00' },
  { name: 'PT Session', type: activityTypes.SESSION, time: '18:45' }
]
const CalendarMonth = () => {
  const { currentDate, startDisplay, today } = useCalendar('month')

  return (
    <Styles>
      <div className={'calendar-month__cont'}>
        {forOf(6, (i) => (
          <div className={'calendar-month__week'}>
            {forOf(7, (j) => {
              const d = moment(startDisplay).add(i * 7 + j, 'days')
              const thisMonth = d.month() === moment(currentDate).month()
              const isPast = d.isBefore(today, 'day')
              const isSelected = d.isSame(currentDate, 'day')
              return (
                <CalendarDay
                  date={d}
                  disabled={!thisMonth || isPast}
                  current={isSelected}
                >
                  {isPast || !thisMonth
                    ? null
                    : ((i * 7 + j) % 3 === 0
                        ? demoActivities2
                        : demoActivities1
                      )
                        // eslint-disable-next-line react/jsx-key
                        .map((a) => <ActivitySmall {...a} />)}
                </CalendarDay>
              )
            })}
          </div>
        ))}
      </div>
      <Hr />
    </Styles>
  )
}

export default CalendarMonth
