import { AccountDatabaseItemType } from './account-database-item.type'

export type ClientActivityItemType = {
  timestamp: number
  client_id: number
  activity_label: string
  activity_type: string
  notification: boolean
  seen: boolean
}
export type ClientActivityType = AccountDatabaseItemType & {
  activity: ClientActivityItemType[]
}
