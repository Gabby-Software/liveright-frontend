import { ExerciseLogType } from './exercise-log.type'
import { FoodInfoType } from './food.type'
import { LibraryType } from './library.type'

export type PlanTypeType =
  | 'exercise'
  | 'workout'
  | 'food'
  | 'meal'
  | 'session'
  | 'suplement'
export type PlanItem = {
  set_time: number
  order: number
  name: string
  type: PlanTypeType
  exercise_id: number
  workout_id: number
  food_id: number
  meal_id: number
  session_id: number
  suplement_id: number
  my_info: ExerciseLogType & FoodInfoType
}
export type PlanType = LibraryType & {
  day_list: PlanItem[][]
}
