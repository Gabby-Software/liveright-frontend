import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import {
  CheckDashboardIcon,
  DoubleCheckDashboardIcon,
  NotificationDashboardIcon
} from '../../../../assets/media/icons'
import Tabs from '../../../../components/tabs/tabs.component'
import { Routes } from '../../../../enums/routes.enum'
import { useAuth } from '../../../../hooks/auth.hook'
import { notificationIcon } from '../../../../modules/notifications/enums/notification-icon.enum'
import { notificationUrl } from '../../../../modules/notifications/enums/notification-url.enum'
import { useNotifications } from '../../../../modules/notifications/hooks/notifications.hook'
import notificationManager, {
  NotificationsManager
} from '../../../../modules/notifications/notifications.manager'
import {
  ACTION_GET_NOTIFICATIONS_REQUEST,
  ACTION_GET_UNREAD_NOTIFICATIONS_COUNT_SUCCESS
} from '../../../../store/action-types'
import { NotificationType } from '../../../../types/notifications.type'
import { DashboardButton } from '../dashboard-button/dashboard-button.component'
import { Styles } from './dashboard-latest.styles'

interface ListProps {
  notifications: NotificationType[]
}
const ColorIcon = ({ type }: { type: string }) => {
  const { Icon, color } = notificationIcon(type)
  return (
    <div className={`notification__icon notification__icon__${color}`}>
      <Icon />
    </div>
  )
}
const ListItem = ({ notification }: { notification: NotificationType }) => {
  const auth = useAuth()
  const { url } = notificationUrl(
    notification.type,
    notification.data,
    auth.type
  )
  return (
    <li className="item">
      <a href={url} target="blanc">
        <div>
          <ColorIcon type={notification.type} />
          <p className="item__description">{notification.data.message}</p>
        </div>
        <div
          className={`item__icon ${
            notification.read_at ? 'item__icon-checked' : 'item__icon-unchecked'
          }`}
        >
          {notification.read_at ? (
            <DoubleCheckDashboardIcon className="checked" />
          ) : (
            <CheckDashboardIcon className="unchecked" />
          )}
        </div>
      </a>
    </li>
  )
}
const List = ({ notifications }: ListProps) => {
  if (notifications.length === 0) {
    return null
  }

  return (
    <ul className="list">
      {notifications.slice(0, 4).map((item) => (
        <ListItem notification={item} key={item.id} />
      ))}
    </ul>
  )
}

export const DashboardLatest = () => {
  const [activeTab, setActiveTab] = useState('payment')
  const {
    notifications: { data: notifications }
  } = useNotifications()
  const dispatch = useDispatch()
  const { uuid } = useAuth()

  useEffect(() => {
    const fetchNotifications = () => {
      dispatch({
        type: ACTION_GET_NOTIFICATIONS_REQUEST,
        payload: {
          onSuccess: () => {
            NotificationsManager.markAllAsRead().then(() => {
              dispatch({
                type: ACTION_GET_UNREAD_NOTIFICATIONS_COUNT_SUCCESS,
                payload: 0
              })
            })
          }
        }
      })
    }
    fetchNotifications()
    const id = notificationManager.subscribe(fetchNotifications)
    return () => notificationManager.unsubscribe(id)
  }, [uuid])

  const dietNotifications: NotificationType[] = []
  const trainingNotifications: NotificationType[] = notifications.filter(
    (item) => item.type === 'client_requested_session'
  )
  const paymentNotifications: NotificationType[] = notifications.filter(
    (item) => item.type === 'invoice_status_changed_notification'
  )
  const inactivityNotifications: NotificationType[] = notifications.filter(
    (item) =>
      item.type === 'invitation_accepted_notification' ||
      item.type === 'invitation_rejected_notification' ||
      item.type === 'health_data_reminder'
  )

  const TABS = [
    {
      label: 'Payment',
      key: 'payment',
      renderContent: () => <List notifications={paymentNotifications} />
    },
    {
      label: 'Training',
      key: 'training',
      renderContent: () => <List notifications={trainingNotifications} />
    },
    {
      label: 'Inactivity',
      key: 'inactivity',
      renderContent: () => <List notifications={inactivityNotifications} />
    },
    {
      label: 'Diet',
      key: 'diet',
      renderContent: () => <List notifications={dietNotifications} />
    }
  ]
  return (
    <Styles>
      <div className="wrapper">
        <h2 className="wrapper-title">The Latest</h2>
      </div>
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        tabs={TABS}
        className={'latest__tabs'}
        // justify={isMobile ? 'between' : undefined}
      />
      <DashboardButton>
        <Link to={Routes.NOTIFICATIONS}>
          <NotificationDashboardIcon />
          View Notifications
        </Link>
      </DashboardButton>
    </Styles>
  )
}
