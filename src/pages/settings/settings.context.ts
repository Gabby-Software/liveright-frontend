import { SettingsContent, SettingsSectionsType } from './settings.types'
import BillingsSettings from './tabs/settings-billings/settings-billings.component'
import LanguageSettings from './tabs/settings-languages/settings-languages.component'
import MetricsSettings from './tabs/settings-metrics/settings-metrics.component'
import NotificationsSettings from './tabs/settings-notifications/settings-notifications.component'

export const SETTINGS_SECTIONS: {
  [Option in Uppercase<SettingsSectionsType>]: SettingsSectionsType
} = {
  NOTIFICATIONS: 'notifications',
  PREFFERED_METRIC_SYSTEM: 'preffered_metric_system',
  PREFFERED_LANGUAGE: 'preffered_language',
  BILLING_METHODS: 'billing_methods'
}

export const content: SettingsContent[] = [
  {
    key: SETTINGS_SECTIONS.NOTIFICATIONS,
    label: 'Notifications',
    component: NotificationsSettings
  },
  {
    key: SETTINGS_SECTIONS.PREFFERED_METRIC_SYSTEM,
    label: 'Preffered Metric System',
    component: MetricsSettings
  },
  {
    key: SETTINGS_SECTIONS.PREFFERED_LANGUAGE,
    label: 'Preffered Language',
    component: LanguageSettings
  },
  {
    key: SETTINGS_SECTIONS.BILLING_METHODS,
    label: 'Billing Methods',
    // after moving this component to seperate file, we can change the .tsx to .ts
    component: BillingsSettings
  }
]
