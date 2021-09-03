import React from 'react'

import { NotificationsIcon } from '../../assets/media/icons'
import { useUnreadNotifications } from '../../modules/notifications/hooks/notifications.hook'
import { classes } from '../../pipes/classes.pipe'
import Styles from './notification-icon.styles'

const NotificationIcon = () => {
  const notificationCount = useUnreadNotifications()
  return (
    <Styles
      className={classes(notificationCount && 'notification__active')}
      data-count={String(notificationCount)}
    >
      <NotificationsIcon />
    </Styles>
  )
}

export default NotificationIcon
