import { AccountDatabaseItemType } from './account-database-item.type'
import { ExerciseLogType } from './exercise-log.type'
import { FoodInfoType } from './food.type'

export type LogTypeType = 'exercise' | 'food'
export type LogType = {
  timestamp: number
  type: LogTypeType
  day: string
  exercise_id: number
  food_id: number
  meal_id: number
  workout_id: number
  logged: ExerciseLogType & FoodInfoType
  target: ExerciseLogType & FoodInfoType
}
export type LogsType = AccountDatabaseItemType & {
  logs: LogsType[]
}
