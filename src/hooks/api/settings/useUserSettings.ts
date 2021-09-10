import useSWR from 'swr'

import { EP_SETTINGS } from '../../../enums/api.enum'
import { NotificationsManager } from '../../../modules/notifications/notifications.manager'
import { NotificationSettingsType } from '../../../modules/notifications/types/notification-settings.type'
import { getUserSettings } from '../../../services/api/settings'

interface UseUserSettings {
  notification: NotificationSettingsType
  isLoading: boolean
  onUpdate: (notification: NotificationSettingsType) => void
}

export default function useUserSettings(): UseUserSettings {
  const { data, error, mutate } = useSWR(EP_SETTINGS, getUserSettings)
  const isLoading = !data && !error
  const settings = data || {}
  const notification = settings.notification || {}

  const onUpdate = async (notification: NotificationSettingsType) => {
    try {
      await NotificationsManager.updateSettings(notification)
      mutate()
    } catch (e) {
      console.error(e)
    }
  }

  return {
    isLoading,
    notification,
    onUpdate
  }
}
