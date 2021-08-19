import { AccountDatabaseItemType } from './account-database-item.type'

export type HealthLogType = {
  timestamp: number
  type: 'manual|auto'
  steps: number
  sleep: number
  hrv: number
  glicose: number
  day: number
  account_id: number
}
export type HealthDataType = AccountDatabaseItemType & {
  health_logs: HealthLogType[]
}
