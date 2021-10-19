import Button from '../../components/buttons/button/button.component'
import Calendar from '../../components/calendar/calendar.component'
import { Title } from '../../components/typography'
import { Styles } from './calendar.styles'

export default function CalendarPage() {
  return (
    <Styles>
      <div className="calendar__title-container">
        <Title>My Calendar</Title>

        <Button>Add Activity</Button>
      </div>

      <div>
        <Calendar />
      </div>
    </Styles>
  )
}
