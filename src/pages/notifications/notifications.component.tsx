import moment from 'moment'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import DataPagination from '../../components/data-pagination/data-pagination.component'
import FormButton from '../../components/forms/form-button/form-button.component'
import { Routes } from '../../enums/routes.enum'
import { useAuth } from '../../hooks/auth.hook'
import { useTitleContent } from '../../layouts/desktop-layout/desktop-layout.component'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import { useNotifications } from '../../modules/notifications/hooks/notifications.hook'
import notificationManager, {
  NotificationsManager
} from '../../modules/notifications/notifications.manager'
import {
  ACTION_GET_NOTIFICATIONS_REQUEST,
  ACTION_GET_UNREAD_NOTIFICATIONS_COUNT_SUCCESS
} from '../../store/action-types'
import { NotificationType } from '../../types/notifications.type'
import Notification from './components/notification/notification.component'
import Styles, { SettingsLink } from './notifications.styles'

type Props = {}
const Notifications = ({}: Props) => {
  const { t } = useTranslation()
  const {
    notifications: { data, meta }
  } = useNotifications()
  const dispatch = useDispatch()
  const { uuid } = useAuth()
  useTitleContent(
    <SettingsLink to={Routes.NOTIFICATIONS_SETTINGS}>
      <FormButton type={'ghost'}>Manage Settings</FormButton>
    </SettingsLink>
  )
  useEffect(() => {
    fetchNotifications(meta.current_page)
    const id = notificationManager.subscribe(fetchNotifications)
    return () => notificationManager.unsubscribe(id)
  }, [uuid])
  const fetchNotifications = (page = meta.current_page) => {
    dispatch({
      type: ACTION_GET_NOTIFICATIONS_REQUEST,
      payload: {
        page,
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
  let seen = false
  let lastDate = moment()

  console.log('notifications', data)
  return (
    <Styles>
      <FormButton
        type={'ghost'}
        className={'mobile'}
        style={{ marginBottom: '40px' }}
      >
        Manage Settings
      </FormButton>
      {data.map((n: NotificationType, i) => {
        const els: React.ReactNode[] = []
        if (n.read_at && !seen && meta.current_page <= 1) {
          els.push(
            <div className={'notification__hr'}>
              <span>{t('notifications:all-done')}</span>
            </div>
          )
          els.push(
            <div className={'notification__date-label desktop'}>
              {moment(n.created_at).format('DD/MM/YYYY')}
            </div>
          )
        } else if (
          (seen && moment(n.created_at).isBefore(lastDate, 'day')) ||
          (i === 0 && meta.current_page > 1)
        ) {
          els.push(
            <div className={'notification__date-label desktop'}>
              {moment(n.created_at).format('DD/MM/YYYY')}
            </div>
          )
        }
        els.push(<Notification {...n} />)
        seen = !!n.read_at
        lastDate = moment(n.created_at)
        return els
      })}
      <DataPagination
        page={meta.current_page}
        setPage={fetchNotifications}
        total={meta.total}
      />
    </Styles>
  )
}

export default Notifications
