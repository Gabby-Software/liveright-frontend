import { PropsWithChildren, ReactNode } from 'react'

import Header from './components/header/header.component'
import Styles from './mobile-page.styles'

interface MobilePageProps {
  title: string
  actionComponent?: ReactNode
  headerSpacing?: number
  headerComponent?: ReactNode
  headerTopComponent?: ReactNode
}

export default function MobilePage({
  children,
  title,
  actionComponent,
  headerSpacing,
  headerComponent,
  headerTopComponent
}: PropsWithChildren<MobilePageProps>) {
  return (
    <Styles className="mobile-page">
      <Header
        title={title}
        actionComponent={actionComponent}
        spacing={headerSpacing}
        component={headerComponent}
        topComponent={headerTopComponent}
      />

      <div className="mobile-page__content">{children}</div>
    </Styles>
  )
}
