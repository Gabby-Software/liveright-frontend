import React, { useContext } from 'react'

import CalendarFooter from '../../components/calendar/calendar-footer/calendar-footer.component'
import { calendarView } from '../../enums/calendar-views.enum'
import CalendarProvider, { CalendarContext } from './calendar.context'
import Styles from './calendar.styles'
import CalendarHeading from './calendar-heading/calendar-heading.component'
import CalendarMonth from './calendar-month/calendar-month.component'
import CalendarWeek from './calendar-week/calendar-week.component'

const Calendar = () => {
  const { view } = useContext(CalendarContext)
  return (
    <Styles>
      <CalendarHeading />
      {view === calendarView.MONTH ? <CalendarMonth /> : <CalendarWeek />}
      <CalendarFooter />
    </Styles>
  )
}

export default () => (
  <CalendarProvider>
    <Calendar />
  </CalendarProvider>
)
