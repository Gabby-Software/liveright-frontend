import { DatabaseItemType } from './database-item.type'
import { WorkoutType } from './workout.type'

export type WorkoutDayType = DatabaseItemType & {
  name: string
  activities: WorkoutType[]
}
