import React, { FC } from 'react'

import Styles from './quick-access-topbar.styles'

interface Props {
  height?: number
}

const QuickAccessHeader: FC<Props> = ({ height }) => {
  return (
    <Styles height={height}>
      <div className="qa-topbar" />
    </Styles>
  )
}

export default QuickAccessHeader
