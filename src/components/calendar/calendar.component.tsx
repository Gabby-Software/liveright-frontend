import moment from 'moment'
import {
  Calendar as BigCalendar,
  CalendarProps as BigCalendarProps,
  DateRange,
  momentLocalizer, View
} from 'react-big-calendar'

import { TIME_RENDER_FORMAT } from '../../utils/date'
import { DateCellWrapper, Toolbar, WeekHeader } from './calendar.components'
import { Styles } from './calendar.styles'
import { useState } from 'react'

const localizer = momentLocalizer(moment)

interface CalendarProps {}

export default function Calendar() {
  const [view, onView] = useState<View>('month')
  return (
    <Styles>
      <BigCalendar
        className="big-calendar"
        localizer={localizer}
        view={view}
        components={{
          toolbar: (props) => <Toolbar {...props} onView={onView} />,
          week: {
            header: WeekHeader
          },
          ...(view === 'month' && {
            dateCellWrapper: DateCellWrapper
          })
        }}
        formats={{
          weekdayFormat: 'dddd',
          timeGutterFormat: TIME_RENDER_FORMAT,
          eventTimeRangeFormat
        }}
        events={
          view !== 'month'
            ? [
                {
                  start: moment().toDate(),
                  end: moment().add(2, 'hours').toDate(),
                  title: '123'
                }
              ]
            : undefined
        }
      />
    </Styles>
  )
}

function eventTimeRangeFormat(date: DateRange) {
  return `${moment(date.start).format(TIME_RENDER_FORMAT)} - ${moment(
    date.end
  ).format(TIME_RENDER_FORMAT)}`
}
