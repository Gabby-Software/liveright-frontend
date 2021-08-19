import { DatabaseItemType } from './database-item.type'

export type AccountDatabaseItemType = DatabaseItemType & {
  account_id: number
  previous_vol: number
}
