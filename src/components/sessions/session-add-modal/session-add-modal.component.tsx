import React from 'react'

import { useTranslation } from '../../../modules/i18n/i18n.hook'
import Dialog from '../../dialogs/dialog/dialog.component'
import AddForm from './component/add-form/add-form.component'

type Props = {
  isOpen: boolean
  onClose: () => void
  trainer_id: number
  mutate?: any
}

const SessionAddModal: React.FC<Props> = (props) => {
  const { isOpen, onClose, trainer_id, mutate } = props
  const { t } = useTranslation()

  return (
    <Dialog
      title={t('sessions:session-request')}
      open={isOpen}
      onClose={onClose}
    >
      <AddForm trainerId={trainer_id} onSuccess={onClose} mutate={mutate} />
    </Dialog>
  )
}

export default SessionAddModal
