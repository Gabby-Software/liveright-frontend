import { Tooltip } from 'antd'
import React from 'react'

import { HtmlType } from '../../types/html.type'
import { TableActionType } from '../../types/table-action.type'
import Styles from './action-icon.styles'

type Props = TableActionType & HtmlType
const ActionIcon = ({ icon, title, ...props }: Props) => {
  const Action = Styles(icon)
  return (
    <Tooltip title={title}>
      <Action {...props} />
    </Tooltip>
  )
}

export default ActionIcon
