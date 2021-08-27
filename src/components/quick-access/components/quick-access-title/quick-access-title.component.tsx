import React, { FC } from 'react'

import Styles from './quick-access-title.styles'

type Props = {}
const QuickAccessTitle: FC<Props> = ({ children }) => {
  return <Styles>{children}</Styles>
}

export default QuickAccessTitle
