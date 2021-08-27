import React, { FC } from 'react'

import Styles from './quick-access-title.styles'

type Props = { label?: string }
const QuickAccessTitle: FC<Props> = ({ children, label }) => {
  return (
    <Styles labeled={!!label}>
      <div>{children}</div>
      {label ? <div className={'qa-title__label'}>{label}</div> : null}
    </Styles>
  )
}

export default QuickAccessTitle
