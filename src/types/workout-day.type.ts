import { DatabaseItemType } from './database-item.type'

export type WorkoutDayType = DatabaseItemType & {
  name: string
  activities: any
}
