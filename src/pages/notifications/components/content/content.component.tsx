import moment from 'moment'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Button from '../../../../components/buttons/button/button.component'
import DataPagination from '../../../../components/data-pagination/data-pagination.component'
import { Routes } from '../../../../enums/routes.enum'
import { useAuth } from '../../../../hooks/auth.hook'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { useNotifications } from '../../../../modules/notifications/hooks/notifications.hook'
import notificationManager, {
  NotificationsManager
} from '../../../../modules/notifications/notifications.manager'
import {
  ACTION_GET_NOTIFICATIONS_REQUEST,
  ACTION_GET_UNREAD_NOTIFICATIONS_COUNT_SUCCESS
} from '../../../../store/action-types'
import { NotificationType } from '../../../../types/notifications.type'
import { DATE_RENDER_FORMAT } from '../../../../utils/date'
import Notification from '../notification/notification.component'
import Styles from './content.styles'

export default function Content() {
  const { t } = useTranslation()
  const {
    notifications: { data, meta }
  } = useNotifications()
  const dispatch = useDispatch()
  const { uuid } = useAuth()
  const isMobile = useIsMobile()

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
  return (
    <Styles>
      {!isMobile && (
        <div className="notifications__title-container">
          <h2 className="notifications__title">{t('notifications:title')}</h2>

          <Button to={Routes.NOTIFICATIONS_SETTINGS}>
            {t('notifications:manage-sessions')}
          </Button>
        </div>
      )}

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
              {moment(n.created_at).format(DATE_RENDER_FORMAT)}
            </div>
          )
        } else if (
          (seen && moment(n.created_at).isBefore(lastDate, 'day')) ||
          (i === 0 && meta.current_page > 1)
        ) {
          els.push(
            <div className={'notification__date-label desktop'}>
              {moment(n.created_at).format(DATE_RENDER_FORMAT)}
            </div>
          )
        }

        els.push(<Notification {...n} />)

        seen = !!n.read_at
        lastDate = moment(n.created_at)
        return els
      })}

      <DataPagination
        justify="center"
        page={meta.current_page}
        setPage={fetchNotifications}
        total={meta.total}
      />
    </Styles>
  )
}
