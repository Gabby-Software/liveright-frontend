import React from 'react'

import { ReactComponent as Icon } from '../../assets/media/icons/bell.svg'
import logger from '../../managers/logger.manager'
import { useUnreadNotifications } from '../../modules/notifications/hooks/notifications.hook'
import { classes } from '../../pipes/classes.pipe'
import Styles from './notification-icon.styles'

const NotificationIcon = () => {
  const notificationCount = useUnreadNotifications()
  logger.info('NEW UNREAD NOTIFICATION')
  return (
    <Styles
      className={classes(notificationCount && 'notification__active')}
      data-count={String(notificationCount)}
    >
      <Icon />
    </Styles>
  )
}

export default NotificationIcon
