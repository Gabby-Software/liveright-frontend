import { DatabaseItemType } from './database-item.type'

export type ExerciseType = {
  name: string
  info: any
  link: string
}

export type ItemType = {
  is_superset: boolean
  sort_order: number
  data: ExerciseType
}

export type WorkoutType = DatabaseItemType & {
  account_id: number
  name: string
  time: string
  items: ItemType[]
}
