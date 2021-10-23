import Button from '../../components/buttons/button/button.component'
import Calendar from '../../components/calendar/calendar.component'
import { Title } from '../../components/typography'
import { useIsMobile } from '../../hooks/is-mobile.hook'
import MobilePage from '../../layouts/mobile-page/mobile-page.component'
import { Styles } from './calendar.styles'

export default function CalendarPage() {
  const isMobile = useIsMobile()
  const content = (
    <Styles>
      {!isMobile && (
        <div className="calendar__title-container">
          <Title>My Calendar</Title>

          <Button>Add Activity</Button>
        </div>
      )}

      <div>
        <Calendar />
      </div>
    </Styles>
  )

  return isMobile ? (
    <MobilePage
      title="My Calendar"
      actionComponent={<Button>Add Activity</Button>}
      color="secondary"
      headerSpacing={14}
    >
      {content}
    </MobilePage>
  ) : (
    content
  )
}
