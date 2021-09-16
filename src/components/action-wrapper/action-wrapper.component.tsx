import { Tooltip } from 'antd'
import React, { ReactElement } from 'react'

import Styles from './action-wrapper.styles'

type ActionProps = {
  title: string
  children: any
}

function ActionIconWrapper({ title, children }: ActionProps): ReactElement {
  return (
    <Tooltip title={title}>
      <Styles>{children}</Styles>
    </Tooltip>
  )
}

export default ActionIconWrapper
