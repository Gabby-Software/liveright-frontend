import React, { FC, ReactNode } from 'react'

import { classes } from '../../../../../pipes/classes.pipe'
import Styles from './chat-actions-action.styles'

type Props = {
  icon: ReactNode
  color?: string
  disabled?: boolean
}
const ChatActionsAction: FC<Props> = ({ icon, color, disabled }) => {
  return (
    <Styles
      color={color}
      className={classes(disabled && 'chat-action__disabled', 'chat-action')}
    >
      {icon}
    </Styles>
  )
}

export default ChatActionsAction
