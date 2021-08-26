import React from 'react'

import Card from '../../../../../components/cards/card/card.component'
import Drawer from '../../../../../components/drawer/drawer.component'
import { useTranslation } from '../../../../../modules/i18n/i18n.hook'
import { SessionType } from '../../../../../types/session.type'
import AddSessionCalendar from '../add-session-calendar/add-session-calendar.component'
import AddSessionFieldsDesktop from '../add-session-fields-desktop/add-session-fields-desktop.component'
import AddSessionForm from '../add-session-form/add-session-form.component'
import AddSessionTop from '../add-session-top/add-session-top.component'
import Styles from './add-session-desktop.styles'

type Props = {
  isOpen: boolean
  onClose: () => void
  session?: SessionType
}

const AddSessionDesktop = ({ isOpen, onClose, session }: Props) => {
  const { t } = useTranslation()
  return (
    <Drawer
      open={isOpen}
      width="88%"
      title={t('sessions:schedule-session')}
      onClose={onClose}
    >
      <Styles className="add-session">
        <AddSessionForm onClose={onClose} session={session}>
          <div className="add-session__left">
            <AddSessionTop session={session} />

            <AddSessionFieldsDesktop onClose={onClose} session={session} />
          </div>
          <div className="add-session__right">
            <Card className="add-session__calendar-card">
              <AddSessionCalendar />
            </Card>
          </div>
        </AddSessionForm>
      </Styles>
    </Drawer>
  )
}

export default AddSessionDesktop
