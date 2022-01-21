import { PropsWithChildren, ReactNode } from 'react'

import Header from '../../../layouts/mobile-page/components/header/header.component'
import Styles from './mobile-fullscreen-dialog.styles'

interface MobileFullScreenDialogProps {
  title: string
  actionComponent?: ReactNode
  headerSpacing?: number
  headerComponent?: ReactNode
  headerTopComponent?: ReactNode
  headerTitleIcon?: ReactNode
  headerNavChat?: boolean
  color?: 'primary' | 'secondary'
}

export default function MobileFullScreenDialog({
  children,
  title,
  actionComponent,
  headerSpacing,
  headerComponent,
  headerTopComponent,
  headerTitleIcon,
  headerNavChat,
  color = 'primary'
}: PropsWithChildren<MobileFullScreenDialogProps>) {
  console.log('From Mobile Full Screen Dialog')
  return (
    <Styles className="mobileFullscreenModal" $color={color}>
      <Header
        title={title}
        actionComponent={actionComponent}
        spacing={headerSpacing}
        component={headerComponent}
        topComponent={headerTopComponent}
        titleIcon={headerTitleIcon}
        navChat={headerNavChat}
      />

      <div className="mobileFullscreenModal__content">{children}</div>
    </Styles>
  )
}
