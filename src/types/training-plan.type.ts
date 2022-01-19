import { DatabaseItemType } from './database-item.type'

export type TrainingPlanType = DatabaseItemType & {
  name: string
  revisions: any
}
