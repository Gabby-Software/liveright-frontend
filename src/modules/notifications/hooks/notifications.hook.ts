import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useAuth } from '../../../hooks/auth.hook'
import {
  ACTION_GET_UNREAD_NOTIFICATIONS_COUNT_REQUEST,
  ACTION_NEW_NOTIFICATION
} from '../../../store/action-types'
import { RootState } from '../../../store/reducers'
import { NotificationsReducerType } from '../../../store/reducers/notifications.reducer'
import notificationsManager from '../notifications.manager'

export const useNotificationsChannel = () => {
  const { uuid } = useAuth()
  const dispatch = useDispatch()
  useEffect(() => {
    if (!uuid) return
    notificationsManager.init(uuid)
    const subscription = notificationsManager.subscribe(() => {
      dispatch({ type: ACTION_NEW_NOTIFICATION })
    })
    return () => notificationsManager.unsubscribe(subscription)
  }, [uuid])
}

export const useNotifications = () =>
  useSelector(
    (state: RootState) => state.notifications
  ) as NotificationsReducerType

export const useUnreadNotifications = () => {
  const dispatch = useDispatch()
  const { unread } = useNotifications()
  const { uuid } = useAuth()
  useEffect(() => {
    dispatch({ type: ACTION_GET_UNREAD_NOTIFICATIONS_COUNT_REQUEST })
  }, [uuid])
  return unread
}
