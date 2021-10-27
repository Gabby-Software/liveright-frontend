import { PropsWithChildren } from 'react'

import { CrossIcon } from '../../assets/media/icons'
import DrawerStyles from './drawer.styles'

interface DrawerProps {
  width?: string | number
  title: string
  onClose: () => void
  open: boolean
  destroyOnClose?: boolean
}

export default function Drawer({
  width,
  children,
  title,
  onClose,
  open,
  destroyOnClose
}: PropsWithChildren<DrawerProps>) {
  return (
    <DrawerStyles
      title={title}
      visible={open}
      onClose={onClose}
      closeIcon={<CrossIcon />}
      width={width}
      destroyOnClose={destroyOnClose}
    >
      {children}
    </DrawerStyles>
  )
}
