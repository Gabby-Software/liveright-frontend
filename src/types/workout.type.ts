import { DatabaseItemType } from './database-item.type'

export type ItemType = {
  is_superset: boolean
  sort_order: number
  data: any
}

export type WorkoutType = DatabaseItemType & {
  account_id: number
  name: string
  time: string
  items: ItemType[]
}
