import useSWR from 'swr'

import { EP_SETTINGS } from '../../../enums/api.enum'
import { NotificationSettingsType } from '../../../modules/notifications/types/notification-settings.type'
import { getUserSettings } from '../../../services/api/settings'

interface UseUserSettings {
  notification: NotificationSettingsType
  isLoading: boolean
}

export default function useUserSettings(): UseUserSettings {
  const { data, error } = useSWR(EP_SETTINGS, getUserSettings)
  const isLoading = !data && !error
  const settings = data || {}
  const notification = settings.notification || {}

  return {
    isLoading,
    notification
  }
}
