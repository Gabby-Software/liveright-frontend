import React from 'react'

import Modal from '../../../../../components/modal/modal.component'
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
  return (
    <Modal visible={isOpen} onCancel={onClose} large>
      <AddSessionForm onClose={onClose} session={session}>
        <Styles>
          <div className={'add-session__left'}>
            <AddSessionTop session={session} />
            <AddSessionFieldsDesktop onClose={onClose} session={session} />
          </div>
          <div className={'add-session__right'}>
            <AddSessionCalendar />
          </div>
        </Styles>
      </AddSessionForm>
    </Modal>
  )
}

export default AddSessionDesktop
