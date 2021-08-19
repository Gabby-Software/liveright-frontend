import { NotificationsSettingsType } from './notifications-settings.type'

export const notificationsSettingsData: NotificationsSettingsType[] = [
  {
    title: 'settings:notifications.payment',
    email: true,
    browser: false
  },
  {
    title: 'settings:notifications.training',
    email: false,
    browser: false
  },
  {
    title: 'settings:notifications.chat',
    email: true,
    browser: true
  },
  {
    title: 'settings:notifications.other',
    email: false,
    browser: true
  }
]
