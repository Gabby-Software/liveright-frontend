import { useState } from 'react'

import Button from '../../components/buttons/button/button.component'
import Calendar from '../../components/calendar/calendar.component'
import { Title } from '../../components/typography'
import { useIsMobile } from '../../hooks/is-mobile.hook'
import MobilePage from '../../layouts/mobile-page/mobile-page.component'
import { Styles } from './calendar.styles'
import AddEvent from './components/add-event/add-event.component'

export default function CalendarPage() {
  const isMobile = useIsMobile()
  const [addDrawer, setAddDrawer] = useState(false)

  const content = (
    <>
      <Styles>
        {!isMobile && (
          <div className="calendar__title-container">
            <Title>My Calendar</Title>

            <Button onClick={() => setAddDrawer(true)}>Add Activity</Button>
          </div>
        )}

        <div>
          <Calendar />
        </div>
      </Styles>

      {!isMobile && (
        <AddEvent open={addDrawer} onClose={() => setAddDrawer(false)} />
      )}
    </>
  )

  return isMobile ? (
    <MobilePage
      title="My Calendar"
      actionComponent={
        <Button onClick={() => setAddDrawer(true)}>Add Activity</Button>
      }
      color="secondary"
      headerSpacing={14}
    >
      {content}
    </MobilePage>
  ) : (
    content
  )
}
