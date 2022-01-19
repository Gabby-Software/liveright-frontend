import { FoodInfoType } from './food.type'
import { LibraryType } from './library.type'

export type DietTemplateItemType = {
  meal_id: number
  timestamp: number
}
export type DietTemplateType = LibraryType & {
  total_target: FoodInfoType
  current: FoodInfoType
  eat_list: DietTemplateItemType[]
}
