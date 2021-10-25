import moment from 'moment'
import { useState } from 'react'
import {
  Calendar as BigCalendar,
  CalendarProps,
  Components,
  DateRange,
  momentLocalizer,
  View
} from 'react-big-calendar'

import useCalendar from '../../hooks/api/calendar/useCalendar'
import { useIsMobile } from '../../hooks/is-mobile.hook'
import { formatWeekActivities, parseActivities } from '../../utils/api/calendar'
import { DATE_FORMAT, TIME_RENDER_FORMAT } from '../../utils/date'
import { DateCellWrapper, Toolbar, WeekHeader } from './calendar.components'
import { Styles } from './calendar.styles'

const localizer = momentLocalizer(moment)

export default function Calendar() {
  const [view, onView] = useState<View>('month')
  const { activities } = useCalendar()
  const isMobile = useIsMobile()

  const parsedActivities = parseActivities(activities)

  let WeekProps: Partial<CalendarProps> | null = null
  let MonthComponentProps: Components | null = null

  if (view === 'week' || view === 'day') {
    WeekProps = {
      events: formatWeekActivities(parsedActivities)
    }
  }

  if (view === 'month') {
    MonthComponentProps = {
      dateCellWrapper: (props: any) => {
        const now = moment()
        const date = moment(props.value)
        const currActivities = parsedActivities.filter(
          (activity) => activity.date === date.format(DATE_FORMAT)
        )
        return (
          <DateCellWrapper
            activities={currActivities}
            isNow={now.format(DATE_FORMAT) === date.format(DATE_FORMAT)}
          />
        )
      }
    }
  }

  return (
    <Styles>
      <BigCalendar
        className={`big-calendar ${view === 'day' ? 'big-calendar_day' : ''}`}
        localizer={localizer}
        view={view}
        components={{
          toolbar: (props) => <Toolbar {...props} onView={onView} />,
          week: {
            header: WeekHeader
          },
          day: {
            header: WeekHeader
          },
          ...(MonthComponentProps && MonthComponentProps)
        }}
        formats={{
          weekdayFormat: isMobile ? 'ddd' : 'dddd',
          timeGutterFormat: TIME_RENDER_FORMAT,
          eventTimeRangeFormat
        }}
        {...(WeekProps && WeekProps)}
      />
    </Styles>
  )
}

function eventTimeRangeFormat(date: DateRange) {
  return `${moment(date.start).format(TIME_RENDER_FORMAT)} - ${moment(
    date.end
  ).format(TIME_RENDER_FORMAT)}`
}
