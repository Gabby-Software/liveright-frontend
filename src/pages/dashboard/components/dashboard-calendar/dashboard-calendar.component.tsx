import { Link } from 'react-router-dom'

import { CalendarIcon } from '../../../../assets/media/icons'
import Button from '../../../../components/buttons/button/button.component'
import Calendar from '../../../../components/calendar/calendar.component'
import { Subtitle } from '../../../../components/typography'
import { Routes } from '../../../../enums/routes.enum'
import { Styles } from './dashboard-calendar.styles'

export const DashboardCalendar = () => {
  return (
    <Styles>
      <div className="dashboard-calendar__title-container">
        <Subtitle>Your Calender</Subtitle>

        <Link
          to={Routes.SESSIONS + '?add=1'}
          className="dashboard-calendar__link"
        >
          Schedule Sessions
        </Link>
      </div>

      <div className="dashboard-calendar__calendar-container">
        <Calendar
          view="day"
          toolbar="secondary"
          className="dashboard-calendar__calendar"
        />
      </div>

      <Button
        variant="secondary"
        to={Routes.CALENDAR}
        linkClassName="dashboard-calendar__btn-wrapper"
        className="dashboard-calendar__btn"
      >
        <CalendarIcon />
        Open Calender
      </Button>
    </Styles>
  )
}
