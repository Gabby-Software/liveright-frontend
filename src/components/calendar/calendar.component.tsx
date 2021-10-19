import moment from 'moment'
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar'

import { Toolbar } from './calendar.components'
import { Styles } from './calendar.styles'

const localizer = momentLocalizer(moment)

export default function Calendar() {
  return (
    <Styles>
      <BigCalendar
        localizer={localizer}
        components={{
          toolbar: Toolbar
        }}
      />
    </Styles>
  )
}
