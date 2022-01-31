import React, { FC } from 'react'

import Styles from './quick-access-topbar.styles'

interface Props {}

const QuickAccessHeader: FC<Props> = () => {
  return (
    <Styles>
      <div className="qa-topbar" />
    </Styles>
  )
}

export default QuickAccessHeader
