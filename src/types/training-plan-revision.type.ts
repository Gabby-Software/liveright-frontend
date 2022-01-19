import { DatabaseItemType } from './database-item.type'

export type TrainingPlanRevisionType = DatabaseItemType & {
  is_template: boolean
  days: any
  days_count: number
  status: boolean
  main: any
}
