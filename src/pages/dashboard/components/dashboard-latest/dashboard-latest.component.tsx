import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { CheckedIcon } from '../../../../assets/media/icons'
import Button from '../../../../components/buttons/button/button.component'
import Tabs from '../../../../components/tabs/tabs.component'
import { Routes } from '../../../../enums/routes.enum'
import { useAuth } from '../../../../hooks/auth.hook'
import { notificationIcon } from '../../../../modules/notifications/enums/notification-icon.enum'
import { useNotifications } from '../../../../modules/notifications/hooks/notifications.hook'
import notificationManager, {
  NotificationsManager
} from '../../../../modules/notifications/notifications.manager'
import {
  ACTION_GET_NOTIFICATIONS_REQUEST,
  ACTION_GET_UNREAD_NOTIFICATIONS_COUNT_SUCCESS
} from '../../../../store/action-types'
import { NotificationType } from '../../../../types/notifications.type'
import { Styles } from './dashboard-latest.styles'

interface ListProps {
  data: NotificationType[]
}
const ColorIcon = ({ type }: { type: string }) => {
  const { Icon, color } = notificationIcon(type)
  return (
    <div className={`notification__icon notification__icon__${color}`}>
      <Icon />
    </div>
  )
}
const List = ({ data }: ListProps) => {
  if (data.length === 0) {
    return null
  }

  return (
    <ul className="list">
      {data.slice(0, 5).map((item) => (
        <li className="item" key={item.id}>
          <div>
            <ColorIcon type={item.type} />
            <p className="item__description">{item.data.message}</p>
          </div>
          {item.read_at && <CheckedIcon className="item__icon" />}
        </li>
      ))}
    </ul>
  )
}

export const DashboardLatest = () => {
  const [activeTab, setActiveTab] = useState('diet')
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

  const dietData: NotificationType[] = []
  const trainingData: NotificationType[] = notifications.filter(
    (item) => item.type === 'client_requested_session'
  )
  const paymentData: NotificationType[] = notifications.filter(
    (item) => item.type === 'invoice_status_changed_notification'
  )
  const inactivityData: NotificationType[] = notifications.filter(
    (item) =>
      item.type === 'invitation_accepted_notification' ||
      item.type === 'invitation_rejected_notification' ||
      item.type === 'health_data_reminder'
  )

  const TABS = [
    {
      label: 'Diet',
      key: 'diet',
      renderContent: () => <List data={dietData} />
    },
    {
      label: 'Training',
      key: 'training',
      renderContent: () => <List data={trainingData} />
    },
    {
      label: 'Payment',
      key: 'payment',
      renderContent: () => <List data={paymentData} />
    },
    {
      label: 'Inactivity',
      key: 'inactivity',
      renderContent: () => <List data={inactivityData} />
    }
  ]
  return (
    <Styles>
      <div className="wrapper">
        <h2 className="wrapper-title">The Latest</h2>
        <Button className="wrapper-button">
          <Link to={Routes.NOTIFICATIONS}>View Notifications</Link>
        </Button>
      </div>
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        tabs={TABS}
        className={'latest__tabs'}
        // justify={isMobile ? 'between' : undefined}
      />
    </Styles>
  )
}
