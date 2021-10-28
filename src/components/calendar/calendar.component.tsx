import moment from 'moment'
import { useState } from 'react'
import {
  Calendar as BigCalendar,
  CalendarProps as BigCalendarProps,
  Components,
  DateRange,
  momentLocalizer,
  View
} from 'react-big-calendar'

import useCalendar from '../../hooks/api/calendar/useCalendar'
import { useIsMobile } from '../../hooks/is-mobile.hook'
import { formatWeekActivities, parseActivities } from '../../utils/api/calendar'
import { DATE_FORMAT, TIME_RENDER_FORMAT } from '../../utils/date'
import {
  DateCellWrapper,
  Toolbar,
  ToolbarSecondary,
  WeekHeader
} from './calendar.components'
import { Styles } from './calendar.styles'

const localizer = momentLocalizer(moment)

interface CalendarProps {
  view?: View
  toolbar?: 'primary' | 'secondary' | false
  className?: string
}

export default function Calendar({
  view: initView = 'month',
  toolbar = 'primary',
  className
}: CalendarProps) {
  const [view, onView] = useState<View>(initView)
  const { activities } = useCalendar()
  const isMobile = useIsMobile()

  const parsedActivities = parseActivities(activities)

  let WeekProps: Partial<BigCalendarProps> | null = null
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
        className={`big-calendar ${view === 'day' ? 'big-calendar_day' : ''} ${
          className || ''
        }`}
        localizer={localizer}
        view={view}
        components={{
          toolbar: (props) =>
            toolbar === 'primary' ? (
              <Toolbar {...props} onView={onView} />
            ) : toolbar === 'secondary' ? (
              <ToolbarSecondary {...props} />
            ) : (
              <div />
            ),
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
        eventPropGetter={(event) => ({
          className: `big-calendar__event-${event.resource?.type}`
        })}
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
