import { PropsWithChildren } from 'react'

import Button from '../../components/buttons/button/button.component'
import PageTitle from '../../components/titles/page-title.styles'
import Styles from './desktop-wrapper.styles'

type DesktopWrapperProps = {
  title?: string
  headerButtonText?: string
  onHeaderButtonClick?: (param: any) => any
}

export default function DesktopWrapper({
  title,
  headerButtonText,
  onHeaderButtonClick,
  children
}: PropsWithChildren<DesktopWrapperProps>) {
  return (
    <Styles>
      <div className="wrapper">
        <div className="wrapper__main">
          <PageTitle className="wrapper__title">
            {title}
            <Button type={'primary'} onClick={onHeaderButtonClick}>
              {headerButtonText}
            </Button>
          </PageTitle>
          {children}
        </div>
      </div>
    </Styles>
  )
}
