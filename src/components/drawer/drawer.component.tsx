import { PropsWithChildren } from 'react'

import { CrossIcon } from '../../assets/media/icons'
import DrawerStyles from './drawer.styles'

interface DrawerProps {
  width?: string | number
  title: string
  onClose: () => void
  open: boolean
}

export default function Drawer({
  width,
  children,
  title,
  onClose,
  open
}: PropsWithChildren<DrawerProps>) {
  return (
    <DrawerStyles
      title={title}
      visible={open}
      onClose={onClose}
      closeIcon={<CrossIcon />}
      width={width}
    >
      {children}
    </DrawerStyles>
  )
}
