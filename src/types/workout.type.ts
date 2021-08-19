import { ExerciseLogType } from './exercise-log.type'
import { LibraryType } from './library.type'

export type WorkoutItemType = {
  exercise_id: number
  my_info: ExerciseLogType
}
export type WorkoutType = LibraryType & {
  exercise_list: WorkoutItemType[]
}
