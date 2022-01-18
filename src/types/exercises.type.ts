import { AccessOptionType } from './access-option.type'
import { DatabaseItemType } from './database-item.type'
import { ExerciseLogType } from './exercise-log.type'

export type ExercisesTypeType = 'cardio' | 'workout'
export type ExercisesType = DatabaseItemType & {
  account_id: number
  user_id: number
  created_by: number
  access: AccessOptionType
  is_template: boolean
  based_on_template: boolean
  original_template: number
  keep_synced: boolean
  name: string
  description: string
  video_link: string
  body_part: string
  type: ExercisesTypeType
  info: ExerciseLogType
  link: string
}
