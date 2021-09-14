import { PropsWithChildren, ReactNode } from 'react'

import Header from './components/header/header.component'
import Styles from './mobile-page.styles'

interface MobilePageProps {
  title: string
  actionComponent?: ReactNode
  headerSpacing?: number
  headerComponent?: ReactNode
  headerTopComponent?: ReactNode
  headerTitleIcon?: ReactNode
  headerNavChat?: boolean
  color?: 'primary' | 'secondary'
}

export default function MobilePage({
  children,
  title,
  actionComponent,
  headerSpacing,
  headerComponent,
  headerTopComponent,
  headerTitleIcon,
  headerNavChat,
  color = 'primary'
}: PropsWithChildren<MobilePageProps>) {
  return (
    <Styles className="mobile-page" $color={color}>
      <Header
        title={title}
        actionComponent={actionComponent}
        spacing={headerSpacing}
        component={headerComponent}
        topComponent={headerTopComponent}
        titleIcon={headerTitleIcon}
        navChat={headerNavChat}
      />

      <div className="mobile-page__content">{children}</div>
    </Styles>
  )
}
