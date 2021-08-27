import React from 'react'

import { useTranslation } from '../../../modules/i18n/i18n.hook'
import { SessionType } from '../../../types/session.type'
import Dialog from '../../dialogs/dialog/dialog.component'
import Form from './components/form/form.components'

type Props = {
  onClose: () => void
  session: SessionType
  open: boolean
}

function SessionRescheduleModalContent({ session, onClose }: Props) {
  return <Form session={session} onSuccess={onClose} />
}

interface SessionRescheduleModalProps {
  session?: SessionType
  open: boolean
  onClose: any
}

const SessionRescheduleModal = (props: SessionRescheduleModalProps) => {
  const { t } = useTranslation()
  return (
    <Dialog
      title={t('sessions:reschedule')}
      open={props.open}
      onClose={props.onClose}
    >
      {props.session && (
        <SessionRescheduleModalContent {...props} session={props.session} />
      )}
    </Dialog>
  )
}

export default SessionRescheduleModal
