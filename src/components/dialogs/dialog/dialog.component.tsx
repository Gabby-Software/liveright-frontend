import { PropsWithChildren } from 'react'

import { CrossIcon } from '../../../assets/media/icons'
import { DialogStyles } from './dialog.styles'

interface DialogProps {
  title?: string
  onClose?: () => void
  open: boolean
  className?: string
}

export default function Dialog({
  title,
  open,
  onClose,
  children,
  className
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
      className={className}
    >
      {children}
    </DialogStyles>
  )
}
