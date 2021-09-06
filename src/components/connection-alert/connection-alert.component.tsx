import React, { FC } from 'react'

import { useConnection } from '../../hooks/connection.hook'
import { classes } from '../../pipes/classes.pipe'
import Styles from './connection-alert.styles'

type Props = {}
const ConnectionAlert: FC<Props> = ({}) => {
  const isOnline = useConnection()
  return (
    <Styles
      className={classes(
        'connection',
        isOnline ? 'connection__on' : 'connection__off'
      )}
    >
      {isOnline ? 'Back online' : 'No internet connection'}
    </Styles>
  )
}

export default ConnectionAlert
