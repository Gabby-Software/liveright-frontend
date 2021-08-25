import { PropsWithChildren } from 'react'

import { CrossIcon } from '../../../assets/media/icons'
import { DialogStyles } from './dialog.styles'

interface DialogProps {
  title: string
  onClose: () => void
  open: boolean
}

export default function Dialog({
  title,
  open,
  onClose,
  children
}: PropsWithChildren<DialogProps>) {
  return (
    <DialogStyles
      title={title}
      visible={open}
      footer={false}
      closeIcon={<CrossIcon />}
      onCancel={onClose}
      width="100%"
      centered
    >
      {children}
    </DialogStyles>
  )
}
