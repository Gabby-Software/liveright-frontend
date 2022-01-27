import { DatabaseItemType } from './database-item.type'
import { WorkoutDayType } from './workout-day.type'

export type TrainingTemplateType = DatabaseItemType & {
  name: string
  days: WorkoutDayType[]
}
