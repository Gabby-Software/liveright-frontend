import { FunctionComponent } from 'react'

export type SettingsSectionsType =
  | 'notifications'
  | 'preffered_metric_system'
  | 'preffered_language'
  | 'billing_methods'

export interface ParamsType {
  tab: SettingsSectionsType
}

export interface SettingsContent {
  key: SettingsSectionsType
  label: string
  component: FunctionComponent
}
