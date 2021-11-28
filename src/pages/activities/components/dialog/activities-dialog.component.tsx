import { ReactNode } from 'react'

import { CrossIcon } from '../../../../assets/media/icons'
import DatePicker from '../../../../components/form/date-picker/date-picker.component'
import Alert from '../alert/alert.component'
import { ActivitiesDialogStyles, Styles } from './activities-dialog.styles'

export interface ActivitiesDialogProps {
  open: boolean
  onClose: () => void
  name: string
  description: string
  title: string
  alert: string
  actions: ReactNode
}

export default function ActivitiesDialog({
  onClose,
  open,
  name,
  description,
  title,
  alert,
  actions
}: ActivitiesDialogProps) {
  return (
    <ActivitiesDialogStyles
      visible={open}
      onCancel={onClose}
      closeIcon={<CrossIcon />}
      footer={false}
      width="100%"
      centered
    >
      <Styles>
        <p className="ActivitiesDialog__name">{name}</p>
        <p className="ActivitiesDialog__description">{description}</p>
        <p className="ActivitiesDialog__title">{title}</p>
        <div className="ActivitiesDialog__divider" />

        <DatePicker
          id="ActivitiesDialog-date"
          label="From when should we apply this change"
          placeholder="Schedule start date"
          className="ActivitiesDialog__control"
        />

        <Alert className="ActivitiesDialog__alert" content={alert} />

        <div className="ActivitiesDialog__actions">{actions}</div>
      </Styles>
    </ActivitiesDialogStyles>
  )
}
